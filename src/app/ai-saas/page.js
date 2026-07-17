import Image from "next/image";
import Link from "next/link";

export default function AISaaSPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start z-10">
            {/* Top Label */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0b51c3] tracking-wide border border-[#0b51c3]/30 bg-blue-50 rounded-full px-4 py-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                OUR SERVICE
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold text-[#0b51c3] leading-[1.1] tracking-tight mb-2">
              AI SaaS
            </h1>
            <h2 className="text-4xl font-extrabold text-[#0B1B3D] leading-tight mb-4">
              Development
            </h2>
            <p className="text-xl font-bold text-[#0b51c3] mb-6">
              Smart Solutions. Scalable Impact.
            </p>

            {/* Paragraph */}
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              We build powerful AI SaaS products that help businesses automate processes, gain insights, and deliver intelligent experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-[#0b51c3] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200/50"
              >
                Let&apos;s Build Your AI SaaS
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center justify-center gap-2 bg-white text-[#0b51c3] border-2 border-[#0b51c3] hover:bg-blue-50 px-8 py-3.5 rounded-xl font-semibold transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center z-10">
            <Image
              src="/img40.png"
              alt="AI SaaS Development"
              width={580}
              height={440}
              className="object-contain w-full max-w-[580px]"
              priority
            />
          </div>

        </div>
      </main>

      {/* What is & Why Use Section */}
      <section className="py-16 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left Card — What is AI SaaS Development */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0">
                <Image
                  src="/img41.png"
                  alt="What is AI SaaS Development"
                  width={176}
                  height={176}
                  className="object-contain"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-extrabold text-[#0B1B3D] mb-2">
                  What is <span className="text-[#0b51c3]">AI SaaS</span> Development?
                </h2>
                <div className="w-10 h-1 bg-[#0b51c3] rounded-full mb-5"></div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  AI SaaS (Software as a Service) development is the process of building cloud-based applications that use artificial intelligence to solve real-world problems.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  These applications are accessible online, subscription-based, and can be used by multiple users securely from anywhere.
                </p>
              </div>
            </div>

            {/* Right Card — Why AI SaaS */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl font-extrabold text-[#0B1B3D] mb-2">
                Why <span className="text-[#0b51c3]">AI SaaS</span>?
              </h2>
              <div className="w-10 h-1 bg-[#0b51c3] rounded-full mb-6"></div>
              <ul className="space-y-4">
                {[
                  "Leverage AI to automate tasks and save time",
                  "Deliver intelligent, data-driven insights",
                  "Scale your product globally with ease",
                  "Generate recurring revenue with subscription model",
                  "Secure, reliable and always up-to-date"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0b51c3] flex items-center justify-center text-white">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0B1B3D]">
              Key Features of <span className="text-[#0b51c3]">AI SaaS</span> Solutions
            </h2>
            <div className="w-12 h-1 bg-[#0b51c3] rounded-full mx-auto mt-3"></div>
          </div>

          {/* 6 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

            {/* Card 1 — AI-Powered Intelligence */}
            <div className="bg-[#F5F9FF] rounded-2xl p-6 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.332 2.798H4.13c-1.364 0-2.333-1.799-1.333-2.798L4 15.3" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0B1B3D] mb-2 leading-snug">AI-Powered Intelligence</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Smart models that learn, predict and automate.</p>
              </div>
            </div>

            {/* Card 2 — Cloud-Based Architecture */}
            <div className="bg-[#F5F9FF] rounded-2xl p-6 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.75 5.75 0 011.88 11.095H6.75z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0B1B3D] mb-2 leading-snug">Cloud-Based Architecture</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Built on secure and scalable cloud infrastructure.</p>
              </div>
            </div>

            {/* Card 3 — User Management */}
            <div className="bg-[#F5F9FF] rounded-2xl p-6 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0B1B3D] mb-2 leading-snug">User Management</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Multi-user support with roles, permissions and authentication.</p>
              </div>
            </div>

            {/* Card 4 — Analytics & Insights */}
            <div className="bg-[#F5F9FF] rounded-2xl p-6 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0B1B3D] mb-2 leading-snug">Analytics & Insights</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Real-time dashboards and reports for better decision making.</p>
              </div>
            </div>

            {/* Card 5 — Subscription Billing */}
            <div className="bg-[#F5F9FF] rounded-2xl p-6 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0B1B3D] mb-2 leading-snug">Subscription Billing</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Integrated payment gateways and subscription plans.</p>
              </div>
            </div>

            {/* Card 6 — Secure & Reliable */}
            <div className="bg-[#F5F9FF] rounded-2xl p-6 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0B1B3D] mb-2 leading-snug">Secure & Reliable</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Enterprise-grade security and 99.9% uptime.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Common Use Cases & Technology Stack Section */}
      <section className="py-16 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.07)] p-8 flex flex-col lg:flex-row gap-10 items-stretch">

            {/* Left Column — Common Use Cases & Illustration */}
            <div className="flex-[1.4] min-w-0 flex flex-col">
              <h2 className="text-lg font-extrabold text-[#0B1B3D] mb-1">Common Use Cases</h2>
              <div className="w-8 h-0.5 bg-[#0b51c3] rounded-full mb-6"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between flex-grow">
                {/* List */}
                <ul className="space-y-6 flex-1 w-full">
                  {[
                    {
                      icon: (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      ),
                      title: "AI Chatbots & Virtual Assistants",
                      desc: "Automate customer support and interactions."
                    },
                    {
                      icon: (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      ),
                      title: "AI Content Generation",
                      desc: "Generate text, images, code and more."
                    },
                    {
                      icon: (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ),
                      title: "AI Data Analysis",
                      desc: "Extract insights and predict future trends."
                    },
                    {
                      icon: (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ),
                      title: "AI Document Processing",
                      desc: "Extract, summarize and process documents."
                    },
                    {
                      icon: (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ),
                      title: "AI Recommendation Systems",
                      desc: "Personalize user experiences and boost engagement."
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0b51c3]">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-[#0B1B3D] leading-snug">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Illustration in Left Column */}
                <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
                  <Image
                    src="/img42.png"
                    alt="AI SaaS Illustration"
                    width={280}
                    height={300}
                    className="object-contain max-w-[280px] w-full"
                  />
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-gray-100 self-stretch my-2"></div>

            {/* Right Column — Technology Stack */}
            <div className="flex-1 w-full min-w-0 lg:max-w-[360px] flex flex-col">
              <h2 className="text-lg font-extrabold text-[#0B1B3D] mb-1">Technology Stack</h2>
              <div className="w-8 h-0.5 bg-[#0b51c3] rounded-full mb-6"></div>
              
              <div className="grid grid-cols-4 gap-3 w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
                {/* React.js — Official React Logo */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm hover:shadow transition-shadow">
                  <svg viewBox="-11.5 -10.232 23 20.463" className="w-9 h-9">
                    <circle r="2.05" fill="#61DAFB"/>
                    <g stroke="#61DAFB" fill="none" strokeWidth="1">
                      <ellipse rx="11" ry="4.2"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                  </svg>
                  <span className="text-[9px] font-extrabold text-black text-center">React.js</span>
                </div>

                {/* Next.js — Official Vercel/Next.js Logo */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm hover:shadow transition-shadow">
                  <svg viewBox="0 0 180 180" className="w-9 h-9" fill="none">
                    <mask id="nextmask" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                      <circle cx="90" cy="90" r="90" fill="black"/>
                    </mask>
                    <g mask="url(#nextmask)">
                      <circle cx="90" cy="90" r="87" fill="black" stroke="white" strokeWidth="6"/>
                      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#nextgrad0)"/>
                      <rect x="115" y="54" width="12" height="72" fill="url(#nextgrad1)"/>
                    </g>
                    <defs>
                      <linearGradient id="nextgrad0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"/>
                        <stop offset="1" stopColor="white" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="nextgrad1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"/>
                        <stop offset="1" stopColor="white" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[9px] font-extrabold text-black text-center">Next.js</span>
                </div>

                {/* Node.js — Official Node.js Logo */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm hover:shadow transition-shadow">
                  <svg viewBox="0 0 256 289" className="w-9 h-9">
                    <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.165c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915L129.06 19.213c-1.06-.53-2.385-.53-3.18 0L20.14 80.43c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.635 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.325-3.18 3.18-3.18h13.25c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.395 33.126-31.27 33.126-6.095 0-10.865 0-24.38-6.625L10.335 224.33C3.975 220.62 0 213.73 0 206.31V83.875c0-7.42 3.975-14.31 10.335-18.02L116.075 4.373c6.095-3.445 14.31-3.445 20.14 0L242.25 65.855c6.36 3.71 10.335 10.6 10.335 18.02V206.31c0 7.42-3.975 14.575-10.335 18.02L136.48 285.55c-3.18 1.855-6.89 2.915-10.865 2.915h.385z" fill="#539E43"/>
                    <path d="M160.36 205.25c-44.785 0-54.12-20.67-54.12-37.895 0-1.59 1.325-3.18 3.18-3.18h13.515c1.59 0 2.915 1.06 2.915 2.65 2.12 14.045 8.215 20.935 36.31 20.935 22.26 0 31.8-5.035 31.8-16.96 0-6.89-2.65-11.925-37.37-15.37-28.887-2.915-46.845-9.275-46.845-32.33 0-21.465 18.02-34.185 48.17-34.185 33.92 0 50.56 11.66 52.68 37.1 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.325 0-2.65-1.06-2.915-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.295 8.48-27.295 14.84 0 7.685 3.445 10.07 36.31 14.31 32.595 4.24 47.905 10.335 47.905 33.126-.265 23.32-19.345 36.575-53.065 36.575l.345-.33z" fill="#539E43"/>
                  </svg>
                  <span className="text-[9px] font-extrabold text-black text-center">Node.js</span>
                </div>

                {/* Python — Official Python Logo */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm hover:shadow transition-shadow">
                  <svg viewBox="0 0 256 255" className="w-9 h-9">
                    <defs>
                      <linearGradient id="pygrad1" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
                        <stop stopColor="#387EB8" offset="0%"/>
                        <stop stopColor="#366994" offset="100%"/>
                      </linearGradient>
                      <linearGradient id="pygrad2" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
                        <stop stopColor="#FFE052" offset="0%"/>
                        <stop stopColor="#FFC331" offset="100%"/>
                      </linearGradient>
                    </defs>
                    <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pygrad1)"/>
                    <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pygrad2)"/>
                  </svg>
                  <span className="text-[9px] font-extrabold text-black text-center">Python</span>
                </div>

                {/* Claude.ai — Official Anthropic Logo */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm hover:shadow transition-shadow">
                  <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none">
                    <path d="M14.603 8.148l-3.27 8.322-1.903-8.322H6.38l3.244 10.648h3.635L16.53 8.148h-1.927z" fill="#D97757"/>
                    <path d="M18.486 8.148l-3.27 8.322 1.905 2.326h2.725l-3.287-10.648h1.927z" fill="#D97757"/>
                    <path d="M8.75 8.148L5.48 18.796h2.725l1.905-2.326-3.27-8.322H8.75z" fill="#D97757"/>
                  </svg>
                  <span className="text-[9px] font-extrabold text-black text-center">Claude.ai</span>
                </div>

                {/* OpenAI API — Official OpenAI Logo */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm hover:shadow transition-shadow">
                  <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#412991">
                    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
                  </svg>
                  <span className="text-[9px] font-extrabold text-black text-center">OpenAI API</span>
                </div>

                {/* MongoDB — Official MongoDB Leaf Logo */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm hover:shadow transition-shadow">
                  <svg viewBox="0 0 256 549" className="w-9 h-9" preserveAspectRatio="xMidYMid">
                    <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-.156-.16C126.27-2.904 119.751 20.07 99.655 49.263c-53.448 77.63-44.36 130.376-12.584 168.384l.147.174c1.076 1.263 2.199 2.513 3.347 3.736l1.607 1.723.09.083c1.4 1.51 2.842 2.988 4.31 4.437l1.19 1.157.236.219c1.244 1.21 2.52 2.395 3.816 3.56 14.01 12.63 30.592 22.508 41.49 50.691 6.588 18.385 5.584 36.518 2.833 46.02l-.076.263.023-.004c2.657-8.49 4.073-17.454 4.073-26.748 0-6.63-.652-13.107-1.898-19.358-4.39-21.422-21.862-40.379-38.96-57.308a.083.083 0 0 1-.015-.025l-.003-.005-.003-.008c-2.33-2.397-3.413-5.816-3.413-9.67 0-4.19 1.281-8.882 3.413-13.322 8.86-18.448 36.98-49.685 38.804-78.724 1.126-18.086-3.268-36.375-7.21-53.05l-.054-.225-.053-.227-.004-.018z" fill="#01EC64"/>
                    <path d="M128.593.159l-.206-.16c-2.322 2.925-8.84 25.9-28.936 55.093-53.448 77.63-44.36 130.376-12.584 168.384l.147.174c1.076 1.263 2.199 2.513 3.347 3.736l1.607 1.723.09.083c1.4 1.51 2.842 2.988 4.31 4.437l1.19 1.157.236.219c1.244 1.21 2.52 2.395 3.816 3.56 14.01 12.63 30.592 22.508 41.49 50.691 1.12 3.128 2.058 6.283 2.833 9.458l.076-.263c2.751-9.502 3.755-27.635-2.833-46.02-10.898-28.183-27.48-38.061-41.49-50.691a179.537 179.537 0 0 1-3.816-3.56l-.236-.219-1.19-1.157a181.106 181.106 0 0 1-4.31-4.437l-.09-.083-1.607-1.723a182.04 182.04 0 0 1-3.347-3.736l-.147-.174c-31.776-38.008-40.864-90.754 12.584-168.384C119.751 20.07 126.27-2.904 128.593.16z" fill="#00684A"/>
                    <path d="M135.679 349.797c-.084-3.108-.778-5.05-1.3-7.228l-.013-.047c-3.255-14.848-9.169-28.588-18.054-40.227-.617-.809-1.26-1.6-1.923-2.374l-.003-.005-.003-.008c-2.33-2.397-3.413-5.816-3.413-9.67 0-.478.014-.963.042-1.452.35 9.238 6.754 14.276 11.493 21.045 8.09 11.178 12.675 24.083 13.174 38.966v1z" fill="#00ED64"/>
                  </svg>
                  <span className="text-[9px] font-extrabold text-black text-center">MongoDB</span>
                </div>

                {/* AWS — Official AWS Logo */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm hover:shadow transition-shadow">
                  <svg viewBox="0 0 256 153" className="w-9 h-7" preserveAspectRatio="xMidYMid">
                    <path d="M72.392 55.438c0 3.137.34 5.68.933 7.545a45.373 45.373 0 0 0 2.712 6.103c.424.678.593 1.356.593 1.95 0 .847-.508 1.695-1.61 2.543l-5.34 3.56c-.763.508-1.526.762-2.203.762-.847 0-1.695-.424-2.543-1.186a26.224 26.224 0 0 1-3.051-3.984c-.848-1.44-1.695-3.052-2.628-5.001-6.612 7.798-14.92 11.698-24.922 11.698-7.12 0-12.8-2.035-16.954-6.103-4.153-4.07-6.272-9.497-6.272-16.276 0-7.205 2.543-13.054 7.714-17.462 5.17-4.407 12.037-6.612 20.768-6.612 2.882 0 5.849.254 8.985.678 3.137.424 6.358 1.102 9.749 1.78V29.93c0-6.442-1.356-10.935-3.984-13.562-2.712-2.628-7.29-3.9-13.816-3.9-2.967 0-6.018.34-9.155 1.102-3.136.763-6.188 1.78-9.155 2.967-1.356.593-2.373.933-2.967 1.102-.593.17-1.017.254-1.356.254-1.186 0-1.78-.848-1.78-2.628V11.78c0-1.356.17-2.373.593-2.967.424-.593 1.186-1.186 2.374-1.78 2.966-1.525 6.527-2.796 10.68-3.814C36.052 2.202 40.375 1.693 44.868 1.693c10.087 0 17.462 2.288 22.21 6.866 4.661 4.577 7.036 11.528 7.036 20.853v27.464l.278.562zM36.561 66.627c2.796 0 5.68-.508 8.73-1.526 3.052-1.017 5.764-2.882 8.054-5.425 1.356-1.61 2.373-3.39 2.882-5.425.508-2.034.847-4.492.847-7.375v-3.56a70.791 70.791 0 0 0-7.799-1.356 63.874 63.874 0 0 0-7.968-.508c-5.68 0-9.834 1.102-12.63 3.39-2.797 2.289-4.154 5.51-4.154 9.749 0 3.984 1.018 6.95 3.137 8.985 2.034 2.12 5.001 3.051 8.9 3.051zM104.107 76.423c-1.525 0-2.543-.254-3.221-.848-.678-.508-1.271-1.695-1.78-3.305L80.614 7.373c-.508-1.695-.763-2.797-.763-3.39 0-1.356.678-2.12 2.034-2.12h8.307c1.61 0 2.713.254 3.306.848.678.508 1.186 1.695 1.695 3.305l13.054 51.44 12.12-51.44c.424-1.695.933-2.797 1.61-3.305.679-.508 1.866-.848 3.392-.848h6.781c1.61 0 2.713.254 3.39.848.679.508 1.272 1.695 1.611 3.305l12.29 52.049 13.477-52.049c.508-1.695 1.102-2.797 1.695-3.305.678-.508 1.78-.848 3.306-.848h7.884c1.356 0 2.12.678 2.12 2.12 0 .424-.085.848-.17 1.356-.085.508-.254 1.186-.593 2.12L157.413 72.27c-.508 1.695-1.102 2.797-1.78 3.305-.678.508-1.78.848-3.221.848h-7.29c-1.61 0-2.712-.254-3.39-.848-.678-.593-1.271-1.695-1.611-3.39l-12.035-50.084-11.95 49.998c-.424 1.78-.933 2.882-1.611 3.39-.678.594-1.865.934-3.39.934h-7.528zM221.174 78.136c-4.407 0-8.815-.508-13.054-1.526-4.238-1.017-7.544-2.12-9.748-3.39-1.356-.763-2.289-1.61-2.628-2.374-.339-.762-.508-1.61-.508-2.373v-4.238c0-1.78.678-2.628 1.95-2.628a4.8 4.8 0 0 1 1.526.254c.508.17 1.271.508 2.12.848 2.881 1.271 6.018 2.289 9.324 2.966a43.43 43.43 0 0 0 9.494 1.102c5.001 0 8.9-.848 11.612-2.628 2.713-1.78 4.153-4.323 4.153-7.545 0-2.204-.678-4.069-2.034-5.595-1.356-1.525-3.899-2.881-7.545-4.153l-10.85-3.39c-5.425-1.695-9.494-4.238-12.036-7.629-2.543-3.305-3.899-7.035-3.899-10.935 0-3.137.678-5.934 2.035-8.392 1.356-2.458 3.136-4.577 5.425-6.272 2.288-1.78 4.915-3.051 8.054-3.984 3.136-.933 6.442-1.356 9.918-1.356 1.78 0 3.645.085 5.425.339a37.316 37.316 0 0 1 5.086.933c1.61.424 3.052.848 4.407 1.356 1.356.508 2.374 1.017 3.052 1.525.933.593 1.61 1.186 1.95 1.865.339.593.508 1.44.508 2.543v3.899c0 1.78-.678 2.713-1.95 2.713-.678 0-1.78-.339-3.221-.933-4.831-2.204-10.256-3.306-16.276-3.306-4.577 0-8.137.678-10.595 2.12-2.458 1.44-3.73 3.645-3.73 6.697 0 2.204.763 4.069 2.289 5.595 1.525 1.525 4.322 3.051 8.307 4.407l10.595 3.39c5.34 1.695 9.24 4.069 11.528 7.12 2.288 3.051 3.39 6.527 3.39 10.341 0 3.221-.678 6.188-1.95 8.815-1.356 2.628-3.136 4.916-5.51 6.781-2.373 1.95-5.255 3.39-8.561 4.407-3.475 1.102-7.12 1.61-11.104 1.61z" fill="#252F3E"/>
                    <path d="M230.993 120.964c-27.888 20.599-68.408 31.534-103.247 31.534-48.827 0-92.821-18.056-126.05-48.064-2.628-2.373-.254-5.595 2.882-3.73 35.942 20.854 80.276 33.484 126.136 33.484 30.94 0 64.932-6.442 96.212-19.666 4.662-2.12 8.646 3.052 4.067 6.442z" fill="#FF9900"/>
                    <path d="M242.606 107.655c-3.56-4.577-23.566-2.204-32.633-1.102-2.712.34-3.136-2.034-.678-3.814 15.936-11.189 42.13-7.968 45.181-4.238 3.052 3.814-.848 30.008-15.767 42.554-2.288 1.95-4.492.933-3.475-1.61 3.39-8.392 10.935-27.296 7.372-31.79z" fill="#FF9900"/>
                  </svg>
                  <span className="text-[9px] font-extrabold text-black text-center">AWS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
