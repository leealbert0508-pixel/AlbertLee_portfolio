/* contact: visual-novel dialog with choices (variant B) */
(()=>{const d=document,h=d.documentElement,V='B';let m,href,tw,pg=0;
const T=()=>h.lang==='en'?{nm:'ALBERT LEE',sub:'CONTACT',l1:'Thank you for reaching out about work.',l2:'Open your email app to send a message?',op:'Open email app',cp:'Copy address',cn:'Cancel',done:'Copied.'}
 :{nm:'李炳均',sub:'CONTACT',l1:'お仕事のご依頼、ありがとうございます。',l2:'メールアプリを開きますか？',op:'メールアプリで送る',cp:'アドレスをコピー',cn:'キャンセル',done:'コピーしました。'};
function type(el,s,cb){clearInterval(tw);let n=0;el.textContent='';tw=setInterval(()=>{el.textContent=s.slice(0,++n);if(n>=s.length){clearInterval(tw);cb&&cb()}},30)}
function ch(t){return '<div class="ch"><button data-a="op"><i>01</i>'+t.op+'</button><button data-a="cp"><i>02</i>'+t.cp+'</button><button data-a="cn"><i>03</i>'+t.cn+'</button></div>'}
function build(){const t=T(),a=href.replace(/^mailto:/,'');m=d.createElement('div');m.id='mc';m.className='v'+V;m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
let x='';
if(V==='A')x='<div class="vn"><h4>CONTACT</h4><p class="q"></p><p class="addr">'+a+'</p><div class="row"><button data-a="cn">'+t.cn+'</button><button data-a="op" class="y">'+t.op+'</button></div><span class="cnx">▼</span></div>';
if(V==='B')x=ch(t)+'<div class="vn"><h4>CONTACT</h4><p class="q"></p><p class="addr">'+a+'</p><span class="cnx">▼</span></div>';
if(V==='C')x='<div class="vn"><h4>CONTACT</h4><p class="pgn">1 / 2</p><p class="q"></p><p class="addr">'+a+'</p><div class="row"><button data-a="cn">'+t.cn+'</button><button data-a="op" class="y">'+t.op+'</button></div><span class="cnx">▼</span></div>';
if(V==='D')x='<div class="side"><b>'+t.nm+'</b><span>'+t.sub+' // FILE No.05</span><i class="sil"></i></div><div class="vn"><h4>'+t.nm+'<small>'+t.sub+'</small></h4><p class="q"></p><p class="addr">'+a+'</p>'+ch(t)+'<span class="cnx">▼</span></div>';
if(V==='E')x='<div class="ghost">CONTACT</div><i class="cbr ka"></i><i class="cbr kb"></i><i class="cbr kc"></i><i class="cbr kd"></i><span class="vl">'+t.sub+' // FILE No.05</span><div class="vn"><h4>'+t.nm+'</h4><p class="q"></p><p class="addr">'+a+'</p>'+ch(t)+'<span class="cnx">▼</span></div>';
m.innerHTML=x;d.body.appendChild(m);
const bs=[...m.querySelectorAll('.ch button')],hl=b=>bs.forEach(x=>x.classList.toggle('hl',x===b));hl(null);
bs.forEach(b=>{b.addEventListener('mouseenter',()=>hl(b));b.addEventListener('focus',()=>{if(b.matches(':focus-visible'))hl(b)})});
m.querySelector('.ch').addEventListener('mouseleave',()=>hl(null)); /* mouse-out: all black */
m.kb=e=>{if(!m.classList.contains('on'))return;const nav=e.key==='ArrowDown'||e.key==='ArrowUp'||(e.key==='Tab'&&!m.contains(d.activeElement));if(!nav)return;e.preventDefault();const i=bs.findIndex(x=>x.classList.contains('hl'));const n=i<0?(e.key==='ArrowUp'?bs[bs.length-1]:bs[0]):bs[(i+(e.key==='ArrowUp'?bs.length-1:1))%bs.length];n.focus({preventScroll:true});hl(n)};
m.addEventListener('click',e=>{const b=e.target.closest('button');
 if(b){const k=b.dataset.a;if(k==='op'){close();location.href=href}else if(k==='cp'){navigator.clipboard&&navigator.clipboard.writeText(a).catch(()=>{});type(m.querySelector('.q'),t.done)}else close();return}
 if(V==='C'&&e.target.closest('.vn')&&pg===0){pg=1;m.classList.add('p2');m.querySelector('.pgn').textContent='2 / 2';type(m.querySelector('.q'),t.l2,()=>m.classList.add('ready'));return}
 if(e.target===m||(V==='B'&&e.target.closest('.vn')))close()}) /* box click = cancel (even mid-typing) */}
function open(a){clearTimeout(ct);href=a.href;if(m)m.remove();pg=0;build();const t=T();void m.offsetWidth;requestAnimationFrame(()=>{m.classList.add('on');setTimeout(()=>type(m.querySelector('.q'),V==='C'?t.l1:t.l2,()=>{m.classList.add('ready');}),520)})}
let ct=0;function close(){clearInterval(tw);if(!m||!m.classList.contains('on')||m.classList.contains('closing'))return;const mm=m;mm.classList.add('closing');clearTimeout(ct);let done=0;const fin=()=>{if(done)return;done=1;clearTimeout(ct);mm.style.transition='none';mm.classList.remove('on','closing','ready');void mm.offsetWidth;mm.style.transition=''};const v=mm.querySelector('.vn');v.addEventListener('animationend',function h(e){if(e.target===v&&e.animationName==='cvout'){v.removeEventListener('animationend',h);fin()}});ct=setTimeout(fin,650)} /* slide box down, then hide */
d.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="mailto:"]');if(!a)return;e.preventDefault();open(a)});
d.addEventListener('keydown',e=>{if(e.key==='Escape')close();else if(m&&m.kb)m.kb(e)});
})();
