import {admitCreatureFinishJob,readCreatureFinishRef,creatureFinishMask,conserveCreaturePixels,padCreatureFinishCanvas,cropCreatureFinishCanvas} from './creature-finish-math.mjs';
import {admitKitEngineJob,imageToImageStart,planarToRgba,rgbaToPlanar,placementBox,prepareKitTextTokens,MAX_KIT_TEXT_TOKENS} from './kit-engine-math.mjs';
import {expandPinnedTransformer,sha256} from './kit-worker-expansion.mjs';
import {applyKitWeather} from './kit-weather-math.mjs';
import {keyAndDespill,compositeLayer,compositeOrganism,subtractOcclusion,latentInteriorMask,protectLatents,alphaToRgba,alphaBounds} from './kit-contact-math.mjs';
import {encodeFloat16,decodeFloat16,packedLatentsToTokens,tokensToPackedLatents,createImageIds,eulerOutputStep,seededGaussianNoise} from './pipeline-math.mjs';
const parse=async path=>{const r=await fetch(path);if(!r.ok)throw Error('Missing '+path);return r.json();};
export async function createKitWorkerEngine({ort,Tokenizer,progress,expand=expandPinnedTransformer,modelFiles={},precomputedText=null}){
  const urls=[];
  const sourceUrl=path=>{const value=modelFiles[path];if(value instanceof Blob){const url=URL.createObjectURL(value);urls.push(url);modelFiles={...modelFiles,[path]:url};return url;}return value??('/model/'+path);};
  const modelFetch=async(url,options)=>{
    const path=url.startsWith('/model/')?url.slice(7):null,value=path===null?null:modelFiles[path];
    // Blob slices provide bounded in-worker expansion ranges without reading a whole shard.
    if(value instanceof Blob){const range=options?.headers?.Range?.match(/^bytes=(\d+)-(\d+)$/);if(range){const start=Number(range[1]),end=Number(range[2]);if(end>=value.size||start>end)throw Error('Model range refused');return new Response(value.slice(start,end+1),{status:206,headers:{'content-range':`bytes ${start}-${end}/${value.size}`}});}return new Response(value);}
    return fetch(path===null?url:(value??url),options);
  };
  const modelJson=async path=>{const r=await modelFetch('/model/'+path);if(!r.ok)throw Error('Model metadata unavailable');return r.json();};
  const adapter=await navigator.gpu?.requestAdapter({powerPreference:'high-performance'});
  if(!adapter||!adapter.features.has('shader-f16')||adapter.info.isFallbackAdapter)throw Error('Native f16 GPU required');
  const device=await adapter.requestDevice({requiredFeatures:['shader-f16'],requiredLimits:{maxBufferSize:adapter.limits.maxBufferSize,maxStorageBufferBindingSize:adapter.limits.maxStorageBufferBindingSize,maxStorageBuffersPerShaderStage:adapter.limits.maxStorageBuffersPerShaderStage}});
  let fault=null,closed=false,busy=false,tokenizer,expanded;
  const sessions=new Map(),cache=new Map(),creates={text:0,encode:0,denoise:0,decode:0};
  device.addEventListener('uncapturederror',event=>{fault=Error(event.error.message);progress({phase:'gpu-error',message:fault.message});});
  device.lost.then(info=>{if(!closed){fault=Error('GPU device lost: '+info.message);progress({phase:'gpu-error',message:fault.message});}});
  ort.env.webgpu.device=device;ort.env.wasm.numThreads=1;
  ort.env.wasm.wasmPaths=new URL('./node_modules/onnxruntime-web/dist/',import.meta.url).href;
  const check=()=>{if(closed)throw Error('Kit engine closed');if(fault)throw fault;};
  const specs={text:['text_encoder_q4.onnx',['text_encoder_q4-00000.data','text_encoder_q4-00001.data']],encode:['vae_encoder.onnx',['vae_encoder.onnx.data']],decode:['vae_decoder.onnx',['vae_decoder.onnx.data']]};
  async function session(kind){
    check();if(kind==='text'&&precomputedText)throw Error('Phone text encoder load forbidden');if(sessions.has(kind)){progress({phase:'session-reused',stage:kind});return sessions.get(kind);}
    const start=performance.now();progress({phase:'loading',stage:kind,memory:performance.memory?{usedJSHeapSize:performance.memory.usedJSHeapSize,totalJSHeapSize:performance.memory.totalJSHeapSize}:null});let graph,externalData;
    if(kind==='denoise'){
      expanded??=await expand(modelFetch,e=>progress(e),Object.keys(modelFiles).length?new URL('./browser-variant-plan.json',import.meta.url).href:'/browser-variant-plan.json');
      graph=expanded.graph;externalData=['transformer_q8-00000.data','transformer_q8-00001.data','transformer_q8-00002.data'].map(path=>({path,data:sourceUrl(path)}));
      externalData.push({path:'repacked-scale-zero.data',data:expanded.data});
    }else{const [file,shards]=specs[kind];graph=sourceUrl(file);externalData=shards.map(path=>({path,data:sourceUrl(path)}));}
    const created=await ort.InferenceSession.create(graph,{executionProviders:['webgpu'],graphOptimizationLevel:'all',externalData});
    check();sessions.set(kind,created);creates[kind]++;progress({phase:'loaded',stage:kind,elapsedMs:performance.now()-start,creates:{...creates},memory:performance.memory?{usedJSHeapSize:performance.memory.usedJSHeapSize,totalJSHeapSize:performance.memory.totalJSHeapSize}:null});return created;
  }
  async function run(kind,feeds,outputName,type,shape){
    let outputs;
    try{
      check();const s=await session(kind);const inferenceStart=performance.now();progress({phase:'inference-start',stage:kind,outputShape:shape});
      outputs=await s.run(feeds);check();progress({phase:'inference-complete',stage:kind,elapsedMs:performance.now()-inferenceStart});const output=outputs[outputName];
      if(!output||output.type!==type||output.dims.join(',')!==shape.join(','))throw Error(kind+' output shape/type mismatch');
      const raw=await output.getData();check();progress({phase:'readback-complete',stage:kind});let data;
      if(type==='float16'){
        if(!ArrayBuffer.isView(raw)||raw.BYTES_PER_ELEMENT!==2||raw.length>MAX_KIT_TEXT_TOKENS*7680)throw Error('Float16 output storage refused');
        data=new Uint16Array(raw.buffer,raw.byteOffset,raw.length).slice();
        for(const v of data)if((v&0x7c00)===0x7c00)throw Error('Nonfinite model output');
      }else{data=new Float32Array(raw);for(const v of data)if(!Number.isFinite(v))throw Error('Nonfinite model output');}
      return data;
    }finally{if(outputs)for(const tensor of Object.values(outputs))tensor.dispose();for(const tensor of Object.values(feeds))tensor.dispose();}
  }
  async function embedding(prompt){
    check();if(precomputedText)return admitPrecomputedKitText(precomputedText,prompt);tokenizer??=new Tokenizer(await modelJson('tokenizer/tokenizer.json'),await modelJson('tokenizer/tokenizer_config.json'));
    const {wrapped,ids,mask,sequence,tokenCount}=prepareKitTextTokens(tokenizer,prompt);
    const data=await run('text',{input_ids:new ort.Tensor('int64',ids,[1,sequence]),attention_mask:new ort.Tensor('int64',mask,[1,sequence])},'prompt_embeds','float16',[1,sequence,7680]);
    return {data,sequence,tokenCount,promptSha256:await sha256(new TextEncoder().encode(prompt)),chatPromptSha256:await sha256(new TextEncoder().encode(wrapped))};
  }
  async function pixels(ref){
    const r=await fetch(ref.url);if(!r.ok)throw Error('Fitted input unavailable');
    const bytes=new Uint8Array(await r.arrayBuffer());
    if(bytes.length!==ref.width*ref.height*4||await sha256(bytes)!==ref.sha256)throw Error('Fitted RGBA hash/size mismatch');
    return new Uint8ClampedArray(bytes.buffer);
  }
  async function encode(rgba,width,height){
    const data=await run('encode',{sample:new ort.Tensor('float32',rgbaToPlanar(rgba,width,height),[1,3,height,width])},'packed_latent','float32',[1,128,height/16,width/16]);
    return packedLatentsToTokens(data,height/16,width/16);
  }
  async function reference(ref){
    const key=ref.sha256+':'+ref.width+'x'+ref.height;if(cache.has(key))return cache.get(key);
    const rgba=await pixels(ref),data=await encode(rgba,ref.width,ref.height),value={rgba,data,width:ref.width,height:ref.height};
    if(cache.size>=16)cache.delete(cache.keys().next().value);cache.set(key,value);return value;
  }
  async function paintPass({prompt,width,height,seed,steps,strength,initial,references,protection}){
    const text=await embedding(prompt),n=width/16*(height/16),total=n+references.reduce((sum,r)=>sum+r.data.length/128,0);
    if(total>16384)throw Error('Image token allocation refused');
    const ids=new BigInt64Array(total*4);ids.set(createImageIds(height/16,width/16));let at=n*4;
    references.forEach((r,i)=>{const value=createImageIds(r.height/16,r.width/16,i);ids.set(value,at);at+=value.length;});
    const txtIds=new BigInt64Array(text.sequence*4);for(let i=0;i<text.sequence;i++)txtIds[i*4+3]=BigInt(i);
    let {latents,sigmas}=imageToImageStart(initial,seed,steps,strength);
    const originalNoise=protection?seededGaussianNoise(initial.length,seed):null;
    for(let step=0;step<steps;step++){
      const combined=new Float32Array(total*128);combined.set(latents);let offset=latents.length;
      for(const r of references){combined.set(r.data,offset);offset+=r.data.length;}
      const data=await run('denoise',{
        encoder_hidden_states:new ort.Tensor('float16',text.data,[1,text.sequence,7680]),
        hidden_states:new ort.Tensor('float16',encodeFloat16(combined),[1,total,128]),
        img_ids:new ort.Tensor('int64',ids,[1,total,4]),txt_ids:new ort.Tensor('int64',txtIds,[1,text.sequence,4]),
        timestep:new ort.Tensor('float16',encodeFloat16(new Float32Array([sigmas[step]])),[1]),
      },'noise_pred','float16',[1,total,128]);
      latents=eulerOutputStep(latents,decodeFloat16(data),sigmas[step],sigmas[step+1]);
      if(protection)latents=protectLatents(latents,initial,originalNoise,protection,sigmas[step+1]);
      progress({phase:'step',step:step+1,steps,imageTokens:total,textTokens:text.sequence});
    }
    const decoded=await run('decode',{packed_latent:new ort.Tensor('float32',tokensToPackedLatents(latents,height/16,width/16),[1,128,height/16,width/16])},'sample','float32',[1,3,height,width]);
    return {decoded,text:{sequence:text.sequence,tokenCount:text.tokenCount,promptSha256:text.promptSha256,chatPromptSha256:text.chatPromptSha256},sigmas:Array.from(sigmas)};
  }
  async function png(rgba,width,height){
    const c=new OffscreenCanvas(width,height),ctx=c.getContext('2d');if(!ctx)throw Error('PNG context unavailable');
    try{ctx.putImageData(new ImageData(rgba,width,height),0,0);return await c.convertToBlob({type:'image/png'});}finally{c.width=1;c.height=1;}
  }
  async function paint(input){
    if(busy)throw Error('Kit engine already painting');check();const job=admitKitEngineJob(input);busy=true;
    const coldStarted=performance.now();
    try{
      // Session loading is preparation, not a second warm-up painting/inference.
      if(precomputedText)await admitPrecomputedKitText(precomputedText,job.finisherPrompt);
      for(const kind of (precomputedText?['encode','denoise','decode']:['encode','text','denoise','decode']))await session(kind);
      const started=performance.now(),coldPreparationMs=started-coldStarted;
      progress({phase:'warm-engine-start',coldPreparationMs});
      const captures=[],maskCaptures=[],boxes=[],measurements=[],masks=[],keying=[];
      const composed=await pixels(job.plate);
      for(const p of job.passes){
        const start=performance.now(),raw=await pixels(p.reference);
        const keyed=keyAndDespill(raw,p.reference.width,p.reference.height);
        const {box,alpha,instances}=compositeOrganism(composed,job.width,job.height,keyed,p.reference.width,p.reference.height,p.placement,placementBox);
        subtractOcclusion(masks,alpha);masks.push(alpha);
        captures.push({name:p.name,blob:await png(keyed.rgba,p.reference.width,p.reference.height)});
        boxes.push({name:p.name,identityKey:p.identityKey,...box,instances,preFinisherBounds:true,postFinisherIdentityAccepted:false});
        keying.push({name:p.name,...keyed.receipt});
        progress({phase:'organism-composited',name:p.name,inferencePasses:0,elapsedMs:performance.now()-start});
      }
      const fg=await pixels(job.foreground),fa=Uint8Array.from({length:fg.length/4},(_,i)=>fg[i*4+3]);
      const fb=alphaBounds(fa,job.foreground.width,job.foreground.height),occlusion=[];
      for(const target of job.composition.foreground.placements){
        const body=boxes.find(b=>b.name===target.name);if(!body)throw Error('Foreground target missing');
        const w=job.composition.foreground.width*job.width,h=job.composition.foreground.height*job.height;
        const box={x:body.x+body.width*target.centreAcrossBody-w/2,y:body.y+body.height+job.composition.foreground.groundOffset-h,width:w,height:h};
        const alpha=compositeLayer(composed,job.width,job.height,fg,job.foreground.width,job.foreground.height,fb,box);
        const bodyMask=masks[boxes.indexOf(body)];let covered=0;for(let i=0;i<alpha.length;i++)if(alpha[i]>16&&bodyMask[i]>16)covered++;
        if(!covered)throw Error('Foreground did not overlap target feet');subtractOcclusion(masks,alpha);
        occlusion.push({name:target.name,coveredPixels:covered,box});
      }
      const mask=latentInteriorMask(masks,job.width,job.height,job.interiorErosionPixels??4);
      for(let i=0;i<masks.length;i++)maskCaptures.push({name:boxes[i].name,blob:await png(alphaToRgba(masks[i]),job.width,job.height)});
      const composite=await png(composed,job.width,job.height),protectionMask=await png(alphaToRgba(mask.inner),job.width,job.height);
      progress({phase:'composite-capture',name:'composite-before-finisher',blob:composite});
      const initial=await encode(composed,job.width,job.height),triptych=await reference(job.triptych);
      progress({phase:'finisher-start',protectedTokens:mask.protectedTokens});const finishStart=performance.now();
      const finished=await paintPass({prompt:job.finisherPrompt,width:job.width,height:job.height,seed:job.seed,steps:1,strength:job.finisherStrength,initial,references:[triptych],protection:mask.latent});
      const {rgba}=planarToRgba(finished.decoded,job.width,job.height),finisherOriginal=await png(rgba,job.width,job.height);
      const weather=job.compositorSystemCard?applyKitWeather(rgba,job.width,job.height,masks.map((alpha,i)=>({name:boxes[i].name,alpha})),job.seed,job.compositorSystemCard,job.weatherIntensity):null;
      const painting=weather?await png(weather.rgba,job.width,job.height):finisherOriginal;
      measurements.push({name:'finisher',elapsedMs:performance.now()-finishStart,...finished.text,sigmas:finished.sigmas});
      return {schema:'cf.kit-engine-result.v4',painting,finisherOriginal,weather:weather?.receipt??null,composite,captures,maskCaptures,protectionMask,boxes,measurements,keying,
        occlusion,masking:{protectedTokens:mask.protectedTokens,totalTokens:mask.latent.length,erosionPixels:job.interiorErosionPixels??4,threshold:.55},
        organismPasses:0,elapsedMs:performance.now()-started,coldPreparationMs,totalMs:performance.now()-coldStarted,warmSessionStart:true,
        width:job.width,height:job.height,sessionCreates:{...creates},expansion:expanded?.receipt,qualityAccepted:false,
        capabilities:{maxBufferSize:adapter.limits.maxBufferSize,shaderF16:adapter.features.has('shader-f16'),adapterInfo:{...adapter.info}}};
    }finally{busy=false;}
  }
  async function finishCreature(input){
    if(busy)throw Error('Kit engine already painting');check();const job=admitCreatureFinishJob(input);busy=true;
    const started=performance.now();
    try{
      const master=await readCreatureFinishRef(job.master),labels=await readCreatureFinishRef(job.labels);
      const work=padCreatureFinishCanvas(master,labels,job.width,job.height),mask=creatureFinishMask(work.master,work.labels,work.width,work.height);
      const initial=await encode(work.master,work.width,work.height);
      const result=await paintPass({prompt:job.prompt,width:work.width,height:work.height,seed:job.seed,steps:1,strength:.35,initial,references:[],protection:mask.latent});
      const generated=planarToRgba(result.decoded,work.width,work.height).rgba;
      const conserved=conserveCreaturePixels(work.master,generated,mask.editable);
      const rgba=cropCreatureFinishCanvas(conserved,job.width,job.height,work.width,work.height);
      return {schema:'cf.creature-finish-result.v1',painting:await png(rgba,job.width,job.height),rgba,elapsedMs:performance.now()-started,
        width:job.width,height:job.height,workCanvas:{width:work.width,height:work.height,paddingRight:work.paddingRight,paddingBottom:work.paddingBottom},text:result.text,sigmas:result.sigmas,sessionCreates:{...creates},editablePixels:mask.editable.reduce((a,b)=>a+b,0),protectedTokens:mask.latent.reduce((a,b)=>a+b,0),inferencePasses:1};
    }finally{busy=false;}
  }
  async function dispose(){if(closed)return;closed=true;cache.clear();try{for(const s of sessions.values())await s.release();}finally{sessions.clear();expanded=null;for(const url of urls)URL.revokeObjectURL(url);device.destroy();}}
  return {paint,finishCreature,dispose,precomputeText:embedding};
}

/** Exact accepted-prompt embedding only. No text-encoder fallback on a mismatch. */
export async function admitPrecomputedKitText(value,prompt){
 const {manifest:m,data}=value??{};
 if(m?.schema!=='cf.kit-text-embedding.v1'||m.modelRevision!=='3bffc0efef1d9f84727036cdbc44df3b6ab51131'||m.type!=='float16'||m.sequence!==416||m.tokenCount!==402||m.width!==7680||!(data instanceof Uint16Array)||data.length!==416*7680||m.promptSha256!==await sha256(new TextEncoder().encode(prompt))||m.dataSha256!==await sha256(data)||m.chatPromptSha256!=='18ec22841a2ed28356a8092fdd9fd59c5ebd86641b9c536b4f4e89f0bffe1dde')throw Error('Precomputed text identity/shape/hash refused');
 for(const v of data)if((v&0x7c00)===0x7c00)throw Error('Precomputed text nonfinite');
 return {data:data.slice(),sequence:m.sequence,tokenCount:m.tokenCount,promptSha256:m.promptSha256,chatPromptSha256:m.chatPromptSha256};
}
