/* no-repost: block right-click / image drag / copy / save shortcuts, show big side warnings */
(()=>{const d=document;let els,t1,t2,act=0; /* act: a warning is playing; further triggers ignored until it fully ends */
const T={ja:['禁止転載','無断転載・保存を禁止します'],en:['<span class="k">NO</span>REPOSTING','COPY / SAVE PROHIBITED']};
function show(){if(!els){els=['l','r'].map(c=>{const e=d.createElement('div');e.className='nr '+c;e.setAttribute('aria-hidden','true');d.body.appendChild(e);return e});els[0].setAttribute('role','alert');els[0].removeAttribute('aria-hidden')}
const s=T[d.documentElement.lang==='en'?'en':'ja'];
clearTimeout(t1);clearTimeout(t2);
els.forEach(e=>{e.innerHTML=s[0]+'<small>'+s[1]+'</small>';e.classList.remove('on','out','fx');void e.offsetWidth;e.classList.add('on')});
t1=setTimeout(()=>{els.forEach(e=>{e.classList.remove('on');e.classList.add('out')});t2=setTimeout(()=>{els.forEach(e=>e.classList.remove('out'));act=0;d.dispatchEvent(new CustomEvent('nr:end'))},230)},1600)}
const M='#lb img,#lb video';let over=0; /* lightbox-media-only */
const onMedia=t=>!!(t&&t.closest&&t.closest(M))&&!!d.querySelector('#lb.open');
d.addEventListener('pointerover',e=>{over=onMedia(e.target)});
d.addEventListener('pointerout',e=>{if(!e.relatedTarget||!onMedia(e.relatedTarget))over=0});
const hit=e=>{e.preventDefault();if(act)return;act=1;show();d.dispatchEvent(new CustomEvent('nr:warn'))};
d.addEventListener('contextmenu',e=>{if(onMedia(e.target))hit(e)});
d.addEventListener('dragstart',e=>{if(onMedia(e.target))hit(e)});
const ok=()=>over&&!!d.querySelector('#lb.open');
d.addEventListener('copy',e=>{if(ok())hit(e)});d.addEventListener('cut',e=>{if(ok())hit(e)});
d.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase();if((e.ctrlKey||e.metaKey)&&(k==='s'||k==='u'||k==='c')&&ok())hit(e)});
/* force-exit when lightbox closes */
function force(){act=0;if(!els||!els.some(e=>e.classList.contains('on')||e.classList.contains('out')))return;clearTimeout(t1);clearTimeout(t2);
els.forEach(e=>{e.classList.remove('on','out');void e.offsetWidth;e.classList.add('fx')});t2=setTimeout(()=>els.forEach(e=>e.classList.remove('fx')),260)}
const lb=d.getElementById('lb');if(lb)new MutationObserver(()=>{if(lb.classList.contains('closing')||!lb.classList.contains('open'))force()}).observe(lb,{attributes:true,attributeFilter:['class']});
})();
