(()=>{
const d=document;
function run(t){
 let b=t.querySelector(':scope>.cs-band');
 if(!b){t.classList.add('cs-host');b=d.createElement('span');b.className='cs-band';b.setAttribute('aria-hidden','true');t.prepend(b)}
 t.classList.remove('cs-run');void t.offsetWidth;t.classList.add('cs-run');
 clearTimeout(t._cs);t._cs=setTimeout(()=>t.classList.remove('cs-run'),900);
}
function visible(t){const r=t.getBoundingClientRect(),vh=innerHeight;return r.top>=0&&r.bottom<=vh||(r.top<vh*.75&&r.bottom>vh*.25)}
function arm(t){
 if(t._csObs)t._csObs.disconnect();clearTimeout(t._csT);
 const start=performance.now();let last=null,stable=0;
 // invalid.js delays scroll ~300ms; wait until in view and scroll has settled
 const tick=()=>{const y=scrollY;stable=(y===last)?stable+1:0;last=y;
  const el=performance.now()-start;
  if((el>320&&visible(t)&&stable>=3)||el>2500){run(t);return}
  t._csT=requestAnimationFrame(tick)};
 if(visible(t)){run(t);return}
 t._csT=requestAnimationFrame(tick);
}
d.addEventListener('click',e=>{
 if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
 const u=new URL(a.getAttribute('href'),location.href);
 if(u.hash!=='#contact'||u.pathname!==location.pathname)return;
 const t=d.getElementById('contact');if(t){cancelAnimationFrame(t._csT);arm(t)}
});
})();
