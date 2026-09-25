/** In-worker expansion from pinned parent ranges. No OPFS, cache, installer,
 * delivery tier or readiness marker. Derived arrays exist only for this engine. */
const PLAN_SHA='26263980f6dce7f3578a904aa9fe64649530e43797bfc94a0ddb8b2a3aaace81';
const hex=b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join('');
export async function sha256(bytes){return hex(await crypto.subtle.digest('SHA-256',bytes));}
export function expandOperandRange(source,width){
  if(!(source instanceof Uint8Array)||![1,2].includes(width)||source.length%width||source.length>64*1024*1024)throw Error('Expansion range refused');
  const out=new Uint8Array(source.length*4);
  for(let i=0;i<source.length;i+=width)for(let copy=0;copy<4;copy++)for(let b=0;b<width;b++)out[i*4+copy*width+b]=source[i+b];
  return out;
}
export function patchGraph(source,patches,bytes){
  let previous=0,predicted=source.length;
  if(!(source instanceof Uint8Array)||source.length>8*1024*1024||!Number.isSafeInteger(bytes)||bytes<1||bytes>8*1024*1024||!Array.isArray(patches)||patches.length>512)throw Error('Graph patch bounds');
  for(const p of patches){
    if(!Number.isSafeInteger(p.offset)||!Number.isSafeInteger(p.remove)||p.remove<0||p.offset<previous||p.offset+p.remove>source.length||typeof p.hex!=='string'||p.hex.length%2||!/^[a-f0-9]*$/.test(p.hex))throw Error('Graph patch refused');
    previous=p.offset+p.remove;predicted+=p.hex.length/2-p.remove;
  }
  if(predicted!==bytes)throw Error('Graph patch size mismatch');
  const result=new Uint8Array(bytes);let from=0,to=0;
  for(const p of patches){result.set(source.subarray(from,p.offset),to);to+=p.offset-from;for(let i=0;i<p.hex.length;i+=2)result[to++]=parseInt(p.hex.slice(i,i+2),16);from=p.offset+p.remove;}
  result.set(source.subarray(from),to);return result;
}
export async function expandPinnedTransformer(fetcher=fetch,onProgress=()=>{},planUrl='/browser-variant-plan.json'){
  const response=await fetcher(planUrl);if(!response.ok)throw Error('Expansion plan unavailable');
  const planBytes=await response.arrayBuffer();if(planBytes.byteLength!==142918||await sha256(planBytes)!==PLAN_SHA)throw Error('Expansion plan SHA mismatch');
  const plan=JSON.parse(new TextDecoder().decode(planBytes));
  const originalResponse=await fetcher('/model/'+plan.parent.graph.path);if(!originalResponse.ok)throw Error('Parent graph unavailable');
  const original=new Uint8Array(await originalResponse.arrayBuffer());
  if(original.length!==plan.parent.graph.bytes||await sha256(original)!==plan.parent.graph.sha256)throw Error('Parent graph SHA mismatch');
  const graph=patchGraph(original,plan.patches,plan.files[0].bytes);
  if(await sha256(graph)!==plan.files[0].sha256)throw Error('Expanded graph SHA mismatch');
  const data=new Uint8Array(plan.files[1].bytes);let at=0,sourceBytes=0;
  for(const [i,row]of plan.ranges.entries()){
    if(row.outputOffset!==at)throw Error('Expansion output gap or overlap');
    const r=await fetcher('/model/'+row.source,{headers:{Range:`bytes=${row.offset}-${row.offset+row.length-1}`}});
    if(r.status!==206||r.headers.get('content-range')!==`bytes ${row.offset}-${row.offset+row.length-1}/${plan.parent.shards.find(s=>s.path===row.source).bytes}`)throw Error('Exact parent range required');
    const source=new Uint8Array(await r.arrayBuffer());if(source.length!==row.length)throw Error('Short parent range');
    const expanded=expandOperandRange(source,row.width);data.set(expanded,at);at+=expanded.length;sourceBytes+=source.length;
    onProgress({phase:'expansion',completed:i+1,total:plan.ranges.length,sourceBytes,expandedBytes:at});
  }
  if(at!==data.length||await sha256(data)!==plan.files[1].sha256)throw Error('Expanded operands SHA mismatch');
  return {graph,data,receipt:{planSha256:PLAN_SHA,sourceBytes,expandedBytes:data.length,graphSha256:plan.files[0].sha256,operandsSha256:plan.files[1].sha256,storageWrites:0}};
}
