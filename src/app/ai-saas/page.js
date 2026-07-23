import Image from "next/image";
import Link from "next/link";

export default function AISaaSPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-12 relative">
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

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-blue-100 bg-[#F5F9FF]/40 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
            {/* Background glowing effect */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/10 rounded-full blur-2xl -z-10"></div>
            
            {/* Heading */}
            <div className="text-center mb-10 flex flex-col items-center">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0B1B3D] tracking-tight">
                Benefits of <span className="text-[#0b51c3] relative inline-block">AI SaaS<span className="absolute bottom-[2px] left-0 right-0 h-[2px] bg-[#0b51c3]/80 rounded-full"></span></span> for Your Business
              </h2>
            </div>

            {/* Custom Responsive Grid styling (failsafe for Next.js tailwind compilation caching) */}
            <style dangerouslySetInnerHTML={{__html: `
              .benefits-grid-custom {
                display: grid;
                grid-template-columns: repeat(1, minmax(0, 1fr));
                gap: 2rem;
              }
              @media (min-width: 768px) {
                .benefits-grid-custom {
                  grid-template-columns: repeat(5, minmax(0, 1fr));
                  gap: 1.5rem;
                }
              }
            `}} />

            {/* Grid of 5 Cards */}
            <div className="benefits-grid-custom relative z-10">
              
              {/* Card 1 */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/50 flex items-center justify-center text-[#0b51c3] flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M6 12a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v6c0 1.5-1.5 3-3 3h-6c-1.5 0-3-1.5-3-3v-6Z" />
                    <path d="M12 6V3m0 3a3 3 0 0 0-3-3m3 3a3 3 0 0 1 3-3" />
                    <path d="M12 11c-1 0-1.5.5-1.5 1s.5 1 1.5 1 1.5.5 1.5 1-.5 1-1.5 1m0-5V10m0 6v1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0B1B3D] text-[15px] mb-1 leading-snug">Cost Efficient</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Reduce operational costs by automating repetitive tasks.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/50 flex items-center justify-center text-[#0b51c3] flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
                    <path d="M12 9c2-2 5-2 5-2s0 3-2 5" />
                    <path d="M9 15l-3-3m6 6l-3-3" />
                    <path d="M18.8 4.2a12.8 12.8 0 0 0-4.6 4.6l-5.6 5.6a1 1 0 0 0-.2.3l-1.9 4.8c-.3.8.4 1.5 1.2 1.2l4.8-1.9a1 1 0 0 0 .3-.2l5.6-5.6a12.8 12.8 0 0 0 4.6-4.6c.4-.7.4-1.6-.2-2.2-.6-.6-1.5-.6-2.2-.2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0B1B3D] text-[15px] mb-1 leading-snug">Scalable Growth</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Easily scale your product as your user base grows.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/50 flex items-center justify-center text-[#0b51c3] flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M22 2l-7.5 7.5M22 2v6M22 2h-6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0B1B3D] text-[15px] mb-1 leading-snug">Better Decisions</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Use AI insights to make smarter and faster decisions.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/50 flex items-center justify-center text-[#0b51c3] flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0B1B3D] text-[15px] mb-1 leading-snug">Global Reach</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Cloud-based access allows you to reach users everywhere.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/50 flex items-center justify-center text-[#0b51c3] flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a6 6 0 0 1 6 6v1H6V8a6 6 0 0 1 6-6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0B1B3D] text-[15px] mb-1 leading-snug">Competitive Advantage</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Stay ahead with intelligent features and automation.
                  </p>
                </div>
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
 