/* works grid: placeholder until each tile image is ready, then fade in; after the page has loaded,
   warm the hidden tabs' tile thumbnails so switching tabs is instant. */
(()=>{const d=document;
const mark=i=>{if(i.classList.contains('gl-done'))return;
 if(i.complete&&i.naturalWidth){i.classList.add('gl-done');return}
 const fin=()=>{i.classList.add('gl-done','gl-in');setTimeout(()=>i.classList.remove('gl-in'),500)};
 i.addEventListener('load',fin,{once:true});i.addEventListener('error',()=>i.classList.add('gl-done'),{once:true})};
const init=()=>d.querySelectorAll('.grid img').forEach(mark);
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
const warm=()=>{const seen=new Set();d.querySelectorAll('.panel:not(.on) .grid img[src]').forEach(i=>{const u=i.getAttribute('src');if(seen.has(u)||i.complete)return;seen.add(u);const im=new Image();im.decoding='async';im.src=u})};
addEventListener('load',()=>(window.requestIdleCallback||setTimeout)(warm,{timeout:800}));
})();
