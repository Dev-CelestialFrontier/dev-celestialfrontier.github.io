/**
 * Pure batch-one FLUX.2 Klein browser proof math; no ORT, clocks or global RNG.
 * Graph revision and inspected shapes: ./source-contract.md.
 * Scheduler: Diffusers commit 040c7cde626504d14caf63b13b8b25b6a9f62120,
 * src/diffusers/pipelines/flux2/pipeline_flux2.py:159 (Apache-2.0):
 * https://github.com/huggingface/diffusers/blob/040c7cde626504d14caf63b13b8b25b6a9f62120/src/diffusers/pipelines/flux2/pipeline_flux2.py#L159
 * Packing, reference positions and output-only update follow pipeline_flux2_klein.py
 * at that same commit, lines 319–395, 519–545 and 840–879. This module is a JS
 * implementation of those contracts, not a claim of identical PyTorch/GPU pixels.
 */
export const PIPELINE_MATH_VERSION = 'cf-flux2-klein-browser-math/v1';
export const GRAPH_REVISION = '3bffc0efef1d9f84727036cdbc44df3b6ab51131';
export const DIFFUSERS_REVISION = '040c7cde626504d14caf63b13b8b25b6a9f62120';
export const LATENT_CHANNELS = 128;
// Allocation guards for this proof, not device qualification or a GPU/RAM budget.
export const MAX_TOKENS = 16_384;
// Also covers the 512 * 7680 text embedding tensor (3,932,160 elements).
export const MAX_ELEMENTS = 4_194_304;
export const MAX_STEPS = 1_000;

function integer(value, name, min, max) {
  if (!Number.isSafeInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} must be an integer in [${min}, ${max}]`);
  }
  return value;
}
function finite(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be finite`);
  }
  return value;
}
function packedShape(height, width) {
  integer(height, 'packedHeight', 1, MAX_TOKENS);
  integer(width, 'packedWidth', 1, MAX_TOKENS);
  return integer(height * width, 'token count', 1, MAX_TOKENS);
}
function floatVector(data, name, expectedLength = null) {
  if (!(data instanceof Float32Array)) throw new TypeError(`${name} must be Float32Array`);
  integer(data.length, `${name} length`, 1, MAX_ELEMENTS);
  if (expectedLength !== null && data.length !== expectedLength) {
    throw new RangeError(`${name} length must be ${expectedLength}, received ${data.length}`);
  }
  for (let i = 0; i < data.length; i++) {
    if (!Number.isFinite(data[i])) throw new TypeError(`${name}[${i}] must be finite`);
  }
}

/** Empirical shift uses OUTPUT tokens alone, never appended reference tokens. */
export function computeEmpiricalMu(outputTokens, steps) {
  integer(outputTokens, 'outputTokens', 1, MAX_TOKENS);
  integer(steps, 'steps', 1, MAX_STEPS);
  const m200 = 0.00016927 * outputTokens + 0.45666666;
  if (outputTokens > 4300) return m200;
  const m10 = 8.73809524e-5 * outputTokens + 1.89833333;
  const slope = (m200 - m10) / 190;
  return slope * steps + (m200 - 200 * slope);
}

/** FlowMatch Euler, exponential dynamic shift, no terminal stretch/inversion. */
export function createSigmaSchedule(outputTokens, steps) {
  const expMu = Math.exp(computeEmpiricalMu(outputTokens, steps));
  const sigmas = new Float64Array(steps + 1);
  for (let i = 0; i < steps; i++) {
    const unshifted = (steps - i) / steps;
    sigmas[i] = expMu / (expMu + (1 / unshifted - 1));
  }
  sigmas[steps] = 0;
  return sigmas;
}

// IEEE binary32 -> binary16, round-to-nearest ties-to-even. Scalar conversions
// preserve signed zero and infinities, canonicalize NaN; tensor wrappers reject
// nonfinite values and overflow. The scratch view never escapes a synchronous call.
const scalarScratch = new DataView(new ArrayBuffer(4));
function roundedShift(value, shift) {
  const divisor = 2 ** shift;
  const result = Math.floor(value / divisor);
  const remainder = value - result * divisor;
  return result + (remainder > divisor / 2 || (remainder === divisor / 2 && result % 2) ? 1 : 0);
}
export function float32ToFloat16Bits(value) {
  if (typeof value !== 'number') throw new TypeError('value must be a number');
  scalarScratch.setFloat32(0, value, false);
  const bits = scalarScratch.getUint32(0, false);
  const sign = (bits >>> 16) & 0x8000;
  const exponent = (bits >>> 23) & 0xff;
  const fraction = bits & 0x7fffff;
  if (exponent === 255) return sign | (fraction ? 0x7e00 : 0x7c00);
  let halfExponent = exponent - 112;
  if (halfExponent >= 31) return sign | 0x7c00;
  if (halfExponent <= 0) {
    if (halfExponent < -10) return sign;
    return sign | roundedShift(fraction | 0x800000, 14 - halfExponent);
  }
  let halfFraction = roundedShift(fraction, 13);
  if (halfFraction === 1024) { halfFraction = 0; halfExponent++; }
  return sign | (halfExponent << 10) | halfFraction;
}
export function float16BitsToFloat32(bits) {
  integer(bits, 'float16 bits', 0, 0xffff);
  const exponent = (bits >>> 10) & 31;
  const fraction = bits & 1023;
  const magnitude = exponent === 31 ? (fraction ? NaN : Infinity)
    : exponent === 0 ? fraction * 2 ** -24
      : (1 + fraction / 1024) * 2 ** (exponent - 15);
  return bits & 0x8000 ? -magnitude : magnitude;
}
export function encodeFloat16(data) {
  floatVector(data, 'float32 tensor');
  const result = new Uint16Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const bits = float32ToFloat16Bits(data[i]);
    if ((bits & 0x7c00) === 0x7c00) throw new RangeError(`float16 overflow at ${i}`);
    result[i] = bits;
  }
  return result;
}
export function decodeFloat16(data) {
  if (!(data instanceof Uint16Array)) throw new TypeError('float16 tensor must be Uint16Array');
  integer(data.length, 'float16 tensor length', 1, MAX_ELEMENTS);
  const result = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const value = float16BitsToFloat32(data[i]);
    if (!Number.isFinite(value)) throw new TypeError(`float16 tensor[${i}] must be finite`);
    result[i] = value;
  }
  return result;
}

/** ORT1.29 returns native Float16Array where available. Copy storage, not values. */
export function copyFloat16Bits(data) {
  const kind=Object.prototype.toString.call(data);
  if(!ArrayBuffer.isView(data) || !['[object Float16Array]','[object Uint16Array]'].includes(kind)) {
    throw new TypeError('expected Float16Array or Uint16Array storage');
  }
  integer(data.length,'float16 storage length',1,MAX_ELEMENTS);
  return new Uint16Array(data.buffer,data.byteOffset,data.length).slice();
}

/**
 * Recipe-owned noise: mulberry32 integer stream + open-interval Box–Muller pairs.
 * Does not consume world/genome RNG. Explicit uint32 seed; seed zero is valid.
 * This JS recipe is repeatable on a fixed math engine; transcendental rounding
 * and GPU evaluation mean it does not promise cross-device identical pixels.
 */
export function seededGaussianNoise(length, seed) {
  integer(length, 'noise length', 1, MAX_ELEMENTS);
  integer(seed, 'seed', 0, 0xffffffff);
  let state = seed;
  const uniform = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return (((t ^ (t >>> 14)) >>> 0) + 0.5) / 0x100000000;
  };
  const result = new Float32Array(length);
  for (let i = 0; i < length; i += 2) {
    const radius = Math.sqrt(-2 * Math.log(uniform()));
    const angle = 2 * Math.PI * uniform();
    result[i] = radius * Math.cos(angle);
    if (i + 1 < length) result[i + 1] = radius * Math.sin(angle);
  }
  return result;
}

/** Already patchified/normalized [1,128,h,w] -> [1,h*w,128]. No VAE scaling. */
export function packedLatentsToTokens(data, packedHeight, packedWidth) {
  const count = packedShape(packedHeight, packedWidth);
  floatVector(data, 'packed latents', count * LATENT_CHANNELS);
  const result = new Float32Array(data.length);
  for (let token = 0; token < count; token++) {
    for (let channel = 0; channel < LATENT_CHANNELS; channel++) {
      result[token * LATENT_CHANNELS + channel] = data[channel * count + token];
    }
  }
  return result;
}
export function tokensToPackedLatents(data, packedHeight, packedWidth) {
  const count = packedShape(packedHeight, packedWidth);
  floatVector(data, 'latent tokens', count * LATENT_CHANNELS);
  const result = new Float32Array(data.length);
  for (let token = 0; token < count; token++) {
    for (let channel = 0; channel < LATENT_CHANNELS; channel++) {
      result[channel * count + token] = data[token * LATENT_CHANNELS + channel];
    }
  }
  return result;
}

/** null -> generated image t=0; reference index 0 -> t=10, index 1 -> t=20. */
export function createImageIds(packedHeight, packedWidth, referenceIndex = null) {
  const count = packedShape(packedHeight, packedWidth);
  const time = referenceIndex === null ? 0
    : 10 * (integer(referenceIndex, 'referenceIndex', 0, 1023) + 1);
  const result = new BigInt64Array(count * 4);
  for (let row = 0; row < packedHeight; row++) {
    for (let col = 0; col < packedWidth; col++) {
      const offset = (row * packedWidth + col) * 4;
      result[offset] = BigInt(time);
      result[offset + 1] = BigInt(row);
      result[offset + 2] = BigInt(col);
      // Fourth coordinate L remains 0, not a token counter.
    }
  }
  return result;
}

/** Fresh output only. Reference predictions are checked but never integrated. */
export function eulerOutputStep(outputLatents, combinedNoisePrediction, sigma, nextSigma) {
  floatVector(outputLatents, 'output latents');
  floatVector(combinedNoisePrediction, 'combined prediction');
  if (outputLatents.length % LATENT_CHANNELS || combinedNoisePrediction.length % LATENT_CHANNELS
      || combinedNoisePrediction.length < outputLatents.length
      || combinedNoisePrediction.length / LATENT_CHANNELS > MAX_TOKENS) {
    throw new RangeError('prediction must cover all output tokens; both tensors need 128 channels');
  }
  finite(sigma, 'sigma'); finite(nextSigma, 'nextSigma');
  if (!(sigma > 0 && sigma <= 1 && nextSigma >= 0 && nextSigma < sigma)) {
    throw new RangeError('Euler sigmas must descend from (0, 1] toward zero');
  }
  const result = new Float32Array(outputLatents.length);
  const delta = nextSigma - sigma;
  for (let i = 0; i < result.length; i++) {
    result[i] = outputLatents[i] + delta * combinedNoisePrediction[i];
    if (!Number.isFinite(result[i])) throw new RangeError(`Euler output[${i}] overflow`);
  }
  return result;
}
