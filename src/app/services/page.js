import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const servicesData = [
  {
    title: "Frontend Development",
    desc: "Pixel-perfect, responsive & dynamic frontend solutions.",
    features: ["HTML5, CSS3, Bootstrap, Tailwind", "JavaScript, jQuery, AJAX", "React.js / Next.js", "Responsive & Cross-browser"],
    iconBg: "bg-blue-600",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  },
  {
    title: "Backend Development",
    desc: "Robust, scalable & secure backend solutions that power your apps.",
    features: ["PHP (Laravel), Node.js, Python", "RESTful APIs Development", "Database Design & Optimization", "Server & Deployment"],
    iconBg: "bg-purple-600",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
  },
  {
    title: "WordPress Design & Development",
    desc: "Custom WordPress websites that are fast, secure & SEO-friendly.",
    features: ["Custom Theme Development", "Plugin Development", "E-commerce (WooCommerce)", "Website Maintenance"],
    iconBg: "bg-blue-500",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.18 2.986-.51-.024-.037-.046-.078-.065-.123l-2.763-7.572zm9.247-4.103c.026.262.042.528.042.8 0 3.195-1.503 6.035-3.834 7.85l3.228-8.875c.238-.34.423-.68.55-1.015.01-.025.014-.052.014-.078v.318zm-11.455 1.48c0-.627.202-1.127.42-1.558.337-.665.733-1.25.733-1.927 0-1.044-.816-1.99-1.928-1.99-1.298 0-2.096 1.157-2.096 2.508 0 .493.11.968.252 1.34l3.197 9.176c-2.31-1.785-3.8-4.577-3.8-7.728 0-.916.127-1.803.364-2.65-.246.335-.453.714-.62 1.134l-3.326 9.155a10.957 10.957 0 0 1-1.464-5.41c0-6.075 4.925-11 11-11 2.298 0 4.432.705 6.195 1.905-.623-.198-1.285-.303-1.96-.303-1.637 0-3.155.618-4.248 1.618-.466.425-.87 1.01-1.048 1.67z" /></svg>
  },
  {
    title: "Shopify Design & Development",
    desc: "High-converting Shopify stores designed to sell more.",
    features: ["Custom Shopify Store", "Theme Customization", "App Integration", "Store Maintenance"],
    iconBg: "bg-green-500",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.34 6.81a3.67 3.67 0 0 0-1.03-1.6 3.98 3.98 0 0 0-1.68-.94L12 3.16a1.13 1.13 0 0 0-.68 0L6.69 4.27a3.98 3.98 0 0 0-1.68.94 3.67 3.67 0 0 0-1.03 1.6l-2.09 7.42a2.95 2.95 0 0 0 .54 2.58 2.87 2.87 0 0 0 2.08 1.05h15.22a2.87 2.87 0 0 0 2.08-1.05 2.95 2.95 0 0 0 .54-2.58l-2.09-7.42zm-5.06-1.57c-1.37.5-2.28 1.63-2.28 3.1 0 .34.05.67.15.98a4.01 4.01 0 0 1-1.39-1.92L11 6.13c.27-.6.64-1.12 1.12-1.51l2.16 1.62z"/></svg>
  },
  {
    title: "E-Commerce Development (CMS & Custom)",
    desc: "Powerful eCommerce stores on CMS or custom platforms.",
    features: ["WooCommerce Development", "Shopify Custom Stores", "Custom PHP / Laravel Stores", "Payment Gateway Integration"],
    iconBg: "bg-orange-500",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  },
  {
    title: "E-Commerce Designs",
    desc: "Modern, high-converting & user-friendly eCommerce designs.",
    features: ["Landing Page Design", "Product Page Design", "Store Redesign", "UI/UX Best Practices"],
    iconBg: "bg-pink-500",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  {
    title: "Shopify Liquid Coding & Themes",
    desc: "Advanced Shopify Liquid coding & custom theme development.",
    features: ["Custom Liquid Coding", "Theme Development", "Theme Customization", "Performance Optimization"],
    iconBg: "bg-teal-500",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  },
  {
    title: "Logo & Branding Design",
    desc: "Creative logos & branding that build a strong identity.",
    features: ["Logo Design", "Brand Identity Kits", "Business Cards & Stationery", "Brand Guidelines"],
    iconBg: "bg-yellow-500",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
  },
  {
    title: "Digital Marketing & SEO",
    desc: "Drive traffic, generate leads & grow your business.",
    features: ["SEO (On-Page, Off-Page, Technical)", "Google Ads (PPC)", "Social Media Marketing", "Content Marketing"],
    iconBg: "bg-green-500",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
  },
  {
    title: "SaaS Development",
    desc: "Scalable, secure & high-performance SaaS applications.",
    features: ["SaaS MVP Development", "Subscription & Billing", "Multi-tenancy Architecture", "Dashboard & Analytics"],
    iconBg: "bg-purple-500",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
  },
  {
    title: "AI Integration",
    desc: "Integrate powerful AI capabilities into your websites & applications.",
    features: ["OpenAI / ChatGPT Integration", "AI API Integration", "AI Features for Web Apps", "Smart & Data-driven Solutions"],
    iconBg: "bg-blue-600",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
  },
  {
    title: "AI Automation Systems",
    desc: "Automate your workflows & business processes using AI & automation.",
    features: ["Workflow Automation", "AI Agents & Chatbots", "Task & Data Automation", "Business Process Automation"],
    iconBg: "bg-purple-600",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  {
    title: "AI Tool Site Development",
    desc: "Custom AI tools & web apps to solve real-world problems.",
    features: ["AI Tool Development", "SaaS + AI Tools", "Secure & Scalable Solutions", "User-friendly Interfaces"],
    iconBg: "bg-blue-500",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
  },
  {
    title: "Figma Design & UI/UX",
    desc: "Beautiful, modern & user-centered designs that improve conversions.",
    features: ["UI/UX Design", "Wireframing & Prototyping", "Figma to HTML/React", "User Research & Testing"],
    iconBg: "bg-pink-500",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12a4 4 0 0 0-4-4V4a4 4 0 1 0-4 4v8a4 4 0 0 0 4 4v4a4 4 0 1 0 4-4h-4v-4a4 4 0 0 0 4-4z" /></svg>
  },
  {
    title: "Canva Design",
    desc: "Eye-catching social media posts & YouTube thumbnails that get clicks.",
    features: ["Social Media Post Design", "YouTube Thumbnail Design", "Banners & Covers", "Branded Templates"],
    iconBg: "bg-teal-500",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F4F8FF] font-sans overflow-hidden flex-grow">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
          <div className="absolute top-[10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-blue-50/50 blur-3xl"></div>
          <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-50/50 blur-3xl"></div>
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="max-w-7xl mx-auto px-6 pt-8 lg:pt-12 pb-32 lg:pb-40 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Content */}
              <div className="max-w-xl">
                  <div className="inline-block bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-md text-xs tracking-widest uppercase mb-6 shadow-sm border border-blue-100">
                      OUR SERVICES
                  </div>
                  <h1 className="text-5xl md:text-6xl font-extrabold text-[#0B1B3D] leading-tight mb-6">
                      Discover how we can help transform your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">business</span>
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed mb-10 pr-4">
                      With our cutting-edge solutions, expert team, and modern technologies tailored to your success.
                  </p>
                  
                  <div className="flex gap-4">
                      <Link href="/contact" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">
                          Get Started
                      </Link>
                  </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative w-full h-[400px] flex justify-center items-center">
                  <div className="relative w-full h-full">
                     <Image 
                         src="/img20.png" 
                         alt="Services Hero Image" 
                         fill
                         className="object-contain scale-110 origin-center lg:origin-right drop-shadow-2xl"
                         priority
                     />
                  </div>
              </div>

          </div>
      </section>

      {/* ─── STATS / IMPACT SECTION ─── */}
      <section className="w-full relative z-20 -mt-20 lg:-mt-28 px-4 md:px-6">
          <div className="max-w-7xl mx-auto bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                  
                  {/* Left Text */}
                  <div className="lg:w-1/3 flex flex-col items-start text-left">
                      <span className="text-blue-600 font-extrabold text-xs tracking-widest uppercase mb-3 block">
                          OUR IMPACT
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1B3D] leading-tight mb-5">
                          Numbers That Reflect Our Work
                      </h2>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                          We're proud of the trust our clients place in us and the results we deliver.
                      </p>
                      <Link href="/about" className="inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-100 font-bold px-6 py-3 rounded-lg shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-sm">
                          More About Us
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                      </Link>
                  </div>

                  {/* Right Cards */}
                  <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
                      
                      {/* Card 1 */}
                      <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                          <svg className="w-9 h-9 text-blue-600 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          </svg>
                          <h3 className="text-3xl font-extrabold text-[#0B1B3D] mb-1">50+</h3>
                          <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide leading-relaxed">
                              Projects<br/>Completed
                          </p>
                      </div>

                      {/* Card 2 */}
                      <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                          <svg className="w-9 h-9 text-blue-600 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                          </svg>
                          <h3 className="text-3xl font-extrabold text-[#0B1B3D] mb-1">30+</h3>
                          <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide leading-relaxed">
                              Happy<br/>Clients
                          </p>
                      </div>

                      {/* Card 3 */}
                      <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                          <svg className="w-8 h-8 text-blue-600 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          <h3 className="text-3xl font-extrabold text-[#0B1B3D] mb-1">3+</h3>
                          <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide leading-relaxed">
                              Years of<br/>Experience
                          </p>
                      </div>

                      {/* Card 4 */}
                      <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                          <svg className="w-8 h-8 text-blue-600 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                          </svg>
                          <h3 className="text-3xl font-extrabold text-[#0B1B3D] mb-1">100%</h3>
                          <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide leading-relaxed">
                              Client<br/>Satisfaction
                          </p>
                      </div>

                  </div>

              </div>
          </div>
      </section>

      {/* ─── MAIN SERVICES GRID SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16 relative">
              <span className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3 block">
                  WHAT WE DO
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
                  Our Services
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                  End-to-end digital solutions to help your business grow, automate & scale.
              </p>
              {/* Dotted Patterns */}
              <div className="absolute top-0 left-[-50px] w-24 h-24 hidden lg:block opacity-20" style={{ backgroundImage: 'radial-gradient(#4285F4 20%, transparent 20%)', backgroundSize: '10px 10px' }}></div>
              <div className="absolute top-0 right-[-50px] w-24 h-24 hidden lg:block opacity-20" style={{ backgroundImage: 'radial-gradient(#4285F4 20%, transparent 20%)', backgroundSize: '10px 10px' }}></div>
          </div>

          {/* Grid of 15 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {servicesData.map((service, idx) => (
                  <div key={idx} className="bg-white rounded-[2rem] p-7 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                      
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white ${service.iconBg}`}>
                         {service.icon}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-[#0B1B3D] mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                          {service.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">
                          {service.desc}
                      </p>
                      
                      {/* Features List */}
                      <ul className="space-y-3 mb-8">
                          {service.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-600 font-medium">
                                 <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                                 <span className="leading-snug">{feature}</span>
                              </li>
                          ))}
                      </ul>
                      
                      {/* Learn More Link */}
                      <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:text-blue-800 transition-colors text-sm mt-auto">
                          Learn More 
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                      </Link>
                  </div>
              ))}
          </div>

      </section>
      
      

    </main>
  );
}
