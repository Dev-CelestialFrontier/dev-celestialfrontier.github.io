import{f as e,l as t,o as n}from"./Geometry-BhLxjYlb.js";import"./src-PpYgFp_O.js";import"./lib-BTmxI6xV.js";import{n as r,t as i}from"./Mesh-DHS_l5-c.js";var a=`
float cfEarthMaterialHashV1(vec2 cell) {
  vec3 h = fract(vec3(cell.x, cell.y, cell.x) * 0.1031);
  h += dot(h, h.yzx + 33.33);
  return fract((h.x + h.y) * h.z);
}

// Value, d(value)/d(coordinate.x), d(value)/d(coordinate.y).
vec3 cfEarthMaterialNoiseV1(vec2 coordinate) {
  vec2 cell = floor(coordinate);
  vec2 local = fract(coordinate);
  vec2 blend = local * local * (3.0 - 2.0 * local);
  vec2 blendGradient = 6.0 * local * (1.0 - local);
  float a = cfEarthMaterialHashV1(cell);
  float b = cfEarthMaterialHashV1(cell + vec2(1.0, 0.0));
  float c = cfEarthMaterialHashV1(cell + vec2(0.0, 1.0));
  float d = cfEarthMaterialHashV1(cell + vec2(1.0, 1.0));
  float lower = mix(a, b, blend.x);
  float upper = mix(c, d, blend.x);
  return vec3(mix(lower, upper, blend.y),
    mix(b - a, d - c, blend.y) * blendGradient.x,
    (upper - lower) * blendGradient.y);
}

vec3 cfEarthSurfaceMaterialV1(vec3 albedo, float longitude, float latitude,
  vec3 normal, float light) {
  vec2 coordinate = vec2(longitude, latitude) * 10.0;
  vec3 octave0 = cfEarthMaterialNoiseV1(coordinate);
  vec3 octave1 = cfEarthMaterialNoiseV1(coordinate * 2.0 + vec2(7.3, -4.1));
  vec3 octave2 = cfEarthMaterialNoiseV1(coordinate * 4.0 + vec2(-11.7, 6.9));
  float grain = 0.57 * octave0.x + 0.29 * octave1.x + 0.14 * octave2.x - 0.5;
  // Chain rule converts octave-local gradients back to canonical (u, latitude).
  vec2 canonicalGradient = 0.57 * 10.0 * octave0.yz
    + 0.29 * 20.0 * octave1.yz + 0.14 * 40.0 * octave2.yz;

  float minimumChannel = min(albedo.r, min(albedo.g, albedo.b));
  float maximumChannel = max(albedo.r, max(albedo.g, albedo.b));
  float paleIce = smoothstep(0.58, 0.84, minimumChannel)
    * (1.0 - smoothstep(0.14, 0.27, maximumChannel - minimumChannel));
  float blueSurplus = albedo.b - max(albedo.r, albedo.g);
  float water = smoothstep(0.055, 0.13, blueSurplus) * (1.0 - paleIce);
  float land = (1.0 - smoothstep(0.02, 0.08, blueSurplus)) * (1.0 - paleIce);

  // u = 1.4 * (atan(normal.x, normal.z) - angle), latitude = normal.y.
  // Map their analytic gradients into the unit sphere's tangent plane. The
  // polar denominator is bounded before detail fades to zero at either pole.
  float polarRadiusSquared = max(0.0, 1.0 - normal.y * normal.y);
  vec3 longitudeTangent = 1.4 * vec3(normal.z, 0.0, -normal.x)
    / max(polarRadiusSquared, 0.0025);
  vec3 latitudeTangent = vec3(0.0, 1.0, 0.0) - normal.y * normal;
  vec3 gradient = canonicalGradient.x * longitudeTangent
    + canonicalGradient.y * latitudeTangent;
  gradient = clamp(gradient * 0.002, vec3(-0.045), vec3(0.045));
  float detail = smoothstep(0.025, 0.14, polarRadiusSquared)
    * smoothstep(0.08, 0.22, normal.z);
  vec3 reliefNormal = normalize(normal - gradient * land * detail);

  // Use the existing, deliberately unnormalized canonical light vector.
  const vec3 lightDirection = vec3(-0.42, -0.30, 0.86);
  float relief = clamp(0.88 * (max(dot(reliefNormal, lightDirection), 0.0)
    - max(dot(normal, lightDirection), 0.0)), -0.04, 0.04);
  // Grain changes RGB proportionally: at most 2.25% on land / 0.6% on water.
  float albedoFactor = 1.0 + grain * detail * (0.045 * land + 0.012 * water);
  vec3 color = albedo * albedoFactor * max(0.0, light + relief);

  // Roughness only modulates a small, fixed-light-side water sheen. It is not
  // an authoritative ocean or physically calibrated roughness map.
  float roughness = 0.30 + grain * detail * 0.12;
  vec3 halfVector = normalize(normalize(lightDirection) + vec3(0.0, 0.0, 1.0));
  float litSide = smoothstep(0.24, 0.55, light);
  float sheen = water * litSide * 0.024
    * pow(max(dot(normal, halfVector), 0.0), mix(88.0, 48.0, roughness));
  color += vec3(0.78, 0.86, 1.0) * sheen;

  // Thin INNER rim only; the caller's existing alpha owns the exact silhouette.
  float atmosphere = (1.0 - smoothstep(0.03, 0.22, normal.z)) * litSide * 0.022;
  color += vec3(0.46, 0.66, 0.92) * atmosphere;
  return clamp(color, vec3(0.0), vec3(1.0));
}
`,o=.22;function s(e){if(!Number.isFinite(e)||e<=0||e>=18)return 0;let t=Math.sin(Math.PI*e/18);return o*t*t}var c=Math.PI*.7+.35,l=`
in vec2 aPosition;
in vec2 aUV;
uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;
uniform mat3 uTransformMatrix;
uniform vec4 uWorldColorAlpha;
uniform vec4 uColor;
out vec2 vUV;
out vec4 vColor;
void main() {
  vUV = aUV;
  vColor = uColor * uWorldColorAlpha;
  gl_Position = vec4((uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix
    * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}`,u=`
precision highp float;
in vec2 vUV;
in vec4 vColor;
uniform sampler2D uAtlas;
uniform float uAngle;
uniform float uExtent;
uniform float uMaterial;
out vec4 finalColor;
${a}
void main() {
  vec2 p = vUV * 2.0 - 1.0;
  float rr = dot(p, p);
  if (rr > 1.0) discard;
  float z = sqrt(max(0.0, 1.0 - rr));
  float longitude = (atan(p.x, z) - uAngle) * 1.4;
  vec2 atlasUV = vec2(0.5 + longitude / (2.0 * uExtent), vUV.y);
  vec3 albedo = texture(uAtlas, atlasUV).rgb;
  // Lighting is in view space. Only the sampled surface turns.
  float light = 0.20 + 0.88 * max(-0.42*p.x - 0.30*p.y + 0.86*z, 0.0);
  float edge = 1.0 - smoothstep(0.992, 1.0, rr);
  vec3 surface = uMaterial > 0.5
    ? cfEarthSurfaceMaterialV1(albedo, longitude, p.y, vec3(p, z), light)
    : albedo * light;
  finalColor = vec4(surface * edge, edge) * vColor;
}`;function d(){return f??={program:new e({vertex:l,fragment:u,name:`cf-earth-surface-turn-v1`}),uniforms:new t({uAngle:{value:0,type:`f32`},uExtent:{value:c,type:`f32`},uMaterial:{value:0,type:`f32`}})}}var f=null,p=12e3,m=`Earth surface atlas timed out`,h=class{options;status=`pending`;error=null;worker=null;deadline=null;expiresAt=null;canvas=null;lease=null;geometry=null;shader=null;uniforms=null;mesh=null;elapsedSeconds=0;angle=0;shown=!1;starts=0;constructor(e){this.options=e;try{if(!e.isCurrent()||e.planet.seed!==133||e.planet.type!==`terran`)throw Error(`Earth turn requires the current canonical Earth surface`);this.worker=new Worker(new URL(`/assets/planet-surface-turn.worker-jKUKmrS4.js`,``+import.meta.url),{type:`module`,name:`cf-earth-surface-turn`}),this.starts++,this.expiresAt=performance.now()+p,this.deadline=setTimeout(()=>this.fail(m),p),this.worker.onerror=()=>this.fail(`Earth surface atlas worker failed`),this.worker.onmessage=e=>this.accept(e.data),this.worker.postMessage({schema:`cf-earth-turn-request/v1`,planet:e.planet,facts:e.facts})}catch(e){this.fail(e)}}stopWorker(){this.deadline!==null&&clearTimeout(this.deadline),this.deadline=null;let e=this.worker;this.worker=null,e&&(e.onmessage=null,e.onerror=null,e.terminate())}accept(e){if(this.status===`pending`){if(!this.options.isCurrent()){this.dispose();return}if(this.expiresAt!==null&&performance.now()>=this.expiresAt){this.fail(m);return}try{this.stopWorker();let t=e;if(t&&t.schema===`cf-earth-turn-error/v1`){let e=typeof t.message==`string`&&t.message.length>0?t.message.slice(0,256):`no reason given`;throw Error(`Earth surface atlas worker error: ${e}`)}if(!t||t.schema!==`cf-earth-turn-result/v1`||t.sourceSeed!==133||t.width!==768||t.height!==384||t.uExtent!==c||!(t.pixels instanceof Uint8ClampedArray)||t.pixels.length!==1179648)throw Error(`invalid Earth surface atlas response`);let a=document.createElement(`canvas`);this.canvas=a,a.width=768,a.height=384;let o=a.getContext(`2d`);if(!o)throw Error(`Earth surface canvas unavailable`);let s=o.createImageData(a.width,a.height);s.data.set(t.pixels),o.putImageData(s,0,0),this.lease=this.options.acquireLease(a);let l=this.options.diameter/2;this.geometry=new r({positions:new Float32Array([-l,-l,l,-l,l,l,-l,l]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])});let u=d();this.uniforms=u.uniforms,this.uniforms.uniforms.uAngle=0,this.uniforms.uniforms.uMaterial=+(this.options.material===!0),this.shader=new n({glProgram:u.program,resources:{uAtlas:this.lease.texture.source,turnUniforms:this.uniforms}}),this.mesh=new i({geometry:this.geometry,shader:this.shader,texture:this.lease.texture}),this.mesh.eventMode=`none`,this.mesh.visible=!1;let f=this.options.parent.getChildIndex(this.options.fallback);this.options.parent.addChildAt(this.mesh,f+1),this.status=`ready`}catch(e){this.fail(e)}}}tick(e,t,n,r){if(this.status!==`disposed`&&this.status!==`failed`){if(!this.options.isCurrent()){this.dispose();return}if(!(this.status!==`ready`||!this.mesh||!this.uniforms)){if(this.shown=t&&n&&r,this.mesh.visible=this.shown,this.options.fallback.visible=!this.shown,!n||!r){this.elapsedSeconds=0,this.angle=0,this.uniforms.uniforms.uAngle=0;return}this.shown&&(Number.isFinite(e)&&e>0&&(this.elapsedSeconds=Math.min(18,this.elapsedSeconds+Math.min(e,100)/1e3)),this.angle=s(this.elapsedSeconds),this.uniforms.uniforms.uAngle=this.angle)}}}snapshot(){return Object.freeze({status:this.status,error:this.error,shown:this.shown,materialEnabled:this.options.material===!0,appProgramKey:f?.program._key??null,appUniformUid:f?.uniforms.uid??null,workerActive:this.worker!==null,workerStarts:this.starts,elapsedSeconds:this.elapsedSeconds,angle:this.angle,meshLive:this.mesh!==null&&!this.mesh.destroyed,textureLive:this.lease!==null&&!this.lease.released,canvasPixels:(this.canvas?.width??0)*(this.canvas?.height??0),canonicalVisible:this.options.fallback.visible})}release(){let e=[],t=t=>{try{t()}catch(t){e.push(String(t).slice(0,128))}};t(()=>this.stopWorker());let n=this.mesh,r=this.shader,i=this.geometry,a=this.lease,o=this.canvas;this.mesh=null,this.shader=null,this.geometry=null,this.uniforms=null,this.lease=null,this.canvas=null,n&&(t(()=>{n.removeFromParent()}),t(()=>{n.destroy()})),r&&t(()=>{r.destroy(!1)}),i&&t(()=>{i.destroy(!0)}),a&&t(()=>{a.release()}),o&&t(()=>{o.width=1,o.height=1}),this.shown=!1,this.options.fallback.destroyed||(this.options.fallback.visible=!0),e.length&&(this.error=[this.error,...e].filter(Boolean).join(`; `).slice(0,512))}fail(e){this.status!==`disposed`&&(this.error=(e instanceof Error?e.message:String(e)).slice(0,256),this.status=`failed`,this.release())}dispose(){this.status!==`disposed`&&(this.status=`disposed`,this.release())}};export{h as SurfacePlanetTurnViewV1};
//# sourceMappingURL=planet-surface-turn-view-CyESDNNu.js.map