import { motion } from 'motion/react';
import { REVIEWS_DATA } from '../data';
import { Star, MessageSquare, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full w-fit">
              Patient Testimonials
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Verified Google Reviews from DLF Phase 2
            </h3>
            <p className="text-slate-600 text-base max-w-2xl">
              Patient trust is earned. Read genuine reviews from our patients who have experienced our pain-free clinical care, sterile facilities, and transparent patient communication.
            </p>
          </div>

          {/* Google Summary Card */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col items-center text-center shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.35 11.1H12v2.7h5.3c-.22 1.22-.91 2.26-1.95 2.96v2.46h3.15C20.35 17.5 21.5 14.56 21.35 11.1z" />
                <path fill="currentColor" d="M12 21c2.43 0 4.47-.8 5.96-2.18l-3.15-2.46c-.88.6-2 .95-3.31.95-2.55 0-4.71-1.72-5.48-4.04H2.76v2.54C4.24 19.12 7.89 21 12 21z" />
                <path fill="currentColor" d="M6.52 13.27a5.9 5.9 0 0 1 0-3.76V6.97H2.76a11.9 11.9 0 0 0 0 10.06l3.76-2.76z" />
                <path fill="currentColor" d="M12 5.95c1.32 0 2.5.45 3.44 1.35l2.58-2.58C16.46 3.12 14.43 2.5 12 2.5 7.89 2.5 4.24 4.38 2.76 7.62l3.76 2.76c.77-2.32 2.93-4.04 5.48-4.04z" />
              </svg>
              <span className="font-bold text-slate-800 text-sm">Google Reviews</span>
            </div>
            
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-black text-slate-900 font-mono">4.9</span>
              <span className="text-slate-400 text-lg">/ 5.0</span>
            </div>

            <div className="flex gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
              ))}
            </div>

            <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Based on 474+ organic reviews</span>
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review, index) => {
            // Pick a professional color for the avatar initial background
            const avatarColors = [
              'bg-blue-100 text-blue-800',
              'bg-teal-100 text-teal-800',
              'bg-emerald-100 text-emerald-800',
              'bg-amber-100 text-amber-800',
              'bg-purple-100 text-purple-800'
            ];
            const avatarColor = avatarColors[index % avatarColors.length];
            const initial = review.author.charAt(0);

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Review Header */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full ${avatarColor} flex items-center justify-center font-bold text-sm tracking-wide shadow-inner shrink-0`}>
                        {initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {review.author}
                          {index % 2 === 0 && (
                            <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.2 rounded font-mono uppercase tracking-wider shrink-0 border border-blue-200/40">
                              Local Guide
                            </span>
                          )}
                        </h4>
                        <span className="text-slate-400 text-[11px] font-mono">{review.date}</span>
                      </div>
                    </div>
                    {/* Google Icon Badge */}
                    <svg className="w-4 h-4 text-slate-300 shrink-0" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.745-.078-1.312-.176-1.876H12.24z" />
                    </svg>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 text-xs leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Treatment Stamp */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified: <strong className="text-slate-700">{review.treatment}</strong></span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
