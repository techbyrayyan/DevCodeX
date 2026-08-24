export const faqCategories = [
  { id: "general", label: "General & Process" },
  { id: "tech", label: "Technologies & 3D" },
  { id: "pricing", label: "Pricing & Contracts" },
  { id: "maintenance", label: "Support & Maintenance" }
];

export const faqs = [
  {
    id: 1,
    category: "general",
    question: "What makes DevCodeX different from traditional agencies?",
    answer: "DevCodeX combines senior-level full-stack engineering with cutting-edge 3D motion design and AI integration. We don't use generic drag-and-drop templates. Every project is custom-coded with Next.js, built for speed, visual excellence, and measurable business growth."
  },
  {
    id: 2,
    category: "general",
    question: "How long does a typical project take to build?",
    answer: "Project timelines depend on scope. A corporate website typically takes 3 to 5 weeks. Complex web applications, AI dashboards, and multi-page custom platforms take 6 to 10 weeks. We provide clear milestone schedules and weekly demo video updates."
  },
  {
    id: 3,
    category: "tech",
    question: "Will 3D graphics slow down my website on mobile devices?",
    answer: "No. Our 3D WebGL scenes are built with device pixel ratio limits, compressed GLTF models, geometry instancing, and mobile viewport detection. On mobile, we automatically optimize shader intensity or fall back gracefully to lightweight canvas effects."
  },
  {
    id: 4,
    category: "tech",
    question: "What technology stack do you use?",
    answer: "Our core stack includes Next.js, React, Three.js, React Three Fiber, Framer Motion, Tailwind CSS, Node.js, Express, MongoDB, PostgreSQL, and Python for AI workflows. We deploy on Vercel and AWS for maximum global availability."
  },
  {
    id: 5,
    category: "pricing",
    question: "Are there any hidden fees or recurring monthly agency costs?",
    answer: "No hidden costs. We present transparent milestone pricing proposals upfront. You own 100% of the code, domain, and server assets upon project completion. Post-launch maintenance plans are optional."
  },
  {
    id: 6,
    category: "pricing",
    question: "How do payment milestones work?",
    answer: "Standard projects follow a 50% deposit and 50% upon final signoff & deployment structure. For larger enterprise builds, we support milestone-based payments (e.g. 40% initial, 30% alpha prototype, 30% launch)."
  },
  {
    id: 7,
    category: "maintenance",
    question: "What kind of support do you provide post-launch?",
    answer: "Every package includes a dedicated post-launch support window (from 2 weeks to 3 months) covering bug fixes, server monitoring, and minor updates. We also offer monthly retainer plans for continuous feature development and maintenance."
  },
  {
    id: 8,
    category: "maintenance",
    question: "Can our internal team easily update text and blog posts later?",
    answer: "Yes! We can integrate headless CMS platforms (such as Sanity, Strapi, or MDX) so non-technical team members can publish articles, edit pricing, or add new projects without touch code."
  }
];
