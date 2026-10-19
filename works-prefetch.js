/* home: warm the works page while the visitor heads there. Hover/focus/touch on a WORKS link prefetches the page,
   its stylesheet and the first tab's tile thumbnails; pressing it also queues the other tabs' thumbnails
   (prefetches keep loading during the page transition). */
(()=>{const d=document,done=new Set();
const A=['works.html','style.css','rows.css','rows.js','anim.js','anim-frames.js','gridload.css','gridload.js','img/thumbs/works/work01.webp'];
const B=['img/thumbs/practice/practice01.webp','img/thumbs/practice/practice02.webp','img/thumbs/fanart/fanart01.webp','img/thumbs/fanart/fanart10.webp','img/thumbs/fanart/fanart11.webp','img/thumbs/fanart/fanart07.webp','img/thumbs/fanart/fanart03.webp','img/thumbs/fanart/fanart06.webp','img/thumbs/fanart/fanart05.webp','img/thumbs/fanart/fanart04.webp','img/thumbs/fanart/fanart08.webp','img/thumbs/fanart/fanart09.webp','img/thumbs/fanart/fanart02.webp'];
const nc=navigator.connection;if(nc&&nc.saveData)return;
const pf=list=>list.forEach(u=>{if(done.has(u))return;done.add(u);const l=d.createElement('link');l.rel='prefetch';l.href=u;if(/\.(webp|png|jpg|svg)$/.test(u))l.as='image';d.head.appendChild(l)});
const isW=e=>e.target.closest&&e.target.closest('a[href$="works.html"]');
['pointerenter','focusin','touchstart'].forEach(t=>d.addEventListener(t,e=>{if(isW(e))pf(A)},{capture:true,passive:true}));
['pointerdown','click'].forEach(t=>d.addEventListener(t,e=>{if(isW(e)){pf(A);pf(B)}},{capture:true,passive:true}));
})();
