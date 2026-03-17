'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (pathname === '/') {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
        // Update URL without reload
        window.history.pushState({}, '', href);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الإقرار الضريبي', href: '/tax-filing' },
    { name: 'المدونة', href: '/blog' },
    { name: 'الأسعار', href: '/#pricing' },
    { name: 'من نحن', href: '/#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-navy font-tajawal font-bold text-2xl">
          <Shield className="w-8 h-8 text-gold" />
          <span>Go LLC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-dark-gray font-medium hover:text-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/#pricing"
            onClick={(e) => handleNavClick(e, '/#pricing')}
            className="hidden md:inline-flex bg-gold text-navy font-bold px-8 py-3 rounded-lg shadow-[0_4px_14px_rgba(244,196,48,0.4)] hover:bg-[#FFD700] hover:-translate-y-0.5 transition-all"
          >
            ابدأ الآن - 39$
          </Link>
          <button
            className="md:hidden text-navy p-2 -mr-2"
            aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-navy text-white shadow-xl border-t border-white/10">
          <nav className="flex flex-col p-5 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium py-3 px-2 border-b border-white/10 hover:text-gold transition-colors block"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#pricing"
              className="bg-gold text-navy font-bold px-6 py-4 rounded-lg text-center mt-4 block"
              onClick={(e) => handleNavClick(e, '/#pricing')}
            >
              ابدأ الآن - 39$
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
