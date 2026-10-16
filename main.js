(()=>{
const d=document,h=d.documentElement;
let L=localStorage.getItem('lang');if(L!=='en'&&L!=='ja')L='ja';
h.lang=L;
d.addEventListener('DOMContentLoaded',()=>{
const b=d.getElementById('lang');
const set=l=>{L=l;h.lang=l;localStorage.setItem('lang',l);if(b)b.textContent=l==='ja'?'EN':'JA'};
set(L);
b&&b.addEventListener('click',()=>set(L==='ja'?'en':'ja'));
d.querySelectorAll('.tabs button[data-t]').forEach(t=>t.addEventListener('click',()=>{
d.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===t));
d.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id===t.dataset.t));
}));
const lb=d.getElementById('lb');if(!lb)return;
const li=lb.querySelector('img');
const close=()=>{lb.classList.remove('open');d.body.style.overflow=''};
d.querySelectorAll('.grid img').forEach(i=>i.addEventListener('click',()=>{li.src=i.dataset.anim||i.currentSrc||i.src;li.alt=i.alt;lb.classList.add('open');d.body.style.overflow='hidden'}));
lb.addEventListener('click',close);
const x=d.createElement('button');x.type='button';x.className='lbx';x.textContent='✕ ESC';x.setAttribute('aria-label','Close');lb.appendChild(x);
d.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
});
})();
