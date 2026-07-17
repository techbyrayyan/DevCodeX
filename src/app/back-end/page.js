import Image from "next/image";
import Link from "next/link";

export default function BackEndPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start z-10">
            {/* Top Label */}
            <div className="mb-4">
              <span className="text-sm font-bold text-[#0b51c3] tracking-wider uppercase">BACKEND DEVELOPMENT</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-extrabold text-[#0B1B3D] leading-[1.15] tracking-tight mb-6">
              What is <br />
              <span className="text-[#0b51c3]">Backend</span> Development?
            </h1>

            {/* Paragraph */}
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Backend development is the server-side of web development that works behind the scenes to power your website or application. It handles databases, server logic, APIs and ensures everything runs smoothly.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/services"
                className="flex items-center justify-center gap-2 bg-[#0b51c3] hover:bg-blue-800 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-200/50"
              >
                Our Services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center justify-center gap-2 bg-white text-[#0b51c3] border-2 border-[#0b51c3] hover:bg-blue-50 px-8 py-3.5 rounded-lg font-semibold transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px] flex justify-center items-center z-10">
            <div className="relative w-full h-full">
              <Image
                src="/img34.png"
                alt="Backend Development"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </main>

      {/* How Backend Works Section */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              How <span className="text-[#0b51c3]">Backend</span> Works?
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Dashed Line (Hidden on small screens) */}
            <div className="hidden lg:block absolute top-[88px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#0b51c3]/30 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
              
              {/* Step 1 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300">
                <div className="h-20 w-full flex items-center justify-center text-[#0b51c3] mb-4">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm8 2a3 3 0 110 6 3 3 0 010-6zm0 2a1 1 0 100 2 1 1 0 000-2zm-4 7c0-2.21 1.79-4 4-4s4 1.79 4 4v1H8v-1z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-[15px] mb-3">1. User Request</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  The user makes a request from the browser or app.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300">
                <div className="h-20 w-full flex items-center justify-center text-[#0b51c3] mb-4">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v4H4V6zm2 2h2v-1H6v1zm-2 5h16v4H4v-4zm2 2h2v-1H6v1zm-2 5h16v4H4v-4zm2 2h2v-1H6v1z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-[15px] mb-3">2. Server Processing</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  The backend server processes the request using business logic.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300">
                <div className="h-20 w-full flex items-center justify-center text-[#0b51c3] mb-4">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 4.02 2 6.5S6.48 11 12 11s10-2.02 10-4.5S17.52 2 12 2zm0 7c-4.41 0-8-1.57-8-3.5S7.59 2 12 2s8 1.57 8 3.5S16.41 9 12 9zM2 11.5v3c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-3c0 2.48-4.48 4.5-10 4.5S2 13.98 2 11.5zM2 17v3c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-3c0 2.48-4.48 4.5-10 4.5S2 19.48 2 17z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-[15px] mb-3">3. Database Interaction</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  The server interacts with the database to store or fetch data.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300">
                <div className="h-20 w-full flex items-center justify-center text-[#0b51c3] mb-4">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm5.5 3l1.41 1.41L8.33 12l2.58 2.59L9.5 16l-4-4 4-4zm5 0l4 4-4 4-1.41-1.41L15.67 12l-2.58-2.59L14.5 7z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-[15px] mb-3">4. API Response</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  The backend sends the appropriate response via APIs.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300">
                <div className="h-20 w-full flex items-center justify-center text-[#0b51c3] mb-4">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm6.29 8.29L8 12l-1.41 1.41L10.29 17l7-7-1.41-1.41-5.59 5.7z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#0B1B3D] text-[15px] mb-3">5. Data to User</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  The response is displayed to the user on the frontend.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* What Does Backend Do Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <div className="flex flex-col items-start">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] mb-3 leading-tight tracking-tight">
                What Does <span className="text-[#0b51c3]">Backend</span> Do?
              </h2>
              <div className="w-12 h-1 bg-[#0b51c3] rounded-full mb-8"></div>

              <ul className="space-y-4">
                {[
                  "Handles server logic and business rules",
                  "Manages databases and data operations",
                  "Authenticates users and manages security",
                  "Builds and manages APIs",
                  "Ensures fast performance and scalability",
                  "Handles files, email, notifications and more"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 font-medium text-[15px]">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0b51c3] flex items-center justify-center text-white mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div className="relative w-full h-[320px]">
              <Image
                src="/img35.png"
                alt="What Does Backend Do"
                fill
                className="object-contain"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Technologies Used Section */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              <span className="text-[#0b51c3]">Technologies</span> Used
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            
            {/* Node.js */}
            <div className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-12 h-12 mb-3" />
              <p className="text-gray-700 text-xs font-semibold">Node.js</p>
            </div>

            {/* Express.js */}
            <div className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" className="w-12 h-12 mb-3" />
              <p className="text-gray-700 text-xs font-semibold">Express.js</p>
            </div>

            {/* MongoDB */}
            <div className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-12 h-12 mb-3" />
              <p className="text-gray-700 text-xs font-semibold">MongoDB</p>
            </div>

            {/* MySQL */}
            <div className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="w-12 h-12 mb-3" />
              <p className="text-gray-700 text-xs font-semibold">MySQL</p>
            </div>

            {/* PostgreSQL */}
            <div className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-12 h-12 mb-3" />
              <p className="text-gray-700 text-xs font-semibold">PostgreSQL</p>
            </div>

            {/* Firebase */}
            <div className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="w-12 h-12 mb-3" />
              <p className="text-gray-700 text-xs font-semibold">Firebase</p>
            </div>

            {/* JWT */}
            <div className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" alt="JWT" className="w-12 h-12 mb-3 opacity-0" />
              <div className="w-12 h-12 mb-3 -mt-[60px] flex items-center justify-center">
                <img src="https://jwt.io/img/pic_logo.svg" alt="JWT" className="w-12 h-12" />
              </div>
              <p className="text-gray-700 text-xs font-semibold">JWT</p>
            </div>

            {/* Redis */}
            <div className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" className="w-12 h-12 mb-3" />
              <p className="text-gray-700 text-xs font-semibold">Redis</p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Backend is Important Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Image */}
            <div className="relative w-full h-[320px]">
              <Image
                src="/img36.png"
                alt="Why Backend is Important"
                fill
                className="object-contain"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight leading-tight">
                Why <span className="text-[#0b51c3]">Backend</span> is Important?
              </h2>
              <p className="text-gray-500 text-base mb-10 leading-relaxed">
                A strong backend ensures your application is secure, fast, reliable and scalable. It enables complex operations to happen seamlessly in the background without affecting the user experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Card 1 - Security */}
                <div className="bg-[#F0F5FF] rounded-2xl p-6 flex flex-col items-start hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#0b51c3] flex items-center justify-center text-white mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#0B1B3D] text-base mb-2">Security</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Protects user data and prevents unauthorized access to your system.</p>
                </div>

                {/* Card 2 - Performance */}
                <div className="bg-[#F0F5FF] rounded-2xl p-6 flex flex-col items-start hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#0b51c3] flex items-center justify-center text-white mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#0B1B3D] text-base mb-2">Performance</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Optimizes queries and caching so your app runs fast even under heavy load.</p>
                </div>

                {/* Card 3 - Scalability */}
                <div className="bg-[#F0F5FF] rounded-2xl p-6 flex flex-col items-start hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#0b51c3] flex items-center justify-center text-white mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#0B1B3D] text-base mb-2">Scalability</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Easily handles growing traffic without compromising performance or reliability.</p>
                </div>

                {/* Card 4 - Reliability */}
                <div className="bg-[#F0F5FF] rounded-2xl p-6 flex flex-col items-start hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#0b51c3] flex items-center justify-center text-white mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#0B1B3D] text-base mb-2">Reliability</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Ensures consistent uptime and error-free operations across all user requests.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-[#0b51c3] rounded-2xl px-10 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">
              Ready to Build a Powerful Backend?
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8 md:mb-0">
              We build secure, scalable and high-performance backends that power your ideas and drive your business forward.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0b51c3] font-bold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors text-base"
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
              View Our Work
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
