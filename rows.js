/* works: wheel pages rows of 3 when a category has more than 6 items (desktop >=700px). Narrow screens keep normal scrolling. */
(()=>{const d=document,h=d.documentElement;if(!d.querySelector('.panel .grid'))return;
const COLS=3,VIS=2,DUR=600,QUIET=220;let row=0,lock=0,acc=0,lastWheel=0,timer=0;
const wide=()=>innerWidth>=700;
const panel=()=>d.querySelector('.panel.on');
const tiles=g=>[...g.children].filter(e=>e.matches('figure'));
function info(){const p=panel(),g=p&&p.querySelector('.grid');if(!g)return null;const n=tiles(g).length,rows=Math.ceil(n/COLS);return{p,g,n,rows,max:Math.max(0,rows-VIS)}}
function unwrap(g){const vp=g.parentElement;if(!vp||!vp.classList.contains('rows-vp'))return;const w=vp.parentElement;w.replaceWith(g);g.style.transform=''}
function wrap(g){if(g.parentElement.classList.contains('rows-vp'))return g.parentElement;const w=d.createElement('div');w.className='rows-wrap';const vp=d.createElement('div');vp.className='rows-vp';const ind=d.createElement('div');ind.className='rows-ind';ind.setAttribute('aria-hidden','true');
g.replaceWith(w);vp.appendChild(g);w.appendChild(vp);w.appendChild(ind);return vp}
function step(g){const t=tiles(g);if(t.length<=COLS)return 0;return t[COLS].offsetTop-t[0].offsetTop}
function render(snap){const I=info();d.querySelectorAll('.panel .grid').forEach(g=>{if(!I||g!==I.g)unwrap(g)});
if(!I||!wide()||I.rows<=VIS){if(I)unwrap(I.g);h.classList.remove('rows-lock');row=0;return}
const vp=wrap(I.g),t=tiles(I.g);row=Math.min(row,I.max);h.classList.add('rows-lock');
const s=step(I.g),rh=t[0].offsetHeight;vp.style.height=(rh+s*(VIS-1)+16)+'px';
if(snap){vp.classList.add('rows-snap');void vp.offsetWidth}
I.g.style.transform='translateY('+(-row*s)+'px)';
if(snap)requestAnimationFrame(()=>vp.classList.remove('rows-snap'));
const ind=vp.parentElement.querySelector('.rows-ind');ind.innerHTML=Array.from({length:I.max+1},(_,k)=>'<i'+(k===row?' class="on"':'')+'></i>').join('');
t.forEach((f,k)=>{const r=Math.floor(k/COLS),vis=r>=row&&r<row+VIS;f.inert=!vis;f.setAttribute('aria-hidden',vis?'false':'true')})}
function go(dir){const I=info();if(!I||!wide()||I.rows<=VIS)return false;const n=Math.max(0,Math.min(I.max,row+dir));if(n===row)return false;row=n;render(false);const until=performance.now()+DUR;lock=1;clearInterval(timer);timer=setInterval(()=>{const t=performance.now();if(t>until&&t-lastWheel>QUIET){lock=0;clearInterval(timer)}},50);return true}
const blocked=e=>d.querySelector('#lb.open,#mc.on,.door')||e.ctrlKey;
addEventListener('wheel',e=>{const I=info();if(!I||!wide()||I.rows<=VIS)return;e.preventDefault();if(blocked(e))return;
const now=performance.now(),gap=now-lastWheel;lastWheel=now;
if(lock){acc=0;return} /* swallow trackpad/inertia burst during the slide */
if(gap>QUIET)acc=0;acc+=e.deltaMode===1?e.deltaY*16:e.deltaY;
if(Math.abs(acc)>=30){const dir=acc>0?1:-1;acc=0;go(dir)}},{passive:false});
addEventListener('keydown',e=>{if(blocked(e)||lock)return;if(e.key==='PageDown'||e.key==='ArrowDown'){const I=info();if(I&&wide()&&I.rows>VIS){e.preventDefault();go(1)}}else if(e.key==='PageUp'||e.key==='ArrowUp'){const I=info();if(I&&wide()&&I.rows>VIS){e.preventDefault();go(-1)}}});
d.addEventListener('click',e=>{if(e.target.closest('.tabs button[data-t]')){row=0;setTimeout(()=>render(true))}});
addEventListener('resize',()=>render(true));
new MutationObserver(ms=>{if(ms.some(m=>m.target.classList&&m.target.classList.contains('grid')))render(true)}).observe(d.querySelector('main')||d.body,{childList:true,subtree:true});
const init=()=>render(true);if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
addEventListener('load',init);
})();
