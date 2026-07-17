import Image from "next/image";
import Link from "next/link";

export default function WordPressPage() {
  return (
    <div className="min-h-screen bg-[#F4F9FF] font-sans overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full bg-blue-50/60 blur-3xl"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start z-10">
            {/* Top Label */}
            <div className="mb-4">
              <span className="text-xs font-bold text-[#1456c6] tracking-widest uppercase">WORDPRESS</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl  font-extrabold text-[#0B1B3D] leading-[1.2] tracking-tight mb-6">
              What is <span className="text-[#1456c6]">WordPress?</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              WordPress is the world&apos;s most popular website building platform. It is open-source, powerful, flexible, and easy to use — perfect for businesses, blogs, portfolios, and online stores.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="#" className="flex items-center justify-center gap-2 bg-[#1456c6] hover:bg-blue-700 text-white px-8 py-3.5 rounded-md font-semibold transition-colors shadow-lg shadow-blue-200/50">
                Explore WordPress
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link href="/portfolio" className="flex items-center justify-center gap-2 bg-transparent text-[#1456c6] border-2 border-[#aec6eb] hover:bg-blue-50 px-8 py-3.5 rounded-md font-semibold transition-colors">
                View Our Work
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px]  flex justify-center items-center z-10">
            <div className="relative w-full h-full">
              <Image
                src="/img30.png"
                alt="WordPress Platform"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </main>

      {/* Overview Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-[#1456c6] tracking-wider uppercase mb-3 block">OVERVIEW</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] mb-6 tracking-tight">
            WordPress in <span className="text-[#1456c6]">Simple Words</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            WordPress is a content management system (CMS) that helps you create, manage, and grow websites without needing advanced coding skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-300 hover:border-[#1456c6] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 mb-6 flex items-center justify-center text-[#1456c6]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0B1B3D] mb-4">Easy to Use</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              User-friendly dashboard makes it easy for anyone to build and manage websites.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-300 hover:border-[#1456c6] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 mb-6 flex items-center justify-center text-[#1456c6]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0B1B3D] mb-4">Highly Customizable</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Thousands of themes and plugins to design and extend your website exactly how you want.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-300 hover:border-[#1456c6] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 mb-6 flex items-center justify-center text-[#1456c6]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0B1B3D] mb-4">For Everyone</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Perfect for businesses, bloggers, developers, marketers, and online stores.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-300 hover:border-[#1456c6] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 mb-6 flex items-center justify-center text-[#1456c6]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0B1B3D] mb-4">Reliable & Secure</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Regular updates and a strong community keep your website safe and up-to-date.
            </p>
          </div>
        </div>
      </section>

      {/* Why WordPress Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Image */}
          <div className="relative w-full h-[400px] flex justify-center items-center">
            <div className="relative w-full h-full">
              <Image
                src="/img29.png"
                alt="Why WordPress"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start">
            <span className="text-sm font-bold text-[#1456c6] tracking-wider uppercase mb-4 block">WHY WORDPRESS?</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] mb-8 tracking-tight leading-[1.2]">
              Why <span className="text-[#1456c6]">WordPress</span> is<br/>So Popular?
            </h2>

            <ul className="space-y-5">
              {[
                "Powers more than 43% of all websites on the internet.",
                "Open-source and completely free to use.",
                "SEO-friendly and helps your site rank higher.",
                "Responsive designs that look great on all devices.",
                "Huge community support and resources."
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-gray-700 font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1456c6] flex items-center justify-center text-white mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* What Can You Build Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-[#1456c6] tracking-wider uppercase mb-3 block">HOW WORDPRESS WORKS</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] tracking-tight">
            What Can You Build with <span className="text-[#1456c6]">WordPress?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 text-center">
          {/* Item 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#1456c6] mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1456c6] mb-3">Business Websites</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create professional business websites.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#1456c6] mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1456c6] mb-3">Blogs & News Sites</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Share your ideas and grow your audience.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#1456c6] mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1456c6] mb-3">E-Commerce Stores</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Build online stores with WooCommerce plugin.
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#1456c6] mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1456c6] mb-3">Portfolios</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Showcase your work beautifully.
            </p>
          </div>

          {/* Item 5 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#1456c6] mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1456c6] mb-3">Membership Sites</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create communities and membership platforms.
            </p>
          </div>

          {/* Item 6 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#1456c6] mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1456c6] mb-3">Landing Pages</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              High-converting landing pages for your campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-[#1456c6] rounded-2xl px-12 py-16 flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Ready to Build with WordPress?
          </h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            We create fast, secure, and stunning WordPress websites that help your business grow online.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#1456c6] font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg"
          >
            Let&apos;s Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
