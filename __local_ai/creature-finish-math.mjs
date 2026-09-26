/** Creature texture class for the accepted kit interpreter; no geometry authority. */
export const CREATURE_FINISH_SETTINGS=Object.freeze({strength:.35,steps:1,boundaryPixels:4,gradientRatio:.95});
export function admitCreatureFinishJob(job,ua=globalThis.navigator?.userAgent??''){
 if(job?.schema!=='cf.creature-finish.v1'||job.tier!=='desktop'||/Android|iPhone|iPad|Mobile/i.test(ua))throw Error('Creature finishing requires desktop tier');
 if(!Number.isSafeInteger(job.width)||!Number.isSafeInteger(job.height)||job.width<128||job.height<128||job.width>2048||job.height>2048||!Number.isSafeInteger(job.seed)||job.seed<0||job.seed>0xffffffff)throw Error('Creature finish dimensions/seed');
 if(JSON.stringify(job.settings)!==JSON.stringify(CREATURE_FINISH_SETTINGS)||typeof job.prompt!=='string'||job.prompt.length<100||job.prompt.length>8000)throw Error('Creature finish settings/prompt');
 for(const ref of [job.master,job.labels]){admitCreatureFinishRef(ref);if(ref.width!==job.width||ref.height!==job.height)throw Error('Creature finish input reference dimensions');}
 return job;
}
export function creatureFinishMask(master,labels,w,h,radius=4){
 if(master.length!==w*h*4||labels.length!==master.length||radius!==4||w%16||h%16)throw Error('Creature mask shape');
 const editable=new Uint8Array(w*h),latent=new Float32Array(w*h/256);latent.fill(1);
 for(let y=radius;y<h-radius;y++)for(let x=radius;x<w-radius;x++){
  const i=y*w+x,label=labels[i*4];if(!label||master[i*4+3]!==255)continue;
  let inner=true;for(let dy=-radius;dy<=radius&&inner;dy++)for(let dx=-radius;dx<=radius;dx++){const j=(y+dy)*w+x+dx;if(master[j*4+3]!==255||labels[j*4]!==label){inner=false;break;}}
  if(inner)editable[i]=1;
 }
 for(let y=0;y<h/16;y++)for(let x=0;x<w/16;x++){let n=0;for(let dy=0;dy<16;dy++)for(let dx=0;dx<16;dx++)n+=editable[(y*16+dy)*w+x*16+dx];if(n/256>=.55)latent[y*w/16+x]=0;}
 if(!editable.some(Boolean)||!latent.some(v=>v===0))throw Error('No editable creature interior');
 return {editable,latent};
}
export function conserveCreaturePixels(master,generated,editable){
 if(master.length!==generated.length||editable.length*4!==master.length)throw Error('Creature composite shape');
 const out=new Uint8ClampedArray(master);for(let i=0;i<editable.length;i++)if(editable[i])for(let c=0;c<3;c++)out[i*4+c]=generated[i*4+c];return out;
}

/** Either historical pinned /inputs bytes or an owned transferred ArrayBuffer, never both. */
export function admitCreatureFinishRef(ref){
 const owns=(key)=>Object.prototype.hasOwnProperty.call(ref??{},key);
 if(!ref||!Number.isSafeInteger(ref.width)||!Number.isSafeInteger(ref.height)||ref.width<128||ref.height<128||ref.width>2048||ref.height>2048||typeof ref.sha256!=='string'||!/^[a-f0-9]{64}$/.test(ref.sha256))throw Error('Creature finish input reference');
 if(owns('url')===owns('buffer'))throw Error('Creature finish reference transport ambiguity');
 if(owns('url')&&(typeof ref.url!=='string'||!/^\/inputs\/[a-z0-9-]+\.rgba$/.test(ref.url)))throw Error('Creature finish input URL');
 if(owns('buffer')&&(!(ref.buffer instanceof ArrayBuffer)||ref.buffer.resizable===true||ref.buffer.byteLength!==ref.width*ref.height*4))throw Error('Creature finish transferred size/type');
 return ref;
}
export async function readCreatureFinishRef(ref,fetcher=globalThis.fetch){
 admitCreatureFinishRef(ref);
 let bytes;
 if(Object.prototype.hasOwnProperty.call(ref,'buffer'))bytes=new Uint8Array(ref.buffer).slice();
 else{const response=await fetcher(ref.url);if(!response.ok)throw Error('Creature finish input unavailable');bytes=new Uint8Array(await response.arrayBuffer());}
 if(bytes.length!==ref.width*ref.height*4)throw Error('Creature finish RGBA size mismatch');
 const digest=new Uint8Array(await crypto.subtle.digest('SHA-256',bytes));
 const actual=Array.from(digest,v=>v.toString(16).padStart(2,'0')).join('');
 if(actual!==ref.sha256)throw Error('Creature finish RGBA hash mismatch');
 return new Uint8ClampedArray(bytes.buffer);
}
/** Hash/size-check before worker/model construction, and normalize URL input to owned bytes. */
export async function prepareCreatureFinishJob(input,fetcher=globalThis.fetch,ua=globalThis.navigator?.userAgent??''){
 const job=admitCreatureFinishJob(input,ua),master=await readCreatureFinishRef(job.master,fetcher),labels=await readCreatureFinishRef(job.labels,fetcher);
 // Refuse ineligible masters before a worker constructs its GPU/model engine.
 // The engine recomputes this mask; caller-provided derived masks are never trusted.
 const work=padCreatureFinishCanvas(master,labels,job.width,job.height);
 creatureFinishMask(work.master,work.labels,work.width,work.height);
 const ref=(source,pixels)=>({width:source.width,height:source.height,sha256:source.sha256,buffer:pixels.buffer});
 return {...job,master:ref(job.master,master),labels:ref(job.labels,labels)};
}
function creatureCanvasShape(w,h){
 if(!Number.isSafeInteger(w)||!Number.isSafeInteger(h)||w<128||h<128||w>2048||h>2048)throw Error('Creature work canvas dimensions');
 return {width:Math.ceil(w/16)*16,height:Math.ceil(h/16)*16};
}
/** Origin stays at (0,0); added right/bottom texels are zero RGBA and zero ownership. */
export function padCreatureFinishCanvas(master,labels,w,h){
 const shape=creatureCanvasShape(w,h);
 if(master.length!==w*h*4||labels.length!==master.length)throw Error('Creature work canvas source shape');
 const paddedMaster=new Uint8ClampedArray(shape.width*shape.height*4),paddedLabels=new Uint8ClampedArray(paddedMaster.length);
 for(let y=0;y<h;y++){paddedMaster.set(master.subarray(y*w*4,(y+1)*w*4),y*shape.width*4);paddedLabels.set(labels.subarray(y*w*4,(y+1)*w*4),y*shape.width*4);}
 return {...shape,master:paddedMaster,labels:paddedLabels,originalWidth:w,originalHeight:h,paddingRight:shape.width-w,paddingBottom:shape.height-h};
}
export function cropCreatureFinishCanvas(pixels,w,h,workWidth,workHeight){
 const shape=creatureCanvasShape(w,h);
 if(workWidth!==shape.width||workHeight!==shape.height||pixels.length!==workWidth*workHeight*4)throw Error('Creature work canvas crop shape');
 const output=new Uint8ClampedArray(w*h*4);
 for(let y=0;y<h;y++)output.set(pixels.subarray(y*workWidth*4,(y*workWidth+w)*4),y*w*4);
 return output;
}
