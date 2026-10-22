/**
 * Main Application Script
 * Shilfa Catherine - Student Web Developer Portfolio
 * Pure HTML5, CSS3, and Vanilla JavaScript (Zero build step, Zero external libraries)
 */

/* ==========================================================================
   1. PROJECTS DATA MODEL
   ========================================================================== */
const projectsData = [
  {
    id: 'taskflow-planner',
    title: 'TaskFlow — Student Task & Study Planner',
    category: 'school',
    typeBadge: 'School Project',
    featured: true,
    description: 'A responsive personal task organizer built for students to manage academic course assignments, track Kanban sprint workflow stages, and plan daily study milestones.',
    imageSrc: 'images/project-one.png',
    imageAlt: 'TaskFlow student study board screenshot showing Kanban task columns and priorities',
    tags: ['HTML5 (Semantic)', 'CSS Grid & Flexbox', 'Vanilla JavaScript (ES6+)', 'LocalStorage API'],
    learned: 'Designed an intuitive mobile-first interface from scratch, implemented clean DOM creation and event delegation without external libraries, and used browser LocalStorage so assignments persist across page refreshes.',
    githubUrl: 'https://github.com/shilfacatherine/taskflow-planner',
    demoUrl: '#projects'
  },
  {
    id: 'dev-canvas-palette',
    title: 'DevCanvas — Accessible Color Contrast & Palette Tool',
    category: 'practice',
    typeBadge: 'Practice Exercise',
    featured: true,
    description: 'An interactive browser utility that tests foreground and background colors against WCAG 2.1 AA and AAA contrast guidelines in real time and generates reusable CSS custom properties.',
    imageSrc: null,
    imageAlt: 'DevCanvas accessible color contrast ratio testing utility preview',
    tags: ['HTML5 Form Controls', 'CSS Custom Properties', 'Vanilla JavaScript', 'Math Algorithms'],
    learned: 'Studied digital accessibility standards in depth, programmed the mathematical relative luminance formula in pure JavaScript, and designed an accessible interface with visible keyboard focus indicators.',
    githubUrl: 'https://github.com/shilfacatherine/dev-canvas-palette',
    demoUrl: 'https://github.com/shilfacatherine/dev-canvas-palette'
  },
  {
    id: 'pulse-storefront',
    title: 'Pulse — Responsive Product Showcase & Storefront',
    category: 'personal',
    typeBadge: 'Personal Project',
    featured: true,
    description: 'A modern e-commerce product catalog interface featuring multi-category filtering, instant price sorting, and an accessible shopping bag drawer modal.',
    imageSrc: null,
    imageAlt: 'Pulse responsive e-commerce storefront layout preview',
    tags: ['HTML5 (Semantic)', 'Modern CSS3', 'Vanilla JavaScript', 'Accessible ARIA Modals'],
    learned: 'Practiced responsive multi-column layouts using CSS Grid without frameworks, built keyboard-friendly modal focus traps using vanilla event listeners, and optimized page load speed.',
    githubUrl: 'https://github.com/shilfacatherine/pulse-storefront',
    demoUrl: 'https://github.com/shilfacatherine/pulse-storefront'
  }
];

/* ==========================================================================
   2. INITIALIZATION ON DOM CONTENT LOADED
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initActiveSectionObserver();
  initBackToTop();
  initTypewriter();
  initProjectFilters();
  initContactForm();
});

/* ==========================================================================
   3. THEME MANAGEMENT (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme-preference');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme-preference', newTheme);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    themeToggleBtn.setAttribute('aria-label', label);
    themeToggleBtn.setAttribute('title', label);
  }
}

/* ==========================================================================
   4. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initNavigation() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('primary-nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navLinks) return;

  function toggleMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : !navLinks.classList.contains('is-open');
    menuBtn.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) {
      navLinks.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    } else {
      navLinks.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu());

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      toggleMenu(false);
      menuBtn.focus();
    }
  });
}

/* ==========================================================================
   5. ACTIVE SECTION SCROLL SPY
   ========================================================================== */
function initActiveSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   6. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. ACCESSIBLE TYPEWRITER ROLE ROTATOR
   ========================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typing-role');
  if (!targetElement) return;

  const roles = [
    'Computer Science Student',
    'Beginner Web Developer',
    'Frontend Learner',
    'UI/UX & A11y Enthusiast'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    targetElement.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const backspaceSpeed = 45;
  const pauseAfterComplete = 1800;
  const pauseAfterDelete = 400;

  function typeStep() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      targetElement.textContent = currentRole.substring(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeStep, pauseAfterComplete);
        return;
      }
      setTimeout(typeStep, typingSpeed);
    } else {
      charIndex--;
      targetElement.textContent = currentRole.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeStep, pauseAfterDelete);
        return;
      }
      setTimeout(typeStep, backspaceSpeed);
    }
  }

  setTimeout(typeStep, 600);
}

/* ==========================================================================
   8. PROJECT CARDS RENDERER & CATEGORY FILTERING
   ========================================================================== */
function getProjectVisual(project, title) {
  if (project.imageSrc) {
    return `
      <div class="mockup-visual-viewport">
        <img src="${escapeHtml(project.imageSrc)}" alt="${escapeHtml(project.imageAlt || title)}" loading="lazy">
      </div>
    `;
  }

  if (project.id === 'dev-canvas-palette') {
    return `
      <div class="mockup-visual-viewport">
        <div class="mockup-visual-canvas visual-contrast">
          <div class="contrast-demo-box">
            <div class="contrast-swatch">
              <span class="contrast-sample-text">Aa</span>
            </div>
            <div class="contrast-score-card">
              <div class="contrast-ratio-num">7.4 : 1</div>
              <div class="contrast-badges-row">
                <span class="contrast-pass-badge">✓ WCAG AA</span>
                <span class="contrast-pass-badge">✓ WCAG AAA</span>
              </div>
            </div>
          </div>
          <div class="contrast-meta-info">Relative Luminance Contrast Checker • CSS Variables</div>
        </div>
      </div>
    `;
  }

  if (project.id === 'pulse-storefront') {
    return `
      <div class="mockup-visual-viewport">
        <div class="mockup-visual-canvas visual-storefront">
          <div class="store-mini-nav">
            <span class="store-mini-pill active">All</span>
            <span class="store-mini-pill">Electronics</span>
            <span class="store-mini-pill">Apparel</span>
          </div>
          <div class="store-mini-grid">
            <div class="store-mini-card">
              <div class="store-card-img"></div>
              <div class="store-card-title">Wireless Studio Buds</div>
              <div class="store-card-price">$49.00</div>
            </div>
            <div class="store-mini-card">
              <div class="store-card-img"></div>
              <div class="store-card-title">Mechanical Keyboard</div>
              <div class="store-card-price">$89.00</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // QuizLab or default
  return `
    <div class="mockup-visual-viewport">
      <div class="mockup-visual-canvas visual-quiz">
        <div class="quiz-mini-header">
          <span class="quiz-mini-step">Question 04 / 10</span>
          <span class="quiz-mini-score">850 PTS</span>
        </div>
        <div class="quiz-mini-bar"><div class="quiz-mini-bar-fill"></div></div>
        <div class="quiz-mini-question">What is the primary benefit of semantic HTML5?</div>
        <div class="quiz-mini-options">
          <div class="quiz-mini-opt correct">✓ Improved Accessibility &amp; Search Discovery</div>
          <div class="quiz-mini-opt">Faster JavaScript Execution Only</div>
        </div>
      </div>
    </div>
  `;
}

function renderProjects(projects, container) {
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `
      <div class="projects-empty" role="status">
        <h4>No projects found in this category</h4>
        <p>Try selecting another filter or choose "All Projects".</p>
      </div>
    `;
    return;
  }

  const cardsHtml = projects.map(project => {
    const title = escapeHtml(project.title);
    const desc = escapeHtml(project.description);
    const learned = escapeHtml(project.learned);
    const badgeText = escapeHtml(project.typeBadge || 'Project');
    const tagsHtml = project.tags.map(tag => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join('');
    const visualContent = getProjectVisual(project, title);

    return `
      <article class="project-card" data-category="${escapeHtml(project.category)}">
        <!-- 1. Visual Showcase / Screenshot -->
        <div class="project-preview">
          <div class="project-preview-mockup">
            <div class="mockup-bar">
              <div class="mockup-window-controls" aria-hidden="true">
                <span class="mockup-dot"></span>
                <span class="mockup-dot"></span>
                <span class="mockup-dot"></span>
              </div>
              <span class="mockup-address-bar">${escapeHtml(project.id)}.local</span>
              <span class="project-badge-pill"><span class="pill-dot"></span> ${badgeText}</span>
            </div>
            ${visualContent}
          </div>
        </div>

        <div class="project-body">
          <!-- 2. Project Name -->
          <div class="project-header-group">
            <h3 class="project-title">${title}</h3>
          </div>

          <!-- 3. Short Description of What It Does -->
          <div class="project-field-block">
            <h4 class="field-label-pill">
              <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              What It Does
            </h4>
            <p class="project-description">${desc}</p>
          </div>

          <!-- 4. Tools & Skills Used -->
          <div class="project-field-block">
            <h4 class="field-label-pill">
              <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="m18 16 4-4-4-4"/>
                <path d="m6 8-4 4 4 4"/>
                <path d="m14.5 4-5 16"/>
              </svg>
              Tools &amp; Skills Used
            </h4>
            <div class="project-tags">
              ${tagsHtml}
            </div>
          </div>

          <!-- 5. What I Contributed / Learned -->
          <div class="project-field-block project-learned-box">
            <h4 class="field-label-pill learned-highlight">
              <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              What I Contributed &amp; Learned
            </h4>
            <p class="learned-text">${learned}</p>
          </div>
        </div>

        <div class="project-footer">
          <div class="project-links">
            <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="GitHub Repository for ${title}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Code
            </a>
            <a href="${escapeHtml(project.demoUrl)}" class="btn btn-secondary btn-sm" aria-label="Explore ${title}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const container = document.getElementById('projects-grid-container');

  if (!container || filterButtons.length === 0) return;

  renderProjects(projectsData, container);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filterCategory = btn.getAttribute('data-filter');

      if (filterCategory === 'all') {
        renderProjects(projectsData, container);
      } else {
        const filtered = projectsData.filter(p => p.category === filterCategory);
        renderProjects(filtered, container);
      }
    });
  });
}

/* ==========================================================================
   9. CLIENT-SIDE CONTACT FORM VALIDATION & CONFIRMATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusContainer = document.getElementById('form-status-area');

  if (!form || !submitBtn || !statusContainer) return;

  const LAST_SUBMIT_KEY = 'portfolio_last_contact_ts';
  const RATE_LIMIT_MS = 15000;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearStatus(statusContainer);

    const honeypot = form.elements['website_url']?.value;
    if (honeypot && honeypot.trim() !== '') {
      showStatus(statusContainer, 'info', 'Submission received. Thank you!');
      form.reset();
      return;
    }

    const nameField = form.elements['name'];
    const emailField = form.elements['email'];
    const messageField = form.elements['message'];

    const isNameValid = validateName(nameField);
    const isEmailValid = validateEmail(emailField);
    const isMessageValid = validateMessage(messageField);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const lastSubmitTime = Number(sessionStorage.getItem(LAST_SUBMIT_KEY) || 0);
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const waitSec = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      showStatus(statusContainer, 'warning', `Please wait ${waitSec} seconds before testing the form again.`);
      return;
    }

    setLoadingState(submitBtn, true);

    const payload = {
      name: nameField.value.trim(),
      email: emailField.value.trim().toLowerCase(),
      message: messageField.value.trim()
    };

    setTimeout(() => {
      sessionStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
      setLoadingState(submitBtn, false);

      showStatus(
        statusContainer,
        'success',
        `<strong>Thank you, ${escapeHtml(payload.name)}!</strong><br>
         Your message has been validated successfully.<br><br>
         <span style="font-size: 0.875rem; color: var(--text-secondary); display: block; margin-top: 0.35rem;">
           <strong>Notice:</strong> As required by the student project guidelines, this website operates entirely on client-side HTML, CSS, and Vanilla JavaScript with <em>no backend server or database</em>. Your message details were validated in your browser and were not transmitted externally.
         </span>
         <div style="margin-top: 0.85rem;">
           <a href="mailto:contact@shilfacatherine.dev?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(payload.name)}&body=${encodeURIComponent(payload.message)}" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
             Send directly via your email client
           </a>
         </div>`
      );

      form.reset();
      clearValidationMarkers(form);
    }, 400);
  });

  ['name', 'email', 'message'].forEach(fieldName => {
    const field = form.elements[fieldName];
    if (field) {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        const errSpan = document.getElementById(`${fieldName}-error`);
        if (errSpan) errSpan.textContent = '';
      });
    }
  });
}

function validateName(input) {
  const val = input.value.trim();
  const errSpan = document.getElementById('name-error');
  if (val.length < 2) {
    setFieldError(input, errSpan, 'Please enter your name (at least 2 characters).');
    return false;
  }
  if (val.length > 100) {
    setFieldError(input, errSpan, 'Name cannot exceed 100 characters.');
    return false;
  }
  clearFieldError(input, errSpan);
  return true;
}

function validateEmail(input) {
  const val = input.value.trim();
  const errSpan = document.getElementById('email-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!val) {
    setFieldError(input, errSpan, 'Please provide an email address.');
    return false;
  }
  if (!emailRegex.test(val)) {
    setFieldError(input, errSpan, 'Please provide a valid email address (e.g. name@example.com).');
    return false;
  }
  clearFieldError(input, errSpan);
  return true;
}

function validateMessage(input) {
  const val = input.value.trim();
  const errSpan = document.getElementById('message-error');
  if (val.length < 10) {
    setFieldError(input, errSpan, 'Please enter a message of at least 10 characters.');
    return false;
  }
  if (val.length > 2000) {
    setFieldError(input, errSpan, 'Message cannot exceed 2000 characters.');
    return false;
  }
  clearFieldError(input, errSpan);
  return true;
}

function setFieldError(input, errSpan, msg) {
  input.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  if (errSpan) errSpan.textContent = msg;
}

function clearFieldError(input, errSpan) {
  input.classList.remove('is-invalid');
  input.removeAttribute('aria-invalid');
  if (errSpan) errSpan.textContent = '';
}

function clearValidationMarkers(form) {
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(inp => {
    inp.classList.remove('is-invalid');
    inp.removeAttribute('aria-invalid');
  });
  const errSpans = form.querySelectorAll('.field-error-msg');
  errSpans.forEach(span => span.textContent = '');
}

function setLoadingState(btn, isLoading) {
  if (isLoading) {
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon" style="animation: spin 0.8s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10"/>
      </svg>
      Validating Message...
    `;
  } else {
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
    if (btn.dataset.originalText) {
      btn.innerHTML = btn.dataset.originalText;
    }
  }
}

function showStatus(container, type, messageHtml) {
  const alertClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-error' : 'alert-info';
  const icon = type === 'success'
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
    : type === 'error'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';

  container.innerHTML = `
    <div class="alert-box ${alertClass}" role="alert">
      ${icon}
      <div>${messageHtml}</div>
    </div>
  `;
}

function clearStatus(container) {
  container.innerHTML = '';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
