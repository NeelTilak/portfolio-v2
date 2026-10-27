# Neel Tilak — Backend & Cloud Platform Engineer Portfolio

Portfolio website for **Neel Tilak** (Backend & Cloud Platform Engineer based in Mumbai, India).

> "I build backend systems from ambiguous requirements to production: private cloud, distributed workers, and recurring-payment billing."

---

## 🏗️ Architecture & Sections (In Exact Order)

1. **Hero**:
   - Location: Mumbai, India | Title: Backend & Cloud Platform Engineer
   - Tagline & status pill: *Open to Backend / Platform Engineer roles*
   - Direct links to Case Studies, CLI Terminal, Contact, and downloadable `/resume.pdf`
2. **About (Exactly 3 sentences)**:
   - Concise summary of expertise in private cloud (IaaS) automation, distributed background worker pipelines, Layer 4 load balancing, and C#/.NET 8.
3. **Case Studies (NDA-Compliant Architecture Deep Dives)**:
   - **Indryom** (Private Cloud IaaS): Provisioning via Type-1 hypervisor REST APIs (KVM/QEMU), Layer 4 HAProxy load balancing, automated edge firewall gateways & NAT, RabbitMQ reconciliation workers, Razorpay e-NACH auto-debit. (Metrics placeholders: `[TODO: X tenants]`, `[TODO: Y VMs managed]`, `[TODO: Z% auto-debit success]`).
   - **SaturnnLGD** (Luxury Diamond E-Commerce & Logistics): Custom Blue Dart carrier integration plugin (REST/SOAP), digital waybills, tracking webhooks, and Razorpay.
   - **KIFS Home Loan** (Digital Lending Platform): Digital KYC document capture, multi-stage approval workflow, credit evaluation hooks.
   - **EasyAccounts** (Multi-Tenant SaaS Accounting): Tenant-isolated database architecture for cloud accounting and general ledgers.
4. **Open-Source Projects**:
   - **Mini Cloud Control Plane**: ASP.NET Core 8, EF Core, RabbitMQ, fake hypervisor API, state machine, quotas, reconciliation worker.
   - **Recurring Billing Engine**: Razorpay test mode, idempotent webhooks, backoff retries, suspension after grace period.
5. **Work Experience Timeline**:
   - **Hirdhav Software Pvt Ltd** (Mar 2024 – Present, Mumbai): Software Developer / Cloud Infrastructure Engineer
   - **Terado Engineering** (Dec 2023 – Mar 2024, Mumbai): Jr Backend Developer
   - **Freelance Software Developer** (2023): Full-stack web modules and prototypes using .NET and React
6. **Skills (Two Clear Tiers)**:
   - **Daily Stack**: C#, ASP.NET Core 8, EF Core, LINQ, Web API, RabbitMQ, BackgroundService workers, SQL Server, PostgreSQL, Linux, NGINX, HAProxy, Edge Firewalls & SDN, Razorpay, Azure AD OAuth.
   - **Also Worked With**: Node.js, Express, Python (FastAPI), React, Flutter, WooCommerce/PHP plugins, Docker, Prometheus, Elasticsearch, Serilog.
7. **Education**:
   - **B.E. Computer Science & Engineering**: Rajiv Gandhi Institute of Technology, Mumbai University (Aug 2020 – May 2023) — **CGPA 9.4/10**, First Class with Distinction.
   - **Diploma in Computer Engineering**: Pravin Patil College of Diploma Engineering & Technology, MSBTE (Jun 2017 – May 2020) — **91.37%**, Distinction.
8. **Engineering Notes (Blog)**:
   - *"Reconciling infrastructure state against the database"*
   - *"Designing retry logic for recurring e-NACH payments"*
9. **Contact**:
   - Email: `neeltilak.1998@gmail.com` (with copy pill)
   - LinkedIn: `https://linkedin.com/in/neel-tilak-74734b231`
   - GitHub: `https://github.com/NeelTilak`
   - Resume download: `/resume.pdf`
   - Netlify-ready contact form (`data-netlify="true"`)
   - *No phone number on public site (as requested).*

---

## 💻 Local Preview

The local server is running on:
```text
http://localhost:8080/
```

To run manually at any time:
```bash
python -m http.server 8080
```

---

## 🌐 Netlify Deployment

1. Drag-and-drop the `portfolio` folder to [app.netlify.com/drop](https://app.netlify.com/drop), or
2. Push to GitHub and connect to Netlify (auto-deploys via `netlify.toml` in seconds).
