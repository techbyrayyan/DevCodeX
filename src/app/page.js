"use client";
import Image from "next/image";
import Link from "next/link";
import Testimonial from "@/components/Testimonial";
import Counter from "@/components/Counter";
import ServicesSection from "@/components/ServicesSection";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const totalSlides = 3;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">

      {/* ─── HERO SLIDER ─── */}
      <div
        className="relative w-full overflow-hidden bg-slate-50"
        style={{ minHeight: "480px", height: "min(60vh, 600px)" }}
      >

        {/* ── Slide 1: Original Text Hero ── */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-in-out bg-white"
          style={{ opacity: current === 0 ? 1 : 0, zIndex: current === 0 ? 1 : 0 }}
        >
          {/* Background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-3xl"></div>
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-50/60 blur-3xl"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full h-full py-8">

              {/* Left Content */}
              <div className="flex flex-col items-start z-10 justify-center h-full">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 mb-4">
                  <span className="text-xs font-bold text-blue-600 tracking-wider">WEBSITES • AI • AUTOMATION</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-[1.1] tracking-tight mb-4">
                  We Build Websites, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">AI Products &</span> <br />
                  <span className="text-[#0B1B3D]">Automation Systems</span>
                </h1>

                <p className="text-base text-gray-600 mb-6 max-w-lg leading-relaxed">
                  We help businesses grow with modern websites, smart AI products and powerful automation systems that save time, reduce costs and drive results.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-200/50 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book free consultation
                  </Link>
                  <Link href="/portfolio" className="flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-200 px-6 py-3 rounded-xl font-medium transition-colors text-sm">
                    View our work
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Image — using width/height instead of fill */}
              <div className="hidden lg:flex justify-center items-center h-full">
                <Image
                  src="/img26.png"
                  alt="AI Products & Automation"
                  width={560}
                  height={400}
                  className="object-contain w-full h-auto max-h-[400px]"
                  priority
                />
              </div>

            </div>
          </div>
        </div>

        {/* ── Slide 2: Coded Layout ── */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 1 ? 1 : 0, zIndex: current === 1 ? 1 : 0, backgroundColor: "#fdfdfd" }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-3xl"></div>
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-50/60 blur-3xl"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full h-full py-8">
              
              <div className="flex flex-col items-start z-10 justify-center h-full">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 mb-4">
                  <span className="text-xs font-bold text-blue-600 tracking-wider">WEB DEVELOPMENT</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-[1.1] tracking-tight mb-4">
                  Build Powerful <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Websites That</span> <br />
                  <span className="text-[#0B1B3D]">Grow Your Business</span>
                </h1>

                <p className="text-base text-gray-600 mb-6 max-w-lg leading-relaxed">
                  We design and develop high-performance, scalable responsive websites and web applications tailored for your ultimate success.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/portfolio" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-200/50 text-sm">
                    Explore Services
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex justify-center items-center h-full">
                <Image
                  src="/header2.png"
                  alt="Web Development"
                  width={560}
                  height={400}
                  className="object-contain w-full h-auto max-h-[400px]"
                  priority
                />
              </div>

            </div>
          </div>
        </div>

        {/* ── Slide 3: Coded Layout ── */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 2 ? 1 : 0, zIndex: current === 2 ? 1 : 0, backgroundColor: "#fdfdfd" }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-50/60 blur-3xl"></div>
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-50/60 blur-3xl"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full h-full py-8">
              
              <div className="flex flex-col items-start z-10 justify-center h-full">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 mb-4">
                  <span className="text-xs font-bold text-purple-600 tracking-wider">AI AUTOMATION</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-[1.1] tracking-tight mb-4">
                  Automate Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Business With</span> <br />
                  <span className="text-[#0B1B3D]">Smart AI Solutions</span>
                </h1>

                <p className="text-base text-gray-600 mb-6 max-w-lg leading-relaxed">
                  Streamline operations, reduce costs, and boost productivity with our custom AI development and intelligent automation systems.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-purple-200/50 text-sm">
                    Get Started with AI
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex justify-center items-center h-full">
                <Image
                  src="/header1.jpeg"
                  alt="AI Automation"
                  width={560}
                  height={400}
                  className="object-contain w-full h-auto max-h-[400px]"
                  priority
                />
              </div>

            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === current
                  ? "w-6 h-2.5 bg-blue-600"
                  : "w-2.5 h-2.5 bg-gray-400/80 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── STATS SECTION ─── */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative">
        <div className="bg-[#F8FAFC] border border-slate-100 rounded-[2rem] p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">

            {/* Stat 1 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:px-6 lg:px-8 first:pt-0 first:px-0">
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-600"><Counter end={50} suffix="+" /></div>
                <div className="text-sm font-semibold text-gray-500 mt-1">Projects Completed</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:px-6 lg:px-8">
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-600"><Counter end={30} suffix="+" /></div>
                <div className="text-sm font-semibold text-gray-500 mt-1">Happy Clients</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:px-6 lg:px-8">
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-600"><Counter end={3} suffix="+" /></div>
                <div className="text-sm font-semibold text-gray-500 mt-1">Years Experience</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:px-6 lg:px-8">
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-600"><Counter end={100} suffix="%" /></div>
                <div className="text-sm font-semibold text-gray-500 mt-1">Client Satisfaction</div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <Testimonial />
    </div>
  );
}
