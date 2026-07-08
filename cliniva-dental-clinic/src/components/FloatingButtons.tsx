import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface FloatingButtonsProps {
  onOpenBookingModal: () => void;
}

export default function FloatingButtons({ onOpenBookingModal }: FloatingButtonsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div id="floating-actions" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 items-end">
      
      {/* Tap-to-Call Sticky Button for quick phone dialing */}
      <a
        id="floating-call"
        href="tel:+919810371228"
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-blue-500/50 group"
        title="Call Cliniva Support"
      >
        <Phone className="w-5.5 h-5.5 group-hover:rotate-12 transition-transform" />
      </a>

      {/* Floating WhatsApp Action with badge */}
      <a
        id="floating-whatsapp"
        href="https://wa.me/919810371228?text=Hello%20Cliniva%20Dental%20Clinic,%20I'd%20like%20to%20know%20more%20about%20your%20treatments."
        target="_blank"
        rel="noreferrer"
        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-emerald-400 relative group"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -left-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.03 14.05 1.01 11.416 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.463 3.39 1.337 4.842l-.991 3.614 3.755-.97z" />
        </svg>
      </a>

    </div>
  );
}
