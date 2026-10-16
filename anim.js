/* animated media: still until hover / open */
(()=>{const d=document;
const prep=()=>{d.querySelectorAll('img[data-anim]').forEach(i=>{const still=i.getAttribute('src'),anim=i.dataset.anim;new Image().src=anim;
 const on=()=>{if(i.getAttribute('src')!==anim)i.src=anim},off=()=>{if(i.getAttribute('src')!==still)i.src=still};
 i.addEventListener('mouseenter',on);i.addEventListener('mouseleave',off);i.addEventListener('focus',on);i.addEventListener('blur',off);
 i.addEventListener('click',on,true)});
 d.querySelectorAll('.grid video').forEach(v=>{v.muted=true;v.loop=true;v.playsInline=true;v.pause();
 v.addEventListener('mouseenter',()=>v.play().catch(()=>{}));v.addEventListener('mouseleave',()=>{v.pause()})})};
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',prep);else prep();
})();
