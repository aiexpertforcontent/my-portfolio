/**
 * ==========================================================================
 * BOMBAY CLINIC - MAIN INTERACTION SCRIPT
 * Lightweight, zero-dependency vanilla JS
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initMobileDrawer();
  initModals();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. FULLSCREEN HERO SLIDER / CAROUSEL
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const heroContainer = document.querySelector('.hero-fullscreen');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 4500; // 4.5 seconds per slide

  const goToSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, slideDuration);
  };

  const stopAutoPlay = () => {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  };

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      startAutoPlay();
    });
  });

  if (heroContainer) {
    heroContainer.addEventListener('mouseenter', stopAutoPlay);
    heroContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Start initial autoplay
  startAutoPlay();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawerBackdrop) return;

  const openDrawer = () => {
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

  drawerBackdrop.addEventListener('click', (e) => {
    if (e.target === drawerBackdrop) closeDrawer();
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerBackdrop.classList.contains('open')) closeDrawer();
  });
}

/* --------------------------------------------------------------------------
   3. UNIVERSAL APPOINTMENT MODAL
   -------------------------------------------------------------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalBackdrop = document.querySelector('#appointmentModal');
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector('.modal-close');
  const form = modalBackdrop.querySelector('#modalBookingForm');
  const successState = modalBackdrop.querySelector('#modalBookingSuccess');

  const openModal = (doctorName = '') => {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (doctorName && form) {
      const select = form.querySelector('select[name="doctor"]');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.toLowerCase().includes(doctorName.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (form) {
        form.reset();
        form.style.display = 'block';
      }
      if (successState) successState.style.display = 'none';
    }, 300);
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const doctor = btn.getAttribute('data-doctor') || '';
      openModal(doctor);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   4. SMOOTH ANCHOR SCROLLING
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || link.hasAttribute('data-open-modal')) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 76;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
