import React, { useState, useEffect } from 'react';
import { Menu, X, Stethoscope, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenBookingModal: () => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about-doctor' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Before & After', href: '#before-after' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topBanner = document.getElementById('top-banner');
      const offset = (topBanner?.offsetHeight || 0) + 70; // Header offset
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 top-0'
          : 'bg-white/90 backdrop-blur-sm py-4 top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-slate-900 tracking-tight">
                  CLINIVA
                </span>
                <span className="text-[9px] font-bold text-teal-600 uppercase tracking-[0.15em]">
                  Dental Clinic
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-slate-600 hover:text-blue-600 font-semibold text-[13px] tracking-wide transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="tel:+919810371228"
                className="text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <div className="p-1.5 bg-slate-100 rounded-full">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span>+91 98103 71228</span>
              </a>
              <button
                id="navbar-book-btn"
                onClick={onOpenBookingModal}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 transition-all duration-300 origin-top ${
          isOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <div className="border-t border-slate-100 pt-4 px-3 flex flex-col gap-4">
            <a
              href="tel:+919810371228"
              className="flex items-center gap-3 text-slate-700 font-semibold"
            >
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Tap to Call</span>
                <span className="text-sm">+91 98103 71228</span>
              </div>
            </a>
            <button
              id="mobile-navbar-book-btn"
              onClick={() => {
                setIsOpen(false);
                onOpenBookingModal();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-3.5 rounded-xl text-center shadow-lg shadow-blue-600/15 transition-all cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
