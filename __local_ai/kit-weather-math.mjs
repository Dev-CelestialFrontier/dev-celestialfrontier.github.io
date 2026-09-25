/** Recipe-seeded post-finisher pigment/weather compositor. No geometry, time or inference owner. */
export function readCompositorSystemCard(card){
 if(typeof card!=='string')throw Error('Weather system card missing');
 const light=[...card.matchAll(/^  Light: (.+)$/gm)],air=[...card.matchAll(/^  Atmosphere: (.+)$/gm)];
 if(light.length!==1||air.length!==1)throw Error('Weather system card ambiguity');
 const timeOfDay=light[0][1].split(';')[0],m=/weather ([^,;]+), water ([^;]+)/.exec(air[0][1]);
 if(!m||!['day','dusk','night'].includes(timeOfDay)||!light[0][1].includes('diffuse cloud-filtered light'))throw Error('Unsupported compositor light/card');
 return {weather:m[1],waterState:m[2],timeOfDay,light:light[0][1],lightFacing:'upward diffuse sky, no invented sun direction'};
}
function rng(seed){let a=seed>>>0;return ()=>{a=(a+0x6d2b79f5)>>>0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return ((t^(t>>>14))>>>0)/4294967296;};}
export function applyKitWeather(source,w,h,organisms,seed,systemCard,intensity={dropletCount:1,specularStrength:1,precipitationDensity:1}){
 if(Object.keys(intensity).sort().join(',')!=='dropletCount,precipitationDensity,specularStrength'||![1,2,3].includes(intensity.dropletCount)||![1,2,3].includes(intensity.specularStrength)||![1,2].includes(intensity.precipitationDensity))throw Error('Weather intensity refused');
 if(!(source instanceof Uint8ClampedArray)||source.length!==w*h*4||!Number.isSafeInteger(seed)||seed<0||seed>0xffffffff||organisms.some(o=>o.alpha.length!==w*h))throw Error('Weather input shape');
 const card=readCompositorSystemCard(systemCard),random=rng(seed^0x57585452),out=source.slice();
 const kind=/snow/.test(card.weather)?'snow':/dust|sand/.test(card.weather)?'dust':/rain|storm/.test(card.weather)?'rain':'none';
 const illumination=card.timeOfDay==='night'?.36:card.timeOfDay==='dusk'?.66:1;
 const wet=kind==='rain'&&card.waterState==='liquid';let wetPixels=0,droplets=0;const extraEdges=[];
 const blend=(x,y,colour,opacity)=>{if(x<0||y<0||x>=w||y>=h)return;const p=(y*w+x)*4;for(let c=0;c<3;c++)out[p+c]=Math.round(out[p+c]*(1-opacity)+colour[c]*opacity);};
 if(wet)for(const o of organisms){const fur=o.name==='Civet'||o.name==='Platypus',flora=['Persimmon',"Devil's Club",'Cranberry'].includes(o.name);if(!fur&&!flora)continue;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,p=i*4,a=o.alpha[i]/255;if(!a)continue;
   const [r,g,b]=source.subarray(p,p+3),leaf=flora&&g>r*.83&&g>b*1.12;if(!fur&&!leaf)continue;
   const luma=.2126*r+.7152*g+.0722*b,darken=fur?.24:.18,desaturate=.20;
   for(let c=0;c<3;c++)out[p+c]=Math.round(source[p+c]*(1-a)+((1-desaturate)*source[p+c]+desaturate*luma)*(1-darken)*a);
   wetPixels++;
   // Upward silhouette edges face the card's diffuse sky. Sparse glints, never an outline.
   if(a>.65&&(y===0||o.alpha[i-w]<48)){if(random()<.26){blend(x,y,[186,205,218],Math.min(1,.38*illumination*intensity.specularStrength));droplets++;}else extraEdges.push([x,y]);}
  }
 }
 const baseDroplets=droplets,extraRandom=rng(seed^0x44524f50);
 // Extra droplets use a separate stream; accepted rain positions and original glints stay fixed.
 for(let i=extraEdges.length-1;i>0;i--){const j=Math.floor(extraRandom()*(i+1));[extraEdges[i],extraEdges[j]]=[extraEdges[j],extraEdges[i]];}
 for(const [x,y]of extraEdges.slice(0,baseDroplets*(intensity.dropletCount-1))){blend(x,y,[186,205,218],Math.min(1,.38*illumination*intensity.specularStrength));droplets++;}
 const density=(kind==='rain'?.0018:kind==='snow'?.0013:kind==='dust'?.0015:0)*intensity.precipitationDensity,strokes=Math.round(w*h*density/intensity.precipitationDensity)*intensity.precipitationDensity;
 for(let i=0;i<strokes;i++){
  const x=Math.floor(random()*w),y=Math.floor(random()*h),length=kind==='rain'?8+Math.floor(random()*12):kind==='snow'?1+Math.floor(random()*3):4+Math.floor(random()*9);
  const colour=kind==='dust'?[169,151,120]:[192,211,225],opacity=(kind==='rain'?.12:kind==='snow'?.26:.10)*illumination*(.55+random()*.45);
  for(let k=0;k<length;k++){const dx=kind==='rain'?Math.floor(k*.24):kind==='dust'?k:Math.floor(k*.3),dy=kind==='dust'?Math.floor(k*.12):k;blend(x+dx,y+dy,colour,opacity*(1-Math.abs(k/length-.5)*.5));}
 }
 return {rgba:out,receipt:{schema:'cf.kit-compositor-weather.v1',seed,card,kind,wetPixels,droplets,precipitationStrokes:strokes,wholeFrameDensity:density,geometryChanged:false,stage:'after-finisher'}};
}
