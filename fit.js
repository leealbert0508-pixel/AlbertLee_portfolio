/* home (desktop >=800px): scale the main block (title row + panels) to fit between header and footer, centered. Uses CSS zoom (crisp text, real layout). */
(()=>{const d=document,h=d.documentElement;let raf=0;
const CAP=1.7,BASEW=1120,PAD=20;
function fit(){raf=0;const m=d.querySelector('main.dossier');if(!m)return;const kids=[...m.children];
if(innerWidth<800){h.classList.remove('fit-on');m.style.removeProperty('max-width');m.style.removeProperty('padding');kids.forEach(k=>k.style.removeProperty('zoom'));return}
h.classList.add('fit-on');kids.forEach(k=>k.style.zoom=1);m.style.maxWidth=BASEW+'px';m.style.padding='0 '+PAD+'px';
const A=m.clientHeight;let H=0;kids.forEach(k=>{const cs=getComputedStyle(k);H+=k.offsetHeight+parseFloat(cs.marginTop)+parseFloat(cs.marginBottom)});
if(!A||!H)return;
const s=Math.max(.5,Math.min(CAP,(A-8)/H,innerWidth*.70/(BASEW-2*PAD)));
m.style.maxWidth=(BASEW*s)+'px';m.style.padding='0 '+(PAD*s)+'px';kids.forEach(k=>k.style.zoom=s);h.style.setProperty('--fit',s.toFixed(3))}
const q=()=>{if(!raf)raf=requestAnimationFrame(fit)};
addEventListener('resize',q);addEventListener('load',q);d.addEventListener('DOMContentLoaded',q);if(d.fonts)d.fonts.ready.then(q);
new MutationObserver(q).observe(h,{attributes:true,attributeFilter:['lang']});
})();
