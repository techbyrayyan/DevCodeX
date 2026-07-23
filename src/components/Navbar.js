'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQs' },
    { href: '/contact', label: 'Contact' },
    { href: '/tools', label: 'Free AI Tools' },
  ];

  return (
    <nav 
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-gray-100 font-sans w-full shadow-sm"
      style={{ backgroundColor: 'white' }}
    >
      {/* Logo Section */}
      <div className="flex-1 flex items-center justify-start shrink-0 h-16">
        <Link href="/">
          <Image
            src="/real1.png"
            alt="DevCodeX Logo"
            width={240}
            height={80}
            style={{ height: '90px', width: 'auto' }}
            className="object-contain object-left max-w-full"
            priority
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center justify-center gap-8">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {label}
              {isActive && (
                <span className="absolute left-0 -bottom-1.5 w-full h-0.5 bg-blue-600 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="hidden lg:flex flex-1 justify-end">
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
