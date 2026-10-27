/**
 * Main Controller & UI Interactions
 * Typewriter, Smooth Scroll, Carousel, Netlify Forms & Toast Notifications
 */

(function () {
  // 1. Typewriter Effect
  const roles = [
    'Backend & Cloud Platform Engineer',
    '0-to-1 Cloud Systems Builder',
    'C# · ASP.NET Core 8 · RabbitMQ',
    'Distributed Workers & e-NACH Billing'
  ];

  const roleEl = document.getElementById('typewriter-role');
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function typeEffect() {
    if (!roleEl) return;
    const current = roles[roleIdx];

    if (isDeleting) {
      roleEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      roleEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      typeSpeed = 2200; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // 2. Navbar on Scroll
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar);

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      }
    });
  }

  // 4. Milestones / Highlights Carousel
  const track = document.getElementById('carousel-track');
  const cards = document.querySelectorAll('.carousel-card');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');

  if (track && cards.length > 0) {
    let currentSlide = 0;
    let cardsPerView = getCardsPerView();
    let totalSlides = Math.ceil(cards.length - cardsPerView + 1);

    function getCardsPerView() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      totalSlides = Math.max(1, cards.length - cardsPerView + 1);
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === currentSlide ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      cardsPerView = getCardsPerView();
      totalSlides = Math.max(1, cards.length - cardsPerView + 1);
      if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;

      const cardWidth = cards[0].offsetWidth;
      const gap = 24; // 1.5rem
      const offset = currentSlide * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }
    }

    function goToSlide(index) {
      currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
      updateCarousel();
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(0); // Loop
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentSlide > 0) {
          goToSlide(currentSlide - 1);
        } else {
          goToSlide(totalSlides - 1);
        }
      });
    }

    // Touch swipe support
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        if (btnNext) btnNext.click();
      } else if (endX - startX > 50) {
        if (btnPrev) btnPrev.click();
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      createDots();
      updateCarousel();
    });

    createDots();
    updateCarousel();
  }

  // 5. Toast Notification System
  window.showToast = function (message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-emerald);"></i> <span>${message}</span>`;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 3500);
  };

  // 6. Copy Email Buttons
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'neel.tilak@hirdhav.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      }).catch(() => {
        showToast('Copied to clipboard!');
      });
    });
  });

  // Query button smooth focus
  const aboutQueryBtn = document.getElementById('about-query-btn');
  if (aboutQueryBtn) {
    aboutQueryBtn.addEventListener('click', () => {
      setTimeout(() => {
        const nameInput = document.getElementById('contact-name');
        if (nameInput) nameInput.focus();
      }, 500);
    });
  }

  // 7. Interactive Security CAPTCHA & Anti-DDoS Engine
  const captchaCanvas = document.getElementById('captcha-canvas');
  const captchaInput = document.getElementById('captcha-input');
  const captchaToken = document.getElementById('captcha-token');
  const captchaRefreshBtn = document.getElementById('captcha-refresh-btn');
  const captchaFeedback = document.getElementById('captcha-feedback');

  let currentCaptchaCode = '';

  function drawCaptcha(code) {
    if (!captchaCanvas) return;
    const ctx = captchaCanvas.getContext('2d');
    const w = captchaCanvas.width;
    const h = captchaCanvas.height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0B0F19');
    grad.addColorStop(1, '#151C2C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle background noise dots
    for (let i = 0; i < 45; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.25)' : 'rgba(6, 182, 212, 0.25)';
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Intersecting wavy interference lines
    for (let l = 0; l < 3; l++) {
      ctx.strokeStyle = l % 2 === 0 ? 'rgba(139, 92, 246, 0.35)' : 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * h);
      ctx.bezierCurveTo(
        w * 0.3, Math.random() * h,
        w * 0.7, Math.random() * h,
        w, Math.random() * h
      );
      ctx.stroke();
    }

    // Render distorted alphanumeric characters
    const charList = code.split('');
    const charWidth = w / (charList.length + 1);

    charList.forEach((char, idx) => {
      ctx.save();
      const x = (idx + 1) * charWidth - 5;
      const y = h / 2 + (Math.random() * 6 - 3) + 4;
      const angle = (Math.random() * 0.3 - 0.15); // Slight tilt

      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.font = 'bold 21px "JetBrains Mono", Consolas, monospace';
      ctx.fillStyle = idx % 2 === 0 ? '#C4B5FD' : '#67E8F9';
      ctx.shadowColor = idx % 2 === 0 ? '#8B5CF6' : '#06B6D4';
      ctx.shadowBlur = 4;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  }

  function fetchNewCaptcha() {
    if (captchaFeedback) captchaFeedback.style.display = 'none';
    if (captchaInput) {
      captchaInput.value = '';
      captchaInput.style.borderColor = '';
    }

    fetch('/api/captcha', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.code && data.token) {
          currentCaptchaCode = data.code;
          if (captchaToken) captchaToken.value = data.token;
          drawCaptcha(data.code);
        }
      })
      .catch(() => {
        // Fallback local generator if running offline
        const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let fallbackCode = '';
        for (let i = 0; i < 6; i++) {
          fallbackCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        currentCaptchaCode = fallbackCode;
        if (captchaToken) captchaToken.value = 'local:' + Date.now();
        drawCaptcha(fallbackCode);
      });
  }

  if (captchaRefreshBtn) {
    captchaRefreshBtn.addEventListener('click', fetchNewCaptcha);
  }
  if (captchaCanvas) {
    captchaCanvas.addEventListener('click', fetchNewCaptcha);
  }

  // Initialize CAPTCHA on page load
  if (captchaCanvas) {
    fetchNewCaptcha();
  }

  // 8. Contact & Query Form Submission with Anti-Bot Protection
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userCaptcha = captchaInput ? captchaInput.value.trim().toUpperCase() : '';
      if (!userCaptcha) {
        if (captchaFeedback) {
          captchaFeedback.className = 'captcha-feedback error';
          captchaFeedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter the security verification code.';
          captchaFeedback.style.display = 'block';
        }
        if (captchaInput) {
          captchaInput.focus();
          captchaInput.style.borderColor = '#FB7185';
        }
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Verifying &amp; Transmitting...`;

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        subject: formData.get('subject') || 'Portfolio Query',
        message: formData.get('message') || '',
        captcha_input: userCaptcha,
        captcha_token: captchaToken ? captchaToken.value : '',
        bot_field: formData.get('bot-field') || ''
      };

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(data.error || `Server responded with status ${res.status}`);
          }
          return data;
        })
        .then((data) => {
          showToast('Message transmitted! Your verified query was sent directly to Neel Tilak via Gmail.');
          contactForm.reset();
          if (captchaFeedback) {
            captchaFeedback.className = 'captcha-feedback success';
            captchaFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Security challenge passed. Transmission dispatched.';
            captchaFeedback.style.display = 'block';
            setTimeout(() => { captchaFeedback.style.display = 'none'; }, 4000);
          }
          fetchNewCaptcha();
        })
        .catch((err) => {
          console.warn('Form submission error:', err);
          if (captchaFeedback) {
            captchaFeedback.className = 'captcha-feedback error';
            captchaFeedback.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${err.message}`;
            captchaFeedback.style.display = 'block';
          }
          if (captchaInput) {
            captchaInput.focus();
            captchaInput.style.borderColor = '#FB7185';
          }
          showToast(`Transmission blocked: ${err.message}`);
          fetchNewCaptcha();
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  }

  // 8. Theme Toggle Button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const root = document.documentElement;
      const current = root.getAttribute('data-theme');
      const next = current === 'cyber-glow' ? 'default' : 'cyber-glow';
      root.setAttribute('data-theme', next);
      showToast(`Visual theme: ${next === 'cyber-glow' ? 'Cyber Glow' : 'Slate Minimal'}`);
    });
  }

  // 9. Initialize Typewriter
  typeEffect();
  updateNavbar();
})();
