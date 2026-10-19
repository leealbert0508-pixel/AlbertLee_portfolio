/* header contact: VN dialog, step 1 = X / EMAIL / DISCORD, step 2 = open / copy / cancel.
   Opens from any element with [data-hdr-contact] (or window.hdrContact.open()). */
(()=>{const d=document,h=d.documentElement;let m=null,tw=0,ct=0,sel=null,busy=false;
const S={x:{lb:'X',val:'@193x04',url:'https://x.com/193x04',cp:'@193x04'},
 email:{lb:'EMAIL',val:'leealbert0508@gmail.com',url:'mailto:leealbert0508@gmail.com',cp:'leealbert0508@gmail.com'},
 discord:{lb:'DISCORD',val:'9g8nk',url:null,cp:'9g8nk'}};
const T=()=>h.lang==='en'?{q1:'How would you like to get in touch?',op:'OPEN',cp:'COPY',cn:'CANCEL',done:'COPIED.',fail:'Could not copy. Please copy it manually.'}
 :{q1:'どちらで連絡しますか？',op:'開く',cp:'コピー',cn:'キャンセル',done:'コピーしました。',fail:'コピーできませんでした。手動でコピーしてください。'};
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function type(el,s,cb){clearInterval(tw);let n=0;el.textContent='';tw=setInterval(()=>{el.textContent=s.slice(0,++n);if(n>=s.length){clearInterval(tw);cb&&cb()}},30)}
const btns=list=>list.map((o,k)=>'<button data-a="'+o[0]+'"><i>0'+(k+1)+'</i>'+esc(o[1])+'</button>').join('');
function wire(){const bs=[...m.querySelectorAll('.ch button')],hl=b=>bs.forEach(x=>x.classList.toggle('hl',x===b));hl(null);
 bs.forEach(b=>{b.addEventListener('mouseenter',()=>hl(b));b.addEventListener('focus',()=>{if(b.matches(':focus-visible'))hl(b)})});
 m.kb=e=>{if(!m.classList.contains('on'))return;const nav=e.key==='ArrowDown'||e.key==='ArrowUp'||(e.key==='Tab'&&!m.contains(d.activeElement));if(!nav)return;e.preventDefault();
  const i=bs.findIndex(x=>x.classList.contains('hl'));const n=i<0?(e.key==='ArrowUp'?bs[bs.length-1]:bs[0]):bs[(i+(e.key==='ArrowUp'?bs.length-1:1))%bs.length];n.focus({preventScroll:true});hl(n)}}
function step(n){const t=T(),ch=m.querySelector('.ch'),q=m.querySelector('.q'),ad=m.querySelector('.addr');m.classList.remove('ready');ch.classList.add('swap');
 if(n===1){sel=null;ch.innerHTML=btns([['x','X'],['email','EMAIL'],['discord','DISCORD']]);ad.textContent=''}
 else{const s=S[sel];ch.innerHTML=btns((s.url?[['op',t.op]]:[]).concat([['cp',t.cp],['cn',t.cn]]));ad.textContent=s.val}
 wire();type(q,n===1?t.q1:S[sel].lb+' — '+S[sel].val,()=>{ch.classList.remove('swap');m.classList.add('ready')})}
function copy(s){return new Promise(res=>{const legacy=()=>{let ok=false;try{const ta=d.createElement('textarea');ta.value=s;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;top:0;left:0;opacity:0';d.body.appendChild(ta);ta.select();ta.setSelectionRange(0,s.length);ok=d.execCommand('copy');ta.remove()}catch(e){}res(ok)};
 if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(s).then(()=>res(true),legacy);else legacy()})}
function build(){m=d.createElement('div');m.id='hc';m.className='vB';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','CONTACT');
 m.innerHTML='<div class="ch"></div><div class="vn"><h4>CONTACT</h4><p class="q"></p><p class="addr"></p><span class="cnx">▼</span></div>';d.body.appendChild(m);
 
 m.addEventListener('mouseout',e=>{const ch=m.querySelector('.ch');if(ch.contains(e.target)&&!ch.contains(e.relatedTarget))ch.querySelectorAll('button').forEach(x=>x.classList.remove('hl'))});
 m.addEventListener('click',e=>{if(busy)return;const b=e.target.closest('button');
  if(b){const k=b.dataset.a;
   if(S[k]){sel=k;step(2);return}
   if(k==='op'){const u=S[sel].url;if(u.startsWith('mailto:'))location.href=u;else window.open(u,'_blank','noopener');close();return}
   if(k==='cp'){busy=true;const t=T();copy(S[sel].cp).then(ok=>{m.classList.remove('ready');type(m.querySelector('.q'),ok?t.done:t.fail);setTimeout(()=>{busy=false;close()},ok?900:2200)});return}
   close();return}
  if(e.target===m||e.target.closest('.vn'))close()})}
function open(k){clearTimeout(ct);busy=false;if(m)m.remove();build();m.querySelector('.ch').innerHTML='';void m.offsetWidth;
 requestAnimationFrame(()=>{m.classList.add('on');setTimeout(()=>{if(k&&S[k]){sel=k;step(2)}else step(1)},520)})}
function close(){clearInterval(tw);if(!m||!m.classList.contains('on')||m.classList.contains('closing'))return;const mm=m;mm.classList.add('closing');clearTimeout(ct);let done=0;
 const fin=()=>{if(done)return;done=1;clearTimeout(ct);mm.style.transition='none';mm.classList.remove('on','closing','ready');void mm.offsetWidth;mm.style.transition=''};
 const v=mm.querySelector('.vn');v.addEventListener('animationend',function f(e){if(e.target===v&&e.animationName==='hccvout'){v.removeEventListener('animationend',f);fin()}});ct=setTimeout(fin,650)}
window.addEventListener('click',e=>{if(e.button!==0)return;const a=e.target.closest&&e.target.closest('[data-hdr-contact]');if(!a)return;e.preventDefault();e.stopImmediatePropagation();open(a.getAttribute('data-hdr-contact'))},true); /* capture: beat page-transition / hash-scroll handlers */
d.addEventListener('keydown',e=>{if(!m||!m.classList.contains('on'))return;if(e.key==='Escape')close();else if(m.kb)m.kb(e)});
window.hdrContact={open,close};window.openHdrContact=open; /* open('x'|'email'|'discord') jumps to step 2 */
})();
