import Image from "next/image";
import Link from "next/link";

export default function AIAutomationPage() {
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
                SMARTER WORKFLOWS, BETTER RESULTS
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-extrabold text-[#0b51c3] leading-[1.1] tracking-tight mb-3">
              AI Automation
            </h1>
            <h2 className="text-4xl font-extrabold text-[#0B1B3D] leading-tight mb-6">
              Smart Work.<br />Zero Hassle.
            </h2>

            {/* Paragraph */}
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              AI Automation uses artificial intelligence to automate repetitive tasks, streamline workflows and improve efficiency across your business.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-[#0b51c3] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200/50"
              >
                Let&apos;s Automate Your Workflows
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
          <div className="relative w-full h-[420px] flex justify-center items-center z-10">
            <div className="relative w-full h-full">
              <Image
                src="/img37.png"
                alt="AI Automation"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </main>

      {/* What is & Why Use Section */}
      <section className="py-16 lg:py-24 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left Card — What is AI Automation */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row gap-6 items-start">
              {/* img38 */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src="/img38.png"
                  alt="What is AI Automation"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#0B1B3D] mb-2">
                  What is <span className="text-[#0b51c3]">AI Automation</span>?
                </h2>
                <div className="w-10 h-1 bg-[#0b51c3] rounded-full mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  AI Automation combines Artificial Intelligence with automation technologies to perform tasks that usually require human intelligence.
                  It learns, adapts and improves over time, helping businesses save time, reduce errors and increase productivity.
                </p>
              </div>
            </div>

            {/* Right Card — Why Use AI Automation */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl font-extrabold text-[#0B1B3D] mb-2">
                Why Use <span className="text-[#0b51c3]">AI Automation</span>?
              </h2>
              <div className="w-10 h-1 bg-[#0b51c3] rounded-full mb-6"></div>
              <ul className="space-y-4">
                {[
                  "Eliminate repetitive and time-consuming tasks",
                  "Improve accuracy and reduce human errors",
                  "Work 24/7 without downtime",
                  "Increase team productivity",
                  "Save costs and scale your business"
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

      {/* How AI Automation Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#0B1B3D] mb-3">
              How <span className="text-[#0b51c3]">AI Automation</span> Works
            </h2>
            <div className="w-16 h-1 bg-[#0b51c3] rounded-full mx-auto"></div>
          </div>

          {/* Steps Timeline/Workflow */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4 lg:gap-2">

            {/* Step 1 */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none bg-white border border-gray-100 rounded-2xl p-5 lg:p-4 xl:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_-5px_rgba(11,81,195,0.08)] transition-all duration-300 flex flex-col items-center text-center group">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-16 h-16 text-[#0b51c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" className="stroke-blue-100 fill-blue-50/10" strokeWidth="2" />
                  <circle cx="12" cy="12" r="6" className="stroke-[#0b51c3]/80" strokeWidth="2" />
                  <circle cx="12" cy="12" r="2" className="fill-[#0b51c3] stroke-[#0b51c3]" />
                  <path d="M12 1v4M12 19v4M1 12h4M19 12h4" strokeLinecap="round" className="stroke-[#0b51c3]" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1B3D] mb-2">1. Trigger</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                Automation starts when a trigger event occurs.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden lg:flex items-center justify-center text-[#0b51c3] mx-2 flex-shrink-0">
              <svg className="w-12 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 36 12">
                <line x1="4" y1="6" x2="10" y2="6" />
                <line x1="16" y1="6" x2="22" y2="6" />
                <path d="M28 2l4 4-4 4" />
              </svg>
            </div>
            <div className="flex lg:hidden items-center justify-center text-[#0b51c3] my-4 flex-shrink-0">
              <svg className="w-4 h-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 12 36">
                <line x1="6" y1="4" x2="6" y2="10" />
                <line x1="6" y1="16" x2="6" y2="22" />
                <path d="M2 28l4 4 4-4" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none bg-white border border-gray-100 rounded-2xl p-5 lg:p-4 xl:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_-5px_rgba(11,81,195,0.08)] transition-all duration-300 flex flex-col items-center text-center group">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-16 h-16 text-[#0b51c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2.5" className="stroke-[#0b51c3] fill-blue-50/10" strokeWidth="2.2" />
                  <path d="M9 6V3M15 6V3M9 21v-3M15 21v-3M6 9H3M6 15H3M21 9h-3M21 15h-3" strokeLinecap="round" className="stroke-[#0b51c3]/80" strokeWidth="2" />
                  <path d="M10 10h4v4h-4z" className="fill-[#0b51c3]/20 stroke-[#0b51c3]" strokeWidth="1.5" />
                  <text x="12" y="13.5" fontSize="5" fontWeight="bold" fill="currentColor" textAnchor="middle">AI</text>
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1B3D] mb-2">2. AI Process</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                AI analyzes the data and decides the best action.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden lg:flex items-center justify-center text-[#0b51c3] mx-2 flex-shrink-0">
              <svg className="w-12 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 36 12">
                <line x1="4" y1="6" x2="10" y2="6" />
                <line x1="16" y1="6" x2="22" y2="6" />
                <path d="M28 2l4 4-4 4" />
              </svg>
            </div>
            <div className="flex lg:hidden items-center justify-center text-[#0b51c3] my-4 flex-shrink-0">
              <svg className="w-4 h-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 12 36">
                <line x1="6" y1="4" x2="6" y2="10" />
                <line x1="6" y1="16" x2="6" y2="22" />
                <path d="M2 28l4 4 4-4" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none bg-white border border-gray-100 rounded-2xl p-5 lg:p-4 xl:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_-5px_rgba(11,81,195,0.08)] transition-all duration-300 flex flex-col items-center text-center group">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-16 h-16 text-[#0b51c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3.5" className="fill-blue-50/10 stroke-[#0b51c3]" strokeWidth="2" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" className="stroke-[#0b51c3] fill-blue-50/10" strokeWidth="2.2" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1B3D] mb-2">3. Action</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                The system performs the action automatically based on the logic.
              </p>
            </div>

            {/* Arrow 3 */}
            <div className="hidden lg:flex items-center justify-center text-[#0b51c3] mx-2 flex-shrink-0">
              <svg className="w-12 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 36 12">
                <line x1="4" y1="6" x2="10" y2="6" />
                <line x1="16" y1="6" x2="22" y2="6" />
                <path d="M28 2l4 4-4 4" />
              </svg>
            </div>
            <div className="flex lg:hidden items-center justify-center text-[#0b51c3] my-4 flex-shrink-0">
              <svg className="w-4 h-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 12 36">
                <line x1="6" y1="4" x2="6" y2="10" />
                <line x1="6" y1="16" x2="6" y2="22" />
                <path d="M2 28l4 4 4-4" />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none bg-white border border-gray-100 rounded-2xl p-5 lg:p-4 xl:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_-5px_rgba(11,81,195,0.08)] transition-all duration-300 flex flex-col items-center text-center group">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-16 h-16 text-[#0b51c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="6" rx="8" ry="3" className="fill-blue-50/20" strokeWidth="2" />
                  <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" strokeWidth="2" />
                  <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" strokeWidth="2" />
                  <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1B3D] mb-2">4. Data Update</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                Data is updated or saved to the connected systems.
              </p>
            </div>

            {/* Arrow 4 */}
            <div className="hidden lg:flex items-center justify-center text-[#0b51c3] mx-2 flex-shrink-0">
              <svg className="w-12 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 36 12">
                <line x1="4" y1="6" x2="10" y2="6" />
                <line x1="16" y1="6" x2="22" y2="6" />
                <path d="M28 2l4 4-4 4" />
              </svg>
            </div>
            <div className="flex lg:hidden items-center justify-center text-[#0b51c3] my-4 flex-shrink-0">
              <svg className="w-4 h-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 12 36">
                <line x1="6" y1="4" x2="6" y2="10" />
                <line x1="6" y1="16" x2="6" y2="22" />
                <path d="M2 28l4 4 4-4" />
              </svg>
            </div>

            {/* Step 5 */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none bg-white border border-gray-100 rounded-2xl p-5 lg:p-4 xl:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_-5px_rgba(11,81,195,0.08)] transition-all duration-300 flex flex-col items-center text-center group">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-16 h-16 text-[#0b51c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="3" className="fill-blue-50/10 stroke-blue-100" strokeWidth="2" />
                  <path d="M7 16v-3M12 16V8M17 16v-5" strokeLinecap="round" className="stroke-[#0b51c3]" strokeWidth="2.5" />
                  <path d="M5 16h14" strokeLinecap="round" className="stroke-gray-300" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#0B1B3D] mb-2">5. Result</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                You get the result and insights in real time.
              </p>
            </div>

          </div>
        </div>
      </section>











      {/* Common Use Cases + Key Benefits Section */}
      <section className="py-20 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left — Common Use Cases */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl font-extrabold text-[#0B1B3D] mb-2">Common Use Cases</h2>
              <div className="w-10 h-1 bg-[#0b51c3] rounded-full mb-6"></div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Use Case List */}
                <ul className="flex-1 space-y-5">
                  {[
                    {
                      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                      title: "Email & Marketing Automation",
                      desc: "Send smart emails, follow-ups and campaigns."
                    },
                    {
                      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                      title: "Data Entry & Processing",
                      desc: "Extract, process and organize data automatically."
                    },
                    {
                      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
                      title: "Customer Support Automation",
                      desc: "AI chatbots and smart ticket routing."
                    },
                    {
                      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
                      title: "Lead Generation & Qualification",
                      desc: "Find, score and nurture leads automatically."
                    },
                    {
                      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
                      title: "Report Generation",
                      desc: "Generate reports and insights without manual work."
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-[#0b51c3] mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0B1B3D] leading-tight">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* img39 */}
                <div className="relative w-60 h-72 flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src="/img39.png"
                    alt="AI Automation Use Cases"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right — Key Benefits */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl font-extrabold text-[#0B1B3D] mb-2">Key Benefits</h2>
              <div className="w-10 h-1 bg-[#0b51c3] rounded-full mb-6"></div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-8">
                {[
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                    title: "Save Time",
                    desc: "Automate tasks and focus on what really matters."
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><path d="M12 16h.01" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                        <path d="M9 12h6" strokeLinecap="round" />
                      </svg>
                    ),
                    title: "Reduce Costs",
                    desc: "Lower operational costs and improve resource usage."
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "Improve Accuracy",
                    desc: "AI ensures accuracy and reduces human error."
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    ),
                    title: "Scalable Growth",
                    desc: "Easily handle more work without more headcount."
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    ),
                    title: "Better Decisions",
                    desc: "Get real-time insights for faster and smarter decisions."
                  },
                  {
                    icon: (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "24/7 Operation",
                    desc: "Run your processes non-stop, every single day."
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full border-2 border-[#0b51c3]/20 bg-blue-50 flex items-center justify-center text-[#0b51c3]">
                      {item.icon}
                    </div>
                    <p className="text-sm font-extrabold text-[#0B1B3D] leading-tight">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0b51c3] rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left Text */}
            <div>
              <h2 className="text-xl font-extrabold text-white leading-tight mb-1">
                Ready to Automate Your Business?
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Let AI handle the repetitive work so you can focus on growth and success.
              </p>
            </div>
            {/* Right Button */}
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#0b51c3] font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Get Started Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>




      

    </div>
  );
}

