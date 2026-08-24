export const services = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    shortDescription: "Custom, ultra-fast, modern web applications built with Next.js, React, and Three.js.",
    description: "We engineer high-performance web applications, marketing portals, and enterprise web solutions that captivate users, convert traffic, and scale effortlessly. Every line of code is optimized for SEO, speed, and sleek visual design.",
    icon: "Code2",
    badge: "Core Service",
    features: [
      "Next.js App Router Architecture",
      "Interactive 3D Web Graphics (Three.js/R3F)",
      "Server-Side Rendering & Lightning Performance",
      "Custom UI/UX & Responsive Engineering",
      "Full API & Database Integrations",
      "Automated Testing & Security Hardening"
    ],
    capabilities: [
      "Frontend Development",
      "Backend API & Database Architecture",
      "Progressive Web Apps (PWA)",
      "Full-Stack Web Platforms",
      "Web Performance Optimization",
      "Headless CMS Integration"
    ],
    technologies: ["Next.js", "React", "Three.js", "Tailwind CSS", "Node.js", "TypeScript", "GraphQL", "PostgreSQL"],
    process: [
      { step: "01", title: "Discovery & Architecture", desc: "Analyzing project goals, wireframing user flows, and mapping tech stack." },
      { step: "02", title: "3D & UI/UX Design", desc: "Designing responsive prototypes with interactive motion and modern aesthetics." },
      { step: "03", title: "Agile Development", desc: "Building modular components, integrating APIs, and implementing performance hooks." },
      { step: "04", title: "QA & Deployment", desc: "Automated speed audits, security checks, and seamless Vercel/Cloud deployment." }
    ],
    metrics: { speed: "< 0.8s LCP", lighthouse: "99+", uptime: "99.99%" }
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI & Workflow Automation",
    shortDescription: "Custom AI agents, LLM integrations, chatbot assistants, and automated business workflows.",
    description: "Transform your operations with enterprise-grade Artificial Intelligence solutions. We integrate custom AI models, automate repetitive workflows, build autonomous agents, and implement natural language interfaces that save thousands of work hours.",
    icon: "Cpu",
    badge: "AI-Native",
    features: [
      "Custom LLM & RAG Agent Development",
      "Automated Workflow Pipelines (Zapier/n8n/Custom)",
      "AI Chatbots & Intelligent Support Agents",
      "Document Processing & Vision Analytics",
      "API Integrations with OpenAI, Claude, HuggingFace",
      "Predictive Analytics & Data Science"
    ],
    capabilities: [
      "AI Chatbots",
      "Workflow Automation",
      "AI Integrations",
      "API Automation",
      "Business Intelligence Agents",
      "Custom Fine-Tuned Models"
    ],
    technologies: ["OpenAI API", "Python", "LangChain", "Pinecone", "Next.js", "n8n", "TensorFlow", "FastAPI"],
    process: [
      { step: "01", title: "Workflow Audit", desc: "Identifying manual bottlenecks and data integration opportunities." },
      { step: "02", title: "Agent Blueprint", desc: "Selecting optimal LLMs, vectors, and security permissions." },
      { step: "03", title: "Model Integration", desc: "Connecting custom endpoints, state management, and memory modules." },
      { step: "04", title: "Testing & Scaling", desc: "Evaluating response precision, fallbacks, and real-time scaling." }
    ],
    metrics: { timeSaved: "70% Hours Saved", efficiency: "10x Throughput", accuracy: "99.2%" }
  },
  {
    id: "custom-web-apps",
    slug: "custom-web-apps",
    title: "Custom Web Applications",
    shortDescription: "Bespoke SaaS platforms, internal management portals, and cloud-native software.",
    description: "From concept to market launch, we design and develop complex custom software solutions. Build scalable SaaS products, real-time analytics dashboards, and robust multi-tenant platforms tailored to your business needs.",
    icon: "Layers",
    badge: "Enterprise",
    features: [
      "Multi-Tenant SaaS Architectures",
      "Real-time Dashboards & Data Visualization",
      "Secure Role-Based Authentication (RBAC)",
      "Payment Gateways & Subscription Billing",
      "Microservices & Serverless Backends",
      "Cross-Platform Desktop & Web Sync"
    ],
    capabilities: [
      "SaaS Architecture",
      "Custom CRM/ERP Systems",
      "Admin Dashboards",
      "Real-time Data Engines",
      "Cloud Infrastructure",
      "Third-Party Integrations"
    ],
    technologies: ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "AWS"],
    process: [
      { step: "01", title: "Product Blueprint", desc: "Scope definition, database schema modeling, and UX specifications." },
      { step: "02", title: "Core Architecture", desc: "Setting up secure backends, multi-tenant databases, and authentication." },
      { step: "03", title: "Feature Sprints", desc: "Rapid iterative development of dashboard components and integrations." },
      { step: "04", title: "Launch & Monitoring", desc: "CI/CD setup, log tracking, and zero-downtime server scaling." }
    ],
    metrics: { scalability: "1M+ Users", security: "SOC2 Ready", latency: "< 50ms" }
  },
  {
    id: "ecommerce-solutions",
    slug: "ecommerce-solutions",
    title: "E-Commerce Platforms",
    shortDescription: "High-converting online stores, headless commerce, Shopify integrations, and custom checkout flows.",
    description: "We build custom online stores designed to maximize conversions, lower customer acquisition costs, and handle massive traffic spikes. Harness the speed of headless commerce or custom e-commerce engines with frictionless payments.",
    icon: "ShoppingBag",
    badge: "High Conversion",
    features: [
      "Headless E-Commerce Solutions",
      "Custom Shopify & WooCommerce Themes",
      "Frictionless One-Click Checkout Systems",
      "Stripe, PayPal & Crypto Payment Gateways",
      "Inventory Sync & Order Management API",
      "Real-Time Analytics & Personalization"
    ],
    capabilities: [
      "Shopify Plus Development",
      "Custom E-Commerce Storefronts",
      "Headless Storefront (Next.js + Shopify)",
      "Payment Gateway Integrations",
      "Product Customizers & 3D Previews",
      "Subscription & Recurring Billing"
    ],
    technologies: ["Shopify API", "Next.js", "Stripe", "Tailwind CSS", "Sanity.io", "GraphQL", "Redis"],
    process: [
      { step: "01", title: "CRO & Store Audit", desc: "Analyzing buyer journey, cart conversion drivers, and funnel flow." },
      { step: "02", title: "Storefront Design", desc: "Crafting modern product showcases and lightning-fast product pages." },
      { step: "03", title: "Checkout Integration", desc: "Building secure, low-friction payment flows with local payment support." },
      { step: "04", title: "Growth Launch", desc: "A/B testing, pixel integrations, and speed optimization for ad campaigns." }
    ],
    metrics: { conversionBoost: "+35% Average", checkoutSpeed: "1.2s", uptime: "99.99%" }
  },
  {
    id: "seo-digital-growth",
    slug: "seo-digital-growth",
    title: "SEO & Digital Growth",
    shortDescription: "Data-driven SEO, technical optimization, conversion rate optimization, and organic market dominance.",
    description: "Dominating search rankings requires technical perfection, high-authority content, and strategic growth loops. We optimize every aspect of your web presence to rank on page 1 of Google and drive high-intent organic traffic.",
    icon: "TrendingUp",
    badge: "Growth Engine",
    features: [
      "Technical SEO Audits & Core Web Vitals Optimization",
      "Keyword Strategy & Semantic Content Planning",
      "Schema Markup & Structured Data Implementation",
      "Conversion Rate Optimization (CRO)",
      "Competitor Analysis & Link Architecture",
      "Local & International Multi-Region SEO"
    ],
    capabilities: [
      "Technical SEO",
      "On-Page & Schema Optimization",
      "Core Web Vitals Boost",
      "Conversion Optimization",
      "Organic Search Strategy",
      "Analytics & Funnel Tracking"
    ],
    technologies: ["Google Search Console", "Ahrefs", "Semrush", "Next.js SEO", "Google Analytics 4", "Lighthouse"],
    process: [
      { step: "01", title: "Deep Technical Audit", desc: "Identifying indexing issues, speed bottlenecks, and code inefficiencies." },
      { step: "02", title: "Keyword Architecture", desc: "Mapping high-value search terms to dedicated landing pages." },
      { step: "03", title: "Optimization Sprint", desc: "Refactoring meta tags, structured data, canonicals, and DOM size." },
      { step: "04", title: "Growth Monitoring", desc: "Weekly rank tracking, traffic analysis, and ongoing CRO adjustments." }
    ],
    metrics: { rankImprovement: "#1 Page Target", trafficGrowth: "3x Organic", loadTime: "< 1s" }
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX & Interactive Design",
    shortDescription: "Award-winning interface design, wireframing, design systems, and micro-animations.",
    description: "We create digital interfaces that leave lasting impressions. Combining deep user research, sleek visual polish, and subtle interactive animations, we transform complex software into intuitive, pleasurable product experiences.",
    icon: "Palette",
    badge: "Creative Studio",
    features: [
      "User Research & Wireframing",
      "Interactive High-Fidelity Prototypes",
      "Enterprise Design Systems & UI Components",
      "Micro-Animations & Motion Specs",
      "Usability Testing & Accessibility (WCAG 2.1)",
      "3D Asset Design & Visual Branding"
    ],
    capabilities: [
      "Figma Prototype Design",
      "Design System Architecture",
      "Product UX Audits",
      "Mobile App UI",
      "Micro-Interactions",
      "3D Visual Assets"
    ],
    technologies: ["Figma", "Framer", "Adobe CC", "Blender", "Lottie", "Spline"],
    process: [
      { step: "01", title: "User Persona Research", desc: "Understanding user psychology, pain points, and functional goals." },
      { step: "02", title: "Wireframes & Flows", desc: "Mapping visual hierarchy, key user journeys, and action paths." },
      { step: "03", title: "UI & Motion Design", desc: "Building responsive component systems, dark mode palettes, and glass effects." },
      { step: "04", title: "Handoff & Guidelines", desc: "Delivering pixel-perfect design specs and dev-ready asset libraries." }
    ],
    metrics: { userSatisfaction: "98%", accessibility: "WCAG AAA", engagement: "+45%" }
  },
  {
    id: "api-backend",
    slug: "api-backend",
    title: "API & Backend Infrastructure",
    shortDescription: "Scalable REST & GraphQL APIs, microservices, database architecture, and cloud server management.",
    description: "Power your web apps with robust, secure, high-throughput backend infrastructure. We design scalable databases, construct high-speed APIs, and implement serverless cloud architectures that handle heavy loads effortlessly.",
    icon: "Server",
    badge: "Infrastructure",
    features: [
      "RESTful & GraphQL API Engineering",
      "PostgreSQL, MongoDB, and Redis Optimization",
      "Authentication & JWT / OAuth Systems",
      "Serverless Architecture (Vercel, AWS Lambda)",
      "Real-time WebSockets & Data Streaming",
      "API Security & Rate Limiting"
    ],
    capabilities: [
      "Backend Architecture",
      "Database Design & Migration",
      "GraphQL & REST APIs",
      "Microservices",
      "Cloud Deployment & Server Management",
      "Security Audits"
    ],
    technologies: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL", "Redis", "Docker", "AWS"],
    process: [
      { step: "01", title: "Data Modeling", desc: "Designing normalized schemas, indexes, and caching strategies." },
      { step: "02", title: "API Construction", desc: "Writing clean, type-safe backend controllers with full validation." },
      { step: "03", title: "Security Hardening", desc: "Implementing CORS, rate limiting, encryption, and token rotation." },
      { step: "04", title: "DevOps & Deployment", desc: "Configuring auto-scaling containers, logs, and server health alerts." }
    ],
    metrics: { latency: "< 30ms API", concurrency: "50k req/min", uptime: "99.99%" }
  },
  {
    id: "saas-development",
    slug: "saas-development",
    title: "SaaS Product Development",
    shortDescription: "End-to-end SaaS creation from MVP validation to scalable multi-tenant platform architecture.",
    description: "Launch your SaaS product with confidence. We partner with founders and enterprise teams to design, engineer, and scale recurring-revenue digital products with built-in subscription billing, tenant isolation, and analytics.",
    icon: "Zap",
    badge: "Full Cycle",
    features: [
      "Rapid MVP Development",
      "Stripe Subscription & Invoicing Engine",
      "Multi-Tenant Isolation & Security",
      "Customer Portal & Plan Upgrades",
      "Product Analytics & Usage Metrics",
      "Automated Onboarding Flows"
    ],
    capabilities: [
      "SaaS MVP Engineering",
      "Subscription Billing Integration",
      "Tenant Management Portals",
      "User Permission Systems",
      "SaaS Analytics",
      "API Platform Integrations"
    ],
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "Resend"],
    process: [
      { step: "01", title: "MVP Scope & Roadmapping", desc: "Prioritizing core features for fast market entry." },
      { step: "02", title: "Architecture & Auth", desc: "Setting up authentication, database tenants, and Stripe billing." },
      { step: "03", title: "Core Feature Sprints", desc: "Engineering user dashboards, workflows, and automated emails." },
      { step: "04", title: "Beta & Public Launch", desc: "Deploying to production, monitoring conversion funnels, and scaling." }
    ],
    metrics: { timeToMarket: "6-8 Weeks", retention: "High Retention", billing: "Stripe Ready" }
  }
];
