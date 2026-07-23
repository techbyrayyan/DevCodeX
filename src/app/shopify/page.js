import Image from "next/image";
import Link from "next/link";

export default function ShopifyPage() {
  return (
    <div className="min-h-screen bg-[#dbe9fd] font-sans overflow-hidden relative">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start z-10">
            {/* Top Label */}
            <div className="mb-4">
              <span className="text-xs font-bold text-[#0b51c3] tracking-widest uppercase">SHOPIFY</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-extrabold text-[#0B1B3D] leading-[1.15] tracking-tight mb-6">
              The E-commerce <br /> Platform Made for{" "}
              <span className="text-[#0b51c3]">Growth</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              Shopify helps you build your brand, sell online, and grow your business — from anywhere in the world.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-[#1456c6] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200/50"
              >
                Start Free Trial
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center justify-center gap-2 bg-white text-[#1456c6] border-2 border-[#aec6eb] hover:bg-blue-50 px-8 py-3.5 rounded-xl font-semibold transition-colors"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#95BF47]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#95BF47]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Easy setup
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#95BF47]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[350px] flex justify-center items-center">
            <div className="relative w-full h-full">
              <Image
                src="/img31.png"
                alt="Shopify Platform"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </main>

      {/* All-in-One Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#0b51c3] tracking-widest uppercase mb-3 block">ALL-IN-ONE ECOMMERCE</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
              Everything You Need to Succeed Online
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Shopify gives you all the tools to start, run, and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 text-center">
            {/* Item 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#0b51c3] mb-5 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#0B1B3D] mb-2">Beautiful Store</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Create a stunning online store with customizable themes — no coding needed.</p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#0b51c3] mb-5 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#0B1B3D] mb-2">Sell Everywhere</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Sell on your website, social media, online marketplaces, and in-person.</p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#0b51c3] mb-5 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#0B1B3D] mb-2">Secure & Reliable</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Enterprise-level security and 99.99% uptime to keep your store running.</p>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#0b51c3] mb-5 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#0B1B3D] mb-2">Powerful Marketing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Built-in marketing tools to help you attract, convert, and retain customers.</p>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#0b51c3] mb-5 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#0B1B3D] mb-2">Manage Everything</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Manage products, inventory, orders, and customers in one place.</p>
            </div>

            {/* Item 6 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F4F9FF] border border-[#d6e5fa] flex items-center justify-center text-[#0b51c3] mb-5 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#0B1B3D] mb-2">Scale Your Business</h3>
              <p className="text-gray-500 text-sm leading-relaxed">From your first sale to global expansion, Shopify grows with you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">

            {/* Stat 1 */}
            <div className="flex items-center gap-5 py-6 sm:py-0 sm:px-8 first:px-0">
              <div className="flex-shrink-0 w-14 h-14 bg-[#EEF3FF] rounded-2xl flex items-center justify-center text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#0b51c3]">4.4M+</div>
                <div className="text-sm font-bold text-[#0B1B3D] mt-0.5">Businesses Worldwide</div>
                <div className="text-xs text-gray-500 mt-1">Trust Shopify to power their online business</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-5 py-6 sm:py-0 sm:px-8">
              <div className="flex-shrink-0 w-14 h-14 bg-[#EEF3FF] rounded-2xl flex items-center justify-center text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#0b51c3]">$496B+</div>
                <div className="text-sm font-bold text-[#0B1B3D] mt-0.5">Sold on Shopify</div>
                <div className="text-xs text-gray-500 mt-1">Total sales generated by merchants using Shopify</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-5 py-6 sm:py-0 sm:px-8">
              <div className="flex-shrink-0 w-14 h-14 bg-[#EEF3FF] rounded-2xl flex items-center justify-center text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#0b51c3]">175+</div>
                <div className="text-sm font-bold text-[#0B1B3D] mt-0.5">Countries</div>
                <div className="text-xs text-gray-500 mt-1">Shopify is used by businesses in over 175 countries</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-5 py-6 sm:py-0 sm:px-8">
              <div className="flex-shrink-0 w-14 h-14 bg-[#EEF3FF] rounded-2xl flex items-center justify-center text-[#0b51c3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#0b51c3]">24/7</div>
                <div className="text-sm font-bold text-[#0B1B3D] mt-0.5">Support</div>
                <div className="text-xs text-gray-500 mt-1">Get help anytime from our expert support team</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-[#0b51c3] rounded-2xl px-12 py-16 flex flex-col items-center text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Start Your Business Journey Today
          </h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl leading-relaxed">
            Join millions of entrepreneurs who trust Shopify to build their dream business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0b51c3] font-bold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors text-base"
            >
              Start Free Trial
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white/50 hover:border-white font-bold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Explore Shopify
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-200 font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Try free for 3 days
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
