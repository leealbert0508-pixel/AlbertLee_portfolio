(()=>{
const d=document,h=d.documentElement;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const M={A:'AΑАΛ4',B:'BΒВß8',C:'CСϹ(',E:'EΕЕΣ3',H:'HΗНΉ#',I:'IΙІ1|',K:'KΚКκ',M:'MΜМ',N:'NΝИП',O:'OΟО0Ø',P:'PΡРῬ',R:'RЯΓ',S:'SЅ5$',T:'TΤТ7',X:'XΧХ×',Y:'YΥУ¥',a:'aаα@',c:'cсϲ',e:'eеε€',i:'iіι!',o:'oоο0',p:'pрρ',s:'sѕ5',u:'uυц',x:'xхχ',y:'yуγ',
'カ':'カ力ヵガ','エ':'エ工ェ','ロ':'ロ口□','ニ':'ニ二ﾆ','ハ':'ハ八ﾊ','ト':'トﾄ卜','タ':'タ夕ﾀ','ヘ':'ヘへ','リ':'リりﾘ','メ':'メ乂ﾒ','チ':'チ千ﾁ','ー':'ー一—'};
const SYM='#%&*/\\<>[]{}=+?!$@¦▚▞░▒█◢◣◤◥△',JP='カ力エ工ロ口ニ二ハ八タ夕ト卜チ千ヘへ';
const rnd=s=>s[Math.random()*s.length|0];
const junk=c=>{if(/\s/.test(c))return c;const m=M[c]||M[c.toUpperCase()];
 if(m&&Math.random()<.65)return rnd(m);return /[\u3000-\u9fff\uff00-\uffef]/.test(c)?(Math.random()<.6?rnd(JP):rnd(SYM)):rnd(SYM)};
let run=null;
function stop(){if(!run)return;cancelAnimationFrame(run.raf);run.items.forEach(([n,t])=>n.nodeValue=t);run.els.forEach(e=>e.classList.remove('gl-run'));(run.bars||[]).forEach(e=>e.classList.remove('gl-bar'));run=null}
function go(l){
 stop();const vh=innerHeight,items=[],els=[];
 const list=l==='*'?d.querySelectorAll('body h1,body h2,body h3,body h4,body p,body a,body time,body b,body li,body figcaption,body small,body span,body button,body .ghost,body .ptitle'):d.querySelectorAll('[data-l="'+l+'"]');
 list.forEach(e=>{if(e.closest('#pt,#lb,#mc,.nr,script,style'))return;
  if(e.closest('#lang')||!e.getClientRects().length)return;const r=e.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;
  const w=d.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n,any=0;
  while(n=w.nextNode()){if(!n.nodeValue.trim())continue;if(items.some(x=>x[0]===n))continue;items.push([n,n.nodeValue]);any=1}
  if(any)els.push(e)});
 if(!items.length)return;
 els.forEach(e=>e.classList.add('gl-run'));
 /* locked rows: placeholder bars flicker/wipe in with the glitch */
 const bars=[...d.querySelectorAll('.e.locked .rd i')].filter(b=>{const r=b.getBoundingClientRect();return r.height&&r.bottom>0&&r.top<vh});bars.forEach(b=>b.classList.add('gl-bar'));
 const D=520,t0=performance.now();let last=0;run={items,els,bars,raf:0};
 const f=now=>{const p=Math.min(1,(now-t0)/D);
  if(p<1&&now-last<40){run.raf=requestAnimationFrame(f);return}last=now;
  items.forEach(([n,t])=>{const k=Math.floor(t.length*Math.max(0,(p-.15)/.85));let s=t.slice(0,k);for(let i=k;i<t.length;i++)s+=junk(t[i]);n.nodeValue=s});
  if(p<1)run.raf=requestAnimationFrame(f);else stop()};
 f(t0+40);
}
d.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#lang');if(!b)return;
 requestAnimationFrame(()=>go(h.lang==='en'?'en':'ja'))});
const boot=()=>{const pre=h.classList.contains('pt-pre');if(pre)return;const F=d.fonts&&d.fonts.ready||Promise.resolve();Promise.race([F,new Promise(r=>setTimeout(r,700))]).then(()=>setTimeout(()=>requestAnimationFrame(()=>go('*')),pre?280:0))};
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',boot);else boot();
})();
