/* script.js - small interactions: mobile nav, slider, contact UX */

document.addEventListener('DOMContentLoaded', function(){
  // nav toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  navToggle.addEventListener('click', ()=> {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    siteNav.style.display = expanded ? '' : 'flex';
  });

  // simple slider
  const slider = document.querySelector('[data-slider]');
  const slides = slider.querySelectorAll('.slide');
  let current = 0;
  const show = (index) => {
    slides.forEach((s,i)=> s.classList.toggle('active', i===index));
  };
  show(current);

  const nextBtn = slider.querySelector('[data-next]') || slider.querySelector('.next');
  const prevBtn = slider.querySelector('[data-prev]') || slider.querySelector('.prev');
  nextBtn.addEventListener('click', ()=> { current = (current+1)%slides.length; show(current); });
  prevBtn.addEventListener('click', ()=> { current = (current-1 + slides.length)%slides.length; show(current); });

  // autoplay (pauses when user focuses form)
  let autoplay = setInterval(()=> { current = (current+1)%slides.length; show(current); }, 6000);
  slider.addEventListener('mouseover', ()=> clearInterval(autoplay));
  slider.addEventListener('mouseout', ()=> autoplay = setInterval(()=> { current = (current+1)%slides.length; show(current); }, 6000));

  // contact form UX (Formspree used; action points to a sample Formspree endpoint)
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const clearBtn = document.getElementById('clearBtn');

  clearBtn.addEventListener('click', ()=> form.reset());

  form.addEventListener('submit', function(e){
    // Allow Formspree to handle POST; show temporary note
    formNote.textContent = 'Sending...';
    // After a short delay show success message (Formspree will actually send)
    setTimeout(()=> formNote.textContent = 'Thank you! Your message was submitted. We will contact you soon.', 1200);
  });
});
