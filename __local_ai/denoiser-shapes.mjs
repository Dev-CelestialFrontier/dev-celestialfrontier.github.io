/** Opt-in session specialization for the existing batch-one denoiser only.
 * No weights, tensor values, Euler arithmetic, RNG or image settings change.
 * These are the symbolic names inspected in the pinned original/block32 graphs;
 * a native result still needs exact before/after comparison before adoption. */
const NO_OVERRIDES=Object.freeze({});
const TEXT_SEQUENCE=512,TEXT_CHANNELS=7680,LATENT_CHANNELS=128;
export function denoiserShapeSessionOptions(job){
  if(job===null||typeof job!=='object')throw TypeError('Invalid denoiser shape job');
  if(job.fixedDenoiserShapes!==undefined&&typeof job.fixedDenoiserShapes!=='boolean')
    throw TypeError('Fixed denoiser shapes option must be boolean');
  // Preserve the unselected path: it neither adds session options nor introduces
  // new shape admission for existing text/encode/denoise/decode jobs.
  if(job.fixedDenoiserShapes!==true)return NO_OVERRIDES;
  if(job.stage!=='denoise')throw Error('Fixed shapes belong only to denoise');
  const {width,height,embedding}=job;
  if(!((width===768&&height===432)||(width===1024&&height===576)))
    throw RangeError('Unqualified fixed denoiser output dimensions');
  if(!(embedding instanceof Uint16Array)||embedding.length!==TEXT_SEQUENCE*TEXT_CHANNELS)
    throw TypeError('Fixed denoiser embedding must be batch1 x512 x7680 float16 bits');
  const references=job.references===undefined?[]:job.references;
  if(!Array.isArray(references)||references.length>2)throw TypeError('Invalid fixed denoiser references');
  let imageSequence=(height/16)*(width/16);
  for(const reference of references){
    if(reference===null||typeof reference!=='object')throw TypeError('Invalid fixed denoiser reference');
    const {width:referenceWidth,height:referenceHeight,data}=reference;
    if(!((referenceWidth===512&&referenceHeight===288)||(referenceWidth===480&&referenceHeight===320)))
      throw RangeError('Unqualified fixed denoiser reference dimensions');
    const tokens=(referenceHeight/16)*(referenceWidth/16);
    if(!(data instanceof Float32Array)||data.length!==tokens*LATENT_CHANNELS)
      throw TypeError('Fixed denoiser reference length/type does not match encoded dimensions');
    imageSequence+=tokens;
  }
  return Object.freeze({freeDimensionOverrides:Object.freeze({
    batch:1,image_sequence:imageSequence,text_sequence:TEXT_SEQUENCE,
  })});
}
