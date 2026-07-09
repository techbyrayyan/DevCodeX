import Image from "next/image";
import Link from "next/link";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-50/50 blur-3xl"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-12 lg:pt-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 mb-4 ml-6">
              <span className="text-xs font-bold text-blue-600 tracking-wider">WEBSITES • AI • AUTOMATION</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl  font-extrabold text-[#0B1B3D] leading-[1.1] tracking-tight mb-6 ml-6">
              We Build Websites, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">AI Products &</span> <br />
              <span className="text-[#0B1B3D]">Automation Systems</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed ml-6">
              We help businesses grow with modern websites, smart AI products and powerful automation systems that save time, reduce costs and drive results.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full sm:w-auto ml-6">
              <Link href="/contact" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-200/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book free consultation
              </Link>
              
              <Link href="/portfolio" className="flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-200 px-6 py-3.5 rounded-xl font-medium transition-colors">
                View our work
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px]  flex justify-center items-center">
            <div className="relative w-full h-full">
              <Image
                src="/img26.png"
                alt="AI Products & Automation"
                fill
                className="object-contain origin-center lg:origin-right"
                priority
              />
            </div>
          </div>

        </div>

        {/* Stats Section */}
        <div className="mt-10">
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
                  <div className="text-4xl font-extrabold text-blue-600">50+</div>
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
                  <div className="text-4xl font-extrabold text-blue-600">30+</div>
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
                  <div className="text-4xl font-extrabold text-blue-600">3+</div>
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
                  <div className="text-4xl font-extrabold text-blue-600">100%</div>
                  <div className="text-sm font-semibold text-gray-500 mt-1">Client Satisfaction</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-10 py-10 lg:py-12">
        <div className="text-center mb-8">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3 block">What We Do</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1B3D] mb-4">Our Services</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We deliver end-to-end solutions to help your business grow and scale.
          </p>
        </div>

        {/* Animated Slider for All Cards */}
        <div className="mt-4 overflow-hidden w-full relative -mx-4 px-4 sm:mx-0 sm:px-0" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 35s linear infinite;
              display: flex;
              width: max-content;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="animate-marquee py-2">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex gap-6 lg:gap-8 pr-6 lg:pr-8">
                {/* Card 1 */}
                <div className="w-[300px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-white border border-gray-300 p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-[#E8F3FF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-[#21759B]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.18 2.986-.51-.024-.037-.046-.078-.065-.123l-2.763-7.572zm9.213-3.766c.038.35.06.7.06 1.056 0 2.502-.976 4.778-2.565 6.452l-3.23-9.524c.774-.034 1.413-.087 1.838-.135.534-.055.672-.34.672-.516 0-.306-.216-.543-.535-.543-.16 0-.58.026-1.12.052l-2.31.104c-.458-.026-.827-.052-.962-.052-.317 0-.533.237-.533.543 0 .176.138.46.673.516.488.053 1.077.104 1.764.136l1.378 4.076-2.126 6.32-2.123-6.32h1.493c.535-.052.673-.34.673-.516 0-.306-.216-.543-.534-.543-.16 0-.58.026-1.12.052l-2.31.104c-.458-.026-.826-.052-.96-.052-.318 0-.534.237-.534.543 0 .176.138.46.672.516.425.048.988.1 1.64.135l3.144 9.172c-2.483-1.636-4.108-4.474-4.108-7.702 0-1.848.562-3.415 1.516-4.636.328-.432.553-.872.553-1.34 0-.825-.57-1.602-1.503-1.602-.152 0-.295.03-.43.076a9.92 9.92 0 014.286-1.86c-.168.324-.265.69-.265 1.07 0 .805.352 1.69 1.037 2.632.747 1.025 1.556 2.373 1.556 3.99 0 1.258-.458 2.37-1.07 3.238l1.455 4.316 1.488-4.523c-.347-.56-.543-1.226-.543-1.928 0-1.62.91-3.058 1.956-4.502.937-1.293 1.83-2.525 1.83-4.2 0-.353-.024-.693-.07-1.018a9.962 9.962 0 013.722 5.09zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">WordPress Development</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                        Custom WordPress websites that are fast, secure and easy to manage.
                      </p>
                      <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="w-[300px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-white border border-gray-300 p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-[#E8FAED] flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-[#95BF47]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 6.075c-.328-.52-1.233-.78-2.617-.954C16.924 1.776 14.86.046 12.378.046 9.878.046 7.643 1.933 6.837 5.105c-1.246.128-2.09.362-2.392.834-.236.37-.25.96-.062 1.838l1.71 8.01c.21 1.01.624 3.018 1.01 4.545.28 1.12.87 1.815 1.79 2.14.733.262 1.61.352 2.508.35h.003c1.077 0 2.113-.12 2.946-.432 1.138-.43 1.81-1.245 2.05-2.484.288-1.493.682-3.414.908-4.43l1.836-8.238c.203-1.025.137-1.69-.092-2.162zM12.378 1.96c1.655 0 3.02 1.196 3.553 3.39-1.066.088-2.227.15-3.464.183-2.18-.888-3.04-2.15-3.04-2.15s.893-1.423 2.95-1.423zm-3.69 11.23c-.63 1.258-2.26 1.738-2.26 1.738s.772-2.58 2.083-3.66c1.28-1.054 2.87-1.128 2.87-1.128s-.36 1.082-.692 3.05zm7.397-2.68c-.68 2.22-3.036 3.486-3.036 3.486s2.055-1.523 2.37-3.805c.34-2.433-.63-4.22-.63-4.22s2.03.95 1.295 4.538z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">Shopify Development</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                        High-converting Shopify stores designed to boost your sales and brand.
                      </p>
                      <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="w-[300px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-white border border-gray-300 p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-[#F0F5FF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-[#4285F4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">Frontend Development</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                        Modern, responsive and pixel-perfect websites using HTML, CSS, Bootstrap, JavaScript.
                      </p>
                      <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="w-[300px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-white border border-gray-300 p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-[#F8EEFF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">Backend Development</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                        Robust, scalable and secure backend solutions with modern technologies.
                      </p>
                      <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="w-[300px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-white border border-gray-300 p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-[#F8EEFF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-[#9333EA]" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm3 3h2v6H7V9zm5 0h4v2h-2v1h2v2h-2v1h2v-2h-2v-1h2v-2h-4V9z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">AI SaaS Development</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                        We build smart AI-powered SaaS products that solve real business problems.
                      </p>
                      <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 6 */}
                <div className="w-[300px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-white border border-gray-300 p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-[#F8EEFF] flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-[#9333EA]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h3a3 3 0 013 3v2h2a2 2 0 110 4h-2v1a3 3 0 01-3 3H8a3 3 0 01-3-3v-1H3a2 2 0 110-4h2v-2a3 3 0 013-3h3V5.73A2 2 0 0110 4a2 2 0 012-2zm-3 8a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2zm-6 4v1h6v-1H9z" />
                      </svg>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">AI Automation Systems</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                        Automate repetitive tasks and workflows using AI to save time and increase productivity.
                      </p>
                      <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Testimonials Section */}
      <Testimonial />
    </div>
  );
}
