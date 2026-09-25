/** Shipped worker: kit compositor/finisher only. Legacy scene diagnostics are not reachable. */
import * as ort from './node_modules/onnxruntime-web/dist/ort.webgpu.min.mjs';
import {Tokenizer} from './node_modules/@huggingface/tokenizers/dist/tokenizers.mjs';
import {admitCreatureFinishJob} from './creature-finish-math.mjs';
import {admitKitEngineJob} from './kit-engine-math.mjs';
import {createKitWorkerEngine} from './kit-worker-engine.mjs';
let engine=null,busy=false;
onmessage=async({data:job})=>{
 if(busy||!['kit-v4','creature-finish-v1'].includes(job?.stage)){postMessage({type:'error',requestId:job?.requestId,message:'Only one kit landing at a time is supported'});return;}
 busy=true;
 try{
  const creature=job.stage==='creature-finish-v1';
  (creature?admitCreatureFinishJob:admitKitEngineJob)(job.recipe);
  engine??=await createKitWorkerEngine({ort,Tokenizer,modelFiles:job.modelFiles,progress:event=>postMessage({type:'progress',...event})});
  const result=await (creature?engine.finishCreature(job.recipe):engine.paint(job.recipe));postMessage({type:'complete',requestId:job.requestId,...result});
 }catch(error){postMessage({type:'error',requestId:job.requestId,message:String(error.stack??error)});try{await engine?.dispose();}finally{engine=null;}}
 finally{busy=false;}
};
