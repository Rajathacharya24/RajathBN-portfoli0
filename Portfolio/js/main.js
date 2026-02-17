// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', ()=>{
  nav.classList.toggle('open');
});

// Close nav on link click (mobile)
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
  nav.classList.remove('open');
}));

// Reveal on scroll using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.15});
reveals.forEach(r => observer.observe(r));

// Highlight active nav link while scrolling
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');
const sectionObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navLinks.forEach(l=>l.classList.toggle('active-link', l.getAttribute('href') === '#'+id));
    }
  });
},{threshold:0.5});
sections.forEach(s => sectionObserver.observe(s));

// Smooth scroll fallback for older browsers (optional)
(function(){
  if('scrollBehavior' in document.documentElement.style) return; // supported
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth'});
      }
    });
  });
})();