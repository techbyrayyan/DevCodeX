import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 font-sans w-full">
      {/* Logo Section */}
      <div className="flex items-center gap-3 cursor-pointer">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="DevCodeX Logo"
            width={160}
            height={60}
            className="object-contain h-12 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-8">
        <Link href="/" className="text-blue-600 font-semibold relative text-sm">
          Home
          <span className="absolute left-0 -bottom-1.5 w-full h-0.5 bg-blue-600 rounded-full"></span>
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">About</Link>
        <Link href="/services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Services</Link>
        <Link href="/portfolio" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Portfolio</Link>
        <Link href="/blog" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Blog</Link>
        <Link href="/faq" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">FAQs</Link>
        <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Contact</Link>
      </div>

      {/* Call to Action */}
      <div className="hidden lg:flex">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Book a free call
        </button>
      </div>
    </nav>
  );
}
