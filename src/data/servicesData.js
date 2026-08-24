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
  }
];
