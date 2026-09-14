export const services = [
  {
    id: "html-css",
    slug: "html-css",
    title: "HTML & CSS",
    shortDescription: "Pixel-perfect, semantic HTML5 and standards-compliant CSS3 architecture for high-speed, accessible websites.",
    description: "We build rock-solid foundational web markup using semantic HTML5 and modern CSS3. Every page is structured for optimal accessibility (WCAG), search engine indexing, and flawless cross-browser rendering across every screen size.",
    icon: "Code2",
    badge: "Core Frontend",
    features: [
      "Semantic HTML5 Clean Markup",
      "CSS3 Animations & Custom Styling",
      "WCAG 2.1 AAA Accessibility Standards",
      "Cross-Browser Pixel Perfection",
      "Mobile-First Responsive Layouts",
      "SEO-Friendly DOM Structure"
    ],
    capabilities: [
      "Semantic HTML Markup",
      "CSS3 Custom Styling & Media Queries",
      "Responsive Layout Design",
      "Web Accessibility & SEO Optimization",
      "SVG & Vector Icon Integration",
      "Clean Modular Codebases"
    ],
    technologies: ["HTML5", "CSS3", "Semantic Elements", "Web Standards", "W3C Validation", "SVG"],
    process: [
      { step: "01", title: "Design Analysis", desc: "Analyzing wireframes to determine optimal semantic tag structure and hierarchy." },
      { step: "02", title: "HTML5 Scaffolding", desc: "Writing clean, readable, accessible semantic markup for all page components." },
      { step: "03", title: "CSS3 Styling", desc: "Crafting fluid responsive layouts, typography scales, and custom UI elements." },
      { step: "04", title: "Cross-Device QA", desc: "Testing across Chrome, Safari, Firefox, iOS, and Android for zero visual flaws." }
    ],
    metrics: { accessibility: "100 Score", validation: "W3C Valid", compatibility: "100% Browsers" }
  },
  {
    id: "advanced-css",
    slug: "advanced-css",
    title: "Advanced CSS (Flexbox, Grid & Bootstrap)",
    shortDescription: "Complex multi-dimensional layouts, 2D CSS Grid systems, Flexbox architecture, Bootstrap 5, and keyframe animations.",
    description: "Mastering complex responsive web layouts with advanced CSS techniques. We design dynamic 2D CSS Grid templates, precision Flexbox alignments, customized Bootstrap 5 frameworks, and hardware-accelerated CSS keyframe animations for high-impact visual experiences.",
    icon: "Layout",
    badge: "Styling & Layout",
    features: [
      "2D CSS Grid & Subgrid Systems",
      "Complex Flexbox Dynamic Alignments",
      "Custom Bootstrap 5 Component Overrides",
      "Hardware-Accelerated CSS Keyframe Animations",
      "CSS Custom Properties & Dynamic Theming",
      "Fluid Typography & Clamp Calculations"
    ],
    capabilities: [
      "CSS Grid 2D Layouts",
      "Flexbox Dynamic Interfaces",
      "Bootstrap 5 Responsive Themes",
      "CSS Micro-Interactions & Animations",
      "Modern CSS Functions (clamp, min, max)",
      "Dark Mode & Dynamic Theme Variables"
    ],
    technologies: ["CSS Grid", "Flexbox", "Bootstrap 5", "CSS Keyframes", "CSS Variables", "Sass/SCSS"],
    process: [
      { step: "01", title: "Grid Architecture", desc: "Structuring 12-column and custom multi-axis CSS grids for adaptive screen flows." },
      { step: "02", title: "Flexbox Layouts", desc: "Aligning inner components, navigation bars, and flexible content containers." },
      { step: "03", title: "Animation Tuning", desc: "Creating 60fps smooth CSS transitions and keyframe motion effects." },
      { step: "04", title: "Optimization", desc: "Minifying CSS, eliminating layout shifts (CLS), and fine-tuning responsive breakpoints." }
    ],
    metrics: { fps: "60 FPS Smooth", cls: "0.00 CLS Shift", responsiveness: "100% Adaptive" }
  },
  {
    id: "tailwindcss",
    slug: "tailwindcss",
    title: "Tailwind CSS",
    shortDescription: "Utility-first modern design systems, custom configuration themes, dark mode engines, and zero-runtime CSS.",
    description: "Accelerate frontend development with custom-engineered Tailwind CSS architectures. We build highly reusable component systems, extend design tokens, implement seamless dark mode switching, and produce lightning-fast, purged CSS bundles.",
    icon: "Sparkles",
    badge: "Modern UI Styling",
    features: [
      "Custom Tailwind Design System Configs",
      "Zero-Runtime Lightning Fast Bundles",
      "Seamless Dark / Light Mode Switching",
      "Arbitrary Value & Plugin Customizations",
      "Responsive Utility Class Architecture",
      "Tailwind Merge & Clsx Component Harmony"
    ],
    capabilities: [
      "Utility-First Component Development",
      "Custom Tailwind Plugins & Extensions",
      "Tailwind v4 Modern Configuration",
      "Dark Theme Design Systems",
      "Micro-Interactions & Hover Transforms",
      "Purged & Minified Production Builds"
    ],
    technologies: ["Tailwind CSS v4", "PostCSS", "Tailwind Merge", "Clsx", "CSS Variables", "Modern UI"],
    process: [
      { step: "01", title: "Token Definition", desc: "Defining brand color palettes, typography scales, and border radiuses in config." },
      { step: "02", title: "Component Crafting", desc: "Assembling modular, styled UI components with utility classes." },
      { step: "03", title: "Theme Integration", desc: "Configuring dark/light mode toggles with persistent user preferences." },
      { step: "04", title: "Purge & Build", desc: "Optimizing production bundle to sub-10KB stylesheet footprint." }
    ],
    metrics: { bundleSize: "< 12KB CSS", loadTime: "< 0.2s", maintainability: "A+ Clean" }
  },
  {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript (Modern ES6+)",
    shortDescription: "High-performance vanilla JavaScript, asynchronous APIs, DOM manipulation, and dynamic client-side logic.",
    description: "Harness the true power of Modern JavaScript (ES6+). We build high-speed client-side applications, complex interactive calculators, custom sliders, async data fetching modules, and event-driven architectures with clean, modern syntax.",
    icon: "Zap",
    badge: "Core Programming",
    features: [
      "Modern ES6+ Syntax (Async/Await, Promises)",
      "High-Speed DOM Manipulation & Event Handling",
      "Fetch API & RESTful Data Integration",
      "Local Storage & Session State Management",
      "Modular JavaScript (ES Modules / Webpack)",
      "Clean, Bug-Free, Tested Code Logic"
    ],
    capabilities: [
      "Vanilla JS Interactive UI Components",
      "Asynchronous API Data Fetching",
      "Event-Driven Architecture",
      "Custom JS Algorithms & Calculations",
      "Browser Storage & Session Handlers",
      "Performance & Memory Optimization"
    ],
    technologies: ["JavaScript ES6+", "DOM API", "Fetch API", "Async/Await", "Event Loop", "Web Workers"],
    process: [
      { step: "01", title: "Logic Design", desc: "Formulating algorithm flows, data structures, and event listeners." },
      { step: "02", title: "Modular Coding", desc: "Writing clean ES modules with strict error handling and async pipelines." },
      { step: "03", title: "DOM Optimization", desc: "Eliminating memory leaks and optimizing browser rendering cycles." },
      { step: "04", title: "Unit Testing", desc: "Writing automated tests to verify edge-case calculations and inputs." }
    ],
    metrics: { execution: "Sub-millisecond", coverage: "95% Tested", memory: "Zero Leaks" }
  },
  {
    id: "react-js",
    slug: "react-js",
    title: "React.js",
    shortDescription: "Scalable component-based SPAs, custom React hooks, state management with Redux/Zustand, and snappy interactive UIs.",
    description: "We architect scalable, lightning-fast Single Page Applications (SPAs) with React.js. From complex dashboard states to high-performance component libraries, our React solutions deliver silky-smooth user interactions with clean component lifecycles.",
    icon: "Cpu",
    badge: "Frontend Framework",
    features: [
      "Component-Driven Modular Architecture",
      "Custom React Hooks & Context APIs",
      "State Management with Zustand & Redux",
      "Virtual DOM & Re-render Optimization",
      "Interactive Client-Side Routing",
      "Reusable UI Component Libraries"
    ],
    capabilities: [
      "Single Page Applications (SPA)",
      "Dynamic Dashboard Interfaces",
      "Complex Form & State Management",
      "Custom React Hooks Architecture",
      "Third-Party SDK & Library Integration",
      "Performance Profiling & Memoization"
    ],
    technologies: ["React 19", "React Hooks", "Zustand", "Redux Toolkit", "React Router", "Framer Motion"],
    process: [
      { step: "01", title: "State Architecture", desc: "Planning component hierarchy, global state stores, and data contracts." },
      { step: "02", title: "Component Sprints", desc: "Building type-safe, reusable UI elements with reactive props." },
      { step: "03", title: "State Binding", desc: "Connecting REST/GraphQL APIs with optimistic UI updates and caching." },
      { step: "04", title: "Profiling & Polish", desc: "Profiling with React DevTools to ensure zero unnecessary re-renders." }
    ],
    metrics: { renderSpeed: "< 16ms Frame", reRenders: "Zero Waste", satisfaction: "99%" }
  },
  {
    id: "next-js",
    slug: "next-js",
    title: "Next.js (Full Stack & SSR)",
    shortDescription: "Production Next.js 15 App Router applications with Server-Side Rendering (SSR), Server Components, and Edge APIs.",
    description: "DevCodeX specializes in production-ready Next.js web platforms. We leverage the App Router, React Server Components (RSC), incremental static regeneration (ISR), dynamic server actions, and edge API routes to achieve 99+ Lighthouse performance.",
    icon: "Layers",
    badge: "Full Stack Powerhouse",
    features: [
      "Next.js 15 App Router Architecture",
      "React Server Components (RSC) & Streaming SSR",
      "Static Site Generation (SSG) & ISR Caching",
      "Type-Safe Server Actions & API Handlers",
      "Core Web Vitals & SEO Perfection (99+ Score)",
      "Edge Middleware & Route Handlers"
    ],
    capabilities: [
      "Full-Stack Web Applications",
      "High-Traffic Marketing Portals",
      "Server-Rendered SaaS Dashboards",
      "SEO-Dominant Web Platforms",
      "Edge Computing & Authentication",
      "Automated Vercel & Cloud Deployments"
    ],
    technologies: ["Next.js 15", "React 19", "App Router", "Server Actions", "TypeScript", "Vercel Edge"],
    process: [
      { step: "01", title: "SSR / SSG Strategy", desc: "Categorizing static, dynamic, and cached routes for maximum speed." },
      { step: "02", title: "App Router Build", desc: "Constructing layouts, server components, and streaming Suspense boundaries." },
      { step: "03", title: "Server Actions & DB", desc: "Wiring direct database queries and mutations securely in server actions." },
      { step: "04", title: "Lighthouse Optimization", desc: "Auditing Core Web Vitals to guarantee sub-second LCP and 99+ scores." }
    ],
    metrics: { lighthouse: "99+ All Scores", lcp: "< 0.7s Speed", uptime: "99.99%" }
  },
  {
    id: "node-js",
    slug: "node-js",
    title: "Node.js",
    shortDescription: "High-throughput asynchronous backend systems, Express.js REST/GraphQL APIs, and microservices architecture.",
    description: "Power your software with high-concurrency, asynchronous Node.js backends. We develop scalable RESTful APIs, real-time WebSocket communication servers, background task workers, and microservices designed for enterprise durability.",
    icon: "Server",
    badge: "Backend Runtime",
    features: [
      "High-Throughput Asynchronous Event Loop",
      "RESTful API & GraphQL Server Development",
      "Real-Time WebSockets & Event Streaming",
      "JWT Authentication & Role-Based Access Control",
      "Background Queues & Job Workers (BullMQ/Redis)",
      "Secure Middleware & Input Validation Pipelines"
    ],
    capabilities: [
      "Backend REST & GraphQL APIs",
      "Real-Time Chat & Collaboration Engines",
      "Microservices Architecture",
      "Third-Party Payment & Webhook Integrations",
      "Asynchronous File Processing & PDF Generation",
      "High-Concurrency Server Scaling"
    ],
    technologies: ["Node.js", "Express.js", "Fastify", "Socket.io", "JWT", "Redis", "BullMQ"],
    process: [
      { step: "01", title: "API Contract Design", desc: "Designing REST endpoints, request/response DTOs, and error codes." },
      { step: "02", title: "Controller Development", desc: "Implementing asynchronous business logic, services, and validation." },
      { step: "03", title: "Security Hardening", desc: "Configuring CORS, helmet, rate limiting, and token encryption." },
      { step: "04", title: "Load Testing", desc: "Simulating heavy concurrent requests to guarantee low latency under load." }
    ],
    metrics: { latency: "< 35ms API", concurrency: "50,000 req/min", reliability: "99.99%" }
  },
  {
    id: "nest-js",
    slug: "nest-js",
    title: "Nest.js",
    shortDescription: "Enterprise-grade TypeScript modular backend architecture with dependency injection and microservice scalability.",
    description: "For enterprise platforms requiring strict maintainability, we engineer backends with Nest.js. Utilizing progressive TypeScript, modular controllers, decorators, dependency injection, and clean architecture, our Nest.js systems scale seamlessly across large engineering teams.",
    icon: "Box",
    badge: "Enterprise Backend",
    features: [
      "Strict TypeScript Enterprise Architecture",
      "Modular Dependency Injection System",
      "Built-in Microservices (gRPC, RabbitMQ, Kafka)",
      "Swagger / OpenAPI Automated Documentation",
      "Class-Validator & Transform Interceptors",
      "TypeORM & Prisma Database Integrations"
    ],
    capabilities: [
      "Enterprise Backend Architectures",
      "Modular Microservices",
      "GraphQL & REST API Gateways",
      "Automated Swagger API Docs",
      "Role & Permission Guard Middleware",
      "Distributed Event-Driven Services"
    ],
    technologies: ["Nest.js", "TypeScript", "TypeORM", "Prisma", "Swagger", "gRPC", "Docker"],
    process: [
      { step: "01", title: "Domain Modeling", desc: "Structuring modules, entities, DTOs, and dependency injection graphs." },
      { step: "02", title: "Module Development", desc: "Engineering controllers, services, guards, and custom pipe interceptors." },
      { step: "03", title: "Database & Microservices", desc: "Wiring ORM repositories, transaction managers, and message brokers." },
      { step: "04", title: "Integration Testing", desc: "Running end-to-end (e2e) test suites with Jest and supertest." }
    ],
    metrics: { typeSafety: "100% Strict", testCoverage: "95% E2E", scalability: "Enterprise Ready" }
  },
  {
    id: "mongodb",
    slug: "mongodb",
    title: "MongoDB & Databases",
    shortDescription: "Scalable NoSQL database architecture, Mongoose schema modeling, aggregation pipelines, and cloud cluster management.",
    description: "Store and query your business data with ultra-high speed and reliability. We design normalized and document-oriented database schemas in MongoDB, build optimized aggregation pipelines, configure indexing strategies, and manage secure Atlas cloud clusters.",
    icon: "Database",
    badge: "Database & Storage",
    features: [
      "Mongoose Schema Modeling & Validation",
      "Advanced Aggregation & Analytics Pipelines",
      "Index Tuning & Query Optimization (<10ms)",
      "MongoDB Atlas High-Availability Clusters",
      "Data Encryption At Rest & In Transit",
      "Automated Backups & Sharding Strategies"
    ],
    capabilities: [
      "NoSQL Database Schema Design",
      "Data Migration & Seeding Scripts",
      "High-Speed Search & Filter Pipelines",
      "Multi-Tenant Database Separation",
      "Atlas Cluster Configuration & Security",
      "Performance Profiling & Query Optimization"
    ],
    technologies: ["MongoDB", "Mongoose", "MongoDB Atlas", "Aggregation Pipeline", "Redis Caching", "Compass"],
    process: [
      { step: "01", title: "Schema Engineering", desc: "Designing document schemas, relations, and embedded subdocuments." },
      { step: "02", title: "Index Optimization", desc: "Creating compound and text indexes for fast lookup query speeds." },
      { step: "03", title: "Pipeline Construction", desc: "Building multi-stage aggregation pipelines for reports and dashboard stats." },
      { step: "04", title: "Cluster Deployment", desc: "Configuring Atlas replica sets, automated backups, and IP whitelisting." }
    ],
    metrics: { querySpeed: "< 8ms Queries", availability: "99.999% SLA", scalability: "Billions of Docs" }
  },
  {
    id: "wordpress",
    slug: "wordpress",
    title: "WordPress Development",
    shortDescription: "Custom WordPress theme engineering, WooCommerce e-commerce stores, custom plugin creation, and headless WordPress.",
    description: "Get the full power of the world's most popular CMS with zero template bloat. We build bespoke WordPress themes from scratch, configure high-converting WooCommerce storefronts, develop custom plugins, and create lightning-fast headless WordPress setups.",
    icon: "Globe",
    badge: "CMS & Portals",
    features: [
      "100% Custom Theme Development (No Heavy Builders)",
      "WooCommerce Custom Storefronts & Checkout",
      "Custom Gutenberg Blocks & ACF Pro Integration",
      "Custom Plugin Development for Unique Logic",
      "Enterprise WordPress Security Hardening",
      "Speed Optimization & Cloudflare Caching"
    ],
    capabilities: [
      "Custom WordPress Theme Creation",
      "WooCommerce E-Commerce Stores",
      "ACF Pro & Custom Block Architecture",
      "Headless WordPress with Next.js",
      "Security Audits & Malware Prevention",
      "PageSpeed 95+ Score Optimization"
    ],
    technologies: ["WordPress", "PHP", "WooCommerce", "ACF Pro", "Gutenberg", "MySQL", "REST API"],
    process: [
      { step: "01", title: "Wireframe Mapping", desc: "Designing custom field blueprints and editable block layouts in ACF." },
      { step: "02", title: "Theme Coding", desc: "Writing clean, lightweight PHP/CSS templates with zero bloated plugins." },
      { step: "03", title: "WooCommerce & Payments", desc: "Configuring payment gateways, shipping rules, and frictionless checkout." },
      { step: "04", title: "Speed & Security", desc: "Configuring caching, object caches, SSL, and security firewalls." }
    ],
    metrics: { pageSpeed: "95+ Mobile Score", security: "Zero Vulnerability", easeOfUse: "Client Friendly" }
  },
  {
    id: "shopify",
    slug: "shopify",
    title: "Shopify & E-Commerce",
    shortDescription: "Custom Liquid theme design, Headless Shopify storefronts with Next.js, app integrations, and conversion checkout flows.",
    description: "Maximize online retail sales with custom-built Shopify stores. We craft bespoke Liquid themes, engineer headless Next.js storefronts connected to the Shopify Storefront API, build custom product builders, and optimize every step of your checkout funnel.",
    icon: "ShoppingBag",
    badge: "E-Commerce Growth",
    features: [
      "Custom Shopify Liquid Theme Development",
      "Headless Storefronts (Next.js + Shopify API)",
      "High-Converting One-Click Checkout Flows",
      "Custom App Integrations & Private Apps",
      "Inventory Sync & Third-Party ERP Hookups",
      "Conversion Rate Optimization (CRO) UX"
    ],
    capabilities: [
      "Shopify Plus Theme Engineering",
      "Headless Commerce Architectures",
      "Custom 3D Product Customizers",
      "Payment & Currency Multi-Region Setup",
      "App Development & Webhook Automation",
      "Conversion Funnel Optimization"
    ],
    technologies: ["Shopify Liquid", "Shopify Plus", "Storefront GraphQL API", "Next.js", "Stripe", "Klaviyo"],
    process: [
      { step: "01", title: "Funnel Analysis", desc: "Analyzing target audience, checkout drop-offs, and product catalog scope." },
      { step: "02", title: "Theme Customization", desc: "Developing bespoke Liquid sections, quick-view modals, and cart drawers." },
      { step: "03", title: "API Integrations", desc: "Connecting payment gateways, analytics pixels, reviews, and email flows." },
      { step: "04", title: "Launch & CRO", desc: "Executing end-to-end purchase testing and speed optimization across all devices." }
    ],
    metrics: { conversionLift: "+35% Average", checkoutSpeed: "1.1s", mobileUX: "Flawless" }
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI Automation",
    shortDescription: "Autonomous AI agents, enterprise workflow automation (n8n/Zapier), document processing, and task automation pipelines.",
    description: "Automate complex business processes and save hundreds of manual hours every week. We design autonomous AI agents, multi-step workflow pipelines with n8n and Zapier, automated data scrapers, invoice/document parsing systems, and enterprise bots.",
    icon: "Bot",
    badge: "Intelligent Workflows",
    features: [
      "Autonomous Multi-Step AI Agent Pipelines",
      "Enterprise n8n, Make & Zapier Automations",
      "Automated Document & Invoice Data Extraction",
      "CRM & Lead Auto-Routing Workflows",
      "Automated Email & Customer Outreach Sequences",
      "24/7 Error Handlers & Fallback Alerts"
    ],
    capabilities: [
      "End-to-End Workflow Automation",
      "Custom n8n Server Deployments",
      "Document AI & OCR Extraction",
      "Automated Reporting & Analytics",
      "API Webhook Relay Systems",
      "Business Process Optimization"
    ],
    technologies: ["n8n", "Python", "Zapier", "Make.com", "OpenAI", "Webhooks", "LangChain"],
    process: [
      { step: "01", title: "Bottleneck Audit", desc: "Mapping current manual operations, data handoffs, and time sinks." },
      { step: "02", title: "Pipeline Architecture", desc: "Configuring multi-branch workflows with AI classification and logic." },
      { step: "03", title: "Integration & Testing", desc: "Connecting CRMs, databases, email providers, and webhooks securely." },
      { step: "04", title: "Live Automation", desc: "Deploying automated triggers with instant failure alerts and logs." }
    ],
    metrics: { timeSaved: "75% Hours Cut", throughput: "10x Faster", reliability: "99.9% Uptime" }
  },
  {
    id: "ai-integration",
    slug: "ai-integration",
    title: "AI Integration & LLMs",
    shortDescription: "Custom LLM integrations, OpenAI & Claude APIs, RAG knowledge bases, intelligent chatbots, and embeddings.",
    description: "Embed modern AI directly into your web platforms and SaaS products. We integrate cutting-edge models from OpenAI (GPT-4o), Anthropic (Claude 3.5), and Hugging Face, build Retrieval-Augmented Generation (RAG) vector systems, and engineer intelligent conversational chatbots.",
    icon: "Brain",
    badge: "Smart Applications",
    features: [
      "Custom AI Chatbots & Customer Assistants",
      "RAG Vector Knowledge Bases (Pinecone / Chroma)",
      "OpenAI, Claude, & Gemini API Integrations",
      "Semantic Search & Natural Language Querying",
      "Structured JSON Output & Function Calling",
      "Prompt Engineering & Token Cost Optimization"
    ],
    capabilities: [
      "LLM Web Application Integrations",
      "RAG Knowledge Base Engines",
      "Intelligent Chatbot Widgets",
      "Automated Content Generation Tools",
      "AI Code & Data Analysis Engines",
      "Model Fine-Tuning & Prompt Tuning"
    ],
    technologies: ["OpenAI API", "Claude API", "Gemini API", "Pinecone", "LangChain", "Vector DBs", "LlamaIndex"],
    process: [
      { step: "01", title: "Model Selection", desc: "Evaluating accuracy, latency, and token pricing for optimal model choices." },
      { step: "02", title: "Vector Embedding", desc: "Chunking company docs, generating embeddings, and storing in vector DBs." },
      { step: "03", title: "Agent Integration", desc: "Connecting system prompts, streaming responses, and function calling." },
      { step: "04", title: "Safety & Scaling", desc: "Implementing rate limits, content moderation filters, and fallback responses." }
    ],
    metrics: { responseTime: "< 1.2s Stream", accuracy: "99.4%", tokenEfficiency: "40% Cost Saved" }
  },
  {
    id: "figma",
    slug: "figma",
    title: "Figma & UI/UX Design",
    shortDescription: "Award-winning dark mode interfaces, design systems, clickable interactive prototypes, and user journey wireframes.",
    description: "Transform your vision into world-class digital aesthetics. We design bespoke, dark-mode user interfaces in Figma, create comprehensive component design systems with auto-layout and variants, and craft interactive prototypes ready for seamless developer handoff.",
    icon: "Palette",
    badge: "Design & Prototyping",
    features: [
      "High-Fidelity Interactive Figma Prototypes",
      "Scalable Enterprise Design Systems & Tokens",
      "Dark-Mode Aesthetics & Glassmorphic UI",
      "User Persona Research & Wireframe Flows",
      "Micro-Interactions & Animation Specs",
      "Pixel-Perfect Developer Handoff Specs"
    ],
    capabilities: [
      "Figma UI/UX Interface Design",
      "Comprehensive Design Systems",
      "Interactive Clickable Prototypes",
      "SaaS Product & Dashboard Design",
      "Mobile App UI/UX Design",
      "Design-to-Code Asset Exporting"
    ],
    technologies: ["Figma", "Design Tokens", "Auto-Layout", "Variants", "FigJam", "Framer", "UI/UX"],
    process: [
      { step: "01", title: "User Research & Flows", desc: "Mapping user journeys, information hierarchy, and low-fi wireframes." },
      { step: "02", title: "Visual Style Guide", desc: "Establishing typography scales, sleek color palettes, and component tokens." },
      { step: "03", title: "Hi-Fi Prototyping", desc: "Designing pixel-perfect responsive screens with interactive click flows." },
      { step: "04", title: "Dev Handoff", desc: "Annotating spacing, responsive rules, and exporting production-ready assets." }
    ],
    metrics: { userRating: "98% Positive", handoffSpeed: "2x Faster Dev", fidelity: "100% Pixel Perfect" }
  },
  {
    id: "aws",
    slug: "aws",
    title: "AWS & Cloud DevOps",
    shortDescription: "Cloud architecture on AWS (EC2, S3, Lambda), Docker containerization, CI/CD automated deployment, and server scaling.",
    description: "Build, deploy, and scale on battle-tested cloud infrastructure. We engineer secure Amazon Web Services (AWS) architectures, containerize applications with Docker, configure zero-downtime CI/CD automated deployment pipelines, and optimize cloud server performance.",
    icon: "Cloud",
    badge: "Cloud & DevOps",
    features: [
      "AWS Cloud Infrastructure (EC2, S3, RDS, CloudFront)",
      "Serverless Architecture (AWS Lambda & API Gateway)",
      "Docker Containerization & Kubernetes Clusters",
      "Automated CI/CD Pipelines (GitHub Actions / GitLab)",
      "SSL, IAM Security, VPC & Firewall Configuration",
      "Real-Time CloudWatch Monitoring & Auto-Scaling"
    ],
    capabilities: [
      "AWS Cloud Infrastructure Setup",
      "Docker Containerization",
      "Automated CI/CD Deployment",
      "Database High-Availability & Backups",
      "Serverless Cloud Functions",
      "Cloud Cost & Security Optimization"
    ],
    technologies: ["AWS", "EC2", "S3", "AWS Lambda", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    process: [
      { step: "01", title: "Cloud Blueprint", desc: "Designing secure VPC networks, subnet routing, and IAM permission policies." },
      { step: "02", title: "Containerization", desc: "Writing optimized Dockerfiles and docker-compose configurations." },
      { step: "03", title: "CI/CD Automation", desc: "Configuring automated test runs and zero-downtime deployment triggers." },
      { step: "04", title: "Monitoring & Scaling", desc: "Setting up CloudWatch metrics, CPU alarm triggers, and auto-scaling groups." }
    ],
    metrics: { uptime: "99.99% Uptime", deploySpeed: "< 3min Deploys", securityScore: "A+ Enterprise" }
  },

  /* ═══════════════════════════════════════════════════════════════
     NEW SERVICES: 1. CORE ENGINEERING
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "react-nextjs-development",
    slug: "react-nextjs-development",
    title: "React & Next.js Development",
    subtitle: "Frontend & Full-Stack",
    shortDescription: "Ultra-fast App Router, SSR/SSG rendering, React Server Components, and enterprise Next.js full-stack systems.",
    description: "Build bleeding-edge web applications powered by React 19 and Next.js App Router. We implement Server Components, instantaneous streaming hydration, edge rendering, and clean modular component architecture for ultra-high conversion rates and sub-second page loads.",
    icon: "Code2",
    badge: "Core Engineering",
    category: "core-engineering",
    features: [
      "Next.js App Router & React Server Components (RSC)",
      "Server-Side Rendering (SSR) & Static Generation (SSG)",
      "Streaming UI Hydration with React Suspense",
      "TypeScript Strict Type Safety Architecture",
      "Tailwind CSS / CSS Modules Integration",
      "Edge Middleware & Vercel Optimized Deployments"
    ],
    capabilities: [
      "Full-Stack Next.js Web Platforms",
      "High-Performance React Single Page Applications",
      "Custom Server Action API Handlers",
      "Dynamic Headless CMS Frontends",
      "Core Web Vitals & 95+ Lighthouse Optimization",
      "Component Library & Design Token Integration"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Turbopack", "React Query"],
    process: [
      { step: "01", title: "Architecture & Schema", desc: "Defining component hierarchy, data-fetching strategies, and routing architecture." },
      { step: "02", title: "Server Component Build", desc: "Implementing server-rendered components for zero client bundle bloat." },
      { step: "03", title: "Client Interactions", desc: "Adding fluid animations, form validations, and optimistic UI updates." },
      { step: "04", title: "Edge Deployment", desc: "Deploying to global edge networks with image optimization and automated CI/CD." }
    ],
    metrics: { lighthouse: "98+ Lighthouse", loadTime: "< 0.5s First Paint", bundleSize: "Zero Bloat" }
  },
  {
    id: "flutter-app-development",
    slug: "flutter-app-development",
    title: "Flutter App Development",
    subtitle: "iOS & Android",
    shortDescription: "Cross-platform mobile apps for iOS & Android with native 60fps performance and single-codebase efficiency.",
    description: "Launch sleek native-grade iOS and Android mobile apps from a single unified Dart codebase. We architect high-performance Flutter applications with reactive state management, seamless offline persistence, hardware integrations, and native device feature access.",
    icon: "Smartphone",
    badge: "Core Engineering",
    category: "core-engineering",
    features: [
      "Unified Single Codebase for iOS & Android",
      "Native 60FPS / 120FPS Smooth UI Renders",
      "Riverpod & BLoC Reactive State Architecture",
      "Offline SQLite & Hive Database Storage",
      "Push Notifications & In-App Purchases",
      "App Store & Google Play Store Submission Ready"
    ],
    capabilities: [
      "Native iOS & Android Mobile Apps",
      "Custom Flutter Widget Libraries",
      "RESTful API & GraphQL Integrations",
      "Biometric Authentication & Native Camera APIs",
      "Real-Time Chat & Geolocation Tracking",
      "App Store Optimization (ASO) & Deployment"
    ],
    technologies: ["Flutter", "Dart", "BLoC", "Riverpod", "Firebase", "App Store Connect", "Google Play Console"],
    process: [
      { step: "01", title: "UX Wireframing", desc: "Designing adaptive mobile navigation flows for iOS Cupertino and Android Material." },
      { step: "02", title: "Widget Architecture", desc: "Building modular widgets with strict business logic separation." },
      { step: "03", title: "API & Backend Link", desc: "Integrating secure OAuth tokens, offline queues, and real-time sockets." },
      { step: "04", title: "Store Publishing", desc: "Building signed release binaries and publishing to Apple App Store and Google Play." }
    ],
    metrics: { fps: "60-120 FPS", codeSharing: "95% Shared Code", storeApproval: "100% Guaranteed" }
  },
  {
    id: "backend-cloud-development",
    slug: "backend-cloud-development",
    title: "Backend & Cloud Development",
    subtitle: "Microservices & Cloud",
    shortDescription: "Scalable backend systems, cloud microservices, relational & NoSQL databases, and robust REST/GraphQL APIs.",
    description: "Engineer resilient, high-concurrency backend backbones designed to handle millions of requests without breaking a sweat. We develop containerized microservices in Node.js, Express, and Python, manage fault-tolerant databases, and implement secure cloud architectures.",
    icon: "Server",
    badge: "Core Engineering",
    category: "core-engineering",
    features: [
      "Microservices & Event-Driven Architecture",
      "PostgreSQL, MongoDB, Redis & DynamoDB Systems",
      "High-Concurrency Express & Fastify Backends",
      "Distributed Caching & Message Queues (RabbitMQ/Kafka)",
      "OAuth2, JWT, & Multi-Role RBAC Authorization",
      "Automated Health Checks & Telemetry Logging"
    ],
    capabilities: [
      "Scalable API & Server Architecture",
      "Database Schema Migration & Indexing",
      "WebSocket Real-Time Event Brokers",
      "Third-Party Payment & Webhook Relays",
      "Cloud Infrastructure Automation",
      "Enterprise Grade Data Encryption"
    ],
    technologies: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS"],
    process: [
      { step: "01", title: "Domain Modeling", desc: "Defining relational entity diagrams, indexing strategies, and API contracts." },
      { step: "02", title: "Core Service Build", desc: "Writing clean service layers with automated input sanitization and unit tests." },
      { step: "03", title: "Caching & Queues", desc: "Setting up Redis cache invalidation and async worker message pipelines." },
      { step: "04", title: "Load Testing", desc: "Simulating heavy traffic spikes to guarantee zero packet loss and low latency." }
    ],
    metrics: { apiLatency: "< 45ms P95", uptime: "99.99%", concurrency: "50,000+ Req/min" }
  },
  {
    id: "mobile-app-engineering",
    slug: "mobile-app-engineering",
    title: "Mobile App Engineering (iOS & Android)",
    subtitle: "iOS & Android",
    shortDescription: "End-to-end mobile engineering with native capabilities, push notifications, offline syncing, and app store publishing.",
    description: "From concept to Top Charts on the App Store and Google Play, we build fluid, responsive native and hybrid mobile applications. We emphasize battery efficiency, instant app startup, and seamless touch gestures crafted for consumer and enterprise users alike.",
    icon: "Smartphone",
    badge: "Core Engineering",
    category: "core-engineering",
    features: [
      "Full iOS & Android Platform Engineering",
      "Sub-second App Cold-Start Performance",
      "Biometric FaceID / Fingerprint Security",
      "Real-Time Sync with Cloud Edge Databases",
      "Deep Linking & Universal Routing",
      "Automated Crashlytics & Analytics Tracking"
    ],
    capabilities: [
      "Enterprise Mobile Solutions",
      "Consumer Facing Lifestyle & Utility Apps",
      "Offline-First Data Sync Engines",
      "Apple HealthKit & Google Fit Integrations",
      "Push Notification Campaign Engines",
      "App Store & Google Play QA Approval"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo", "Fastlane"],
    process: [
      { step: "01", title: "Product Blueprint", desc: "Outlining user journeys, mobile screen layouts, and native device requirements." },
      { step: "02", title: "Sprint Development", desc: "Iterative two-week agile sprints with test builds shared via TestFlight." },
      { step: "03", title: "Security & Device QA", desc: "Testing across multiple screen sizes, OS versions, and network speeds." },
      { step: "04", title: "Global Release", desc: "Managing store metadata, compliance submissions, and production rollout." }
    ],
    metrics: { crashRate: "< 0.01%", coldStart: "< 800ms", appRating: "4.8+ Avg Target" }
  },
  {
    id: "custom-web-application-engineering",
    slug: "custom-web-application-engineering",
    title: "Custom Web Application Engineering",
    subtitle: "Core Service",
    shortDescription: "Bespoke full-stack web applications engineered for complex workflows, high reliability, and long-term scalability.",
    description: "Every business has unique operational needs that off-the-shelf software cannot satisfy. We engineer tailored custom web applications with precision architecture, proprietary business logic, complex data visualizations, and robust cloud infrastructure that grow alongside your organization.",
    icon: "Code2",
    badge: "Core Engineering",
    category: "core-engineering",
    features: [
      "Tailor-Made Bespoke Software Architectures",
      "Complex Multi-Role Workflow Automation",
      "Interactive Data Dashboards & Real-Time Charts",
      "Full Source Code & IP Ownership Guaranteed",
      "SOC2-Ready Security & Audit Logs",
      "Zero Dependency on Rigid Third-Party Templates"
    ],
    capabilities: [
      "Enterprise SaaS & Web Portals",
      "Internal Business ERP & CRM Systems",
      "Data Processing & Analytics Engines",
      "Custom Automated Workflow Pipelines",
      "Secure Multi-Tenant Cloud Architecture",
      "Legacy Codebase Modernization & Migration"
    ],
    technologies: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS", "Tailwind CSS"],
    process: [
      { step: "01", title: "Discovery & Specs", desc: "Detailed breakdown of business logic, user roles, and data security mandates." },
      { step: "02", title: "Database & Architecture", desc: "Designing robust database schemas and modular decoupled services." },
      { step: "03", title: "Iterative Development", desc: "Bi-weekly sprint demos with continuous staging environment testing." },
      { step: "04", title: "Production Launch", desc: "Zero-downtime deployment, staff onboarding, and 24/7 telemetry monitoring." }
    ],
    metrics: { codeOwnership: "100% Yours", scalability: "Enterprise Ready", reliability: "99.95% SLA" }
  },

  /* ═══════════════════════════════════════════════════════════════
     NEW SERVICES: 2. ENTERPRISE & SCALE
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "product-engineering",
    slug: "product-engineering",
    title: "Product Engineering",
    subtitle: "Enterprise End-to-End",
    shortDescription: "End-to-end digital product development from concept, UX research, and architecture to production scale.",
    description: "We act as your dedicated product engineering partner. Combining senior technical leadership, product strategy, UI/UX design, and agile full-stack development, we turn ambitious concepts into category-defining digital products built to scale from day one.",
    icon: "Layers",
    badge: "Enterprise & Scale",
    category: "enterprise-scale",
    features: [
      "Full Lifecycle Product Development (0 to 1 & Scaling)",
      "Comprehensive Product Discovery & Technical Roadmaps",
      "Agile 2-Week Sprints with Rapid Iteration Cycles",
      "Automated CI/CD & Production DevOps Pipelines",
      "Built-in Analytics, A/B Testing & Product Metrics",
      "Dedicated Senior Engineering & Design Squad"
    ],
    capabilities: [
      "MVP Development for Funded Startups",
      "Enterprise Digital Transformation",
      "Microservices & Modern API Architecture",
      "Scalable Cloud Backend Engineering",
      "Comprehensive Product Quality Assurance",
      "Long-Term Maintenance & Feature Expansion"
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "Python", "AWS", "PostgreSQL", "Figma", "Docker"],
    process: [
      { step: "01", title: "Discovery & Strategy", desc: "Defining product market fit, technical feasibility, and high-level milestones." },
      { step: "02", title: "UX & System Design", desc: "Creating user journey flows and high-availability cloud architecture diagrams." },
      { step: "03", title: "Agile Development", desc: "Two-week sprints with transparent Jira tracking and live staging demos." },
      { step: "04", title: "Growth & Scale", desc: "Monitoring adoption, performance bottlenecks, and shipping iterative updates." }
    ],
    metrics: { timeToMarket: "50% Faster", sprintVelocity: "98% on Track", qualityScore: "Enterprise Grade" }
  },
  {
    id: "saas-application-development",
    slug: "saas-application-development",
    title: "SaaS Application Development",
    subtitle: "Multi-Tenant Scale",
    shortDescription: "B2B & B2C SaaS platforms with multi-tenancy, Stripe subscription billing, role permissions, and usage analytics.",
    description: "Launch market-dominating Software-as-a-Service (SaaS) platforms built to support hundreds of thousands of concurrent users. We engineer scalable multi-tenant databases, recurring subscription billing pipelines, custom onboarding flows, and secure tenant data isolation.",
    icon: "Boxes",
    badge: "Enterprise & Scale",
    category: "enterprise-scale",
    features: [
      "Multi-Tenant Cloud Database Architecture",
      "Stripe & Paddle Recurring Subscription Billing",
      "Granular RBAC (Role-Based Access Control)",
      "Usage-Based Metering & Automated Invoicing",
      "Self-Serve Team Invites & Organization Management",
      "Comprehensive Admin Dashboards & Revenue Telemetry"
    ],
    capabilities: [
      "B2B Enterprise SaaS Platforms",
      "B2C Subscription Web & Mobile Apps",
      "White-Label Multi-Tenant Architectures",
      "Custom Webhook & Developer API Portals",
      "Single Sign-On (SSO / SAML / Google / GitHub)",
      "Automated Customer Churn & Retention Analytics"
    ],
    technologies: ["Next.js", "PostgreSQL", "Stripe API", "Node.js", "Redis", "Prisma", "Docker", "AWS"],
    process: [
      { step: "01", title: "Tenant Modeling", desc: "Designing shared vs. isolated database schemas and security boundaries." },
      { step: "02", title: "Billing & Auth Setup", desc: "Configuring Stripe webhooks, tier plans, and enterprise SSO authentication." },
      { step: "03", title: "Feature Development", desc: "Building core SaaS workflows, responsive dashboards, and notifications." },
      { step: "04", title: "Launch & Hardening", desc: "Pen testing, rate limiting, automated backup drills, and scaling launch." }
    ],
    metrics: { churnReduction: "30% Lower", paymentSuccess: "99.9%", tenantIsolation: "100% Strict" }
  },
  {
    id: "ecommerce-marketplaces",
    slug: "ecommerce-marketplaces",
    title: "E-Commerce & Multi-Vendor Marketplaces",
    subtitle: "Revenue Focused",
    shortDescription: "Custom online storefronts, multi-vendor marketplaces, Stripe payment splits, inventory sync, and conversion checkout.",
    description: "Maximize sales and conversion rates with high-performance e-commerce platforms. From headless Shopify and custom Next.js storefronts to complex multi-vendor marketplaces with automated seller payouts, we engineer revenue-focused commerce experiences.",
    icon: "ShoppingBag",
    badge: "Enterprise & Scale",
    category: "enterprise-scale",
    features: [
      "Headless E-Commerce & Custom High-Speed Storefronts",
      "Multi-Vendor Marketplace Portals & Vendor Payouts",
      "Stripe Connect, PayPal & Local Payment Gateways",
      "Automated Inventory, SKU & Warehouse Syncing",
      "One-Page High-Conversion Frictionless Checkout",
      "Dynamic Product Filtering, Search & Recommendation AI"
    ],
    capabilities: [
      "Custom E-Commerce Web Platforms",
      "Multi-Vendor Marketplace Infrastructure",
      "Headless Shopify & WooCommerce Frontends",
      "Omnichannel POS & ERP Integrations",
      "Abandoned Cart Recovery & Email Funnels",
      "Custom Coupon, Loyalty & Affiliate Engines"
    ],
    technologies: ["Next.js", "Shopify Storefront API", "Stripe Connect", "Node.js", "PostgreSQL", "Algolia", "Redis"],
    process: [
      { step: "01", title: "Catalog & Flows", desc: "Structuring product taxonomy, inventory variants, and checkout user flows." },
      { step: "02", title: "Storefront Engineering", desc: "Building sub-second page loads with instant product filters and search." },
      { step: "03", title: "Checkout & Payments", desc: "Integrating secure PCI-compliant checkout, tax calculators, and shipping APIs." },
      { step: "04", title: "Conversion Tuning", desc: "A/B testing checkout steps, cart abandonment triggers, and speed optimization." }
    ],
    metrics: { checkoutConversion: "+35% Lift", loadSpeed: "< 0.8s Storefront", uptime: "99.99% Black Friday Tested" }
  },
  {
    id: "cms-development",
    slug: "cms-development",
    title: "CMS Development",
    subtitle: "Publishing Freedom",
    shortDescription: "Headless CMS setups (Sanity, Strapi), custom WordPress themes, and high-speed content publishing systems.",
    description: "Give your marketing and editorial teams complete publishing freedom without sacrificing developer velocity or site performance. We build modern headless CMS architectures using Sanity and Strapi, alongside custom high-security WordPress and Shopify theme development.",
    icon: "Layout",
    badge: "Enterprise & Scale",
    category: "enterprise-scale",
    features: [
      "Headless CMS Architecture (Sanity, Strapi, Contentful)",
      "Custom Tailored WordPress & Shopify Themes",
      "Intuitive Drag-and-Drop Visual Page Builders",
      "Multi-Language & Localization (i18n) Support",
      "Instant Edge Revalidation & Static ISR Regeneration",
      "Strict SEO Metadata & Social OpenGraph Controls"
    ],
    capabilities: [
      "Headless Content Architecture",
      "Custom Theme & Plugin Development",
      "WordPress to Next.js Headless Migration",
      "Editorial Workflow & Approval Pipelines",
      "Automated Media Compression & Cloudinary Sync",
      "Enterprise CMS Security & Role Restrictions"
    ],
    technologies: ["Sanity.io", "Strapi", "WordPress", "Next.js", "GraphQL", "PHP", "Tailwind CSS"],
    process: [
      { step: "01", title: "Content Modeling", desc: "Structuring reusable schemas, block builders, and editorial permissions." },
      { step: "02", title: "Frontend Integration", desc: "Connecting headless API webhooks for instant on-demand cache revalidation." },
      { step: "03", title: "Editor Training", desc: "Configuring intuitive preview modes and visual drag-and-drop interfaces." },
      { step: "04", title: "Security Lockdown", desc: "Hardening endpoints, disabling XML-RPC, and implementing DDoS protection." }
    ],
    metrics: { publishingSpeed: "Instant", seoScore: "100% Optimized", securityRating: "A+ Hardened" }
  },
  {
    id: "application-development",
    slug: "application-development",
    title: "Application Development",
    subtitle: "Bespoke Software",
    shortDescription: "End-to-end bespoke software architecture for web, desktop, and internal operational business tooling.",
    description: "Empower your operations with custom software built specifically around your team's workflow. We engineer secure, cross-platform business applications, interactive portals, and internal enterprise tools that eliminate spreadsheet chaos and dramatically boost productivity.",
    icon: "Code2",
    badge: "Enterprise & Scale",
    category: "enterprise-scale",
    features: [
      "Bespoke Internal Business Tools & Dashboards",
      "Cross-Platform Desktop & Web Applications",
      "Complex Mathematical Calculations & Data Models",
      "Secure Role-Based Employee & Customer Portals",
      "Automated PDF Generation, Reporting & Auditing",
      "Integration with Legacy Mainframes & Third-Party APIs"
    ],
    capabilities: [
      "Custom Enterprise Portals",
      "Workflow Automation Systems",
      "Interactive Operational Tools",
      "High-Security Data Entry Software",
      "Custom CRM / ERP Hybrid Applications",
      "Multi-System API Synchronization"
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "Electron", "PostgreSQL", "Docker", "REST/GraphQL"],
    process: [
      { step: "01", title: "Operational Audit", desc: "Analyzing current manual workflows, Excel sheets, and data handoff points." },
      { step: "02", title: "Prototype & Architecture", desc: "Developing interactive prototypes to validate ergonomics with actual users." },
      { step: "03", title: "Engineering & QA", desc: "Building secure, modular software modules with comprehensive unit test suites." },
      { step: "04", title: "Rollout & Training", desc: "Staged team onboarding, documentation handover, and continuous SLA support." }
    ],
    metrics: { efficiencyGain: "+60% Faster", errorReduction: "99% Fewer Manual Errors", satisfaction: "97% Team Approval" }
  },
  {
    id: "api-cloud-backend-architecture",
    slug: "api-cloud-backend-architecture",
    title: "API & Cloud Backend Architecture",
    subtitle: "High Throughput",
    shortDescription: "Ultra-fast RESTful & GraphQL APIs, distributed database schemas, microservices, and high-throughput cloud logic.",
    description: "Power your web, mobile, and IoT clients with an industrial-strength API and cloud backend architecture. We design clean, self-documenting REST and GraphQL endpoints capable of processing tens of thousands of requests per second with sub-50ms response times.",
    icon: "Layers",
    badge: "Enterprise & Scale",
    category: "enterprise-scale",
    features: [
      "High-Throughput RESTful & GraphQL API Endpoints",
      "Swagger / OpenAPI 3.0 Automated Documentation",
      "Distributed Database Sharding & Read/Write Replication",
      "JWT, OAuth2, API Key Throttling & Rate Limiting",
      "Redis In-Memory Caching & Global CDN Edge Caching",
      "Serverless & Containerized Cloud Deployment"
    ],
    capabilities: [
      "Enterprise API Gateway Configuration",
      "High-Availability Database Architecture",
      "Webhook Dispatch & Retry Engines",
      "Third-Party Service Middleware Integration",
      "Real-Time WebSocket & Server-Sent Events",
      "Security Audits & Penetration Defense"
    ],
    technologies: ["Node.js", "Python", "GraphQL", "PostgreSQL", "Redis", "Docker", "AWS API Gateway", "Swagger"],
    process: [
      { step: "01", title: "Contract Design", desc: "Drafting OpenAPI specifications, request validation schemas, and error codes." },
      { step: "02", title: "High-Speed Coding", desc: "Implementing query optimization, indexing, and connection pooling." },
      { step: "03", title: "Security Layers", desc: "Adding HMAC signature verification, CORS policies, and rate limiters." },
      { step: "04", title: "Benchmark QA", desc: "Performing load and stress tests under synthetic 100,000 req/min spikes." }
    ],
    metrics: { latency: "< 35ms P99", throughput: "100k+ Req/min", uptime: "99.999% SLA" }
  },

  /* ═══════════════════════════════════════════════════════════════
     NEW SERVICES: 3. AI & CLOUD INFRASTRUCTURE
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "enterprise-ai-generative-ai",
    slug: "enterprise-ai-generative-ai",
    title: "Enterprise AI & Generative AI Solutions",
    subtitle: "Next Gen AI",
    shortDescription: "Custom generative AI agents, LLM integrations (GPT-4o, Claude 3.5), RAG vector search, and automated workflows.",
    description: "Deploy next-generation artificial intelligence to transform your business operations. We build bespoke generative AI applications, autonomous multi-agent pipelines, intelligent internal search over proprietary documents (RAG), and customized model fine-tuning.",
    icon: "Bot",
    badge: "AI & Cloud Infrastructure",
    category: "ai-cloud",
    features: [
      "Autonomous Multi-Agent AI Systems & Workflows",
      "RAG Vector Search Over Proprietary Documents",
      "OpenAI GPT-4o, Claude 3.5 & Gemini Integration",
      "Custom Fine-Tuning on Company Knowledge",
      "AI Powered Customer Service & Lead Agents",
      "Enterprise Data Privacy & PII Scrubbing Compliance"
    ],
    capabilities: [
      "Enterprise Generative AI Products",
      "Intelligent Chat & Research Co-Pilots",
      "Automated Document Processing & Extraction",
      "Vector Database Architecture (Pinecone / Qdrant)",
      "Model Evaluation, Guardrails & Moderation",
      "Cost-Optimized Prompt & Cache Strategies"
    ],
    technologies: ["OpenAI", "Claude", "LangChain", "LlamaIndex", "Pinecone", "Python", "FastAPI", "Next.js"],
    process: [
      { step: "01", title: "Use-Case Alignment", desc: "Identifying high-ROI workflows suitable for generative AI automation." },
      { step: "02", title: "Data Ingestion & RAG", desc: "Chunking, embedding, and indexing private corporate documentation." },
      { step: "03", title: "Agent Engineering", desc: "Building prompt guardrails, streaming interfaces, and tool calling." },
      { step: "04", title: "Security & Scale", desc: "Implementing zero-data-retention agreements and latency optimizations." }
    ],
    metrics: { efficiency: "10x Automation", accuracy: "99.2%", security: "100% PII Protected" }
  },
  {
    id: "cloud-architecture-devops",
    slug: "cloud-architecture-devops",
    title: "Cloud Architecture & DevOps Engineering",
    subtitle: "99.99% Uptime",
    shortDescription: "AWS/GCP/Azure infrastructure, Terraform IaC, Kubernetes clusters, Docker, and zero-downtime CI/CD automation.",
    description: "Build, automate, and protect your cloud applications with senior DevOps engineering. We architect automated Infrastructure as Code (IaC) using Terraform, containerize services with Docker & Kubernetes, and set up continuous deployment pipelines for zero-downtime shipping.",
    icon: "Cloud",
    badge: "AI & Cloud Infrastructure",
    category: "ai-cloud",
    features: [
      "Multi-Cloud AWS, Google Cloud & Azure Architecture",
      "Infrastructure as Code (IaC) via Terraform & Ansible",
      "Kubernetes (EKS/GKE) Cluster Orchestration",
      "Automated Zero-Downtime GitHub Actions CI/CD",
      "Real-Time Datadog / Prometheus Observability & APM",
      "Cloud Cost Optimization & Server Auto-Scaling"
    ],
    capabilities: [
      "Cloud Migration & Modernization",
      "Production Docker Containerization",
      "Disaster Recovery & Automated Snapshots",
      "VPC Peering, Security Groups & WAF Rules",
      "Serverless Microservice Orchestration",
      "24/7 Production SLA Monitoring & Alarms"
    ],
    technologies: ["AWS", "Google Cloud", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Linux"],
    process: [
      { step: "01", title: "Infrastructure Audit", desc: "Analyzing current architecture for single points of failure and waste." },
      { step: "02", title: "Terraform IaC Scripting", desc: "Writing declarative code for repeatable, version-controlled cloud environments." },
      { step: "03", title: "CI/CD Pipeline Setup", desc: "Automating unit tests, container builds, and rolling deployment triggers." },
      { step: "04", title: "Monitoring & Alarms", desc: "Configuring Grafana dashboards, PagerDuty alerts, and auto-scaling rules." }
    ],
    metrics: { uptime: "99.99% Uptime", deployTime: "< 2 Mins", costReduction: "Up to 40% Saved" }
  },
  {
    id: "cybersecurity-code-audits",
    slug: "cybersecurity-code-audits",
    title: "Cybersecurity, Pen Testing & Code Audits",
    subtitle: "Zero Trust",
    shortDescription: "Vulnerability assessments, static & dynamic code audits, penetration testing, and enterprise compliance hardening.",
    description: "Protect your intellectual property, client databases, and digital infrastructure against malicious threats. We execute rigorous penetration testing, OWASP Top 10 vulnerability audits, code review security scans, and SSL/WAF hardening to ensure impenetrable defense.",
    icon: "ShieldAlert",
    badge: "AI & Cloud Infrastructure",
    category: "ai-cloud",
    features: [
      "OWASP Top 10 Vulnerability Assessments",
      "Penetration Testing (Black Box & Grey Box)",
      "Static & Dynamic Application Code Audits",
      "Cloud Security Posture (CSPM) & IAM Hardening",
      "SSL/TLS, DDoS Defense & Cloudflare WAF Setup",
      "Compliance Support (GDPR, SOC2, HIPAA Alignment)"
    ],
    capabilities: [
      "Full Web & API Penetration Testing",
      "Source Code Vulnerability Scanning",
      "Authentication & Session Flaw Auditing",
      "SQL Injection & XSS Vulnerability Fixes",
      "Encrypted Data-at-Rest & In-Transit Setup",
      "Executive Security Audit Reports & Remediation"
    ],
    technologies: ["Burp Suite", "OWASP ZAP", "Snyk", "SonarQube", "Cloudflare WAF", "Nmap", "Wireshark"],
    process: [
      { step: "01", title: "Scope & Reconnaissance", desc: "Mapping application attack surfaces, endpoints, and input parameters." },
      { step: "02", title: "Vulnerability Scanning", desc: "Automated and manual penetration probes looking for exploit vectors." },
      { step: "03", title: "Exploit Verification", desc: "Validating severity and verifying real-world risk impact." },
      { step: "04", title: "Remediation & Patching", desc: "Delivering detailed patch guidelines and verifying fixes with re-tests." }
    ],
    metrics: { detectionRate: "100% Criticals", compliance: "SOC2/GDPR Ready", securityRating: "A+ Verified" }
  },
  {
    id: "saas-multi-tenant-systems",
    slug: "saas-multi-tenant-systems",
    title: "SaaS & Multi-Tenant Systems",
    subtitle: "Multi-Tenant",
    shortDescription: "Architectures engineered for secure tenant isolation, distributed data scaling, and enterprise high availability.",
    description: "When building for enterprise software scale, multi-tenancy requires flawless engineering. We design cloud-native multi-tenant architectures featuring schema-level or database-level isolation, high-speed routing, automated tenant provisioning, and sub-second global latency.",
    icon: "Boxes",
    badge: "AI & Cloud Infrastructure",
    category: "ai-cloud",
    features: [
      "Strict Tenant Data Isolation (Row, Schema, or DB-Level)",
      "Automated Instant Tenant Onboarding & Provisioning",
      "Custom Subdomains & Custom SSL Domain Mapping",
      "Cross-Tenant Data Leak Prevention Policies",
      "Tenant-Aware Caching & Rate Limiting Pipelines",
      "Distributed Disaster Recovery & Snapshot Isolation"
    ],
    capabilities: [
      "Multi-Tenant SaaS Infrastructure",
      "White-Label Enterprise Solutions",
      "Global Tenant Routing Middleware",
      "Scalable Sharded Database Engines",
      "Enterprise Single Sign-On (SSO / SAML)",
      "Granular Multi-Tenant Usage Analytics"
    ],
    technologies: ["PostgreSQL", "Next.js", "Docker", "AWS RDS Multi-AZ", "Redis", "TypeScript", "Prisma"],
    process: [
      { step: "01", title: "Isolation Strategy", desc: "Choosing optimal shared-schema or separate-database architecture for scale." },
      { step: "02", title: "Middleware Routing", desc: "Configuring dynamic host header parsing for custom domains and subdomains." },
      { step: "03", title: "Automated Provisioning", desc: "Scripting instant schema migration upon new organization registration." },
      { step: "04", title: "Performance Tuning", desc: "Testing cross-tenant connection pooling and query caching under load." }
    ],
    metrics: { isolation: "100% Zero Leak", provisioning: "< 3 Seconds", scalability: "100,000+ Tenants" }
  },

  /* ═══════════════════════════════════════════════════════════════
     NEW SERVICES: 4. DESIGN & GROWTH
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "ui-ux-design-usability-engineering",
    slug: "ui-ux-design-usability-engineering",
    title: "UI/UX Design & Usability Engineering",
    subtitle: "Design Excellence",
    shortDescription: "World-class digital interfaces, Figma design systems, usability research, and conversion-centered product aesthetics.",
    description: "Design that captivates and converts. We craft world-class dark-mode and light-mode digital interfaces in Figma, backed by deep usability engineering, user empathy interviews, interactive wireframes, and scalable design token libraries ready for development.",
    icon: "Palette",
    badge: "Design & Growth",
    category: "design-growth",
    features: [
      "Pixel-Perfect Figma Prototypes & Interface Systems",
      "Deep Usability Engineering & Heuristic Evaluations",
      "Conversion-Centered Landing Page & Product UX",
      "Scalable Design Token Libraries & Component Kits",
      "Mobile-First Responsive Ergonomics & Touch Controls",
      "Seamless Dev Handoff with Spacing & Typography Tokens"
    ],
    capabilities: [
      "Full SaaS & Web App UI/UX Design",
      "Interactive High-Fidelity Prototypes",
      "User Journey Mapping & Information Architecture",
      "Micro-Interactions & Animation Choreography",
      "Design System Creation & Maintenance",
      "UX Usability Testing & Heatmap Analysis"
    ],
    technologies: ["Figma", "FigJam", "Design Systems", "Prototyping", "UI/UX", "User Research", "Framer"],
    process: [
      { step: "01", title: "Discovery & Flows", desc: "Mapping core user journeys, competitor friction points, and wireframes." },
      { step: "02", title: "Visual Language", desc: "Developing moody dark-mode styling, typography hierarchies, and glow palettes." },
      { step: "03", title: "Interactive Prototype", desc: "Linking clickable screens with realistic transitions and component variants." },
      { step: "04", title: "Handoff Specification", desc: "Providing engineers with exact CSS values, tokens, and exportable vector assets." }
    ],
    metrics: { userDelight: "98% Rating", handoffEfficiency: "2x Faster Dev", retentionImpact: "+40% Average" }
  },
  {
    id: "brand-identity-visual-systems",
    slug: "brand-identity-visual-systems",
    title: "Brand Identity & Visual Design Systems",
    subtitle: "Brand Strategy",
    shortDescription: "Modern brand strategy, iconic vector logos, visual guidelines, typography sets, and marketing collateral.",
    description: "Make your brand unforgettable. We build distinct, modern visual identities that position your business as a market leader. From iconic logos and bespoke typography sets to comprehensive brand guideline decks and marketing collateral, we create enduring brand prestige.",
    icon: "Palette",
    badge: "Design & Growth",
    category: "design-growth",
    features: [
      "Iconic Vector Logo Marks & Wordmarks",
      "Comprehensive Brand Style Guides & Rulebooks",
      "Custom Color Palette Formulations & Contrast Ratios",
      "Digital & Print Marketing Asset Packages",
      "Social Media Identity Kits & Presentation Decks",
      "Trademark-Ready Vector Master Source Files"
    ],
    capabilities: [
      "Full Corporate Rebranding & Visual Strategy",
      "Vector Logo & Icon Design",
      "Visual Brand Style Guidelines",
      "Marketing & Social Media Collateral Kits",
      "Pitch Deck & Presentation Design",
      "Packaging & Print Asset Production"
    ],
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Vector Graphics", "Typography"],
    process: [
      { step: "01", title: "Brand Discovery", desc: "Defining brand voice, audience positioning, and visual market differentiation." },
      { step: "02", title: "Logo Ideation", desc: "Exploring 20+ distinct visual concepts before narrowing to 3 polished options." },
      { step: "03", title: "System Assembly", desc: "Building color formulas, font pairings, and mock application contexts." },
      { step: "04", title: "Brand Guidelines", desc: "Compiling a complete brand Bible with vector assets and usage guidelines." }
    ],
    metrics: { brandRecognition: "Top Tier", assetCompleteness: "100% Vector", satisfaction: "5/5 Stars" }
  },
  {
    id: "data-driven-seo",
    slug: "data-driven-seo",
    title: "Data-Driven Search Engine Optimization (SEO)",
    subtitle: "Organic Scale",
    shortDescription: "Technical SEO audits, semantic keyword targeting, Core Web Vitals optimization, and high-intent backlink strategies.",
    description: "Capture high-intent organic traffic and dominate Google rankings. We deploy data-driven Search Engine Optimization encompassing programmatic SEO architectures, Core Web Vitals remediation, rich schema markup, and content strategies that drive qualified customer acquisition.",
    icon: "Search",
    badge: "Design & Growth",
    category: "design-growth",
    features: [
      "Comprehensive Technical SEO & Crawl Audits",
      "Next.js Programmatic SEO & Dynamic Sitemaps",
      "Core Web Vitals Remediation (LCP, FID, CLS)",
      "JSON-LD Structured Data Schema Markup",
      "Competitor Gap Analysis & High-Intent Keyword Targeting",
      "Ongoing Rank Tracking & Transparent Monthly Reports"
    ],
    capabilities: [
      "Full Technical & On-Page SEO",
      "Programmatic SEO Engine Architecture",
      "Schema.org Structured Data Implementation",
      "Content Strategy & Topic Cluster Mapping",
      "Local SEO & Google Business Profile Optimization",
      "Penalty Recovery & Algorithmic Audit Fixes"
    ],
    technologies: ["Google Search Console", "Ahrefs", "SEMrush", "Screaming Frog", "Next.js SEO", "Schema.org"],
    process: [
      { step: "01", title: "Technical Crawl", desc: "Scanning every URL to identify 404s, redirect chains, and indexing blocks." },
      { step: "02", title: "Keyword Clustering", desc: "Mapping high-intent commercial keywords to optimized landing pages." },
      { step: "03", title: "On-Page Execution", desc: "Injecting structured JSON-LD schemas, optimizing H1-H3 tags, and boosting speeds." },
      { step: "04", title: "Scale & Track", desc: "Monitoring Google Search Console impressions, clicks, and ranking advancements." }
    ],
    metrics: { organicGrowth: "3x Traffic Lift", coreWebVitals: "100% Green", rankings: "Top 3 Target Keywords" }
  },
  {
    id: "google-ads-ppc-management",
    slug: "google-ads-ppc-management",
    title: "Google Ads & PPC Campaign Management",
    subtitle: "High Conversion PPC",
    shortDescription: "Laser-targeted Google Search, Display, and Performance Max campaigns managed for maximum Return on Ad Spend (ROAS).",
    description: "Turn ad spend into measurable revenue. We engineer and manage high-converting Google Ads campaigns across Search, Shopping, YouTube, and Performance Max. With rigorous negative keyword pruning and landing page optimization, we lower CPA and maximize ROAS.",
    icon: "Target",
    badge: "Design & Growth",
    category: "design-growth",
    features: [
      "Google Search, Shopping & Performance Max Campaigns",
      "High-Intent Buyer Keyword Bidding Strategies",
      "Strict Negative Keyword Pruning to Eliminate Waste",
      "Compelling Ad Copywriting with Responsive Variations",
      "Conversion Tracking Setup via Google Tag Manager",
      "Continuous Bid Optimization & ROAS Maximization"
    ],
    capabilities: [
      "PPC Account Audits & Restructuring",
      "Search Engine Marketing (SEM)",
      "Dynamic Remarketing & Retargeting",
      "Landing Page Conversion Rate Optimization (CRO)",
      "Multi-Touch Attribution Modeling",
      "Real-Time ROI & Spend Dashboards"
    ],
    technologies: ["Google Ads", "Google Tag Manager", "Google Analytics 4", "Looker Studio", "Search Ads 360"],
    process: [
      { step: "01", title: "Account Architecture", desc: "Structuring tightly themed ad groups aligned with specific search intents." },
      { step: "02", title: "Tracking Verification", desc: "Ensuring 100% accurate conversion tag tracking in Google Tag Manager." },
      { step: "03", title: "Campaign Launch", desc: "Starting structured smart bidding campaigns with aggressive negative keyword lists." },
      { step: "04", title: "Optimization Loop", desc: "Weekly bid adjustments, copy A/B tests, and landing page conversion tuning." }
    ],
    metrics: { roas: "4x - 8x Average ROAS", cpaReduction: "35% Lower CPA", trackingAccuracy: "100%" }
  },
  {
    id: "linkedin-b2b-lead-generation",
    slug: "linkedin-b2b-lead-generation",
    title: "LinkedIn Optimization & B2B Lead Generation",
    subtitle: "B2B Authority",
    shortDescription: "Executive personal branding, sponsored content campaigns, and targeted B2B decision-maker outreach pipelines.",
    description: "Acquire high-ticket enterprise contracts and qualified B2B leads on LinkedIn. We craft authoritative executive profiles, manage targeted LinkedIn Ads targeting C-suite decision-makers by industry and company size, and build sustained inbound authority.",
    icon: "Megaphone",
    badge: "Design & Growth",
    category: "design-growth",
    features: [
      "Executive & Corporate LinkedIn Profile Optimization",
      "Laser-Targeted Account-Based Marketing (ABM)",
      "LinkedIn Sponsored Content & Message InMail Ads",
      "C-Suite & Decision-Maker Audience Segmentation",
      "Thought-Leadership Ghostwriting & Content Schedules",
      "Automated Lead Gen Pipeline & CRM Synchronization"
    ],
    capabilities: [
      "B2B Account-Based Marketing (ABM)",
      "Executive Thought Leadership Management",
      "Sponsored Content & Lead Gen Form Campaigns",
      "Sales Navigator Outreach Funnels",
      "CRM Pipeline Integration (HubSpot / Salesforce)",
      "Monthly Authority & Inbound Lead Analytics"
    ],
    technologies: ["LinkedIn Campaign Manager", "Sales Navigator", "HubSpot", "Zapier", "Looker Studio"],
    process: [
      { step: "01", title: "Audience Profiling", desc: "Defining ideal customer profiles (ICPs) by job title, industry, and revenue." },
      { step: "02", title: "Profile & Creative Build", desc: "Redesigning executive profiles and writing high-converting B2B ad hooks." },
      { step: "03", title: "Campaign Execution", desc: "Launching laser-targeted campaigns with native lead generation forms." },
      { step: "04", title: "Lead Routing", desc: "Instantly syncing incoming leads to sales reps via Slack and CRM triggers." }
    ],
    metrics: { leadQuality: "Enterprise Qualified", cpl: "40% Lower CPL", cSuiteReach: "95% Decision Makers" }
  },
  {
    id: "performance-marketing-social-ads",
    slug: "performance-marketing-social-ads",
    title: "Performance Marketing & Social Ad Funnels",
    subtitle: "High ROAS",
    shortDescription: "Omnichannel paid social advertising (Meta, TikTok, YouTube) powered by creative testing and high-ROAS funnels.",
    description: "Scale customer acquisition with profitable paid social media marketing. We conceptualize, produce, and run high-converting ad creative across Meta (Facebook & Instagram), TikTok, and YouTube, continually testing hooks and angles to achieve scalable, high-ROAS growth.",
    icon: "TrendingUp",
    badge: "Design & Growth",
    category: "design-growth",
    features: [
      "Full-Funnel Meta (Facebook & Instagram) Advertising",
      "High-Engagement TikTok & YouTube Video Ad Campaigns",
      "Rapid Creative Testing (Hooks, Formats & Angles)",
      "Conversions API (CAPI) Server-Side Tracking Setup",
      "Dynamic Retargeting & High-LTV Customer Sequences",
      "Transparent Real-Time Spend & Blended ROAS Dashboards"
    ],
    capabilities: [
      "Omnichannel Performance Marketing",
      "Ad Creative Scripting & Production Strategy",
      "Server-Side Conversion Tracking (Meta CAPI)",
      "Audience Lookalike & Custom Cohort Modeling",
      "Offer Structuring & Landing Page CRO",
      "Weekly Spend Scaling & Budget Allocation"
    ],
    technologies: ["Meta Ads Manager", "TikTok Ads", "YouTube Ads", "Meta Conversions API", "Google Analytics 4"],
    process: [
      { step: "01", title: "Creative Ideation", desc: "Drafting 10+ ad angles, user problems, and emotional hooks." },
      { step: "02", title: "Tracking Integration", desc: "Deploying Meta CAPI via server-side containers for 100% event capture." },
      { step: "03", title: "Creative Sandbox Testing", desc: "Testing creatives with small budgets to identify 5x ROAS winners." },
      { step: "04", title: "Aggressive Scaling", desc: "Scaling winning ad sets horizontally and vertically without fatigue." }
    ],
    metrics: { roas: "3.5x - 7x ROAS", trackingMatch: "95%+ Event Quality", scalePotential: "Global Audience" }
  }
];

/* ═══════════════════════════════════════════════════════════════
   MEGA MENU CATEGORIZATION FOR NAVBAR DROPDOWN
   ═══════════════════════════════════════════════════════════════ */
export const servicesMegaMenuCategories = [
  {
    category: "CORE ENGINEERING",
    dotColor: "#06b6d4", // Cyan/Blue
    tagColor: "text-cyan-400",
    services: [
      {
        slug: "react-nextjs-development",
        title: "React & Next.js Development",
        subtitle: "Frontend & Full-Stack",
        icon: "Code2",
        iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      },
      {
        slug: "flutter-app-development",
        title: "Flutter App Development",
        subtitle: "iOS & Android",
        icon: "Smartphone",
        iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20"
      },
      {
        slug: "backend-cloud-development",
        title: "Backend & Cloud Development",
        subtitle: "Microservices & Cloud",
        icon: "Server",
        iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      },
      {
        slug: "mobile-app-engineering",
        title: "Mobile App Engineering (iOS & Android)",
        subtitle: "iOS & Android",
        icon: "Smartphone",
        iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
      },
      {
        slug: "custom-web-application-engineering",
        title: "Custom Web Application Engineering",
        subtitle: "Core Service",
        icon: "Globe",
        iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      }
    ]
  },
  {
    category: "ENTERPRISE & SCALE",
    dotColor: "#6366f1", // Indigo/Purple
    tagColor: "text-indigo-400",
    services: [
      {
        slug: "product-engineering",
        title: "Product Engineering",
        subtitle: "Enterprise End-to-End",
        icon: "Layers",
        iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
      },
      {
        slug: "saas-application-development",
        title: "SaaS Application Development",
        subtitle: "Multi-Tenant Scale",
        icon: "Box",
        iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20"
      },
      {
        slug: "ecommerce-marketplaces",
        title: "E-Commerce & Multi-Vendor Marketplaces",
        subtitle: "Revenue Focused",
        icon: "ShoppingBag",
        iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20"
      },
      {
        slug: "cms-development",
        title: "CMS Development",
        subtitle: "Publishing Freedom",
        icon: "Layout",
        iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        slug: "application-development",
        title: "Application Development",
        subtitle: "Bespoke Software",
        icon: "Code2",
        iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20"
      }
    ]
  },
  {
    category: "AI & CLOUD INFRASTRUCTURE",
    dotColor: "#10b981", // Emerald/Green
    tagColor: "text-emerald-400",
    services: [
      {
        slug: "enterprise-ai-generative-ai",
        title: "Enterprise AI & Generative AI Solutions",
        subtitle: "Next Gen AI",
        icon: "Bot",
        iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      },
      {
        slug: "cloud-architecture-devops",
        title: "Cloud Architecture & DevOps Engineering",
        subtitle: "99.99% Uptime",
        icon: "Cloud",
        iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      },
      {
        slug: "api-cloud-backend-architecture",
        title: "API & Cloud Backend Architecture",
        subtitle: "High Throughput",
        icon: "Server",
        iconBg: "bg-violet-500/10 text-violet-400 border-violet-500/20"
      },
      {
        slug: "cybersecurity-code-audits",
        title: "Cybersecurity, Pen Testing & Code Audits",
        subtitle: "Zero Trust",
        icon: "ShieldCheck",
        iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      },
      {
        slug: "saas-multi-tenant-systems",
        title: "SaaS & Multi-Tenant Systems",
        subtitle: "Multi-Tenant",
        icon: "Layers",
        iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      }
    ]
  },
  {
    category: "DESIGN & GROWTH",
    dotColor: "#ec4899", // Pink/Rose
    tagColor: "text-pink-400",
    services: [
      {
        slug: "ui-ux-design-usability-engineering",
        title: "UI/UX Design & Usability Engineering",
        subtitle: "Design Excellence",
        icon: "Palette",
        iconBg: "bg-pink-500/10 text-pink-400 border-pink-500/20"
      },
      {
        slug: "brand-identity-visual-systems",
        title: "Brand Identity & Visual Design Systems",
        subtitle: "Brand Strategy",
        icon: "Palette",
        iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20"
      },
      {
        slug: "data-driven-seo",
        title: "Data-Driven Search Engine Optimization (SEO)",
        subtitle: "Organic Scale",
        icon: "TrendingUp",
        iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        slug: "google-ads-ppc-management",
        title: "Google Ads & PPC Campaigns",
        subtitle: "Paid Search & Scale",
        icon: "Sparkles",
        iconBg: "bg-pink-500/10 text-pink-400 border-pink-500/20"
      },
      {
        slug: "performance-marketing-social-ads",
        title: "Performance Marketing & Social Funnels",
        subtitle: "High ROAS & B2B Leads",
        icon: "TrendingUp",
        iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20"
      }
    ]
  }
];
