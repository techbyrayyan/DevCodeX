'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import ServicesMegaDropdown from './ServicesMegaDropdown';
import { servicesMegaMenuCategories } from '@/data/servicesData';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 200);
  };

  const handleImmediateCloseServices = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsServicesDropdownOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services', hasDropdown: true },
    { href: '/projects', label: 'Portfolio' },
    { href: '/faq', label: 'FAQs' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">

        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group"
          onMouseEnter={handleImmediateCloseServices}
        >
          <Image
            src="/logo4.png"
            alt="DevCodeX Logo"
            width={145}
            height={40}
            priority
            className="h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.hasDropdown && pathname?.startsWith('/services'));
            
            if (link.hasDropdown) {
              return (
                <div
                  key={link.href}
                  className="relative py-1"
                  onMouseEnter={handleMouseEnterServices}
                  onMouseLeave={handleMouseLeaveServices}
                >
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white py-1 cursor-pointer"
                    style={{ color: isActive || isServicesDropdownOpen ? '#ffffff' : '#a1a1aa', fontWeight: isActive ? '600' : '500' }}
                  >
                    <span>{link.label}</span>
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isServicesDropdownOpen ? 'rotate-180 text-blue-400' : 'text-zinc-400'
                      }`} 
                    />
                  </Link>

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={handleImmediateCloseServices}
                className="text-sm font-medium transition-colors hover:text-white relative py-1"
                style={{ color: isActive ? '#ffffff' : '#a1a1aa', fontWeight: isActive ? '600' : '500' }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            onMouseEnter={handleImmediateCloseServices}
            className="btn-interactive btn-gradient-primary hidden sm:inline-flex items-center gap-2 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200"
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

      {/* Desktop Mega Dropdown */}
      <ServicesMegaDropdown 
        isOpen={isServicesDropdownOpen} 
        onClose={() => setIsServicesDropdownOpen(false)}
        onMouseEnter={handleMouseEnterServices}
        onMouseLeave={handleMouseLeaveServices}
      />

      {/* Mobile & Tablet Drawer */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-[65px] max-h-[85vh] overflow-y-auto p-6 shadow-2xl flex flex-col gap-3 backdrop-blur-2xl animate-in fade-in duration-200 custom-scrollbar"
          style={{ backgroundColor: 'rgba(18, 18, 18, 0.98)', borderBottom: '1px solid #27272a' }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.hasDropdown && pathname?.startsWith('/services'));

            if (link.hasDropdown) {
              return (
                <div key={link.href} className="space-y-2">
                  <div
                    className="flex items-center justify-between text-sm sm:text-base font-medium py-2.5 px-4 rounded-xl transition-all cursor-pointer"
                    style={{
                      color: isActive ? '#ffffff' : '#a1a1aa',
                      backgroundColor: isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                      border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                      fontWeight: isActive ? '600' : '500'
                    }}
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  >
                    <Link
                      href="/services"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className="p-1 text-zinc-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileServicesOpen(!isMobileServicesOpen);
                      }}
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180 text-blue-400' : ''}`} />
                    </button>
                  </div>

                  {/* Mobile Accordion for 4 categories */}
                  {isMobileServicesOpen && (
                    <div className="pl-3 pr-1 py-2 space-y-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      {servicesMegaMenuCategories.map((cat, cIdx) => (
                        <div key={cIdx} className="space-y-1.5">
                          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 px-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.dotColor }} />
                            {cat.category}
                          </p>
                          <div className="grid grid-cols-1 gap-1">
                            {cat.services.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xs text-zinc-300 hover:text-blue-300 py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors block"
                              >
                                <span className="font-medium">{s.title}</span>
                                <span className="text-[10px] block text-zinc-500 font-mono">{s.subtitle}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

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
              className="btn-interactive btn-gradient-primary w-full py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2"
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
