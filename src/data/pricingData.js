export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: "$1,490",
    priceAnnual: "$1,190",
    period: "per project",
    badge: "For Small Businesses",
    description: "Ideal for startups and growing businesses looking for a high-converting, professional website.",
    features: [
      "Custom 5-Page Responsive Website",
      "Next.js App Router & Tailwind CSS",
      "Subtle Framer Motion Animations",
      "Mobile & Desktop Optimization",
      "Basic On-Page SEO Audit",
      "Contact Form Integration",
      "2 Weeks Post-Launch Support"
    ],
    ctaText: "Get Started",
    popular: false
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: "$3,490",
    priceAnnual: "$2,890",
    period: "per project",
    badge: "Most Popular",
    description: "Full-fledged digital presence with 3D interactive elements, SEO architecture, and CMS.",
    features: [
      "Up to 12 Custom Dynamic Pages",
      "Interactive 3D Three.js Web Canvas",
      "Advanced Dynamic Blog / CMS",
      "Technical SEO & Schema Markup",
      "Custom Micro-Animations & Parallax",
      "CRM & Analytics Integration",
      "1 Month Post-Launch Support",
      "Priority 48-hour Bug Fix Guarantee"
    ],
    ctaText: "Start Business Plan",
    popular: true
  },
  {
    id: "professional",
    name: "Professional",
    priceMonthly: "$6,990",
    priceAnnual: "$5,790",
    period: "per project",
    badge: "For Web Apps & SaaS",
    description: "Tailored for custom web applications, SaaS platforms, AI integrations, or e-commerce engines.",
    features: [
      "Full Custom Web App / SaaS Engine",
      "AI & LLM API Integration",
      "Stripe Subscription Billing",
      "Multi-Tenant Database Architecture",
      "Advanced Interactive 3D Scenes",
      "Comprehensive Security Hardening",
      "Full CI/CD Pipeline Deployment",
      "3 Months Dedicated Support"
    ],
    ctaText: "Build Platform",
    popular: false
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    period: "tailored scope",
    badge: "Bespoke Engineering",
    description: "Dedicated engineering team for enterprise organizations with complex infrastructure demands.",
    features: [
      "Dedicated Senior Engineering Team",
      "Custom AI Model Fine-Tuning & RAG",
      "High-Concurrency Microservices",
      "SOC2 Compliance Architecture",
      "Custom 3D Visual Product Configurator",
      "24/7 SLA Support & Server Monitoring",
      "Unlimited Revisions & Sprints",
      "On-Premises or Custom Cloud Setup"
    ],
    ctaText: "Contact Sales",
    popular: false
  }
];

export const featureComparison = [
  { feature: "Responsive Next.js Architecture", starter: true, business: true, professional: true, enterprise: true },
  { feature: "Custom 3D WebGL Graphics", starter: false, business: true, professional: true, enterprise: true },
  { feature: "Dynamic Content / Blog System", starter: "Basic", business: "Advanced", professional: "Full CMS", enterprise: "Bespoke" },
  { feature: "AI & Autonomous Agent Integration", starter: false, business: false, professional: true, enterprise: true },
  { feature: "E-Commerce / Stripe Payment Billing", starter: false, business: "Optional Add-on", professional: true, enterprise: true },
  { feature: "Technical SEO & Schema Audits", starter: "Standard", business: "Advanced", professional: "Enterprise", enterprise: "Enterprise" },
  { feature: "Dedicated Support & SLAs", starter: "2 Weeks", business: "1 Month", professional: "3 Months", enterprise: "24/7 Dedicated" }
];
