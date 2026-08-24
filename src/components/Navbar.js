'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do NOT render main Navbar on /tools routes
  if (pathname?.startsWith('/tools')) return null;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    // { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQs' },
    { href: '/projects', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
    { href: '/tools', label: 'Get Free Tools' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: isScrolled ? 'rgba(5,5,5,0.95)' : 'rgba(5,5,5,0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid #27272a' : '1px solid transparent',
        padding: isScrolled ? '0.875rem 0' : '1.25rem 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo4.png"
            alt="DevCodeX Logo"
            width={145}
            height={40}
            priority
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-white relative py-1"
                style={{ color: isActive ? '#ffffff' : '#a1a1aa', fontWeight: isActive ? '600' : '500' }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn-interactive hidden sm:inline-flex items-center gap-2 font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full cursor-pointer"
            style={{ backgroundColor: '#ffffff', color: '#000000' }}
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn-interactive lg:hidden p-2.5 rounded-lg focus:outline-none cursor-pointer"
            style={{ backgroundColor: '#121212', border: '1px solid #27272a', color: '#a1a1aa' }}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-[65px] p-6 shadow-2xl flex flex-col gap-3 backdrop-blur-2xl animate-in fade-in duration-200"
          style={{ backgroundColor: 'rgba(18, 18, 18, 0.95)', borderBottom: '1px solid #27272a' }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm sm:text-base font-medium py-2.5 px-4 rounded-xl transition-all"
                style={{
                  color: isActive ? '#ffffff' : '#a1a1aa',
                  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                  fontWeight: isActive ? '600' : '500'
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-1" style={{ borderTop: '1px solid #27272a' }}>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-interactive w-full py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
