// ── Dark / Light theme ──────────────────────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

// Apply saved preference before first paint to avoid flash
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    html.setAttribute('data-theme', 'dark');
  }
})();

themeBtn?.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  if (isDark) {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// ── External links ───────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="http"]').forEach((link) => {
  link.rel = "noopener noreferrer";
  link.target = "_blank";
});

// ── Lucide icons ─────────────────────────────────────────────────────────────
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

// ── Project image carousels ─────────────────────────────────────────────────
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.project-carousel__slide'));
  const dots = Array.from(carousel.querySelectorAll('.project-carousel__dots span'));
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));

  if (slides.length < 2) return;
  if (activeIndex < 0) activeIndex = 0;

  const setActiveSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeIndex);
    });
  };

  prev?.addEventListener('click', () => setActiveSlide(activeIndex - 1));
  next?.addEventListener('click', () => setActiveSlide(activeIndex + 1));
  setActiveSlide(activeIndex);
});

// ── Contact form ─────────────────────────────────────────────────────────────
// Handle contact form submit — opens mailto with pre-filled fields
function handleContactForm(event) {
  event.preventDefault();
  const name    = document.getElementById('contact-name')?.value.trim() || '';
  const email   = document.getElementById('contact-email')?.value.trim() || '';
  const subject = document.getElementById('contact-subject')?.value.trim() || 'Portfolio Enquiry';
  const message = document.getElementById('contact-message')?.value.trim() || '';
  const body    = `From: ${name} <${email}>\n\n${message}`;
  window.location.href = `mailto:kofiahendev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
