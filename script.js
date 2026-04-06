/* ═══════════════════════════════════════════════════
   RAJESH KANNA S — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CURSOR ── */
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smooth trailing cursor
  let tx = 0, ty = 0;
  function animateTrail() {
    tx += (mx - tx) * 0.15;
    ty += (my - ty) * 0.15;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover effect on interactive elements
  const interactives = document.querySelectorAll('a, button, .stag, .mcard, .proj-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* ── NAV SCROLL ── */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── HAMBURGER / MOBILE MENU ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger children in same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 60) + 'ms';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── MINI PROJECT FILTER ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const miniCards  = document.querySelectorAll('.mcard:not(.mcard-placeholder)');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      miniCards.forEach(card => {
        const cat = card.dataset.cat;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeInCard 0.3s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Inject keyframe for filter animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  /* ── CONTACT FORM ── */
  const cfSubmit = document.getElementById('cfSubmit');
  if (cfSubmit) {
    cfSubmit.addEventListener('click', () => {
      const name  = document.getElementById('cf-name')?.value.trim();
      const email = document.getElementById('cf-email')?.value.trim();
      const msg   = document.getElementById('cf-msg')?.value.trim();

      if (!name || !email || !msg) {
        shake(cfSubmit);
        return;
      }

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
      window.open(`mailto:srk8115939@gmail.com?subject=${subject}&body=${body}`);
    });
  }

  function shake(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'shake 0.4s ease';
    if (!document.getElementById('shake-kf')) {
      const s = document.createElement('style');
      s.id = 'shake-kf';
      s.textContent = `
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }`;
      document.head.appendChild(s);
    }
  }

  /* ── RESUME BUTTON ── */
  const resumeBtn       = document.getElementById('resumeBtn');
  const mobileResumeBtn = document.getElementById('mobileResumeBtn');

  function openResume(e) {
    e.preventDefault();
    // TODO: Replace the URL below with your actual hosted resume PDF link
    // Example: window.open('https://drive.google.com/file/d/YOUR_FILE_ID/view', '_blank');
    alert('📄 Add your resume PDF link!\n\nOpen script.js and find the openResume() function.\nPaste your Google Drive / Notion link there.');
  }

  if (resumeBtn)       resumeBtn.addEventListener('click', openResume);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResume);

  /* ── SMOOTH SCROLL for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── CONSOLE EASTER EGG ── */
  console.log('%c👋 Hey there, fellow dev!', 'font-size:18px; font-weight:bold; color:#c8f135;');
  console.log('%cThis portfolio was built by Rajesh Kanna S.', 'font-size:13px; color:#888;');
  console.log('%cCheck me out: github.com/rk192324217', 'font-size:12px; color:#555;');

})();
