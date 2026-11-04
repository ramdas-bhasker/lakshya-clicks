/* ==========================================================================
   LAKSHYA CLICKS — Award-Winning Indian Wedding Photography & Cinema Atelier
   Interactive Engine (Vanilla JS + Optional GSAP/ScrollTrigger & Lenis)
   ========================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    document.documentElement.classList.add('js-anim-ready');
  }

  /* --------------------------------------------------------------------------
     1. LENIS SMOOTH SCROLLING (IF LOADED)
     -------------------------------------------------------------------------- */
  function initSmoothScroll() {
    if (prefersReducedMotion || typeof window.Lenis === 'undefined') return;
    try {
      const lenis = new window.Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });

      if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
        lenis.on('scroll', window.ScrollTrigger.update);
        window.gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } catch (err) {
      // Fallback to native smooth scroll
    }
  }

  /* --------------------------------------------------------------------------
     2. AMBIENT FLOATING PHOTOGRAPHY & INDIAN LOTUS ORNAMENTS
     -------------------------------------------------------------------------- */
  function initAmbientBackground() {
    if (prefersReducedMotion || document.querySelector('.ambient-bg-layer')) return;

    const layer = document.createElement('div');
    layer.className = 'ambient-bg-layer';
    layer.setAttribute('aria-hidden', 'true');

    const svgAperture = `
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" />
        <circle cx="32" cy="32" r="13" stroke-dasharray="4 3" />
        <line x1="32" y1="4" x2="44" y2="24" />
        <line x1="56" y1="18" x2="36" y2="28" />
        <line x1="56" y1="46" x2="40" y2="40" />
        <line x1="32" y1="60" x2="20" y2="40" />
        <line x1="8" y1="46" x2="28" y2="36" />
        <line x1="8" y1="18" x2="24" y2="24" />
      </svg>`;

    const svgLotus = `
      <svg viewBox="0 0 64 64">
        <path d="M32 10 C38 22 42 32 32 46 C22 32 26 22 32 10 Z" />
        <path d="M32 46 C44 42 54 32 52 20 C42 24 36 32 32 46 Z" />
        <path d="M32 46 C20 42 10 32 12 20 C22 24 28 32 32 46 Z" />
        <path d="M16 50 Q32 56 48 50" />
      </svg>`;

    const svgSparkle = `
      <svg viewBox="0 0 40 40">
        <path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" />
      </svg>`;

    const svgCamera = `
      <svg viewBox="0 0 64 64">
        <rect x="8" y="18" width="48" height="34" rx="4" />
        <path d="M22 18L26 11H38L42 18" />
        <circle cx="32" cy="35" r="10" />
      </svg>`;

    const items = [
      { cls: 'ambient-aperture', svg: svgAperture, top: '14%', left: '4%', size: '58px', delay: '0s' },
      { cls: 'ambient-camera', svg: svgLotus, top: '29%', left: '92%', size: '52px', delay: '-4s' },
      { cls: 'ambient-sparkle', svg: svgSparkle, top: '46%', left: '7%', size: '26px', delay: '-2s' },
      { cls: 'ambient-heart', svg: svgCamera, top: '63%', left: '91%', size: '44px', delay: '-7s' },
      { cls: 'ambient-aperture', svg: svgLotus, top: '78%', left: '5%', size: '56px', delay: '-11s' },
      { cls: 'ambient-sparkle', svg: svgSparkle, top: '86%', left: '89%', size: '28px', delay: '-5s' },
      { cls: 'ambient-sparkle', svg: svgSparkle, top: '19%', left: '85%', size: '22px', delay: '-3.5s' }
    ];

    items.forEach((item) => {
      const el = document.createElement('div');
      el.className = `ambient-item ${item.cls}`;
      el.style.top = item.top;
      el.style.left = item.left;
      el.style.width = item.size;
      el.style.height = item.size;
      el.style.animationDelay = item.delay;
      el.innerHTML = item.svg;
      layer.appendChild(el);
    });

    document.body.prepend(layer);
  }

  /* --------------------------------------------------------------------------
     3. CUSTOM DESKTOP LUXURY CURSOR WITH "VIEW" BADGE
     -------------------------------------------------------------------------- */
  function initCustomCursor() {
    if (prefersReducedMotion || window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    ring.innerHTML = '<span>View</span>';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.gallery-item, .art-service-item, .story-landscape-hero')) {
        document.body.classList.add('cursor-gallery');
        document.body.classList.remove('cursor-hover');
      } else if (e.target.closest('a, button, input, select, textarea')) {
        document.body.classList.add('cursor-hover');
        document.body.classList.remove('cursor-gallery');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.gallery-item, .art-service-item, .story-landscape-hero')) {
        document.body.classList.remove('cursor-gallery');
      } else if (e.target.closest('a, button, input, select, textarea')) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. HEADER, STICKY NAV, MOBILE DRAWER & DROPDOWN
     -------------------------------------------------------------------------- */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    const backToTopBtn = document.querySelector('.back-to-top');

    function handleScroll() {
      const scrollY = window.scrollY;
      if (header) {
        header.classList.toggle('scrolled', scrollY > 48);
      }
      if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', scrollY > 520);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    dropdownItems.forEach((item) => {
      const trigger = item.querySelector('.dropdown-toggle-trigger');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          if (window.innerWidth <= 991) {
            e.preventDefault();
            item.classList.toggle('open');
          }
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. GSAP + SCROLLTRIGGER & INTERSECTION OBSERVER REVEALS
     -------------------------------------------------------------------------- */
  function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .clip-reveal');

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -35px 0px' }
      );
      revealElements.forEach((el) => observer.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('revealed'));
    }

    // Hero & Section Parallax
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && !prefersReducedMotion) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight * 1.2) {
          heroBg.style.transform = `translate3d(0, ${scrolled * 0.24}px, 0)`;
        }
      }, { passive: true });
    }

    // Optional GSAP enhancements when CDN is loaded
    if (!prefersReducedMotion && typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      window.gsap.registerPlugin(window.ScrollTrigger);

      document.querySelectorAll('.parallax-media img').forEach((img) => {
        window.gsap.fromTo(
          img,
          { yPercent: -6, scale: 1.08 },
          {
            yPercent: 6,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. GALLERY FILTERING (4-COLUMN SHORTEST-HEIGHT MASONRY) & LIGHTBOX VIEWER
     -------------------------------------------------------------------------- */
  function initGalleryAndLightbox() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const interludes = Array.from(document.querySelectorAll('.gallery-editorial-interlude'));

    // Sort master list by data-order so shortest-column distribution matches canonical order
    const orderedGalleryItems = galleryItems.slice().sort((a, b) => {
      const orderA = parseInt(a.getAttribute('data-order') || '999', 10);
      const orderB = parseInt(b.getAttribute('data-order') || '999', 10);
      return orderA - orderB;
    });

    function rebalanceMasonryColumns(container, visibleItems) {
      const columns = Array.from(container.querySelectorAll('.masonry-column'));
      if (columns.length === 0) return;

      const colHeights = columns.map(() => 0);
      columns.forEach((col) => {
        col.innerHTML = '';
      });

      visibleItems.forEach((item) => {
        // Find shortest column (first shortest on tie, matching Squarespace GalleryMasonry)
        let minIdx = 0;
        for (let i = 1; i < colHeights.length; i++) {
          if (colHeights[i] < colHeights[minIdx] - 0.01) {
            minIdx = i;
          }
        }
        columns[minIdx].appendChild(item);
        const isPortrait = item.classList.contains('ratio-portrait') || item.classList.contains('tall');
        colHeights[minIdx] += isPortrait ? 1.5 : 0.6667;
      });
    }

    if (filterButtons.length > 0 && galleryItems.length > 0) {
      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filterValue = btn.getAttribute('data-filter');

          interludes.forEach((interlude) => {
            interlude.style.display = filterValue === 'all' ? '' : 'none';
          });

          const matchingItems = [];
          orderedGalleryItems.forEach((item) => {
            const category = item.getAttribute('data-category') || '';
            const matches = filterValue === 'all' || category.split(' ').includes(filterValue);
            if (matches) {
              item.classList.remove('hidden-item');
              matchingItems.push(item);
            } else {
              item.classList.add('hidden-item');
            }
          });

          const masonryContainer = document.querySelector('#gallery-grid.editorial-masonry, .editorial-masonry');
          if (masonryContainer && masonryContainer.querySelectorAll('.masonry-column').length > 0) {
            rebalanceMasonryColumns(masonryContainer, matchingItems);
          }

          matchingItems.forEach((item, idx) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(18px) scale(0.985)';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            }, 28 * (idx % 10));
          });
        });
      });
    }

    if (galleryItems.length === 0) return;

    let lightbox = document.querySelector('.lightbox-modal');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox-modal';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Photograph Lightbox');
      lightbox.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Close Lightbox">Close ✕</button>
        <button type="button" class="lightbox-nav-btn lightbox-prev" aria-label="Previous Photograph">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <figure class="lightbox-figure">
          <img class="lightbox-img" src="" alt="" />
          <figcaption class="lightbox-caption-bar">
            <span class="lightbox-title"></span>
            <span class="lightbox-counter"></span>
          </figcaption>
        </figure>
        <button type="button" class="lightbox-nav-btn lightbox-next" aria-label="Next Photograph">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;

    function getVisibleItems() {
      return galleryItems.filter((item) => !item.classList.contains('hidden-item'));
    }

    function updateLightbox(index) {
      const visible = getVisibleItems();
      if (visible.length === 0) return;
      currentIndex = (index + visible.length) % visible.length;
      const targetItem = visible[currentIndex];
      const imgEl = targetItem.querySelector('img');
      const captionEl = targetItem.querySelector('.gallery-item-caption');
      const catEl = targetItem.querySelector('.gallery-item-cat');

      const highResSrc = targetItem.getAttribute('data-full') || (imgEl ? imgEl.src : '');
      const titleText = captionEl ? captionEl.textContent : (imgEl ? imgEl.alt : 'Editorial Frame');
      const catText = catEl ? `${catEl.textContent} — ` : '';

      lightboxImg.style.opacity = '0.25';
      setTimeout(() => {
        lightboxImg.src = highResSrc;
        lightboxImg.alt = titleText;
        lightboxTitle.textContent = `${catText}${titleText}`;
        lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
        lightboxImg.style.opacity = '1';
      }, 130);
    }

    function openLightbox(clickedItem) {
      const visible = getVisibleItems();
      const idx = visible.indexOf(clickedItem);
      if (idx === -1) return;
      updateLightbox(idx);
      lightbox.classList.add('active');
      document.body.classList.add('modal-open');
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('modal-open');
    }

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => openLightbox(item));
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(item);
        }
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex - 1);
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
    });

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) updateLightbox(currentIndex - 1);
        else updateLightbox(currentIndex + 1);
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     7. CINEMATOGRAPHY VIDEO REEL MODAL
     -------------------------------------------------------------------------- */
  function initVideoModal() {
    const playBtns = document.querySelectorAll('.play-reel-btn');
    const videoModal = document.querySelector('.video-modal');
    if (playBtns.length === 0 || !videoModal) return;

    const closeBtn = videoModal.querySelector('.modal-close-btn');
    const videoEl = videoModal.querySelector('video');

    function openVideoModal(btn) {
      const videoSrc = btn.getAttribute('data-video');
      if (videoEl && videoSrc) {
        videoEl.src = videoSrc;
      }
      videoModal.classList.add('active');
      document.body.classList.add('modal-open');
      if (videoEl) {
        videoEl.play().catch(() => {});
      }
    }

    function closeVideoModal() {
      videoModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      if (videoEl) {
        videoEl.pause();
      }
    }

    playBtns.forEach((btn) => {
      btn.addEventListener('click', () => openVideoModal(btn));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. TESTIMONIAL SLIDER
     -------------------------------------------------------------------------- */
  function initTestimonialSlider() {
    const sliderWrap = document.querySelector('.testimonial-slider-wrap');
    if (!sliderWrap) return;

    const slides = Array.from(sliderWrap.querySelectorAll('.testimonial-slide'));
    const dots = Array.from(sliderWrap.querySelectorAll('.slider-dot'));
    const prevBtn = sliderWrap.querySelector('.slider-prev');
    const nextBtn = sliderWrap.querySelector('.slider-next');

    if (slides.length <= 1) return;

    let activeIdx = 0;
    let autoTimer = null;

    function showSlide(index) {
      activeIdx = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === activeIdx));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIdx));
    }

    function startAuto() {
      if (prefersReducedMotion) return;
      stopAuto();
      autoTimer = setInterval(() => showSlide(activeIdx + 1), 6500);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(activeIdx - 1);
        startAuto();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(activeIdx + 1);
        startAuto();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startAuto();
      });
    });

    sliderWrap.addEventListener('mouseenter', stopAuto);
    sliderWrap.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  /* --------------------------------------------------------------------------
     9. CONTACT FORM VALIDATION
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('luxuryContactForm');
    if (!form) return;

    const statusBox = document.getElementById('formStatusBox');

    function validateField(input) {
      const group = input.closest('.form-group');
      const errorEl = group ? group.querySelector('.field-error') : null;
      let errorMessage = '';
      const val = input.value.trim();

      if (input.hasAttribute('required') && !val) {
        errorMessage = 'Please fill in this detail so we can get back to you.';
      } else if (input.type === 'email' && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          errorMessage = 'Please enter a valid email address.';
        }
      } else if (input.type === 'tel' && val) {
        const phoneRegex = /^[+\d\s\-()]{8,20}$/;
        if (!phoneRegex.test(val)) {
          errorMessage = 'Please enter a valid 10+ digit phone number.';
        }
      }

      if (errorMessage) {
        input.classList.add('invalid');
        if (group) group.classList.add('has-error');
        if (errorEl) errorEl.textContent = errorMessage;
        return false;
      } else {
        input.classList.remove('invalid');
        if (group) group.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
        return true;
      }
    }

    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isFormValid = true;
      inputs.forEach((input) => {
        if (!validateField(input)) isFormValid = false;
      });

      if (!isFormValid) {
        const firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const nameVal = (form.querySelector('#clientName') || {}).value || 'Friend';
      const serviceSelect = form.querySelector('#serviceType');
      const serviceVal = serviceSelect && serviceSelect.options[serviceSelect.selectedIndex]
        ? serviceSelect.options[serviceSelect.selectedIndex].text
        : 'Celebration';
      const dateVal = (form.querySelector('#eventDate') || {}).value || 'Upcoming Date';

      if (statusBox) {
        statusBox.classList.add('visible');
        statusBox.innerHTML = `
          <strong style="font-family: var(--font-display); font-size: 1.4rem; display: block; margin-bottom: 0.35rem;">
            Thank you, ${nameVal.replace(/[<>&"']/g, '')}! We've noted your inquiry.
          </strong>
          <p style="font-size: 0.88rem; line-height: 1.65;">
            We can't wait to hear more about your <em>${serviceVal}</em> (${dateVal}).
            Since this website runs as a static front-end showcase, you can also click the WhatsApp button to chat with us right away!
          </p>
        `;
        form.reset();
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. IMAGE FALLBACK PROTECTION
     -------------------------------------------------------------------------- */
  function initImageFallback() {
    document.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', function handleImgError() {
        if (this.dataset.fallbackApplied) return;
        this.dataset.fallbackApplied = 'true';
        const label = encodeURIComponent(this.alt || 'Lakshya Clicks Indian Wedding Archive');
        this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="%23451C2B"/><rect x="40" y="40" width="1120" height="820" fill="none" stroke="%23B08D57" stroke-width="1.5" stroke-opacity="0.55"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="%23D4B483" font-family="Georgia, serif" font-style="italic" font-size="38">Lakshya Clicks — Indian Wedding Archive</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="%23F6F0E8" fill-opacity="0.75" font-family="sans-serif" font-size="18" letter-spacing="4">${label}</text></svg>`;
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. FAQ ACCORDION INTERACTION
     -------------------------------------------------------------------------- */
  function initFaqAccordion() {
    const faqItems = Array.from(document.querySelectorAll('.faq-item'));
    if (faqItems.length === 0) return;

    function updateFaqHeights() {
      faqItems.forEach((item) => {
        const answer = item.querySelector('.faq-answer');
        const btn = item.querySelector('.faq-question');
        if (!answer) return;
        if (item.classList.contains('active')) {
          answer.style.maxHeight = `${answer.scrollHeight + 24}px`;
          if (btn) btn.setAttribute('aria-expanded', 'true');
        } else {
          answer.style.maxHeight = '0px';
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isAlreadyActive = item.classList.contains('active');
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isAlreadyActive) {
          item.classList.add('active');
        }
        updateFaqHeights();
      });
    });

    updateFaqHeights();
    window.addEventListener('resize', updateFaqHeights, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initAmbientBackground();
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initGalleryAndLightbox();
    initVideoModal();
    initTestimonialSlider();
    initContactForm();
    initImageFallback();
    initFaqAccordion();
  });
})();
