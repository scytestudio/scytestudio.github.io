document.addEventListener('DOMContentLoaded', ()=>{
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');
  const topnav = document.querySelector('.topnav');
  const hamburger = document.querySelector('.hamburger');

  function showSection(id){
    sections.forEach(s=>{
      if(s.id === id){
        s.classList.remove('hidden');
        s.classList.add('show');
      } else {
        s.classList.remove('show');
        s.classList.add('hidden');
      }
    });
  }

  navButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      navButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      showSection(target);
      // close mobile menu after navigation
      if(topnav && topnav.classList.contains('open')){
        topnav.classList.remove('open');
        if(hamburger) hamburger.setAttribute('aria-expanded','false');
      }
    });
  });

  // Hamburger toggle for mobile
  if(hamburger){
    hamburger.addEventListener('click', (e)=>{
      e.stopPropagation();
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      topnav.classList.toggle('open');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e)=>{
    if(!topnav) return;
    if(topnav.classList.contains('open')){
      const inside = e.target.closest('.topnav');
      if(!inside){
        topnav.classList.remove('open');
        if(hamburger) hamburger.setAttribute('aria-expanded','false');
      }
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && topnav && topnav.classList.contains('open')){
      topnav.classList.remove('open');
      if(hamburger) hamburger.setAttribute('aria-expanded','false');
    }
  });

  // optional: support hash links on load
  if(location.hash){
    const target = location.hash.replace('#','');
    const btn = document.querySelector(`.nav-btn[data-target="${target}"]`);
    if(btn) btn.click();
  }

  /* Hero slider implementation */
  const slider = document.querySelector('.hero-slider');
  if(slider){
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('.slide-prev');
    const next = slider.querySelector('.slide-next');
    const dotsWrap = slider.querySelector('.slide-dots');
    let current = slides.findIndex(s=>s.classList.contains('active'));
    if(current < 0) current = 0;

    // build dots
    slides.forEach((s,i)=>{
      const btn = document.createElement('button');
      btn.addEventListener('click', ()=>goTo(i));
      if(i===current) btn.classList.add('active');
      dotsWrap.appendChild(btn);
    });

    const dots = Array.from(dotsWrap.children);

    function goTo(i){
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (i+slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }
    function nextSlide(){ goTo(current+1); }
    function prevSlide(){ goTo(current-1); }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    // autoplay
    let autoplay = slider.dataset.autoplay === 'true';
    let interval = parseInt(slider.dataset.interval || '5000',10);
    let timer = null;
    function start(){ if(autoplay) timer = setInterval(nextSlide, interval); }
    function stop(){ if(timer){ clearInterval(timer); timer = null; } }
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    start();
  }

});
