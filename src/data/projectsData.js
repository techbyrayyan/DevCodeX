export const projects = [
  {
    id: "chatgpt-clone",
    slug: "chatgpt-clone",
    title: "ChatGPT Clone — Intelligent AI Chat & Productivity Workspace",
    shortTitle: "ChatGPT Clone",
    subtitle: "Intelligent AI Chat & Productivity Workspace",
    badge: "AI PLATFORM & WORKSPACE",
    category: "AI Platform",
    categoryKey: "ai",
    imagePosition: "left",
    shortDescription: "An advanced generative AI chat application featuring multi-session management, streaming responses, and developer workspace tools.",
    description: "An advanced conversational AI platform designed for high-speed assistance and daily workflow productivity. Features a persistent multi-chat sidebar, real-time streaming AI responses, integrated Codex and Apps shortcuts, and a sleek dark-mode desktop-class user interface.",
    image: "/chatgpt-clone.png",
    client: "AI Innovation Studio",
    year: "2026",
    duration: "4 Weeks",
    liveUrl: "https://clone-ai-nine.vercel.app/",
    tags: ["Next.js", "React", "Tailwind CSS", "AI Chat", "OpenAI API"],
    challenge: "Developing a responsive chat application with streaming text rendering, multi-session state persistence, and responsive mobile-first sidebar requires rigorous frontend architecture.",
    solution: "We engineered a clean Next.js architecture with instant session switching, real-time message stream handling, and an intuitive dark-mode interface modeled after modern LLM workflows.",
    results: [
      { label: "Streaming Latency", value: "<150ms" },
      { label: "UI Responsiveness", value: "60 FPS" },
      { label: "Active Chat Sessions", value: "Unlimited" }
    ],
    features: [
      "Real-Time Streaming AI Responses",
      "Multi-Session Sidebar with History Search",
      "Integrated Codex & Developer Tools",
      "Dark Minimalist Interface",
      "Instant Message Querying & Copying"
    ],
    gallery: ["/chatgpt-clone.png"]
  },
  {
    id: "docfind",
    slug: "docfind",
    title: "Docfind — Find The Best Doctor Near You",
    shortTitle: "Docfind",
    subtitle: "Find The Best Doctor Near You",
    badge: "FEATURED HEALTHCARE PLATFORM",
    category: "Web App",
    categoryKey: "webapp",
    imagePosition: "right",
    shortDescription: "A modern healthcare discovery and appointment scheduling platform connecting patients with top verified medical specialists.",
    description: "Find and book appointments with top verified medical specialists near you. Docfind is an accessible, modern healthcare platform engineered to simplify doctor discovery with specialty categorization, real-time doctor availability, verified patient ratings, and frictionless one-click consultation reservations.",
    image: "/docfind.png",
    client: "Docfind Healthcare",
    year: "2026",
    duration: "6 Weeks",
    liveUrl: "https://docfind-two.vercel.app/",
    tags: ["Next.js", "React", "Tailwind CSS", "Healthcare", "Doctor Booking"],
    challenge: "Patients struggle to quickly find qualified specialists nearby, verify ratings, and book appointments without long phone queues and scheduling conflicts.",
    solution: "DevCodeX architected Docfind with an ultra-responsive interface, geolocation-based clinic finder, specialist directory with verified patient ratings, and one-click consultation reservations.",
    results: [
      { label: "Search to Booking Rate", value: "72%" },
      { label: "Patient Wait Times", value: "-65%" },
      { label: "Active Doctors Listed", value: "1,200+" }
    ],
    features: [
      "Specialty & Location-based Doctor Search",
      "Instant Appointment Booking & Calendar Sync",
      "Verified Patient Ratings & Detailed Reviews",
      "Mobile-First Responsive Interface",
      "Direct Clinic Location & Route Mapping"
    ],
    gallery: ["/docfind.png"]
  },
  {
    id: "motel-app",
    slug: "motel-app",
    title: "Sunset Motel — Digital Hospitality & Dining Order Application",
    shortTitle: "Sunset Motel",
    subtitle: "Digital Hospitality & Dining Order Application",
    badge: "HOSPITALITY & DINING SYSTEM",
    category: "Web App",
    categoryKey: "webapp",
    imagePosition: "left",
    shortDescription: "A streamlined hospitality and culinary reservation platform providing seamless dining menus, meal ordering, and motel stay experiences.",
    description: "Sunset Motel is a tailored digital hospitality and culinary reservation platform crafted to elevate the guest dining experience. Featuring curated breakfast, lunch, and dinner menus with real-time dish showcases, dietary filters, and frictionless room-service ordering designed for optimal motel customer satisfaction.",
    image: "/motel-app.png",
    client: "Sunset Hospitality Group",
    year: "2026",
    duration: "3 Weeks",
    liveUrl: "https://motel-app-bay.vercel.app/",
    tags: ["Tailwind CSS", "JavaScript", "HTML5", "Food Ordering", "Hospitality"],
    challenge: "Motel guests frequently experience delays and miscommunication when attempting to browse static paper menus and coordinate breakfast, lunch, or room-service dining orders.",
    solution: "We engineered a lightweight, mobile-first dining web application featuring categorized visual menus, immediate meal selections, and intuitive guest ordering flow.",
    results: [
      { label: "Order Placement Speed", value: "<45s" },
      { label: "Guest Satisfaction", value: "98%" },
      { label: "Daily Dining Volume", value: "350+" }
    ],
    features: [
      "Multi-Course Meal Categorization (Breakfast, Lunch, Dinner)",
      "High-Resolution Dish Presentation & Descriptions",
      "Mobile-Optimized Touch Navigation for Guests",
      "Fast Loading Responsive Architecture",
      "Direct Action Buttons for Instant Dining Selection"
    ],
    gallery: ["/motel-app.png"]
  }
];
