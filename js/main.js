lucide.createIcons();

// Cursor
const cd=document.getElementById('cd'),cr=document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cd){cd.style.left=mx+'px';cd.style.top=my+'px'}});
(function ar(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;if(cr){cr.style.left=rx+'px';cr.style.top=ry+'px'}requestAnimationFrame(ar)})();
document.querySelectorAll('a,button,.tc,input,select,textarea,.si,.wf').forEach(el=>{el.addEventListener('mouseenter',()=>{if(cd)cd.classList.add('h');if(cr)cr.classList.add('h')});el.addEventListener('mouseleave',()=>{if(cd)cd.classList.remove('h');if(cr)cr.classList.remove('h')})});

// Menu
let mO=false;
function toggleMenu(){mO=!mO;const m=document.getElementById('mMenu'),i=document.getElementById('mIco');mO?(m.classList.add('open'),i.setAttribute('data-lucide','x'),document.body.style.overflow='hidden'):(m.classList.remove('open'),i.setAttribute('data-lucide','menu'),document.body.style.overflow='');lucide.createIcons()}

// Nav
window.addEventListener('scroll',()=>{const g=document.querySelector('#nav .gl');if(window.scrollY>60){g.style.background='rgba(255,250,247,.9)';g.style.boxShadow='0 8px 30px rgba(60,20,30,.06)'}else{g.style.background='rgba(255,250,247,.55)';g.style.boxShadow='none'}});

// Hero 5 Slides
let cS=0,tS=5,sT;
function goSl(n){document.querySelectorAll('.sl').forEach(s=>s.classList.remove('on'));document.querySelectorAll('.sdot').forEach(d=>d.classList.remove('on'));document.querySelectorAll('.sl')[n].classList.add('on');document.querySelectorAll('.sdot')[n].classList.add('on');cS=n;clearInterval(sT);sT=setInterval(()=>goSl((cS+1)%tS),5500)}
sT=setInterval(()=>goSl((cS+1)%tS),5500);

// Reveal
const obs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('on')})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv,.rl,.rr,.rs,.iw,.lg').forEach(el=>obs.observe(el));

// Tilt
function tilt(e,el){const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;el.style.transform=`perspective(800px) rotateX(${((r.height/2-y)/r.height)*6}deg) rotateY(${((x-r.width/2)/r.width)*6}deg) scale3d(1.015,1.015,1.015)`}
function untilt(el){el.style.transform='perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)'}

// Auto scroll hizmetler - basit ve guvenilir
setTimeout(function(){
  var el = document.getElementById('hScr');
  if(!el) return;
  var dir = 1;
  setInterval(function(){
    el.scrollLeft += dir;
    if(el.scrollLeft >= el.scrollWidth - el.clientWidth - 5) dir = -1;
    if(el.scrollLeft <= 0) dir = 1;
  }, 50);
}, 1000);

// Anchor
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})});