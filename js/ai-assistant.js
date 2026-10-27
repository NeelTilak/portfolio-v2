/**
 * Floating Interactive AI Portfolio Assistant
 * Accurately answers recruiter and visitor inquiries about Neel Tilak's backend & cloud engineering profile
 */

(function () {
  const widget = document.getElementById('chat-widget');
  const toggleBtn = document.getElementById('chat-toggle-btn');
  const closeBtn = document.getElementById('chat-close-btn');
  const messagesContainer = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const badge = document.getElementById('chat-badge');

  if (!widget || !toggleBtn) return;

  const KNOWLEDGE_BASE = [
    {
      keywords: ['skill', 'stack', 'tech', 'language', 'framework', 'tools', 'c#', '.net', 'backend'],
      response: `Neel's technical stack is organized into two clear levels:
<br/><br/>
• <strong>Daily Stack:</strong> C#, ASP.NET Core 8, EF Core, LINQ, Web API, RabbitMQ, BackgroundService workers, SQL Server, PostgreSQL, Linux, NGINX, HAProxy, Edge Firewalls &amp; SDN, Razorpay, Azure AD OAuth.<br/><br/>
• <strong>Also Worked With:</strong> Node.js, Express, Python (FastAPI), React, Flutter, WooCommerce / custom PHP plugins, Docker, Prometheus, Elasticsearch, Serilog.`
    },
    {
      keywords: ['project', 'case', 'indryom', 'saturnn', 'kifs', 'easyaccounts', 'iaas', 'cloud', 'work'],
      response: `Neel has delivered major backend and cloud platform systems:
<br/><br/>
1. <strong>Indryom (Private Cloud IaaS):</strong> Automated VM/container lifecycle provisioning via Type-1 hypervisor REST APIs (KVM/QEMU), Layer 4 HAProxy load balancing, automated edge firewalls and NAT gateways, and Razorpay e-NACH recurring billing.<br/>
2. <strong>SaturnnLGD:</strong> Custom Blue Dart carrier shipping plugin (REST/SOAP), digital waybills, tracking webhooks, and Razorpay for luxury diamond e-commerce.<br/>
3. <strong>KIFS Home Loan:</strong> Digital lending platform with digital KYC document capture, approval workflows, and credit bureau integration.<br/>
4. <strong>EasyAccounts:</strong> Multi-tenant SaaS accounting platform with database-per-tenant isolation.<br/><br/>
Click any case study card to inspect detailed sanitized architecture breakdowns!`
    },
    {
      keywords: ['open', 'source', 'oss', 'github', 'repo'],
      response: `Neel has two notable open-source projects:
<br/><br/>
1. <strong>Mini Cloud Control Plane:</strong> Built with ASP.NET Core 8, EF Core, RabbitMQ, fake hypervisor API, state machine, quotas, and reconciliation worker.<br/>
2. <strong>Recurring Billing Engine:</strong> Razorpay test mode, idempotent webhooks, backoff retries, and automated account suspension after grace period.`
    },
    {
      keywords: ['contact', 'email', 'hire', 'reach', 'message', 'touch', 'job', 'status', 'location', 'phone'],
      response: `Neel Tilak is based in <strong>Mumbai, India</strong> and is currently <strong>Open to Backend / Platform Engineer roles</strong>:
<br/><br/>
📧 <strong>Email:</strong> <a href="mailto:neeltilak.1998@gmail.com" style="color:var(--accent-cyan);text-decoration:underline;">neeltilak.1998@gmail.com</a><br/>
💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/neel-tilak-74734b231" target="_blank" style="color:var(--accent-purple-light);text-decoration:underline;">linkedin.com/in/neel-tilak-74734b231</a><br/>
📄 <strong>Resume:</strong> <a href="/resume.pdf" download="Neel_Tilak_Resume.pdf" style="color:var(--accent-purple-light);text-decoration:underline;">Download PDF (/resume.pdf)</a><br/><br/>
You can also use the contact form on this page to send a message directly!`
    },
    {
      keywords: ['experience', 'hirdhav', 'terado', 'freelance', 'history', 'background', 'career'],
      response: `Neel's engineering experience:
<br/><br/>
• <strong>Hirdhav Software Pvt Ltd</strong> (Mar 2024 – Present, Mumbai): Software Developer / Cloud Infrastructure Engineer. Built "Indryom" (private cloud IaaS platform) as primary backend engineer; delivered SaturnnLGD and KIFS Home Loan end-to-end.<br/>
• <strong>Terado Engineering</strong> (Dec 2023 – Mar 2024, Mumbai): Jr Backend Developer. Node.js/Express/Sequelize/MySQL microservices for HRMS and CRM systems.<br/>
• <strong>Freelance Software Developer</strong> (June 2023 – Nov 2023): Full-stack web modules and mobile prototypes using .NET and React, including SSO and payment gateways.`
    },
    {
      keywords: ['education', 'degree', 'college', 'university', 'rgit', 'diploma', 'gpa', 'marks'],
      response: `Neel's academic credentials:
<br/><br/>
🎓 <strong>B.E. Computer Science &amp; Engineering:</strong> Rajiv Gandhi Institute of Technology, Mumbai University (Aug 2020 – May 2023). <strong>CGPA: 9.4 / 10</strong>, First Class with Distinction.<br/>
📜 <strong>Diploma in Computer Engineering:</strong> Pravin Patil College of Diploma Engineering &amp; Technology, MSBTE (Jun 2017 – May 2020). <strong>91.37%</strong>, Distinction.`
    },
    {
      keywords: ['resume', 'cv', 'pdf', 'download'],
      response: `You can download Neel Tilak's resume directly: <br/><br/>
📄 <a href="/resume.pdf" download="Neel_Tilak_Resume.pdf" style="color:var(--accent-purple-light);font-weight:600;text-decoration:underline;">Download Resume PDF (/resume.pdf)</a>`
    },
    {
      keywords: ['cover', 'letter', 'application'],
      response: `Neel's tailored cover letter is available to view and download:
<br/><br/>
📄 <strong>Web Page:</strong> <a href="/cover-letter.html" style="color:var(--accent-purple-light);font-weight:600;text-decoration:underline;">View / Print Cover Letter (/cover-letter.html)</a><br/>
📥 <strong>PDF:</strong> <a href="/cover_letter.pdf" download="Neel_Tilak_Cover_Letter.pdf" style="color:var(--accent-cyan);text-decoration:underline;">Download PDF (/cover_letter.pdf)</a>`
    }
  ];

  function toggleChat() {
    widget.classList.toggle('active');
    if (widget.classList.contains('active')) {
      if (badge) badge.style.display = 'none';
      setTimeout(() => input?.focus(), 200);
    }
  }

  function appendMessage(sender, html) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = `<div class="msg-bubble">${html}</div>`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot typing-indicator-msg';
    typingDiv.innerHTML = `
      <div class="msg-bubble">
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingDiv;
  }

  function handleSend(text) {
    const query = text.trim();
    if (!query) return;

    appendMessage('user', escapeHtml(query));
    if (input) input.value = '';

    const typingEl = showTypingIndicator();

    setTimeout(() => {
      typingEl.remove();
      const lower = query.toLowerCase();
      let matchedResponse = null;

      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some(k => lower.includes(k))) {
          matchedResponse = entry.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = `Neel Tilak is a <strong>Backend &amp; Cloud Platform Engineer</strong> based in Mumbai, India. His tagline: <em>"I build backend systems from ambiguous requirements to production: private cloud, distributed workers, and recurring-payment billing."</em><br/><br/>Feel free to ask about his <strong>Daily Skills</strong>, <strong>Case Studies (Indryom, SaturnnLGD, KIFS)</strong>, <strong>Experience</strong>, or how to <strong>contact</strong> him!`;
      }

      appendMessage('bot', matchedResponse);
    }, 600);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  toggleBtn.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', toggleChat);

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => handleSend(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend(input.value);
      }
    });
  }

  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent;
      handleSend(prompt);
    });
  });
})();
