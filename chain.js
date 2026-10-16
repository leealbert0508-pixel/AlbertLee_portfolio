/* chain mode: right-click page toggles; constant conveyor speed, no mouse influence, top & bottom opposite */
(()=>{const d=document,h=d.documentElement;d.addEventListener('DOMContentLoaded',()=>{
h.classList.add(d.querySelector('main .top')?'pg-home':'pg-works');
let el=null;const pos=()=>{const hd=d.querySelector('header');if(!el)return;const sb=(hd?hd.getBoundingClientRect().bottom:60)+(h.classList.contains('pg-home')?6:9);let t=sb+10;
const pb=d.querySelector('.ptitle b');if(pb){const r=pb.getBoundingClientRect(),gt=r.top+(r.height-parseFloat(getComputedStyle(pb).fontSize)*.86)/2,th=el.offsetHeight||12;
if(r.right>innerWidth-14-el.offsetWidth&&t+th+3>gt)t=Math.max(sb+3,gt-th-3)}el.style.top=t+'px'};
const tag=s=>{if(!el){el=d.createElement('div');el.id='chon';el.setAttribute('aria-live','polite');el.innerHTML='<b>ON</b>';d.body.appendChild(el)}pos();el.classList.remove('in','out');void el.offsetWidth;el.classList.add(s?'in':'out')};
d.addEventListener('animationend',e=>{if(e.target===el&&e.animationName==='chout')el.classList.remove('out')});
addEventListener('resize',pos);addEventListener('scroll',pos,{passive:true});

let on=0,x=0,r=0,raf=0;const BASE=0.8;
const step=()=>{r+=((on?1:0)-r)*(on?0.06:0.05);x+=r*BASE;
h.style.setProperty('--cx',x.toFixed(2)+'px');h.style.setProperty('--cxb',(-x).toFixed(2)+'px');
if(on||r>.005)raf=requestAnimationFrame(step);else{raf=0;r=0}};
const kick=()=>{if(!raf)raf=requestAnimationFrame(step)};
d.addEventListener('contextmenu',e=>{e.preventDefault(); /* no browser menu anywhere */
if(e.target.closest('#lb,#mc,#pt')||d.querySelector('#lb.open'))return;
on=!on;h.classList.toggle('chain-on',!!on);tag(on);kick()});
})})();
