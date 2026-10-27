/**
 * Projects & Case Studies Module
 * Neel Tilak - Software Engineer | Backend & Cloud Infrastructure | 0-to-1 Systems Builder
 */

(function () {
  const PROJECTS_DATA = [
    {
      id: 'indryom',
      category: 'cloud',
      title: 'Indryom',
      subtitle: 'Private Cloud Infrastructure Platform (IaaS)',
      badge: 'Private Cloud / IaaS',
      metric: '⚡ Sub-30s Cold Boot · Sub-5ms L4 Routing',
      image: 'assets/images/case-indryom.jpg',
      shortDesc: 'Automated VM & container lifecycle provisioning, Layer 4 HAProxy load balancing, edge firewall automation, and RabbitMQ workers.',
      tech: ['C#', 'ASP.NET Core 8', 'EF Core', 'Type-1 Hypervisors (KVM/QEMU)', 'LXC', 'RabbitMQ', 'HAProxy', 'Edge Firewalls & SDN', 'SQL Server', 'Prometheus', 'Elasticsearch', 'Azure AD'],
      links: {
        github: '',
        demo: ''
      },
      modal: {
        architecture: 'Microservices + BackgroundService Workers + Type-1 Hypervisor REST APIs',
        throughput: '[TODO: X tenants] · [TODO: Y VMs managed]',
        latency: 'Sub-5ms L4 routing · Sub-30s VM cold boot',
        cluster: 'Bare-Metal KVM/QEMU & LXC Nodes + Edge Firewall Appliances + HAProxy L4',
        scaleImpact: '[TODO: X tenants] · [TODO: Y VMs managed] · [TODO: Z% auto-debit success]',
        overview: 'Served as the core 0-to-1 backend and infrastructure engineer building "Indryom", an enterprise-grade Private Cloud (IaaS) management platform. Architected the complete backend control plane connecting application logic directly with bare-metal virtualization nodes, software-defined networking fabrics, and asynchronous job queues.',
        keyFeatures: [
          'Virtualization & Compute: Automated lifecycle provisioning, dynamic disk sizing, and teardown of KVM VMs and LXC Containers via Type-1 hypervisor REST APIs (KVM/QEMU) in under 30 seconds.',
          'ORM & State Persistence: Designed high-performance data access layers and migrations with Entity Framework Core (EF Core) and SQL Server, enforcing strict transactional consistency across cloud tenant resources.',
          'High Availability & L4 LB: Architected Layer 4 HAProxy load balancing service with live health checks and round-robin traffic routing, achieving sub-5ms routing latency across scaled backend container replicas.',
          'Network Automation & SDN: Engineered automated 1:1 Public IP NAT, DNAT, and edge firewall rules; designed shared VXLAN overlay bridges and edge NGINX gateway.',
          'Storage & State Reconciliation: Built transactional storage workflows supporting dynamic disk resizing and automated backups with state reconciliation between SQL Server and physical hypervisors.',
          'Workers & Usage Metering: Built resilient BackgroundService workers and RabbitMQ consumers for real-time compute usage tracking, invoice calculation, and automated billing suspension.',
          'Zero-Trust Security & IAM: Implemented multi-tenant IAM with Azure AD OAuth, TOTP 2FA (AES-256 encrypted), and isolated short-lived identity handoff tokens for cross-portal support.',
          'Observability & Metrics: Centralized application audit logs via Elasticsearch and cluster health telemetry via Prometheus for end-to-end multi-node observability.'
        ]
      }
    },
    {
      id: 'saturnnlgd',
      category: 'logistics',
      title: 'SaturnnLGD',
      subtitle: 'Luxury Diamond E-Commerce & Custom Logistics (0-to-1 Solo Engineering)',
      badge: 'E-Commerce / Logistics',
      metric: '💎 Automated Waybills · Razorpay Webhooks',
      image: 'assets/images/case-saturnnlgd.jpg',
      shortDesc: 'Custom Blue Dart carrier integration plugin built from REST/SOAP carrier specs, digital waybills, tracking webhooks, and PDF tax invoicing.',
      tech: ['ASP.NET Core 8', 'MVC Admin', 'Flutter', 'WooCommerce', 'PHP Plugin', 'Blue Dart APIs', 'Razorpay'],
      links: {
        github: '',
        demo: ''
      },
      modal: {
        architecture: 'WooCommerce Carrier Bridge + Custom PHP Extension + REST/SOAP Integration',
        throughput: 'High-Value Diamond Shipping Workflows',
        latency: 'Real-time API Dispatch & Tracking Webhooks',
        cluster: 'WooCommerce + ASP.NET Core 8 Admin Suite + Flutter App',
        scaleImpact: 'Zero-error luxury dispatch compliance & automated tax invoicing',
        overview: 'Built ASP.NET Core 8 Web APIs, MVC admin portal, and Flutter mobile application for SaturnnLGD. Engineered a custom WooCommerce and PHP carrier plugin from scratch by reading carrier REST/SOAP API specifications to automate luxury insured diamond logistics.',
        keyFeatures: [
          'Engineered custom WooCommerce and PHP carrier plugins from scratch interfacing with Blue Dart REST and SOAP APIs.',
          'Automated digital waybill generation, carrier pickup scheduling, and real-time tracking webhooks.',
          'Automated generation of Indian diamond trade compliant PDF tax invoices on order dispatch.',
          'Integrated secure Razorpay payment processing and customer milestone notifications via SMS, Email, and WhatsApp.'
        ]
      }
    },
    {
      id: 'kifs',
      category: 'fintech',
      title: 'KIFS Home Loan',
      subtitle: 'Digital Loan Origination Platform (0-to-1 Solo Engineering)',
      badge: 'Fintech / Lending',
      metric: '📄 Digital KYC · Multi-Stage Approvals',
      image: 'assets/images/case-kifs.jpg',
      shortDesc: 'Flutter mobile application and backend pipelines for digital loan origination, document verification, and multi-stage underwriting approvals behind NGINX.',
      tech: ['Flutter', 'ASP.NET Core 8', 'PostgreSQL', 'NGINX', 'REST APIs'],
      links: {
        github: '',
        demo: ''
      },
      modal: {
        architecture: 'Mobile Client (Flutter) + ASP.NET Core 8 Web API + PostgreSQL Data Persistence',
        throughput: 'End-to-End Loan Origination Pipeline',
        latency: 'Sub-second KYC Document Upload & Parsing',
        cluster: 'PostgreSQL + NGINX Ingress Reverse Proxy',
        scaleImpact: 'Streamlined loan disbursement timeline with automated underwriting checks',
        overview: 'Developed the Flutter mobile application and backend services for the KIFS Home Loan digital origination platform, modernizing paper-heavy mortgage applications into an encrypted, multi-stage digital pipeline deployed behind NGINX reverse proxies.',
        keyFeatures: [
          'Digital KYC document capture pipelines for applicant onboarding and identity verification.',
          'Multi-stage administrative approval workflows facilitating credit officer review and risk scoring.',
          'Integration hooks for third-party credit bureau evaluation and underwriting decisioning.',
          'Real-time customer status tracking and push updates across every underwriting stage.'
        ]
      }
    },
    {
      id: 'easyaccounts',
      category: 'saas',
      title: 'EasyAccounts',
      subtitle: 'Multi-Tenant SaaS Accounting & Ledgers',
      badge: 'Multi-Tenant SaaS',
      metric: '🏢 Tenant-Isolated DB · Real-Time Ledgers',
      image: 'assets/images/case-easyaccounts.jpg',
      shortDesc: 'Multi-tenant cloud accounting and general ledger platform built with tenant-isolated database architecture.',
      tech: ['.NET 8', 'React Native', 'SQL Server', 'EF Core', 'REST API'],
      links: {
        github: '',
        demo: ''
      },
      modal: {
        architecture: 'Database-per-Tenant Isolated Architecture (.NET 8 + SQL Server)',
        throughput: 'Real-time double-entry ledger postings',
        latency: 'Single-digit millisecond query execution',
        cluster: 'SQL Server Elastic Pool + Azure Cloud',
        scaleImpact: '100% strict cryptographic and physical tenant data isolation',
        overview: 'EasyAccounts is a multi-tenant cloud accounting solution offering automated bookkeeping, invoice creation, and double-entry general ledgers with absolute isolation between organizational tenants.',
        keyFeatures: [
          'Tenant-isolated database architecture guaranteeing that financial ledgers and organizational data are completely segregated.',
          'High-performance double-entry bookkeeping engine ensuring transactional ACID consistency on every journal posting.',
          'Cross-platform React Native client interfacing with .NET 8 Web APIs for mobile invoicing and ledger audits.'
        ]
      }
    }
  ];

  // Filtering Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Modal Dialog
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalClose = document.getElementById('modal-close-btn');

  function openProjectModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project || !modalOverlay) return;

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-img').src = project.image;
    document.getElementById('modal-img').alt = `${project.title} Architecture`;
    document.getElementById('modal-arch').textContent = project.modal.architecture;
    document.getElementById('modal-throughput').textContent = project.modal.throughput;
    document.getElementById('modal-cluster').textContent = project.modal.cluster;
    document.getElementById('modal-desc').textContent = project.modal.overview;

    const listEl = document.getElementById('modal-features-list');
    listEl.innerHTML = '';
    project.modal.keyFeatures.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      listEl.appendChild(li);
    });

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = '';
    project.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      tagsEl.appendChild(span);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-open-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      if (id) openProjectModal(id);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  window.openProjectModal = openProjectModal;
})();
