import Image from "next/image";
import Link from "next/link";

export default function FrontEndPage() {
  return (
    <div className="min-h-screen bg-[#F5F9FF] font-sans overflow-hidden relative">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start z-10">
            {/* Top Label */}
            <div className="mb-6 inline-block">
              <span className="text-sm font-bold text-[#1456c6] tracking-wide uppercase border border-[#1456c6] rounded-full px-4 py-1.5">FRONT END</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0B1B3D] leading-[1.1] tracking-tight mb-6">
              Front End <br />
              <span className="text-[#1456c6]">Development</span>
            </h1>

            {/* Subheadings */}
            <p className="text-xl font-bold text-gray-700 mb-4 max-w-lg leading-snug">
              We Build Beautiful, Responsive and User-Friendly Interfaces
            </p>
            <p className="text-base text-gray-500 mb-8 max-w-lg leading-relaxed">
              Frontend development is the part of web development that users see and interact with. We turn ideas into stunning UI/UX experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <Link
                href="/portfolio"
                className="flex items-center justify-center gap-2 bg-[#1456c6] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200/50"
              >
                Explore Our Work
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-transparent text-[#1456c6] border border-[#1456c6] hover:bg-blue-50 px-8 py-3.5 rounded-xl font-semibold transition-colors"
              >
                Let&apos;s Talk
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-700 font-bold">
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1456c6] flex items-center justify-center text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Pixel Perfect
              </span>
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1456c6] flex items-center justify-center text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Responsive
              </span>
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1456c6] flex items-center justify-center text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Fast & Secure
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[500px] flex justify-center items-center z-10">
            <div className="relative w-full h-full">
              <Image
                src="/img32.png"
                alt="Front End Development"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </main>

      {/* What is Front End Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Image */}
            <div className="relative w-full h-[350px]  flex justify-center items-center">
              <div className="relative w-full h-full">
                <Image
                  src="/img33.png"
                  alt="What is Front End"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold text-[#1456c6] tracking-wider uppercase mb-3 block">WHAT IS FRONT END?</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] mb-6 tracking-tight leading-[1.2]">
                <span className="text-[#1456c6]">Frontend</span> in Simple Words
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Frontend (client-side) is everything users see and interact with on a website or web app — layouts, buttons, menus, forms, images, animations, etc.
              </p>

              <ul className="space-y-4">
                {[
                  "It focuses on design, responsiveness and usability",
                  "Built using HTML, CSS, JavaScript & modern frameworks",
                  "Works on the browser side (what users see)"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 font-medium text-[15px]">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1456c6] flex items-center justify-center text-white mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 lg:py-28 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              Technologies <span className="text-[#1456c6]">We Use</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Tech 1 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.simpleicons.org/html5/E34F26" alt="HTML5" className="w-14 h-14 mb-5" />
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-1">HTML</h3>
              <p className="text-gray-400 text-sm">Structure</p>
            </div>

            {/* Tech 2 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="w-14 h-14 mb-5" />
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-1">CSS</h3>
              <p className="text-gray-400 text-sm">Styling</p>
            </div>

            {/* Tech 3 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="JavaScript" className="w-14 h-14 mb-5 rounded-md" />
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-1">JavaScript</h3>
              <p className="text-gray-400 text-sm">Interactivity</p>
            </div>

            {/* Tech 4 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="w-14 h-14 mb-5" />
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-1">React.js</h3>
              <p className="text-gray-400 text-sm">Library</p>
            </div>

            {/* Tech 5 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 mb-5 bg-black rounded-full flex items-center justify-center">
                <img src="https://cdn.simpleicons.org/nextdotjs/white" alt="Next.js" className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-1">Next.js</h3>
              <p className="text-gray-400 text-sm">Framework</p>
            </div>

            {/* Tech 6 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" className="w-14 h-14 mb-5" />
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-1">Tailwind CSS</h3>
              <p className="text-gray-400 text-sm">Utility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              <span className="text-[#1456c6]">Benefits</span> <span className="font-medium text-gray-400">of</span> Frontend Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Benefit 1 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E8F3FF] flex items-center justify-center text-[#1456c6] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-3">Great User Experience</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Smooth, easy and engaging experience for users.</p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E8F3FF] flex items-center justify-center text-[#1456c6] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-3">Fully Responsive</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Works perfectly on all devices and screen sizes.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E8F3FF] flex items-center justify-center text-[#1456c6] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-3">Fast Performance</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Optimized code for faster loading and better speed.</p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E8F3FF] flex items-center justify-center text-[#1456c6] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-lg mb-3">Modern & Attractive UI</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Clean, modern and eye-catching designs.</p>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 lg:py-28 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              How <span className="text-[#1456c6]">Frontend</span> Works?
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Dotted Line (Hidden on mobile) */}
            <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#B4C6EE] z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#1456c6] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-blue-200">
                  01
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-lg mb-2">Design</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">UI/UX is designed<br/>(Figma/Canva)</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#1456c6] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-blue-200">
                  02
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-lg mb-2">Code</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">HTML, CSS, JS are<br/>written</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#1456c6] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-blue-200">
                  03
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-lg mb-2">Test</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Checked on different<br/>devices & browsers</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#1456c6] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-blue-200">
                  04
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-lg mb-2">Deploy</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Website is live and<br/>accessible</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-[#1456c6] rounded-2xl px-10 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8 md:mb-0">
              We create high-quality, responsive and fast frontend solutions for your business.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1456c6] font-bold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors text-base"
            >
              Start Your Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              View Portfolio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
