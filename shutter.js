/* steel shutter: 5 anti-repost triggers in a row (<=3s apart) within one lightbox session */
(()=>{const d=document,h=d.documentElement,lb=d.getElementById('lb');if(!lb)return;
let n=0,last=0,busy=0;const N=5,GAP=3000;
const T={ja:['転載禁止','NO REPOSTING','SECURITY LOCK'],en:['NO REPOSTING','転載禁止','SECURITY LOCK']};
const block=e=>{if(busy){e.preventDefault();e.stopImmediatePropagation()}};
['keydown','click','contextmenu','mousedown','wheel','touchstart'].forEach(t=>addEventListener(t,block,{capture:true,passive:false}));
function shut(){busy=1;n=0;const s=T[h.lang==='en'?'en':'ja'];
const el=d.createElement('div');el.id='sh';el.setAttribute('role','alert');
el.innerHTML='<div class="door"><i class="slats"></i><i class="br a"></i><i class="br b"></i><i class="br c"></i><i class="br d"></i><span class="lb a">SECURITY LOCK</span><span class="lb b">ERR 05 // ACCESS DENIED</span><span class="vl">'+(h.lang==='en'?'転載禁止':'NO REPOSTING')+' // LOCKDOWN</span><div class="bar"></div></div>';
el.insertAdjacentHTML('beforeend','<i class="dust"></i>');d.body.appendChild(el);void el.offsetWidth;el.classList.add('down','roll');
setTimeout(()=>{h.classList.remove('sh-shake');void h.offsetWidth;h.classList.add('sh-shake');el.classList.add('hit')},450);
setTimeout(()=>{lb.classList.remove('open','closing');d.body.style.overflow=''},900); /* close underneath (observers force-exit warnings) */
setTimeout(()=>{el.classList.remove('down');el.classList.add('up')},1600);
setTimeout(()=>{el.remove();h.classList.remove('sh-shake');busy=0},2250)}
d.addEventListener('nr:warn',()=>{if(busy||!lb.classList.contains('open')||lb.classList.contains('closing'))return;
const t=performance.now();n=(last&&t-last<=GAP)?n+1:1;last=0;if(n>=N)shut()});
/* 3s gap measured from the END of the previous warning (warning itself lasts ~1.83s) */
d.addEventListener('nr:end',()=>{if(n)last=performance.now()});
new MutationObserver(()=>{if(!lb.classList.contains('open')){n=0;last=0}}).observe(lb,{attributes:true,attributeFilter:['class']});
})();
