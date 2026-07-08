import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS_DATA } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  return (
    <section id="faqs" className="py-24 bg-white scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit mx-auto">
            Frequently Asked Questions
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Curated Dental Knowledge & Advice
          </h3>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Have questions about dental implants, clear aligners, or pain-free treatments in DLF Phase 2? We have answered our patients’ most common queries below.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'bg-gradient-to-r from-blue-50/20 to-teal-50/10 border-blue-200/60 shadow-md'
                    : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex justify-between items-center gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className={`font-bold text-sm sm:text-base ${isOpen ? 'text-blue-900' : 'text-slate-800'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1 rounded-full transition-transform duration-200 ${isOpen ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-white text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed pl-14 pr-8 border-t border-dashed border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
