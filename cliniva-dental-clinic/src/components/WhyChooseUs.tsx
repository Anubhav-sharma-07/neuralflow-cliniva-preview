import React from 'react';
import { motion } from 'motion/react';
import { FEATURES_DATA } from '../data';
import { Cpu, Award, Tv, HeartHandshake, IndianRupee, Clock, CheckCircle } from 'lucide-react';

const featureIconMap: { [key: string]: React.ComponentType<any> } = {
  Cpu,
  Award,
  Tv,
  HeartHandshake,
  IndianRupee,
  Clock
};

export default function WhyChooseUs() {
  const highlights = [
    'WHO-compliant sterilization',
    'Modern painless dental systems',
    'Certified post-graduate doctors',
    'Zero-interest healthcare EMIs',
    'Same-day priority emergency relief',
    'Friendly non-judgmental approach'
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Narrative & Checklist */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full w-fit">
                Why Cliniva Dental
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Setting New Standards for Pain-Free Dentistry
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                We believe visiting the dentist should be an experience you look forward to. At Cliniva, we integrate luxury comforts with state-of-the-art micro-dentistry systems, making sure that your treatment is entirely gentle, transparent, and precise.
              </p>
            </div>

            {/* Micro checks list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Quick trust metrics */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-6 divide-x divide-slate-200">
              <div className="flex flex-col items-center justify-center flex-1">
                <span className="text-3xl font-extrabold text-blue-600 font-mono">12+</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-center mt-1">
                  Years Experience
                </span>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 pl-6">
                <span className="text-3xl font-extrabold text-teal-500 font-mono">100%</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-center mt-1">
                  WHO Sterilized
                </span>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 pl-6">
                <span className="text-3xl font-extrabold text-amber-500 font-mono">4.9★</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-center mt-1">
                  Google Verified
                </span>
              </div>
            </div>
          </div>

          {/* Right Block: Features Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES_DATA.map((feature, idx) => {
              const IconComponent = featureIconMap[feature.iconName] || Cpu;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-6 rounded-2xl bg-slate-50 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-teal-50/20 border border-slate-100 hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-600/5 transition-all group"
                >
                  <div className="p-3 bg-white text-blue-600 rounded-xl w-fit shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-4 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
