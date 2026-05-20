if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

// Cursor
const cd=document.getElementById('cd'),cr=document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cd){cd.style.left=mx+'px';cd.style.top=my+'px'}});
(function ar(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;if(cr){cr.style.left=rx+'px';cr.style.top=ry+'px'}requestAnimationFrame(ar)})();
document.querySelectorAll('a,button,.tc,input,select,textarea,.si,.wf').forEach(el=>{el.addEventListener('mouseenter',()=>{if(cd)cd.classList.add('h');if(cr)cr.classList.add('h')});el.addEventListener('mouseleave',()=>{if(cd)cd.classList.remove('h');if(cr)cr.classList.remove('h')})});

// Menu
let mO=false;
function toggleMenu(){mO=!mO;const m=document.getElementById('mMenu'),i=document.getElementById('mIco');mO?(m.classList.add('on'),i.setAttribute('data-lucide','x'),document.body.style.overflow='hidden'):(m.classList.remove('on'),i.setAttribute('data-lucide','menu'),document.body.style.overflow='');if(typeof lucide !== 'undefined') lucide.createIcons()}

// Nav
let _st;
window.addEventListener('scroll',()=>{if(_st)return;_st=requestAnimationFrame(()=>{const g=document.querySelector('#nav .gl');if(g){if(window.scrollY>60){g.style.background='rgba(255,250,247,.9)';g.style.boxShadow='0 8px 30px rgba(60,20,30,.06)'}else{g.style.background='rgba(255,250,247,.55)';g.style.boxShadow='none'}};_st=null})},{passive:true});

// Hero 5 Slides
let cS=0,tS=document.querySelectorAll('.sl').length || 7,sT;
function goSl(n){
  const slides = document.querySelectorAll('.sl');
  const dots = document.querySelectorAll('.sdot');
  if(!slides.length || n >= slides.length) return;
  
  slides.forEach(s=>s.classList.remove('on'));
  dots.forEach(d=>d.classList.remove('on'));
  
  slides[n].classList.add('on');
  if(dots[n]) dots[n].classList.add('on');
  
  cS=n;
  clearInterval(sT);
  sT=setInterval(()=>goSl((cS+1)%tS),6000)
}
if(tS > 0) sT=setInterval(()=>goSl((cS+1)%tS),6000);

// Random Hero
(function(){
  const s=document.querySelectorAll('.sl'),d=document.querySelectorAll('.sdot');
  if(!s.length)return;
  const r=Math.floor(Math.random()*s.length);
  s.forEach(el=>el.classList.remove('on'));
  d.forEach(el=>el.classList.remove('on'));
  s[r].classList.add('on');
  if(d[r]) d[r].classList.add('on');
  cS=r;
  clearInterval(sT);
  sT=setInterval(()=>goSl((cS+1)%tS),6000);
})();

// Reveal
const obs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('on')})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv,.rl,.rr,.rs,.iw,.lg').forEach(el=>obs.observe(el));

// Tilt
function tilt(e,el){const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;el.style.transform=`perspective(800px) rotateX(${((r.height/2-y)/r.height)*6}deg) rotateY(${((x-r.width/2)/r.width)*6}deg) scale3d(1.015,1.015,1.015)`}
function untilt(el){el.style.transform='perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)'}

// Auto scroll hizmetler
(function() {
  const el = document.getElementById('hScr');
  if (!el) return;

  let scrollPos = 0;
  let dir = 1;
  let isHovered = false;

  el.addEventListener('mouseenter', () => isHovered = true);
  el.addEventListener('mouseleave', () => isHovered = false);
  el.addEventListener('touchstart', () => isHovered = true, {passive: true});
  el.addEventListener('touchend', () => isHovered = false, {passive: true});

  function _as() {
    if (!isHovered) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 1) { // Only scroll if there's actual overflow
        scrollPos += dir * 0.7; // Floating point increment
        
        if (scrollPos >= maxScroll) {
          scrollPos = maxScroll;
          dir = -1;
        } else if (scrollPos <= 0) {
          scrollPos = 0;
          dir = 1;
        }
        
        el.scrollLeft = scrollPos;
      }
    } else {
      // Sync scrollPos when user manually scrolls or touches
      scrollPos = el.scrollLeft;
    }
    requestAnimationFrame(_as);
  }

  // Wait for a moment to ensure layout is ready
  setTimeout(() => {
    scrollPos = el.scrollLeft;
    requestAnimationFrame(_as);
  }, 1500);
})();

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

  // Set min date to tomorrow
  const rd=document.getElementById('rd');
  if(rd){const d=new Date();d.setDate(d.getDate()+1);rd.min=d.toISOString().split('T')[0];rd.value=d.toISOString().split('T')[0]}

  // Time slot selection
  const rt=document.getElementById('rt');
  document.querySelectorAll('#ts .tsb').forEach(b=>{
    b.addEventListener('click',function(){
      document.querySelectorAll('#ts .tsb').forEach(x=>x.classList.remove('on'));
      this.classList.add('on');
      if(rt)rt.value=this.dataset.time;
    });
    if(b===document.querySelector('#ts .tsb:first-child')){b.classList.add('on');if(rt)rt.value=b.dataset.time}
  });

  const sh=(m,ty)=>{t.textContent=m;t.className='tst '+ty;void t.offsetWidth;t.classList.add('on');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('on'),4e3)};
  f.addEventListener('submit',function(e){
    e.preventDefault();
    const n=f.querySelector('[name="name"]')?.value.trim();
    const p=f.querySelector('[name="phone"]')?.value.trim();
    const d=f.querySelector('[name="date"]')?.value;
    const tm=f.querySelector('[name="time"]')?.value;
    const s=f.querySelector('[name="service"]')?.value;
    if(!n||n.length<2)return sh('Adınız en az 2 karakter olmalıdır','e');
    if(!p||!/^[+]?[\d\s()-]{7,20}$/.test(p))return sh('Geçerli bir telefon numarası giriniz','e');
    if(!d)return sh('Lütfen bir tarih seçiniz','e');
    if(!tm)return sh('Lütfen bir saat aralığı seçiniz','e');
    if(!s)return sh('Lütfen bir hizmet seçiniz','e');
    sh('Randevu talebiniz alındı! En kısa sürede sizi arayacağız.','s');
    f.reset();
    if(rd){const d=new Date();d.setDate(d.getDate()+1);rd.min=d.toISOString().split('T')[0];rd.value=d.toISOString().split('T')[0]}
    if(rt){rt.value=''}
    document.querySelectorAll('#ts .tsb').forEach((b,i)=>{b.classList.remove('on');if(i===0){b.classList.add('on');if(rt)rt.value=b.dataset.time}});
  });
})();

// Service Modal
(function(){
  const sd={
    'Cilt Bakımı':{img:'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=375&fit=crop&q=80',desc:'Cilt tipinize özel ürünlerle derinlemesine temizlik, peeling, buhar, maske ve nemlendirme adımlarını içeren kapsamlı bakım ritüeli.',dur:'60-90 dk',price:'800-1500 ₺',sss:[{q:'Hangi sıklıkla yaptırmalıyım?',a:'Cilt tipinize bağlı olarak 2-4 haftada bir önerilir. Yağlı ciltlerde 2 hafta, kuru ciltlerde 4 hafta ideal.'},{q:'Makyajlı gelirsem sorun olur mu?',a:'Randevu öncesi makyajınızı temizleyerek gelebilirsiniz, biz de detaylı bir temizlik ile başlarız.'}]},
    'Makyaj':{img:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=375&fit=crop&q=80',desc:'Günlük doğal makyajdan özel gün makyajına kadar her tarza uygun, cilt tonunuza ve isteğinize göre kişiselleştirilmiş uygulama.',dur:'60-120 dk',price:'600-2500 ₺',sss:[{q:'Deneme makyajı yapıyor musunuz?',a:'Evet, özel gün öncesi deneme seansı planlayabiliriz. Makyajınızı birlikte belirleyip prova yapıyoruz.'},{q:'Hipoalerjenik ürün kullanıyor musunuz?',a:'Evet, hassas ciltler için hipoalerjenik ve vegan ürün alternatiflerimiz mevcut.'}]},
    'Saç Tasarımı':{img:'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=375&fit=crop&q=80',desc:'Kesim, renk, balayage, ombre ve özel saç tasarımları. Profesyonel ekibimizle hayalinizdeki saça kavuşun.',dur:'45-180 dk',price:'500-3500 ₺',sss:[{q:'Renk sonrası saç bakımı nasıl olmalı?',a:'Renk koruyucu şampuan ve saç kremi kullanmanızı, haftada bir nemlendirici maske uygulamanızı öneririz.'},{q:'Balayage ne kadar kalıcı?',a:'Balayage 3-6 ay arası kalıcıdır. Doğal uzama etkisi sayesinde sık rötuş gerektirmez.'}]},
    'Nail Art':{img:'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=375&fit=crop&q=80',desc:'El ve ayak bakımı, jel tırnak, kalıcı oje ve özgün nail art tasarımları. Her sezonun trend renkleriyle.',dur:'30-90 dk',price:'400-1200 ₺',sss:[{q:'Jel tırnak tırnağıma zarar verir mi?',a:'Doğru uygulama ve söküm ile zarar vermez. Profesyonel ekibimiz hijyenik ve güvenli uygulama garantisi verir.'},{q:'Ne kadar dayanır?',a:'Kalıcı oje 2-3 hafta, jel tırnak 3-4 hafta dayanır. Düzenli bakım ile ömrünü uzatabilirsiniz.'}]},
    'SPA & Masaj':{img:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=375&fit=crop&q=80',desc:'Aromaterapi, sıcak taş, lenfatik drenaj ve klasik masaj seçenekleriyle bedeninizi ve ruhunuzu yenileyin.',dur:'45-120 dk',price:'700-2000 ₺',sss:[{q:'Masaj öncesi nelere dikkat etmeliyim?',a:'Ağır bir yemek yememenizi, bol su içmenizi ve rahat kıyafetler tercih etmenizi öneririz.'},{q:'Hamileler için masaj uygun mu?',a:'Evet, gebelik masajı uzmanımız eşliğinde 2. trimester itibarıyla güvenle uygulanmaktadır.'}]},
    'Epilasyon':{img:'https://images.pexels.com/photos/5938269/pexels-photo-5938269.jpeg?auto=compress&cs=tinysrgb&w=600&h=375&fit=crop',desc:'Lazer epilasyon ve ağda uygulamalarıyla istenmeyen tüylerden kalıcı olarak kurtulun. Konforlu ve hijyenik ortam.',dur:'20-60 dk',price:'300-1500 ₺',sss:[{q:'Kaç seansta sonuç alırım?',a:'Ortalama 6-10 seans arası kalıcı sonuç alınır. Seans aralıkları 4-6 hafta olmalıdır.'},{q:'Lazer epilasyon acıtır mı?',a:'Soğutma sistemli cihazlarımız sayesinde minimum rahatsızlık hissedilir. Hassas bölgelerde öncesinde anestezik krem uygulanabilir.'}]},
    'Medikal Bakım':{img:'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=600&h=375&fit=crop',desc:'Cilt sorunlarına yönelik dermatolog danışmanlığında kimyasal peeling, PRP, dermapen ve mikroiğneleme tedavileri.',dur:'45-90 dk',price:'1000-4000 ₺',sss:[{q:'İşlem sonrası iyileşme süresi nedir?',a:'Tedaviye göre değişir. Kimyasal peeling sonrası 3-7 gün, mikroiğneleme sonrası 1-2 gün kızarıklık olabilir.'},{q:'Medikal bakım kimler için uygun?',a:'Akne, leke, kırışıklık, skar (yara izi) ve cilt sarkması gibi sorunları olan herkese uygulanabilir.'}]},
    'Bronzlaşma':{img:'https://images.pexels.com/photos/15150600/pexels-photo-15150600.jpeg?auto=compress&cs=tinysrgb&w=600&h=375&fit=crop',desc:'Spray bronzlaştırma ve solaryum seçenekleriyle sağlıklı ve doğal bir bronzluk. Cilt tonunuza özel ayarlanan formüller.',dur:'15-30 dk',price:'400-800 ₺',sss:[{q:'Spray bronzlaştırma doğal görünür mü?',a:'Evet, cilt tonunuza özel ayarlanan formül ile tamamen doğal bir görünüm elde edilir. Turuncu değil, altın bronz ton.'},{q:'Ne kadar dayanır?',a:'Uygun bakım ile 7-10 gün arası dayanır. Nemlendirici kullanmak ve havuz/denizden kaçınmak ömrünü uzatır.'}]},
    'Güneş Bakımı':{img:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=375&fit=crop&q=80',desc:'Güneş öncesi ve sonrası bakım, renk eşitleme, leke tedavisi ve onarıcı maskelerle cildinizi koruyun.',dur:'45-60 dk',price:'600-1200 ₺',sss:[{q:'Güneş lekesi tedavisi ne zaman yapılmalı?',a:'Sonbahar ve kış ayları idealdir. Yaz aylarında koruyucu bakım ve güneş sonrası onarım önerilir.'},{q:'Kaç seansta lekeler geçer?',a:'Leke yoğunluğuna göre 3-6 seans önerilir. Düzenli güneş koruyucu kullanımı tedaviyi destekler.'}]},
    'Anti-Aging':{img:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=375&fit=crop&q=80',desc:'Kırışıklık karşıtı serum tedavileri, lifting masaj, kolajen maskeler ve radyofrekans ile genç ve parlak bir cilt.',dur:'60-90 dk',price:'1200-3000 ₺',sss:[{q:'Hangi yaşta başlamalıyım?',a:'25 yaş itibarıyla koruyucu anti-aging bakım önerilir. 30+ yaşta daha yoğun tedavilere geçilebilir.'},{q:'Radyofrekans acıtır mı?',a:'Hafif sıcaklık hissi dışında ağrısız bir işlemdir. Seans sonrası günlük hayata hemen dönülebilir.'}]},
    'Vücut Bakımı':{img:'https://images.pexels.com/photos/6628690/pexels-photo-6628690.jpeg?auto=compress&cs=tinysrgb&w=600&h=375&fit=crop',desc:'Vücut peeling, çamur sargı, lenfatik drenaj ve selülit karşıtı tedavilerle tüm vücudunuzu şımartın.',dur:'60-120 dk',price:'900-2500 ₺',sss:[{q:'Selülit tedavisinde kaç seans gerekli?',a:'Haftada 1 seans olmak üzere 8-12 seans önerilir. Lenfatik drenaj ile desteklendiğinde sonuç daha hızlı alınır.'},{q:'Vücut sargısı ne işe yarar?',a:'Toksin atımını destekler, cildi sıkılaştırır ve inceltir. Tek seansta bile fark edilir etki sağlar.'}]},
    'Gençleştirme':{img:'https://images.pexels.com/photos/3985311/pexels-photo-3985311.jpeg?auto=compress&cs=tinysrgb&w=600&h=375&fit=crop',desc:'Radyofrekans, HIFU, PRP ve lazer gençleştirme yöntemleriyle cildinizdeki zamanı geri alın.',dur:'45-90 dk',price:'2000-5000 ₺',sss:[{q:'HIFU nedir ve ne kadar etkilidir?',a:'Odaklanmış ultrason teknolojisi ile cilt altı katmanları sıkılaştırır. Tek seansta 3-6 ay kalıcı lifting etkisi.'},{q:'PRP tedavisi nasıl yapılır?',a:'Kendi kanınızdan elde edilen trombositten zengin plazma cilde enjekte edilir. Doğal ve güvenli bir yenileme yöntemi.'}]},
    'Kirpik & Kaş':{img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=375&fit=crop&q=80',desc:'Kirpik lifting, laminasyon, kaş dizayn, mikroblading ve kalıcı makyaj ile bakışlarınızı güçlendirin.',dur:'60-120 dk',price:'500-2000 ₺',sss:[{q:'Kirpik lifting ne kadar kalıcı?',a:'6-8 hafta arası kalıcıdır. Doğal kirpiklerinize kıvrım kazandırır ve maskara ihtiyacını azaltır.'},{q:'Mikroblading acıtır mı?',a:'İşlem öncesi uyuşturucu krem uygulanır. Hafif bir rahatsızlık hissedilebilir ancak genellikle konforlu geçer.'}]},
    'Lazer':{img:'https://images.pexels.com/photos/3985356/pexels-photo-3985356.jpeg?auto=compress&cs=tinysrgb&w=600&h=375&fit=crop',desc:'Son teknoloji lazer cihazlarıyla cilt yenileme, leke tedavisi, damar temizliği ve dövme silme işlemleri.',dur:'20-60 dk',price:'500-3000 ₺',sss:[{q:'Lazer leke tedavisi kaç seansta sonuç verir?',a:'Leke türüne göre 3-6 seans arası değişir. Güneş lekelerinde genellikle 3 seansta belirgin azalma görülür.'},{q:'Dövme silme acıtır mı?',a:'Soğutma sistemimiz sayesinde hissedilen ağrı minimaldir. Seans sayısı dövme boyutu ve rengine göre değişir.'}]},
    'Cilt Yenileme':{img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=375&fit=crop&q=80',desc:'Kimyasal peeling, mikrodermabrazyon ve fraksiyonel lazer ile ölü deriden arının, ışıltılı bir cilde kavuşun.',dur:'45-75 dk',price:'1000-3500 ₺',sss:[{q:'Kimyasal peeling sonrası soyulma olur mu?',a:'Evet, peeling derinliğine göre 3-7 gün hafif soyulma görülür. Bu, cildin yenilendiğinin işaretidir.'},{q:'Mikrodermabrazyon kimler için uygun değildir?',a:'Aktif akne, rosacea alevlenmesi, açık yara veya güneş yanığı olanlarda önerilmez. Öncesinde danışmanlık alınır.'}]},
    'Lüks Bakım':{img:'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=375&fit=crop&q=80',desc:'VIP paketimizde özel serumlar, altın maske, gül yağı masajı ve şampanya ikramıyla unutulmaz bir deneyim.',dur:'120-180 dk',price:'3000-8000 ₺',sss:[{q:'VIP pakette neler dahil?',a:'Özel cilt analizi, altın 24K maske, gül yağı ile yüz masajı, şampanya ikramı ve kişiye özel bakım rutini hediyesi.'},{q:'Hediye sertifikası alabilir miyim?',a:'Evet, Lüks Bakım paketi sevdiklerinize hediye edebileceğiniz özel sertifika ile sunulmaktadır.'}]}
  };

  const mo=document.getElementById('mo'),mob=document.getElementById('mob'),mox=document.getElementById('mox');
  const moh=document.getElementById('moh'),mon=document.getElementById('mon'),mod=document.getElementById('mod');
  const moi=document.getElementById('moi'),mobr=document.getElementById('mobr'),most=document.getElementById('most');
  const mosi=document.getElementById('mosi'),mos=document.getElementById('mos');

  if(!mo)return;

  const openModal=(name)=>{
    const d=sd[name];
    if(!d)return;
    moh.textContent=name;
    moi.src=d.img;
    moi.alt=name;
    mod.textContent=d.desc;
    mon.textContent='Özel Bakım';
    most.innerHTML='<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>'+d.dur+'</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>'+d.price+'</span>';
    if(d.sss&&d.sss.length){mos.style.display='';mosi.innerHTML=d.sss.map((s,i)=>'<div class="msi"><button class="msiq" onclick="(function(b){b.closest(\'.msi\').classList.toggle(\'on\')})(this)"><span>'+s.q+'</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg></button><div class="msia"><p>'+s.a+'</p></div></div>').join('')}else mos.style.display='none';
    mobr.dataset.service=name;
    mo.classList.add('on');
    document.body.style.overflow='hidden';
    if(cd)cd.style.display='none';
    if(cr)cr.style.display='none';
  };

  const closeModal=()=>{
    mo.classList.remove('on');
    document.body.style.overflow='';
    if(cd)cd.style.display='';
    if(cr)cr.style.display='';
  };

  mob.addEventListener('click',closeModal);
  mox.addEventListener('click',closeModal);

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

  mobr.addEventListener('click',function(){
    const nm=this.dataset.service;
    closeModal();
    setTimeout(()=>go(nm),300);
  });

  document.querySelectorAll('#hizmetler .tc').forEach(el=>{
    el.addEventListener('click',function(e){
      if(e.target.closest('.bl'))return;
      const nm=this.querySelector('h3')?.textContent||'';
      if(sd[nm])openModal(nm);
      else go(nm);
    });
  });

  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
})();