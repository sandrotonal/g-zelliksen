lucide.createIcons();

// Cursor
const cd=document.getElementById('cd'),cr=document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cd){cd.style.left=mx+'px';cd.style.top=my+'px'}});
(function ar(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;if(cr){cr.style.left=rx+'px';cr.style.top=ry+'px'}requestAnimationFrame(ar)})();
document.querySelectorAll('a,button,.tc,input,select,textarea,.si,.wf').forEach(el=>{el.addEventListener('mouseenter',()=>{if(cd)cd.classList.add('h');if(cr)cr.classList.add('h')});el.addEventListener('mouseleave',()=>{if(cd)cd.classList.remove('h');if(cr)cr.classList.remove('h')})});

// Menu
let mO=false;
function toggleMenu(){mO=!mO;const m=document.getElementById('mMenu'),i=document.getElementById('mIco');mO?(m.classList.add('on'),i.setAttribute('data-lucide','x'),document.body.style.overflow='hidden'):(m.classList.remove('on'),i.setAttribute('data-lucide','menu'),document.body.style.overflow='');lucide.createIcons()}

// Nav
let _st;
window.addEventListener('scroll',()=>{if(_st)return;_st=requestAnimationFrame(()=>{const g=document.querySelector('#nav .gl');if(window.scrollY>60){g.style.background='rgba(255,250,247,.9)';g.style.boxShadow='0 8px 30px rgba(60,20,30,.06)'}else{g.style.background='rgba(255,250,247,.55)';g.style.boxShadow='none'};_st=null})},{passive:true});

// Hero 5 Slides
let cS=0,tS=7,sT;
function goSl(n){document.querySelectorAll('.sl').forEach(s=>s.classList.remove('on'));document.querySelectorAll('.sdot').forEach(d=>d.classList.remove('on'));document.querySelectorAll('.sl')[n].classList.add('on');document.querySelectorAll('.sdot')[n].classList.add('on');cS=n;clearInterval(sT);sT=setInterval(()=>goSl((cS+1)%tS),6000)}
sT=setInterval(()=>goSl((cS+1)%tS),6000);

// Random Hero
(function(){
  const s=document.querySelectorAll('.sl'),d=document.querySelectorAll('.sdot');
  if(!s.length)return;
  const r=Math.floor(Math.random()*s.length);
  s.forEach(el=>el.classList.remove('on'));d.forEach(el=>el.classList.remove('on'));
  s[r].classList.add('on');d[r].classList.add('on');cS=r;
  clearInterval(sT);sT=setInterval(()=>goSl((cS+1)%tS),6000);
})();

// Reveal
const obs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('on')})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv,.rl,.rr,.rs,.iw,.lg').forEach(el=>obs.observe(el));

// Tilt
function tilt(e,el){const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;el.style.transform=`perspective(800px) rotateX(${((r.height/2-y)/r.height)*6}deg) rotateY(${((x-r.width/2)/r.width)*6}deg) scale3d(1.015,1.015,1.015)`}
function untilt(el){el.style.transform='perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)'}

// Auto scroll hizmetler
setTimeout(function(){
  var el = document.getElementById('hScr');
  if(!el) return;
  var dir = 1;
  (function _as(){
    el.scrollLeft += dir * 0.6;
    if(el.scrollLeft >= el.scrollWidth - el.clientWidth - 5) dir = -1;
    if(el.scrollLeft <= 0) dir = 1;
    requestAnimationFrame(_as);
  })();
}, 1000);

// Anchor
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const h=a.getAttribute('href');if(!h||h==='#')return;e.preventDefault();const t=document.querySelector(h);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})});

// Loading screen
window.addEventListener('load',()=>{setTimeout(()=>{document.getElementById('ld')?.classList.add('off')},500)});

// Lightbox
document.getElementById('galeri')?.addEventListener('click',function(e){
  const w=e.target.closest('.group');if(!w||!this.contains(w))return;
  const i=w.querySelector('img');if(!i)return;
  const s=i.getAttribute('src').replace(/w=\d+&h=\d+/g,'w=1200&h=1200');
  const lb=document.getElementById('lb'),li=document.getElementById('li');
  if(lb&&li){li.src=s;li.alt=i.alt||'';lb.classList.add('on');document.body.style.overflow='hidden'}
});
const cl=()=>{const lb=document.getElementById('lb');if(lb){lb.classList.remove('on');document.body.style.overflow=''}};
document.getElementById('lc')?.addEventListener('click',cl);
document.getElementById('lb')?.addEventListener('click',function(e){if(e.target===this)cl()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')cl()});

// Nav active
(function(){
  const ss=document.querySelectorAll('section[id]'),nl=document.querySelectorAll('.nl');
  if(!ss.length||!nl.length)return;
  const ob=new IntersectionObserver(es=>{es.forEach(e=>{
    if(e.isIntersecting){
      nl.forEach(l=>{l.classList.remove('text-rose-900');l.classList.add('text-rose-900/50')});
      const a=document.querySelector(`.nl[href="#${e.target.id}"]`);
      if(a){a.classList.remove('text-rose-900/50');a.classList.add('text-rose-900')}
    }
  })},{threshold:.3,rootMargin:'-80px 0px 0px 0px'});
  ss.forEach(s=>ob.observe(s));
})();

// Cookie
(function(){
  const b=document.getElementById('cb'),a=document.getElementById('ca');
  if(!b||!a||localStorage.getItem('rc'))return;
  setTimeout(()=>b.classList.add('on'),1e3);
  a.addEventListener('click',()=>{localStorage.setItem('rc','1');b.classList.remove('on')});
})();

// Form validation + toast
(function(){
  const f=document.getElementById('af'),t=document.getElementById('tst');
  if(!f||!t)return;
  const sh=(m,ty)=>{t.textContent=m;t.className='tst '+ty;void t.offsetWidth;t.classList.add('on');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('on'),4e3)};
  f.addEventListener('submit',function(e){
    e.preventDefault();
    const n=f.querySelector('[name="name"]')?.value.trim();
    const p=f.querySelector('[name="phone"]')?.value.trim();
    const d=f.querySelector('[name="date"]')?.value;
    const s=f.querySelector('[name="service"]')?.value;
    if(!n||n.length<2)return sh('Adınız en az 2 karakter olmalıdır','e');
    if(!p||!/^[+]?[\d\s()-]{7,20}$/.test(p))return sh('Geçerli bir telefon numarası giriniz','e');
    if(!d)return sh('Lütfen bir tarih seçiniz','e');
    if(!s)return sh('Lütfen bir hizmet seçiniz','e');
    sh('Randevu talebiniz alındı! En kısa sürede sizi arayacağız.','s');
    f.reset();
  });
})();

// Service card → book form
(function(){
  const f=document.getElementById('af'),sel=f?.querySelector('[name="service"]'),tst=document.getElementById('tst');
  const svn={'Hydra Facial':'Hydrafacial','Anti-Aging Serum':'Anti-Aging'};
  const go=(nm)=>{
    if(!f||!sel)return;
    const sec=nm||'';
    const matched=[...sel.options].find(o=>o.textContent.trim()===sec||o.textContent.trim()===svn[sec]);
    if(matched)sel.value=matched.textContent;
    document.getElementById('iletisim')?.scrollIntoView({behavior:'smooth',block:'start'});
    const fc=f.closest('.relative');if(fc)fc.classList.add('fg');
    setTimeout(()=>fc?.classList.remove('fg'),3e3);
    if(tst&&sec){tst.textContent=sec+' seçildi — randevunuzu oluşturun';tst.className='tst s';void tst.offsetWidth;tst.classList.add('on');clearTimeout(tst._x);tst._x=setTimeout(()=>tst.classList.remove('on'),3500)}
  };
  document.querySelectorAll('#hizmetler .tc').forEach(el=>{
    el.addEventListener('click',function(e){
      if(e.target.closest('.bl'))return;
      go(this.querySelector('h3')?.textContent||'');
    });
  });
})();