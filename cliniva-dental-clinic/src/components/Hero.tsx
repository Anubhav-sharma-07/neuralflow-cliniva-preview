import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Star, CheckCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBookingModal: () => void;
}

export default function Hero({ onOpenBookingModal }: HeroProps) {
  const doctorImageUrl = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600&h=800';

  const trustBadges = [
    { text: '4.9★ Google Rating' },
    { text: '474+ Happy Reviews' },
    { text: 'Advanced Dental Tech' },
    { text: 'Pain-Free Treatment' },
  ];

  return (
    <section id="home" className="pt-32 pb-20 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Badges */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Top Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-teal-50 text-teal-700 text-[11px] font-extrabold px-3.5 py-1.5 rounded-full w-fit self-start uppercase tracking-wider border border-teal-100/60"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                DLF Phase 2, Gurugram
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight"
              >
                Pain-Free <span className="text-blue-600">Dental Care</span> That Inspires Confidence.
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-xl"
              >
                Trusted by 470+ happy patients with a 4.9★ Google rating. Modern dentistry with advanced technology and compassionate care.
              </motion.p>
            </div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                id="hero-book-btn"
                onClick={onOpenBookingModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-xs uppercase tracking-wider"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                id="hero-whatsapp-btn"
                href="https://wa.me/919810371228?text=Hello%20Cliniva%20Dental%20Clinic,%20I'd%20like%20to%20schedule%20an%20appointment."
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-xs uppercase tracking-wider"
              >
                {/* SVG for WhatsApp Icon */}
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.03 14.05 1.01 11.416 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.463 3.39 1.337 4.842l-.991 3.614 3.755-.97z" />
                </svg>
                <span>WhatsApp Now</span>
              </a>
            </motion.div>

            {/* Grid of Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-slate-100"
            >
              <div className="grid grid-cols-2 gap-3">
                {trustBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[12px] font-semibold text-slate-600 bg-slate-100/70 p-2.5 rounded-lg border border-slate-200/50 hover:bg-white hover:border-blue-100 transition-all"
                  >
                    <span className="text-teal-500 font-extrabold text-sm">✓</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Image Layout */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual background decoration */}
            <div className="absolute w-72 h-72 bg-blue-200/40 rounded-full blur-3xl -top-12 -right-12 -z-10"></div>
            <div className="absolute w-72 h-72 bg-teal-100/40 rounded-full blur-3xl -bottom-12 -left-12 -z-10"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] w-full max-w-[360px]"
            >
              <img
                src={doctorImageUrl}
                alt="Dr. Rohit Sharma - Principal Dentist at Cliniva Dental Clinic"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Floating Google Rating Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-1.5 animate-bounce-slow">
                <div className="p-1 bg-amber-500 rounded-lg text-white">
                  <Star className="w-4.5 h-4.5 fill-current" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">4.9/5 Rating</span>
                  <span className="text-[9px] text-slate-500 font-medium">Google Verified</span>
                </div>
              </div>

              {/* Floating MD Stamp Card */}
              <div className="absolute bottom-4 right-4 bg-slate-950/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-800 text-white flex items-center gap-3">
                <div className="p-1.5 bg-blue-600 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-100">Dr. Rohit Sharma, MDS</span>
                  <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider">
                    Implants & Prosthodontist
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
