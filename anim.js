/* animated media: still until hover; on leave freeze on the current frame, next hover resumes.
   GIFs: decoded with ImageDecoder and drawn to a canvas over the tile image.
   Fallback (no ImageDecoder): GIF plays in the <img>; on leave the current frame is snapshotted
   to the canvas (next hover restarts the GIF from frame 1). Videos: play()/pause(). */
(()=>{const d=document,HAS_DEC=typeof window.ImageDecoder==='function';
const mkCanvas=i=>{const c=d.createElement('canvas');c.className='anim-cv';c.setAttribute('aria-hidden','true');
 c.style.cssText='position:absolute;pointer-events:none;display:none;z-index:1';i.parentNode.insertBefore(c,i.nextSibling);return c};
const place=(i,c)=>{const w=i.clientWidth,h=i.clientHeight;if(!w||!h)return false;
 c.style.left=(i.offsetLeft+i.clientLeft)+'px';c.style.top=(i.offsetTop+i.clientTop)+'px';c.style.width=w+'px';c.style.height=h+'px';
 const r=i.getBoundingClientRect(),k=(r.width/(i.offsetWidth||1))*(window.devicePixelRatio||1),W=Math.round(w*k),H=Math.round(h*k);
 if(c.width!==W||c.height!==H){c.width=W;c.height=H}return true};
/* draw src (sw x sh) into canvas emulating object-fit:cover + the img's object-position */
const draw=(i,c,src,sw,sh,sx,sy)=>{if(!place(i,c)||!sw||!sh)return;const x=c.getContext('2d'),W=c.width,H=c.height,s=Math.max(W/sw,H/sh),dw=sw*s,dh=sh*s;
 const p=(getComputedStyle(i).objectPosition||'50% 50%').split(/\s+/),f=(v,free)=>v.endsWith('%')?parseFloat(v)/100*free:parseFloat(v)||free/2;
 c.style.filter=getComputedStyle(i).filter;x.clearRect(0,0,W,H);const dx=f(p[0]||'50%',W-dw),dy=f(p[1]||'50%',H-dh);if(sx==null)x.drawImage(src,dx,dy,dw,dh);else x.drawImage(src,sx,sy,sw,sh,dx,dy,dw,dh)};
const setupFallback=(i,still,anim,c,hovering)=>{let playing=false;new Image().src=anim;
 const on=()=>{playing=true;c.style.display='none';if(i.getAttribute('src')!==anim)i.src=anim},
  off=()=>{if(!playing)return;playing=false;let ok=false;
   try{draw(i,c,i,i.naturalWidth,i.naturalHeight);c.style.display='block';ok=true}catch(e){c.style.display='none'}
   if(ok)i.src=still}; /* snapshot failed: leave the GIF <img> showing as is */
 i.addEventListener('mouseenter',on);i.addEventListener('mouseleave',off);i.addEventListener('focus',on);i.addEventListener('blur',off);
 i._anim={canvas:c,get playing(){return playing},mode:'fallback'};if(hovering)on()};
const setupDec=(i,still,anim)=>{const c=mkCanvas(i);let dec=null,loading=null,n=0,idx=0,playing=false,hover=false,timer=0,last=null,lastW=0,lastH=0,dead=false;
 const fail=()=>{if(dead)return;dead=true;playing=false;clearTimeout(timer);c.style.display='none';
  i.removeEventListener('mouseenter',on);i.removeEventListener('mouseleave',off);i.removeEventListener('focus',on);i.removeEventListener('blur',off);
  try{dec&&dec.close()}catch(e){}setupFallback(i,still,anim,c,hover)};
 const load=()=>loading||(loading=fetch(anim).then(r=>{if(!r.ok)throw new Error('http '+r.status);return r.arrayBuffer()})
  .then(buf=>ImageDecoder.isTypeSupported?ImageDecoder.isTypeSupported('image/gif').then(ok=>{if(!ok)throw new Error('gif unsupported');return buf}):buf)
  .then(buf=>{dec=new ImageDecoder({data:buf,type:'image/gif'});return dec.tracks.ready}).then(()=>{n=dec.tracks.selectedTrack.frameCount||1;if(n<1)throw new Error('no frames')}));
 const show=async k=>{const r=await dec.decode({frameIndex:k});const v=r.image;const w=v.displayWidth,h=v.displayHeight;
  const bm=await createImageBitmap(v);const dur=(v.duration||40000)/1000;v.close();if(last)last.close();last=bm;lastW=w;lastH=h;draw(i,c,bm,w,h);c.style.display='block';return dur};
 const tick=async()=>{if(!playing||dead)return;const t0=performance.now();let dur;try{dur=await show(idx)}catch(e){fail();return}
  if(!playing)return;idx=(idx+1)%n;timer=setTimeout(tick,Math.max(10,(dur<=10?100:dur)-(performance.now()-t0)))};
 function on(){hover=true;if(playing||dead)return;playing=true;load().then(tick).catch(fail)}
 function off(){hover=false;playing=false;clearTimeout(timer)} /* canvas keeps showing the last drawn frame */
 i.addEventListener('mouseenter',on);i.addEventListener('mouseleave',off);i.addEventListener('focus',on);i.addEventListener('blur',off);
 new ResizeObserver(()=>{if(last&&!dead)draw(i,c,last,lastW,lastH)}).observe(i);
 i._anim={canvas:c,get frame(){return idx},get playing(){return playing},mode:'decoder'}};
/* sprite mode: frames pre-extracted from the GIF into one image (anim-frames.js). Plain <img>/script loads,
   so it works under file:// and http alike, with true pause/resume. */
const setupSprite=(i,still,anim,m)=>{const c=mkCanvas(i);let sheet=null,ready=null,idx=0,playing=false,timer=0,shown=false;
 const load=()=>ready||(ready=new Promise((res,rej)=>{const im=new Image();im.onload=()=>{sheet=im;res()};im.onerror=rej;im.src=m.sheet}));
 const paint=()=>{draw(i,c,sheet,m.fw,m.fh,(idx%m.cols)*m.fw,Math.floor(idx/m.cols)*m.fh);c.style.display='block';shown=true};
 const tick=()=>{if(!playing)return;paint();const dl=m.delays[idx]||100;idx=(idx+1)%m.n;timer=setTimeout(tick,dl<=10?100:dl)};
 const fail=()=>{playing=false;clearTimeout(timer);c.style.display='none';
  i.removeEventListener('mouseenter',on);i.removeEventListener('mouseleave',off);i.removeEventListener('focus',on);i.removeEventListener('blur',off);
  setupFallback(i,still,anim,c,hover)};
 let hover=false;
 function on(){hover=true;if(playing)return;playing=true;load().then(()=>{if(playing)tick()},fail)}
 function off(){hover=false;playing=false;clearTimeout(timer)} /* canvas keeps the frame it last painted */
 i.addEventListener('mouseenter',on);i.addEventListener('mouseleave',off);i.addEventListener('focus',on);i.addEventListener('blur',off);
 new ResizeObserver(()=>{if(shown&&sheet){const k=idx;idx=(idx-1+m.n)%m.n;paint();idx=k}}).observe(i);
 i._anim={canvas:c,get frame(){return idx},get playing(){return playing},mode:'sprite'};setTimeout(()=>load().catch(()=>{}),1200)};

const prep=()=>{d.querySelectorAll('img[data-anim]').forEach(i=>{if(i._anim)return;const still=i.getAttribute('src'),anim=i.dataset.anim;
  const m=(window.ANIM_FRAMES||{})[anim];if(m)setupSprite(i,still,anim,m);else if(HAS_DEC&&/^https?:$/.test(location.protocol))setupDec(i,still,anim);else setupFallback(i,still,anim,mkCanvas(i),false)});
 d.querySelectorAll('.grid video').forEach(v=>{v.muted=true;v.loop=true;v.playsInline=true;v.pause();
  v.addEventListener('mouseenter',()=>v.play().catch(()=>{}));v.addEventListener('mouseleave',()=>v.pause())})};
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',prep);else prep();
})();
