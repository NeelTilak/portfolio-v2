/**
 * Interactive Developer CLI Terminal (neel@portfolio ~ bash)
 * Synced with Neel Tilak's Updated Resume
 */

(function () {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const terminalWindow = document.getElementById('terminal-window');
  const matrixCanvas = document.getElementById('matrix-canvas');

  if (!terminalBody || !terminalInput) return;

  const history = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: 'List all available terminal commands',
    about: 'Display background, title, and professional summary',
    skills: 'Display categorized technical skills from updated resume',
    projects: 'List production case studies and open-source systems',
    exp: 'Show professional engineering timeline and achievements',
    education: 'Display academic background and distinctions (9.4 CGPA)',
    contact: 'Get direct communication links, email, and location',
    resume: 'Get link to downloadable official PDF resume (/resume.pdf)',
    coverletter: 'Display tailored cover letter (/cover-letter.html & /cover_letter.pdf)',
    neofetch: 'Display cloud platform architecture telemetry and specs',
    matrix: 'Toggle digital Matrix code rain mode',
    quote: 'Print a thought on distributed systems & engineering',
    clear: 'Clear terminal screen',
    sudo: 'Execute with root privileges (easter egg)',
    theme: 'Toggle visual theme'
  };

  function printWelcome() {
    terminalBody.innerHTML = `
      <div class="terminal-line term-dim">Last login: ${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} on tty1</div>
      <div class="terminal-line term-ascii">
  _   _           _   _____ _ _       _    
 | \\ | | ___  ___| | |_   _(_) | __ _| | __
 |  \\| |/ _ \\/ _ \\ |   | | | | |/ _\` | |/ /
 | |\\  |  __/  __/ |   | | | | | (_| |   < 
 |_| \\_|\\___|\\___|_|   |_| |_|_|\\__,_|_|\\_\\
      </div>
      <div class="terminal-line"><span class="term-green">✔</span> Connected to <span class="term-highlight">Neel Tilak's Platform Terminal</span> [v3.1.0-cloud]</div>
      <div class="terminal-line">Title: <span class="term-cyan">Software Engineer | Backend &amp; Cloud Infrastructure | 0-to-1 Systems Builder</span></div>
      <div class="terminal-line">Type <span class="term-cyan">help</span> to view commands, or click any quick pill above.</div>
      <br/>
    `;
  }

  function appendLine(html) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = html;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmdClean = cmdRaw.trim().toLowerCase();
    const args = cmdClean.split(/\s+/);
    const command = args[0];

    appendLine(`
      <div class="terminal-prompt-line">
        <span class="term-prompt">neel</span><span class="term-path">@platform</span><span class="term-symbol">:~$ </span>
        <span style="color:var(--text-primary);">${escapeHtml(cmdRaw)}</span>
      </div>
    `);

    if (cmdRaw.trim() !== '') {
      history.push(cmdRaw);
      historyIndex = history.length;
    }

    switch (command) {
      case '':
        break;

      case 'help':
        let helpHtml = `<table class="term-table">`;
        for (const [cmd, desc] of Object.entries(COMMANDS)) {
          helpHtml += `<tr><td class="cmd-name">${cmd}</td><td class="term-output">${desc}</td></tr>`;
        }
        helpHtml += `</table>`;
        appendLine(helpHtml);
        break;

      case 'about':
        appendLine(`
          <p><span class="term-highlight">Neel Tilak</span> — Software Engineer | Backend &amp; Cloud Infrastructure | 0-to-1 Systems Builder</p>
          <p style="margin-top:0.4rem;color:var(--text-secondary);">Software Engineer with 3+ years of experience specializing in backend architecture, distributed systems, and private cloud platforms. Proven 0-to-1 systems builder who has architected and delivered enterprise production systems from scratch across Cloud IaaS, Luxury E-Commerce, Fintech, and CRMs.</p>
          <p style="margin-top:0.4rem;color:var(--accent-cyan);font-style:italic;">"I build backend systems from ambiguous requirements to production: private cloud, distributed workers, and recurring-payment billing."</p>
        `);
        break;

      case 'skills':
        appendLine(`
          <div style="margin:0.5rem 0;">
            <div class="term-cyan">▸ Core Backend (Daily):</div>
            <div style="color:var(--text-primary);margin-left:1rem;margin-bottom:0.4rem;">C#, ASP.NET Core 8, Entity Framework Core (EF Core), Web API, RabbitMQ, BackgroundService Workers, RESTful APIs</div>
            
            <div class="term-cyan">▸ Cloud &amp; Virtualization:</div>
            <div style="color:var(--text-primary);margin-left:1rem;margin-bottom:0.4rem;">Type-1 Hypervisors (KVM/QEMU), LXC Containers, Docker, Cloud-Init, Linux (Ubuntu)</div>

            <div class="term-cyan">▸ Networking &amp; High Availability:</div>
            <div style="color:var(--text-primary);margin-left:1rem;margin-bottom:0.4rem;">HAProxy (L4 Load Balancing), Edge Firewalls &amp; SDN (1:1 NAT, DNAT, Gateways), VXLAN, NGINX Ingress, TCP/IP, DNS</div>

            <div class="term-cyan">▸ Databases &amp; Observability:</div>
            <div style="color:var(--text-primary);margin-left:1rem;margin-bottom:0.4rem;">Microsoft SQL Server, PostgreSQL, MySQL, SQLite, Prometheus, Elasticsearch, Serilog</div>

            <div class="term-cyan">▸ Client Delivery &amp; Mobile:</div>
            <div style="color:var(--text-primary);margin-left:1rem;margin-bottom:0.4rem;">Flutter, WordPress &amp; WooCommerce Custom Plugin Development, API Testing, Postman, Git, Azure AD OAuth, JWT, 2FA</div>

            <div class="term-cyan">▸ Familiar / Secondary Stack:</div>
            <div style="color:var(--text-secondary);margin-left:1rem;">Node.js, Express.js, Python (FastAPI), Go, React.js, Angular, ADO.NET (Stored Procedures)</div>
          </div>
        `);
        break;

      case 'projects':
        appendLine(`
          <div style="margin:0.5rem 0;">
            <p class="term-cyan">● PRODUCTION CASE STUDIES:</p>
            <p><span class="term-highlight">1. Indryom (Private Cloud IaaS)</span> — KVM/LXC lifecycle provisioning via Type-1 hypervisor REST APIs (KVM/QEMU), Layer 4 HAProxy load balancing (&lt;5ms latency), automated edge firewalls &amp; SDN, RabbitMQ reconciliation workers, and billing metering.</p>
            <p><span class="term-highlight">2. SaturnnLGD (0-to-1 Solo)</span> — Luxury diamond e-commerce, ASP.NET Core 8 APIs, MVC portal, Flutter app, custom WooCommerce/PHP carrier integration for Blue Dart (REST/SOAP) &amp; PDF invoicing.</p>
            <p><span class="term-highlight">3. KIFS Home Loan Platform (0-to-1 Solo)</span> — Flutter mobile application for digital loan origination, document verification pipelines, and multi-stage approval workflows deployed behind NGINX.</p>
            <p><span class="term-highlight">4. EasyAccounts</span> — Multi-tenant SaaS cloud accounting with database-per-tenant isolation.</p>
            
            <p class="term-cyan" style="margin-top:0.6rem;">● OPEN-SOURCE PROJECTS:</p>
            <p><span class="term-highlight">▸ Mini Cloud Control Plane</span> — ASP.NET Core 8, EF Core, RabbitMQ, fake hypervisor API, state machine, quotas, reconciliation worker.</p>
            <p><span class="term-highlight">▸ Recurring Billing Engine</span> — Razorpay test mode, idempotent webhooks, backoff retries, suspension after grace period.</p>
          </div>
        `);
        break;

      case 'exp':
        appendLine(`
          <div style="margin:0.5rem 0;">
            <p class="term-cyan">● Hirdhav Software Pvt Ltd | Software Developer / Cloud Infrastructure Engineer</p>
            <p style="color:var(--text-muted);font-size:0.8rem;">March 2024 – Present | Mumbai, India</p>
            <p style="color:var(--text-secondary);margin-bottom:0.5rem;">Core Platform: Indryom (IaaS). Built backend APIs, EF Core data layers, KVM/LXC lifecycle automation (&lt;30s), L4 HAProxy load balancing (&lt;5ms routing), automated edge firewalls &amp; SDN/NAT, RabbitMQ workers, and multi-node Prometheus/Elasticsearch telemetry. Delivered SaturnnLGD and KIFS Home Loan platforms.</p>
            
            <p class="term-cyan">● Terado Engineering | Jr Backend Developer</p>
            <p style="color:var(--text-muted);font-size:0.8rem;">Dec 2023 – March 2024 | Mumbai, India</p>
            <p style="color:var(--text-secondary);margin-bottom:0.5rem;">Engineered RESTful backend microservices in Node.js, Express.js, and Sequelize ORM backed by MySQL for Uni5 HRMS and PTEcolyzer CRM. Conducted API testing and query optimization.</p>

            <p class="term-cyan">● Freelance Software Developer | Freelance Software Engineer</p>
            <p style="color:var(--text-muted);font-size:0.8rem;">June 2023 – Nov 2023 | Mumbai, India</p>
            <p style="color:var(--text-secondary);">Delivered full-stack web modules and mobile prototypes for private clients using .NET and React; integrated SSO authentication and third-party payment gateways.</p>
          </div>
        `);
        break;

      case 'education':
        appendLine(`
          <div style="margin:0.5rem 0;">
            <p class="term-cyan">● Rajiv Gandhi Institute of Technology (Mumbai University)</p>
            <p style="color:var(--text-secondary);">B.E. in Computer Science &amp; Engineering (Aug 2020 – May 2023)</p>
            <p style="color:var(--accent-emerald);">CGPA: 9.4 / 10 — First Class with Distinction</p>
            <br/>
            <p class="term-cyan">● Pravin Patil College of Diploma Engineering &amp; Technology (MSBTE)</p>
            <p style="color:var(--text-secondary);">Diploma in Computer Engineering (June 2017 – May 2020)</p>
            <p style="color:var(--accent-emerald);">91.37% — Distinction</p>
          </div>
        `);
        break;

      case 'contact':
        appendLine(`
          <div style="margin:0.4rem 0;">
            <p>Email: <a href="mailto:neeltilak.1998@gmail.com" class="term-link">neeltilak.1998@gmail.com</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/neel-tilak-74734b231" target="_blank" class="term-link">linkedin.com/in/neel-tilak-74734b231</a></p>
            <p>GitHub: <a href="https://github.com/NeelTilak" target="_blank" class="term-link">github.com/NeelTilak</a></p>
            <p>Location: <span class="term-highlight">Mumbai, India</span></p>
            <p>Status: <span class="term-green">Open to Backend &amp; Cloud Platform Engineer roles</span></p>
          </div>
        `);
        break;

      case 'resume':
        appendLine(`
          <p>Official Updated Resume: <a href="/resume.pdf" download="Neel_Tilak_Resume_Updated.pdf" class="term-link">/resume.pdf (Click to Download)</a></p>
        `);
        break;

      case 'coverletter':
        appendLine(`
          <div style="margin:0.5rem 0;">
            <p class="term-cyan">● Tailored Cover Letter — Backend &amp; Cloud Platform Engineer</p>
            <p style="margin-top:0.3rem;">Dedicated Web View: <a href="/cover-letter.html" class="term-link">/cover-letter.html (View &amp; Print)</a></p>
            <p style="margin-top:0.2rem;">PDF Document: <a href="/cover_letter.pdf" download="Neel_Tilak_Cover_Letter.pdf" class="term-link">/cover_letter.pdf (Download PDF)</a></p>
          </div>
        `);
        break;

      case 'neofetch':
        appendLine(`
          <div style="display:flex;gap:1.5rem;margin:0.5rem 0;align-items:center;">
            <div class="term-cyan" style="font-size:0.75rem;white-space:pre;line-height:1.2;">
   /\\_/\\
  ( o.o )
   &gt; ^ &lt;
 [INDRYOM]
            </div>
            <div>
              <div class="term-highlight">neel@indryom-control-plane</div>
              <div class="term-dim">--------------------------------</div>
              <div><span class="term-cyan">Platform:</span> Indryom Private Cloud IaaS</div>
              <div><span class="term-cyan">Core Runtime:</span> C# / ASP.NET Core 8 + EF Core</div>
              <div><span class="term-cyan">Virtualization:</span> Type-1 Hypervisors (KVM/QEMU) &amp; LXC</div>
              <div><span class="term-cyan">Networking:</span> HAProxy L4 + Edge Firewall Gateways + VXLAN</div>
              <div><span class="term-cyan">Messaging:</span> RabbitMQ + BackgroundService Workers</div>
              <div><span class="term-cyan">Databases:</span> SQL Server + PostgreSQL + MySQL</div>
              <div><span class="term-cyan">Telemetry:</span> Prometheus + Elasticsearch + Serilog</div>
            </div>
          </div>
        `);
        break;

      case 'matrix':
        toggleMatrix();
        break;

      case 'quote':
        const quotes = [
          '"Any system that must be reliable must expect components to fail." — Leslie Lamport',
          '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
          '"Make it work, make it right, make it fast." — Kent Beck',
          '"Data outlives code; write schemas you can live with." — Anonymous Backend Engineer'
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        appendLine(`<p class="term-cyan" style="font-style:italic;">${randomQuote}</p>`);
        break;

      case 'clear':
        terminalBody.innerHTML = '';
        break;

      case 'sudo':
        appendLine(`<span style="color:var(--accent-rose);">neel is not in the sudoers file. Incident logged to audit trail (Serilog).</span>`);
        break;

      case 'theme':
        if (window.toggleTheme) {
          const t = window.toggleTheme();
          appendLine(`<span class="term-green">✔ Switched visual theme to: ${t === 'light' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}</span>`);
        } else {
          const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';
          if (newTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
          } else {
            document.documentElement.removeAttribute('data-theme');
          }
          appendLine(`<span class="term-green">✔ Switched visual theme to: ${newTheme}</span>`);
        }
        break;

      default:
        appendLine(`<span style="color:var(--accent-rose);">Command not found: ${escapeHtml(command)}. Type <span class="term-cyan">help</span> to view available commands.</span>`);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Keyboard navigation
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex] || '';
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      const match = Object.keys(COMMANDS).find(c => c.startsWith(current));
      if (match) {
        terminalInput.value = match;
      }
    }
  });

  // Window controls
  const btnRed = document.getElementById('term-btn-red');
  const btnYellow = document.getElementById('term-btn-yellow');
  const btnGreen = document.getElementById('term-btn-green');

  if (btnRed) {
    btnRed.addEventListener('click', () => {
      terminalBody.innerHTML = '<div class="terminal-line term-dim">Terminal screen cleared.</div>';
    });
  }

  if (btnYellow) {
    btnYellow.addEventListener('click', () => {
      terminalBody.style.display = terminalBody.style.display === 'none' ? 'block' : 'none';
    });
  }

  if (btnGreen) {
    btnGreen.addEventListener('click', () => {
      terminalWindow.classList.toggle('fullscreen');
      terminalInput.focus();
    });
  }

  document.querySelectorAll('.term-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = cmd;
        handleCommand(cmd);
        terminalInput.value = '';
      }
    });
  });

  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Matrix Rain Effect
  let matrixInterval = null;
  function toggleMatrix() {
    if (!matrixCanvas) return;
    const isActive = matrixCanvas.classList.toggle('active');

    if (isActive) {
      appendLine(`<span class="term-green">Initializing Matrix stream... Click anywhere to exit.</span>`);
      startMatrix();
    } else {
      stopMatrix();
    }
  }

  function startMatrix() {
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = terminalWindow.clientWidth;
    matrixCanvas.height = terminalWindow.clientHeight;

    const chars = '0123456789ABCDEFNEELTILAKNET8RABBITMQLINUX';
    const fontSize = 14;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }

    function draw() {
      ctx.fillStyle = 'rgba(8, 10, 15, 0.08)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.fillStyle = '#8B5CF6';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    matrixInterval = setInterval(draw, 40);

    matrixCanvas.addEventListener('click', function onExit() {
      stopMatrix();
      matrixCanvas.removeEventListener('click', onExit);
    });
  }

  function stopMatrix() {
    if (matrixInterval) clearInterval(matrixInterval);
    if (matrixCanvas) {
      matrixCanvas.classList.remove('active');
      const ctx = matrixCanvas.getContext('2d');
      ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    }
    appendLine(`<span class="term-dim">Matrix stream closed.</span>`);
  }

  printWelcome();
})();
