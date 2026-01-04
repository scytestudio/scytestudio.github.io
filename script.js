document.addEventListener('DOMContentLoaded', ()=>{
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

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
    });
  });

  // optional: support hash links
  if(location.hash){
    const target = location.hash.replace('#','');
    const btn = document.querySelector(`.nav-btn[data-target="${target}"]`);
    if(btn) btn.click();
  }
});
console.log("Scyte Studios Ltd - Empowering Innovation");