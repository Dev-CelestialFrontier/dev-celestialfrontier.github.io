/** Native ORT 1.29 Chrome-trace profiling, NOT env.webgpu.profiling.ondata (JSEP).
 * Official commit 2e2543fbe9fae542f921d47a72d21d5a4ef0b710:
 * https://github.com/microsoft/onnxruntime/blob/2e2543fbe9fae542f921d47a72d21d5a4ef0b710/onnxruntime/core/common/profiler.cc#L127-L160
 * https://github.com/microsoft/onnxruntime/blob/2e2543fbe9fae542f921d47a72d21d5a4ef0b710/onnxruntime/core/common/profiler.h#L146-L152
 * https://github.com/microsoft/onnxruntime/blob/2e2543fbe9fae542f921d47a72d21d5a4ef0b710/onnxruntime/core/providers/webgpu/webgpu_context.cc#L881-L892
 * Native stdout emits a complete JSON array. Native GPU ts/dur are MICROSECONDS.
 * Node spans include host scheduling/submission/waits; they are not GPU durations.
 * Sums may overlap and must never be combined across these two timing domains.
 * The raw trace is bounded and retained; aggregate counts cannot prove completeness.
 */
export const EXPECTED_ORT_VERSION='1.29.0';
export const NATIVE_PROFILE_SCHEMA='cf.ort-native-profile/v1';
export const MAX_PROFILE_BYTES=32*1024*1024;
export const MAX_PROFILE_EVENTS=100_000;
export const MAX_PROFILE_GROUPS=2048;
export const MAX_PROFILE_EXAMPLES=3;
const utf8=new TextEncoder();
const integer=(x,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(x)&&x>=min&&x<=max;
const bounded=(x,max,name)=>{if(!integer(x,1,max))throw Error('Invalid '+name);return x;};
const label=x=>typeof x==='string'&&x.length>0&&x.length<=8192&&!/[\u0000-\u001f]/.test(x);
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
// Native PendingKernelInfo is StrJoin({NodeName, OpType, program.Name}, "&"):
// https://github.com/microsoft/onnxruntime/blob/2e2543fbe9fae542f921d47a72d21d5a4ef0b710/onnxruntime/core/providers/webgpu/webgpu_context.h#L34-L42
// Do not make the unique graph node label a kernel aggregation key. This proof
// accepts the exact three-field contract; ambiguous/empty labels fail closed.
function nativeGpuName(name){
  const fields=name.split('&');
  if(fields.length!==3||!fields.every(label))throw Error('Invalid native GPU name: expected node&op&program');
  return {nodeName:fields[0],opType:fields[1],programName:fields[2]};
}
function limits(options={}) {
  if(options.ortVersion!==EXPECTED_ORT_VERSION)throw Error('Native profiling requires exact ORT '+EXPECTED_ORT_VERSION);
  return {maxBytes:bounded(options.maxBytes??MAX_PROFILE_BYTES,MAX_PROFILE_BYTES,'byte limit'),
    maxEvents:bounded(options.maxEvents??MAX_PROFILE_EVENTS,MAX_PROFILE_EVENTS,'event limit'),
    maxGroups:bounded(options.maxGroups??MAX_PROFILE_GROUPS,MAX_PROFILE_GROUPS,'group limit')};
}
export function parseNativeProfile(rawJson,options={}) {
  const cap=limits(options);
  if(typeof rawJson!=='string'||utf8.encode(rawJson).length>cap.maxBytes)throw Error('Native profile byte limit');
  let events;try{events=JSON.parse(rawJson);}catch{throw Error('Incomplete or malformed native profile JSON');}
  if(!Array.isArray(events)||!events.length)throw Error('Empty native profile');
  if(events.length>cap.maxEvents)throw Error('Native profile event limit');
  const nodes=new Map(),gpu=new Map(),categories={Session:0,Node:0,Kernel:0,Api:0};
  let groups=0,nodeCount=0,gpuCount=0,nodeDurationUs=0,gpuDurationUs=0;
  const aggregate=(map,key,fields,event)=>{
    if(!map.has(key)){if(++groups>cap.maxGroups)throw Error('Native profile group limit');map.set(key,{...fields,count:0,durationUs:0,maxDurationUs:0});}
    const row=map.get(key);row.count++;row.durationUs+=event.dur;row.maxDurationUs=Math.max(row.maxDurationUs,event.dur);
    if(!integer(row.durationUs))throw Error('Native profile aggregate overflow');
    return row;
  };
  for(const e of events){
    if(!object(e)||!Object.hasOwn(categories,e.cat)||e.ph!=='X'||!label(e.name)
      ||!integer(e.pid,-1)||!integer(e.tid,-1)||!integer(e.ts)||!integer(e.dur)||!integer(e.ts+e.dur)||!object(e.args))
      throw Error('Invalid native profile event');
    categories[e.cat]++;
    if(e.cat==='Api'){
      if(e.pid!==-1||e.tid!==-1||typeof e.args.cache_key!=='string'||!e.args.cache_key.length||!Object.hasOwn(e.args,'shapes'))
        throw Error('Invalid native GPU event metadata');
      const shapes=JSON.stringify(e.args.shapes);
      if(!shapes||shapes.length>8192)throw Error('Invalid native GPU shapes');
      const {opType,programName}=nativeGpuName(e.name);
      const row=aggregate(gpu,JSON.stringify([opType,programName,shapes]),{opType,programName,shapes:e.args.shapes,examples:[]},e);
      // First dispatch examples only: full labels/cache keys stay in the raw
      // trace for every dispatch, without an unbounded per-group node inventory.
      if(row.examples.length<MAX_PROFILE_EXAMPLES)row.examples.push({name:e.name,cacheKey:e.args.cache_key});
      gpuCount++;gpuDurationUs+=e.dur;
    }else if(e.cat==='Node'&&Object.hasOwn(e.args,'provider')){
      if(!label(e.args.provider)||!label(e.args.op_name))throw Error('Invalid native Node provider/op_name');
      aggregate(nodes,JSON.stringify([e.args.provider,e.args.op_name]),{provider:e.args.provider,opName:e.args.op_name},e);
      nodeCount++;nodeDurationUs+=e.dur;
    }else if(e.cat==='Node'&&e.name.endsWith('_kernel_time')){
      throw Error('Native kernel Node missing provider');
    }
  }
  if(!nodeCount||!gpuCount||!gpuDurationUs)throw Error('Native profile lacks observed Node/GPU timing; no zero-cost inference');
  if(!integer(nodeDurationUs)||!integer(gpuDurationUs))throw Error('Native profile total overflow');
  const sorted=map=>[...map.values()].sort((a,b)=>b.durationUs-a.durationUs||JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return {schema:NATIVE_PROFILE_SCHEMA,status:'COMPLETE',ortVersion:EXPECTED_ORT_VERSION,unit:'microseconds',
    rawBytes:utf8.encode(rawJson).length,eventCount:events.length,dropped:0,invalid:0,categories,
    nodeSpans:{count:nodeCount,durationUs:nodeDurationUs,groups:sorted(nodes),
      meaning:'Host-side Node intervals, separated by execution provider; not pure CPU compute or GPU hardware time.'},
    gpuDispatches:{count:gpuCount,durationUs:gpuDurationUs,groups:sorted(gpu),
      meaning:'Observed timestamp-query GPU intervals; do not add to Node spans or equate sum with wall-clock latency.'}};
}

// Install the worker console wrapper before ORT initializes/binds stdout. Start
// recording immediately before endProfiling. Success requires its actual closing
// array delimiter AND complete parse; idle/timeout/release never imply drainage.
export function createNativeProfileCapture(options={}) {
  const cap=limits(options);let state='idle',chunks=[],bytes=0,lines=0,error=null,summary=null,dropped=0,invalid=0;
  const fail=message=>{if(state!=='failed'){state='failed';error=String(message);invalid++;}return false;};
  return {
    get state(){return state;},
    begin(){if(state!=='idle')throw Error('Native profile capture already used');state='capturing';},
    fail,
    pushLine(line){
      if(state!=='capturing')return fail('Native stdout outside active capture');
      if(typeof line!=='string')return fail('Native stdout must be a single string');
      const chunk=line.endsWith('\n')?line:line+'\n',size=utf8.encode(chunk).length;
      if(bytes+size>cap.maxBytes||++lines>cap.maxEvents+2){dropped++;return fail('Native profile capture capacity exceeded');}
      chunks.push(chunk);bytes+=size;
      if(chunks.length===1&&!chunk.trimStart().startsWith('['))return fail('Native profile opening delimiter absent');
      if(chunk.trimEnd().endsWith(']')){
        try{summary=parseNativeProfile(chunks.join(''),options);state='complete';}catch(e){fail(e.message);}
      }
      return state==='complete';
    },
    finish(){if(state!=='complete')throw Error(error??'Incomplete native stdout profile');return this.snapshot();},
    snapshot(){return {state,error,rawJson:chunks.join(''),rawBytes:bytes,dropped,invalid,summary};},
  };
}

// Shared by the CLI and focused tests; importing this module never starts a run.
export function parseProofOptions(args){
  if(!Array.isArray(args)||!args.every(x=>typeof x==='string'))throw Error('Invalid proof arguments');
  const supported=new Set(['--without-reference','--identity-reference','--identity-only','--preflight','--profile','--resolution=1024x576','--q8-block32','--fixed-denoiser-shapes']);
  const flags=args.filter(x=>x.startsWith('--')),outputs=args.filter(x=>!x.startsWith('--'));
  if(outputs.length!==1||!outputs[0]||flags.some(x=>!supported.has(x))||new Set(flags).size!==flags.length)
    throw Error('Usage: run-browser-proof.mjs EVIDENCE_DIRECTORY [--without-reference | --identity-reference | --identity-only] [--preflight | --profile] [--resolution=1024x576] [--q8-block32] [--fixed-denoiser-shapes]');
  const has=x=>flags.includes(x);
  if(['--without-reference','--identity-reference','--identity-only'].filter(has).length>1)
    throw Error('Reference conditioning choices are mutually exclusive');
  if(has('--profile')&&has('--preflight'))throw Error('--profile requires inference; incompatible with --preflight');
  if(has('--q8-block32')&&has('--preflight'))throw Error('--q8-block32 requires verified inference; incompatible with --preflight');
  if(has('--fixed-denoiser-shapes')&&has('--preflight'))throw Error('--fixed-denoiser-shapes requires inference; incompatible with --preflight');
  return {output:outputs[0],referenceEnabled:!has('--without-reference'),identityReference:has('--identity-reference'),identityOnly:has('--identity-only'),
    preflight:has('--preflight'),profile:has('--profile'),q8Block32:has('--q8-block32'),fixedDenoiserShapes:has('--fixed-denoiser-shapes'),width:has('--resolution=1024x576')?1024:768,height:has('--resolution=1024x576')?576:432};
}
