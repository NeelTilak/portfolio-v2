/**
 * Command Palette (Cmd+K / Ctrl+K) Spotlight Modal
 * Backend & Cloud Platform Engineer Profile
 */

(function () {
  const overlay = document.getElementById('palette-overlay');
  const input = document.getElementById('palette-input');
  const resultsContainer = document.getElementById('palette-results');
  const openButtons = document.querySelectorAll('.cmd-k-trigger');

  if (!overlay || !input || !resultsContainer) return;

  let activeIndex = 0;
  let filteredItems = [];

  const ITEMS = [
    // Navigation
    {
      group: 'Navigation',
      id: 'nav-home',
      title: 'Go to Hero / Overview',
      icon: 'fa-solid fa-house',
      shortcut: 'H',
      action: () => scrollToSection('hero')
    },
    {
      group: 'Navigation',
      id: 'nav-about',
      title: 'About Neel Tilak (Overview)',
      icon: 'fa-solid fa-user',
      shortcut: 'A',
      action: () => scrollToSection('about')
    },
    {
      group: 'Navigation',
      id: 'nav-cases',
      title: 'Explore Case Studies (Indryom, SaturnnLGD, KIFS, EasyAccounts)',
      icon: 'fa-solid fa-server',
      shortcut: 'C',
      action: () => scrollToSection('case-studies')
    },
    {
      group: 'Navigation',
      id: 'nav-oss',
      title: 'View Open-Source Projects',
      icon: 'fa-brands fa-github',
      shortcut: 'O',
      action: () => scrollToSection('open-source')
    },
    {
      group: 'Navigation',
      id: 'nav-exp',
      title: 'View Experience Timeline (Hirdhav, Terado, Freelance)',
      icon: 'fa-solid fa-briefcase',
      shortcut: 'E',
      action: () => scrollToSection('experience')
    },
    {
      group: 'Navigation',
      id: 'nav-skills',
      title: 'View Skills (Daily Stack & Also Worked With)',
      icon: 'fa-solid fa-code',
      shortcut: 'S',
      action: () => scrollToSection('skills')
    },
    {
      group: 'Navigation',
      id: 'nav-edu',
      title: 'View Education (B.E. CSE RGIT & Diploma)',
      icon: 'fa-solid fa-graduation-cap',
      shortcut: 'U',
      action: () => scrollToSection('education')
    },
    {
      group: 'Navigation',
      id: 'nav-notes',
      title: 'Read Engineering Notes (Blog)',
      icon: 'fa-solid fa-book-open',
      shortcut: 'N',
      action: () => scrollToSection('notes')
    },
    {
      group: 'Navigation',
      id: 'nav-cover-letter',
      title: 'View Cover Letter (Dedicated Page)',
      icon: 'fa-solid fa-file-lines',
      shortcut: 'L',
      action: () => window.location.href = '/cover-letter.html'
    },
    {
      group: 'Navigation',
      id: 'nav-terminal',
      title: 'Open Developer CLI Terminal',
      icon: 'fa-solid fa-terminal',
      shortcut: 'T',
      action: () => {
        scrollToSection('terminal-section');
        document.getElementById('terminal-input')?.focus();
      }
    },
    {
      group: 'Navigation',
      id: 'nav-contact',
      title: 'Initiate Contact / Send Message',
      icon: 'fa-solid fa-paper-plane',
      shortcut: 'M',
      action: () => scrollToSection('contact')
    },

    // Actions
    {
      group: 'Actions',
      id: 'act-copy-email',
      title: 'Copy Email Address (neeltilak.1998@gmail.com)',
      icon: 'fa-regular fa-copy',
      shortcut: '↵',
      action: () => {
        navigator.clipboard.writeText('neeltilak.1998@gmail.com');
        showToast('Email copied: neeltilak.1998@gmail.com');
      }
    },
    {
      group: 'Actions',
      id: 'act-resume',
      title: 'Download Resume PDF (/resume.pdf)',
      icon: 'fa-solid fa-file-arrow-down',
      shortcut: 'D',
      action: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Neel_Tilak_Resume.pdf';
        link.click();
        showToast('Downloading resume (/resume.pdf)...');
      }
    },
    {
      group: 'Actions',
      id: 'act-cover-pdf',
      title: 'Download Cover Letter PDF (/cover_letter.pdf)',
      icon: 'fa-solid fa-file-pdf',
      shortcut: 'C',
      action: () => {
        const link = document.createElement('a');
        link.href = '/cover_letter.pdf';
        link.download = 'Neel_Tilak_Cover_Letter.pdf';
        link.click();
        showToast('Downloading cover letter (/cover_letter.pdf)...');
      }
    },
    {
      group: 'Actions',
      id: 'act-theme',
      title: 'Toggle Visual Theme (Cyber-Glow / Slate)',
      icon: 'fa-solid fa-moon',
      shortcut: '⇧T',
      action: () => {
        const root = document.documentElement;
        const current = root.getAttribute('data-theme');
        const next = current === 'cyber-glow' ? 'default' : 'cyber-glow';
        root.setAttribute('data-theme', next);
        showToast(`Theme switched to ${next}`);
      }
    },
    {
      group: 'Actions',
      id: 'act-matrix',
      title: 'Launch Matrix Digital Rain (Terminal)',
      icon: 'fa-solid fa-code',
      shortcut: 'X',
      action: () => {
        scrollToSection('terminal-section');
        const termInput = document.getElementById('terminal-input');
        if (termInput) {
          termInput.value = 'matrix';
          termInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        }
      }
    },

    // External Links
    {
      group: 'Links',
      id: 'link-linkedin',
      title: 'Open LinkedIn (linkedin.com/in/neel-tilak-74734b231)',
      icon: 'fa-brands fa-linkedin',
      shortcut: '↗',
      action: () => window.open('https://linkedin.com/in/neel-tilak-74734b231', '_blank')
    },
    {
      group: 'Links',
      id: 'link-github',
      title: 'Open GitHub (github.com/NeelTilak)',
      icon: 'fa-brands fa-github',
      shortcut: '↗',
      action: () => window.open('https://github.com/NeelTilak', '_blank')
    }
  ];

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function openPalette() {
    overlay.classList.add('active');
    input.value = '';
    filterItems('');
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    overlay.classList.remove('active');
  }

  function filterItems(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      filteredItems = [...ITEMS];
    } else {
      filteredItems = ITEMS.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
      );
    }
    activeIndex = 0;
    renderResults();
  }

  function renderResults() {
    if (filteredItems.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding:2rem;text-align:center;color:var(--text-muted);font-size:0.9rem;">
          No matching commands or actions found.
        </div>
      `;
      return;
    }

    const groups = {};
    filteredItems.forEach((item, index) => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push({ ...item, globalIndex: index });
    });

    let html = '';
    for (const [groupName, items] of Object.entries(groups)) {
      html += `<div class="palette-group">`;
      html += `<div class="palette-group-title">${groupName}</div>`;
      items.forEach(item => {
        const isCurrent = item.globalIndex === activeIndex;
        html += `
          <div class="palette-item ${isCurrent ? 'active' : ''}" data-index="${item.globalIndex}">
            <i class="${item.icon}"></i>
            <span class="palette-item-text">${item.title}</span>
            <span class="palette-item-shortcut">${item.shortcut}</span>
          </div>
        `;
      });
      html += `</div>`;
    }

    resultsContainer.innerHTML = html;

    resultsContainer.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        executeItem(idx);
      });
    });
  }

  function executeItem(index) {
    const item = filteredItems[index];
    if (item && item.action) {
      closePalette();
      item.action();
    }
  }

  input.addEventListener('input', (e) => {
    filterItems(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeIndex < filteredItems.length - 1) {
        activeIndex++;
        renderResults();
        scrollActiveIntoView();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeIndex > 0) {
        activeIndex--;
        renderResults();
        scrollActiveIntoView();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeItem(activeIndex);
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  function scrollActiveIntoView() {
    const activeEl = resultsContainer.querySelector('.palette-item.active');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closePalette();
    }
  });

  openButtons.forEach(btn => btn.addEventListener('click', openPalette));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });

  window.openCommandPalette = openPalette;
})();
