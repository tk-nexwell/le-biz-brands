(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  function closeMenu() {nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}
  toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(document.activeElement && nav?.contains(document.activeElement))toggle.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  // Reveal only below-the-fold content, and never gate keyboard access.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    document.querySelectorAll('[data-reveal]').forEach(el => {
      if(el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('will-reveal');
        observer.observe(el);
        el.addEventListener('focusin', () => el.classList.add('is-visible'));
      }
    });
  }
  const form=document.querySelector('#inquiry-form');
  if(!form)return;
  const labels={baby:'Baby & Family',care:'Personal Care',home:'Home & Lifestyle',toys:'Toys',other:'Other / Multiple'};
  const category=new URLSearchParams(location.search).get('category');
  if(Object.hasOwn(labels,category))form.elements.category.value=category;
  const ready=document.querySelector('#email-ready');
  const preview=document.querySelector('#email-preview');
  let prepared='';
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const v=Object.fromEntries(new FormData(form));
    const subject=`Wholesale introduction — ${v.company.trim()}`;
    const body=`Hello Cristina,\n\n${v.message.trim()}\n\nCompany: ${v.company.trim()}\nName: ${v.name.trim()}\nBusiness email: ${v.email.trim()}\nWebsite: ${v.website.trim()||'Not provided'}\nRelationship: ${v.relationship}\nCategory: ${labels[v.category]}\n\nBest regards,\n${v.name.trim()}`;
    prepared=`To: wholesale@lebizbrands.com\nSubject: ${subject}\n\n${body}`;
    preview.value=prepared;
    document.querySelector('#open-email').href=`mailto:wholesale@lebizbrands.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.hidden=true;ready.hidden=false;document.querySelector('#open-email').focus();
  });
  document.querySelector('#edit-inquiry').addEventListener('click',()=>{ready.hidden=true;form.hidden=false;form.elements.name.focus();});
  document.querySelector('#copy-email').addEventListener('click',async()=>{
    const status=document.querySelector('#copy-status');
    try{await navigator.clipboard.writeText(prepared);status.textContent='Message copied. Paste it into your email app.';}
    catch{preview.focus();preview.select();status.textContent='Select and copy the prepared message above.';}
  });
})();
