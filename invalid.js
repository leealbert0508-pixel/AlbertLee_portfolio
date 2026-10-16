(()=>{
const d=document,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const page=p=>{const m=/(index|works)(\.html)?$/.exec(p)||(/\/$/.test(p)?['','index']:null);return m?m[1]:null};
function fx(a){
 a.classList.add('nx-host');
 a.classList.remove('nx-shake');a.querySelectorAll('.nx').forEach(x=>x.remove());
 if(!RM){void a.offsetWidth;a.classList.add('nx-shake');clearTimeout(a._nxs);a._nxs=setTimeout(()=>a.classList.remove('nx-shake'),320)}
 const s=d.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','nx');s.setAttribute('viewBox','0 0 26 26');s.setAttribute('aria-hidden','true');
 s.innerHTML='<line x1="4" y1="4" x2="22" y2="22"/><line x1="22" y1="4" x2="4" y2="22"/>';a.appendChild(s);
 if(RM)requestAnimationFrame(()=>{s.style.opacity='0'});
 clearTimeout(a._nxr);a._nxr=setTimeout(()=>s.remove(),700);
}
d.addEventListener('click',e=>{
 if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const a=e.target.closest&&e.target.closest('header a, a.logo, .bnav a');if(!a)return;
 const u=new URL(a.getAttribute('href'),location.href);if(u.origin!==location.origin)return;
 const cur=page(location.pathname),dst=page(u.pathname);if(!cur||cur!==dst)return;
 const h=u.hash;
 if(h==='#top'&&a.closest('.bnav')){e.preventDefault();if(scrollY<=1)fx(a);else{scrollTo({top:0,behavior:RM?'auto':'smooth'});history.replaceState(null,'',location.pathname)}return}
 if(!h||(cur==='index'&&h==='#top')){e.preventDefault();fx(a);return}
 if(cur==='index'&&h==='#contact'){e.preventDefault();fx(a);const t=d.getElementById('contact');
  const r=t&&t.getBoundingClientRect(),hd=d.querySelector('header'),ft=d.querySelector('footer'),top=hd?hd.getBoundingClientRect().bottom:0,bot=ft?ft.getBoundingClientRect().top:innerHeight;if(r&&r.bottom>top&&r.top<bot)return;
  setTimeout(()=>{t&&t.scrollIntoView({behavior:RM?'auto':'smooth'});history.replaceState(null,'','#contact')},RM?0:300)}
},true);
})();
