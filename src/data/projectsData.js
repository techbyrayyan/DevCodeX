export const projects = [
  {
    id: "docfind",
    slug: "docfind",
    title: "Docfind — Find The Best Doctor Near You",
    category: "Web App",
    categoryKey: "webapp",
    shortDescription: "A modern healthcare discovery and appointment scheduling platform connecting patients with top verified medical specialists.",
    description: "Docfind is a patient-centric medical booking platform engineered to simplify doctor discovery. Built with a responsive Next.js frontend, intelligent search filters by location and medical specialty, verified doctor credentials, and real-time appointment scheduling, Docfind delivers a frictionless digital healthcare experience.",
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
  }
];
