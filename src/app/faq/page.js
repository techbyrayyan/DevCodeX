"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    q: "What services does Devcodex offer?",
    a: "We offer a wide range of digital solutions including website development, e-commerce development, custom web applications, AI SaaS development, automation systems, and more. Our goal is to build secure, scalable, and future-ready solutions for your business.",
  },
  {
    q: "How long does it take to complete a project?",
    a: "The timeline depends on the complexity of the project. A standard business website typically takes 2–4 weeks, while larger custom projects or AI-powered platforms can take 6–12 weeks. We always provide a clear timeline before starting.",
  },
  {
    q: "Do you provide ongoing support after project delivery?",
    a: "Yes, we offer monthly maintenance packages that include security updates, performance monitoring, content updates, and priority support to keep your website running smoothly.",
  },
  {
    q: "Can you redesign or improve my existing website?",
    a: "Absolutely. We specialize in redesigning outdated websites to make them modern, fast, and conversion-focused while keeping your brand identity intact.",
  },
  {
    q: "What platforms do you work on?",
    a: "We work with a variety of platforms including WordPress, Shopify, Next.js, and custom tech stacks depending on your business requirements.",
  },
  {
    q: "Will my website be mobile-friendly and SEO optimized?",
    a: "Yes! Every website we build is fully responsive (mobile-friendly) and optimized for search engines (SEO) to ensure you rank well and provide a great user experience on all devices.",
  },
  {
    q: "How do you ensure the quality of your work?",
    a: "We follow strict quality assurance processes, including code reviews, performance testing, and cross-browser compatibility checks before launching any project.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes, we work with clients worldwide. Our team is fully remote-ready and can collaborate across time zones efficiently.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-50/70 blur-3xl"></div>
        <div className="absolute top-[20%] right-[15%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-3xl"></div>
      </div>

      {/* ─── HERO SECTION ─── */}
      <main className="max-w-7xl mx-auto px-6 pt-16 lg:pt-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Content */}
          <div className="max-w-xl">
            <div className="inline-block bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-md text-xs tracking-widest uppercase mb-6">
              FAQ
            </div>
            <h1 className="text-5xl font-extrabold text-[#0B1B3D] leading-tight mb-6">
              Frequently Asked <br />
              <span className="text-blue-600">Questions</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 pr-4">
              Got questions? We've got answers. Browse through our most commonly asked questions below, or feel free to reach out to us directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-200/50"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-[400px] h-[300px] flex justify-center items-center">
            <div className="relative w-full h-full">
              <Image
                src="/img18.png"
                alt="FAQ Illustration"
                fill
                className="object-contain ml-10 scale-110 lg:scale-125 origin-center lg:origin-right mix-blend-multiply"
                priority
              />
            </div>
          </div>

        </div>

        {/* ─── BROWSE BY CATEGORY ─── */}
        <section className="py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#0B1B3D]">
              Browse by <span className="text-blue-600">Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

            {/* General */}
            <div className="flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#0B1B3D]">General</p>
                <p className="text-xs text-gray-400 mt-0.5">08 Questions</p>
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#0B1B3D]">Services</p>
                <p className="text-xs text-gray-400 mt-0.5">12 Questions</p>
              </div>
            </div>

            {/* Billing & Payments */}
            <div className="flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#0B1B3D]">Billing & Payments</p>
                <p className="text-xs text-gray-400 mt-0.5">06 Questions</p>
              </div>
            </div>

            {/* Project Process */}
            <div className="flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#0B1B3D]">Project Process</p>
                <p className="text-xs text-gray-400 mt-0.5">10 Questions</p>
              </div>
            </div>

            {/* Security */}
            <div className="flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#0B1B3D]">Security</p>
                <p className="text-xs text-gray-400 mt-0.5">07 Questions</p>
              </div>
            </div>

            {/* Support */}
            <div className="flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#0B1B3D]">Support</p>
                <p className="text-xs text-gray-400 mt-0.5">05 Questions</p>
              </div>
            </div>

          </div>
        </section>

        {/* ─── GENERAL QUESTIONS + SIDEBAR ─── */}
        <section className="pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Left: Accordion */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-6">
                <span className="text-blue-600">General</span> Questions
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors bg-white"
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    >
                      <span className="text-sm font-bold text-[#0B1B3D] pr-4">{faq.q}</span>
                      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400">
                        {openIndex === i ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-5">

              {/* Still have questions? */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-extrabold text-[#0B1B3D]">Still have questions?</h3>
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  If you can't find the answer you're looking for, feel free to reach out to our team.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                >
                  Contact Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Free Consultation Card */}
              <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] border border-indigo-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-extrabold text-[#0B1B3D] mb-2">
                  Need a <span className="text-blue-600">free consultation?</span>
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  Let's discuss your idea and find the best solution for your business.
                </p>
                <ul className="space-y-2 mb-5">
                  {["Discuss your requirements", "Get expert advice", "No obligation, 100% free"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Book a Free Call
                </Link>
              </div>

              {/* Popular Topics */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-extrabold text-[#0B1B3D] mb-4">Popular Topics</h3>
                <ul className="space-y-3">
                  {["Project Timelines", "Pricing & Packages", "Revisions & Refunds", "Hosting & Domain", "Maintenance & Support"].map((topic, i) => (
                    <li key={i}>
                      <Link href="#" className="flex items-center justify-between group">
                        <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">{topic}</span>
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ─── READY TO START BANNER ─── */}
        <section className="pb-20">
          <div className="bg-[#F8FAFC] border border-gray-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-[#0B1B3D] mb-1">
                  Ready to start your project?
                </h2>
                <p className="text-gray-500 text-sm font-medium">
                  We're excited to help you bring your ideas to life.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md text-sm whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Book a Free Call
            </Link>

          </div>
        </section>

      </main>
    </div>
  );
}
