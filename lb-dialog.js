/* lb-dialog: shows work info (from figure data-* attrs) under lightbox image */
(()=>{const d=document,lb=d.getElementById('lb');if(!lb)return;
const CAT={work:['仕事','WORK'],practice:['練習','PRACTICE'],fanart:['ファンアート','FAN ART']};
const vn=d.createElement('div');vn.className='vn';vn.innerHTML='<h4></h4><p class="q"></p><p class="meta"></p><span class="nx">▼</span>';lb.appendChild(vn);

const img=lb.querySelector('img');let cur=null;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function fill(){if(!cur)return;const f=cur.closest('figure'),en=d.documentElement.lang==='en',k=en?'en':'ja',ds=f?f.dataset:{};
const p=f&&f.closest('.panel'),c=CAT[p&&p.id]||['',''];
const ph=v=>'<i class="ph">'+v+'</i>';
const title=ds['title'+(en?'En':'Ja')],year=ds.year,role=ds['role'+(en?'En':'Ja')],note=ds['note'+(en?'En':'Ja')];
const cap=f&&f.querySelector('figcaption');
vn.querySelector('h4').innerHTML=esc(en?c[1]:c[0])+'<small>'+esc(cap?cap.textContent:'')+'</small>';
vn.querySelector('.q').innerHTML=title?esc(title):ph(en?'Untitled (placeholder)':'タイトル未設定（仮）');
const L=en?{y:'YEAR',r:'ROLE',n:'NOTE',a:'ALT',u:'TBD'}:{y:'年',r:'担当',n:'備考',a:'ALT',u:'未設定'};
const pid=p&&p.id;if(pid==='practice'||pid==='fanart'){const work=ds['work'+(en?'En':'Ja')];const W=en?'WORK':'作品名';const nn=v=>v?esc(v):ph('none');
vn.querySelector('.meta').innerHTML='<span><b>'+L.y+'</b>'+(year?esc(year):ph(L.u))+'</span><span><b>'+W+'</b>'+(work?esc(work):ph(L.u))+'</span><span><b>'+L.n+'</b>'+nn(note)+'</span><span><b>'+L.a+'</b>'+nn(ds.alt)+'</span>';}else vn.querySelector('.meta').innerHTML='<span><b>'+L.y+'</b>'+(year?esc(year):ph(L.u))+'</span><span><b>'+L.r+'</b>'+(role?esc(role):ph(L.u))+'</span><span><b>'+L.n+'</b>'+(note?esc(note):ph(L.u))+'</span><span><b>'+L.a+'</b>'+esc(cur.alt||'')+'</span>';}
function size(){const h=vn.offsetHeight+64;lb.style.paddingBottom=h+'px';img.style.maxHeight='calc(100vh - '+(h+50)+'px)'}
let ty=0,tt=0;
d.querySelectorAll('.grid img').forEach(i=>i.addEventListener('click',()=>{cur=i;fill();vn.classList.add('on');requestAnimationFrame(size);
vn.classList.remove('enter');void vn.offsetWidth;vn.classList.add('enter'); /* replay slide-in */
const q=vn.querySelector('.q'),html=q.innerHTML,txt=q.textContent;clearTimeout(tt);clearInterval(ty);q.textContent='';
tt=setTimeout(()=>{if(vn.classList.contains('p2'))return;let n=0;ty=setInterval(()=>{if(vn.classList.contains('p2')){clearInterval(ty);return}q.textContent=txt.slice(0,++n);if(n>=txt.length){clearInterval(ty);q.innerHTML=html}},24)},580)}));
vn.addEventListener('animationend',e=>{if(e.target===vn&&e.animationName==='vnin')vn.classList.remove('enter')});
const hide=()=>{vn.classList.remove('on');lb.style.paddingBottom='';img.style.maxHeight=''};
new MutationObserver(()=>{if(!lb.classList.contains('open'))hide()}).observe(lb,{attributes:true,attributeFilter:['class']});
new MutationObserver(()=>{if(vn.classList.contains('on')){fill();size()}}).observe(d.documentElement,{attributes:true,attributeFilter:['lang']});
addEventListener('resize',()=>{if(vn.classList.contains('on'))size()});
})();
(()=>{const lb=document.getElementById('lb');if(!lb)return;const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;let busy=0,pass=0;
const LINE={ja:'すべての素材の外部サイトへの転載を禁止します。',en:'Reposting any material to external sites is prohibited.'};let tw=0;
const vnEl=()=>lb.querySelector('.vn');
const type=()=>{const v=vnEl(),q=v.querySelector('.q'),t=LINE[document.documentElement.lang==='en'?'en':'ja'];clearInterval(tw);let n=0;q.textContent='';tw=setInterval(()=>{q.textContent=t.slice(0,++n);if(n>=t.length)clearInterval(tw)},28)};
document.querySelectorAll('.grid img').forEach(i=>i.addEventListener('click',()=>{clearInterval(tw);const v=vnEl();if(v){v.classList.remove('p2');v.style.height=''}}));
new MutationObserver(()=>{const v=vnEl();if(v&&v.classList.contains('p2'))setTimeout(type)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
const toP2=()=>{const v=vnEl();if(!v||v.classList.contains('p2'))return;v.style.height=v.getBoundingClientRect().height+'px';v.classList.add('p2');type()};
document.addEventListener('nr:warn',()=>{if(lb.classList.contains('open')&&!lb.classList.contains('closing'))toP2()}); /* warning -> page 2 */
lb.addEventListener('click',e=>{if(pass||!lb.classList.contains('open'))return;const v=vnEl();
const inVn=v&&v.contains(e.target); /* outside click: close immediately */
if(busy){e.stopImmediatePropagation();return}
if(inVn&&!v.classList.contains('p2')){e.stopImmediatePropagation();toP2();return}
if(RM)return;
e.stopImmediatePropagation();busy=1;lb.classList.add('closing');
setTimeout(()=>{lb.classList.remove('closing');busy=0;pass=1;lb.click();pass=0},320)},true);
})();
