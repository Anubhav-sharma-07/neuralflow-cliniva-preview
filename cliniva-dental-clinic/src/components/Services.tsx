import React from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { Activity, Shield, Sparkles, Heart, Scissors, Smile, Check, ArrowRight } from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Activity,
  Shield,
  Sparkles,
  Heart,
  Scissors,
  Smile,
};

interface ServicesProps {
  onOpenBookingModal: (preselectedTreatment?: string) => void;
}

export default function Services({ onOpenBookingModal }: ServicesProps) {
  return (
    <section id="treatments" className="py-24 bg-slate-50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit mx-auto">
            Our Advanced Specialties
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Dental Treatments Crafted for Comfort
          </h3>
          <p className="text-slate-600 text-base">
            Cliniva brings world-class digital dentistry and conservative medical wisdom to DLF Phase 2. Explore our comprehensive treatment menu below.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Activity;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
              >
                {/* Image Area with Zoom */}
                <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10"></div>
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating Icon Badges */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-md z-20 text-blue-600 border border-slate-100">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                      {service.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Bullets List */}
                    <ul className="space-y-2 mb-6">
                      {service.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Trigger on Card */}
                  <button
                    onClick={() => onOpenBookingModal(service.title)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
