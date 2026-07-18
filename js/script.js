// ============================================
// YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// STICKY NAV
// ============================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

// ============================================
// MOBILE MENU
// ============================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

navToggle.addEventListener('click', () => mobileMenu.classList.add('is-open'));
mobileMenuClose.addEventListener('click', () => mobileMenu.classList.remove('is-open'));
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
);

// ============================================
// SCROLL REVEAL
// ============================================
const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsGrid = document.getElementById('statsGrid');
if (statsGrid) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statsObserver.observe(statsGrid);
}

// ============================================
// BUTTON RIPPLE
// ============================================
document.querySelectorAll('[data-ripple]').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'btn__ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// ============================================
// BEFORE / AFTER COMPARE SLIDERS
// ============================================
document.querySelectorAll('.compare').forEach(compare => {
  const after = compare.querySelector('.compare__after');
  const handle = compare.querySelector('.compare__handle');
  let dragging = false;

  function setPosition(clientX) {
    const rect = compare.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = pct + '%';
  }

  compare.addEventListener('pointerdown', (e) => {
    dragging = true;
    setPosition(e.clientX);
    compare.setPointerCapture(e.pointerId);
  });
  compare.addEventListener('pointermove', (e) => {
    if (dragging) setPosition(e.clientX);
  });
  compare.addEventListener('pointerup', () => dragging = false);
  compare.addEventListener('pointerleave', () => dragging = false);
});

// ============================================
// CAROUSELS (Project 2, Project 5, and any future .carousel)
// ============================================
document.querySelectorAll('.carousel').forEach(carousel => {
  const dotsWrap = document.querySelector(`[data-dots-for="${carousel.id}"]`);
  if (!dotsWrap) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(i) {
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll('.carousel__dot').forEach((d, di) =>
      d.classList.toggle('is-active', di === index)
    );
  }

  let autoplay = setInterval(() => goTo((index + 1) % slides.length), 4500);
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo((index + 1) % slides.length), 4500);
  });
});

// ============================================
// VIDEO PROJECT CTAs (Project 1, Project 6)
// ============================================
document.querySelectorAll('.js-play-video').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const video = btn.closest('.project').querySelector('video');
    if (!video) return;
    video.scrollIntoView({ behavior: 'smooth', block: 'center' });
    video.play().catch(() => {}); // browsers may block autoplay with sound; controls remain available
  });
});
