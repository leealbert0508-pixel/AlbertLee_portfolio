(()=>{
const d=document,h=d.documentElement,W=window;
const RM=W.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const T={index:['PROFILE','プロフィール'],works:['WORKS','作品一覧']};
const ss={get(){try{return sessionStorage.getItem('pt')}catch(e){return null}},set(v){try{sessionStorage.setItem('pt',v)}catch(e){}},del(){try{sessionStorage.removeItem('pt')}catch(e){}}};
const keyOf=p=>{const m=/(?:^|\/)(index|works)(?:\.html)?$/.exec(p.replace(/\/$/,'/index.html'));return m?m[1]:null};
const flag=ss.get();
if(flag&&!RM)h.classList.add('pt-pre');
let el,busy=0,timers=[];
const later=(f,ms)=>timers.push(setTimeout(f,ms));
const clear=()=>{timers.forEach(clearTimeout);timers=[]};
function build(){
if(el&&el.isConnected)return el;
el=d.createElement('div');el.id='pt';el.setAttribute('aria-hidden','true');
el.innerHTML='<div class="p p1"></div><div class="p p2"></div><div class="p p3"></div><div class="hz"></div><div class="c c1"></div><div class="c c2"></div><div class="c c3"></div><div class="c c4"></div><div class="t"><b></b><i></i></div>';
(d.body||h).appendChild(el);return el;
}
function title(k){const t=T[k]||T.index;build();el.querySelector('b').textContent=t[0];el.querySelector('i').textContent=t[1]}
function hide(){clear();busy=0;h.classList.remove('pt-pre','pt-ready');if(el){el.className='';}}
function cover(k){
if(RM)return Promise.resolve();
title(k);clear();busy=1;el.className='on';void el.offsetWidth;el.classList.add('cov');
return new Promise(r=>later(r,420));
}
function reveal(){
if(RM){hide();return Promise.resolve()}
build();clear();busy=1;el.className='on full';h.classList.add('pt-ready');void el.offsetWidth;
return new Promise(r=>later(()=>{el.className='on rev';later(()=>{hide();r()},560)},260));
}
W.__pt={cover,reveal};
function onClick(e){
if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||busy)return;
const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
if((a.target&&a.target!=='_self')||a.hasAttribute('download'))return;
let u;try{u=new URL(a.href,location.href)}catch(x){return}
if(u.origin!==location.origin)return;
const k=keyOf(u.pathname);if(!k)return;
if(u.pathname===location.pathname&&u.search===location.search)return;
if(RM)return;
e.preventDefault();ss.set(k);
cover(k).then(()=>{location.href=u.href});
}
d.addEventListener('click',onClick);
d.addEventListener('DOMContentLoaded',()=>{
if(flag){ss.del();if(RM){hide();return}title(flag);el.className='on full';const F=d.fonts&&d.fonts.ready,to=ms=>new Promise(r=>setTimeout(r,ms)),I=[...d.querySelectorAll('.panel.on .grid img')].slice(0,3).map(i=>i.decode?i.decode().catch(()=>{}):Promise.resolve());Promise.all([Promise.race([F||Promise.resolve(),to(700)]),Promise.race([Promise.all(I),to(600)])]).then(()=>requestAnimationFrame(()=>reveal()))}
});
W.addEventListener('pageshow',e=>{if(e.persisted){ss.del();hide()}});
})();
