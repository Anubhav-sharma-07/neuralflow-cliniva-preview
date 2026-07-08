import { Stethoscope, MapPin, Phone, Mail, Clock, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-slate-950 text-white pt-20 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-600/30">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-100">Cliniva</span>
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest leading-none">
                  Dental Clinic
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              Bringing state-of-the-art dental care, digital guided implantology, and absolute sterilization hygiene to DLF Phase 2, Gurugram. Pain-free treatment with compassionate clinical excellence.
            </p>

            <div className="flex gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                ● Practice Active
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                ★ 4.9 Rating
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about-doctor" className="text-slate-400 hover:text-blue-400 transition-colors">About Dr. Sharma</a>
              </li>
              <li>
                <a href="#treatments" className="text-slate-400 hover:text-blue-400 transition-colors">Treatments</a>
              </li>
              <li>
                <a href="#reviews" className="text-slate-400 hover:text-blue-400 transition-colors">Patient Reviews</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact & Map</a>
              </li>
            </ul>
          </div>

          {/* Treatments Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Treatments</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#treatments" className="hover:text-blue-400 transition-colors">Root Canal Treatment</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-blue-400 transition-colors">Computer-Guided Implants</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-blue-400 transition-colors">Clear Aligners</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-blue-400 transition-colors">Smile Makeover & Veneers</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-blue-400 transition-colors">Wisdom Tooth Removal</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-blue-400 transition-colors">Kids Pediatric Care</a>
              </li>
            </ul>
          </div>

          {/* Direct contact info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect</h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>5, N-12 Road, DLF Phase 2, Sector 25, Gurugram</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="tel:+919810371228" className="hover:text-white transition-colors font-mono">
                  +91 98103 71228
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:info@clinivadental.com" className="hover:text-white transition-colors">
                  info@clinivadental.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 10:00 AM - 08:30 PM</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Sunday by Appointments Only</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Agency Note & Legal disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] leading-relaxed">
          <div className="max-w-2xl text-center md:text-left space-y-1.5">
            <p className="flex items-center justify-center md:justify-start gap-1 font-semibold text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Complimentary Digital Concept Prepared by Neural Flow</span>
            </p>
            <p>
              Disclaimer: This is a highly polished custom interactive homepage concept designed exclusively for Cliniva Dental Clinic. All registered brands, logos, patient numbers, doctor credentials, and visual photography used are part of this concept proposal to demonstrate production capabilities.
            </p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center cursor-pointer shrink-0"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Real copyright */}
        <div className="pt-6 border-t border-slate-900/50 mt-6 text-center text-slate-600 text-[10px] font-mono">
          © {currentYear} Cliniva Dental Clinic. Designed & Persisted by Neural Flow. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
