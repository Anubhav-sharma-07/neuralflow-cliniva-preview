import { motion } from 'motion/react';
import { Award, GraduationCap, Heart, CheckCircle2, Quote } from 'lucide-react';

export default function DoctorBio() {
  const doctorImageUrl = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600&h=800';

  const qualifications = [
    { icon: GraduationCap, title: 'MDS - Prosthodontics & Implantology', details: 'Top Rank Holder, Maulana Azad Medical College (MAIDS), Delhi' },
    { icon: Award, title: 'Fellowship in Digital Dentistry', details: 'Advanced Implantology & Laser Fellowship (Germany)' },
    { icon: Heart, title: 'Conservative Philosophy', details: 'Dedicated to minimally invasive, absolute pain-free dental conservation' },
  ];

  const expertises = [
    'Advanced Single-Day Implants',
    'Microscopic Root Canal Therapy',
    'Laser Cosmetic Smile Designing',
    'Clear Aligner Biomechanics',
    'Surgical Impacted Extractions',
    'Pediatric Behavioral Comfort'
  ];

  return (
    <section id="about-doctor" className="py-24 bg-slate-50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Same Doctor Image, elegantly framed */}
          <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
            <div className="relative max-w-[380px] w-full">
              {/* Decorative border frame */}
              <div className="absolute -inset-4 rounded-3xl border border-slate-200/60 -z-10 bg-white/50"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[3/4]">
                <img
                  src={doctorImageUrl}
                  alt="Dr. Rishabh Mishra - Principal Prosthodontist and Implantologist at Cliniva Dental"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Overlay Label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-6 text-white">
                  <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                    Principal Dentist & Director
                  </span>
                  <h4 className="text-xl font-bold mt-1 text-slate-100">Dr. Rishabh Mishra</h4>
                  <p className="text-xs text-slate-300 font-light mt-0.5">MDS (MAIDS, New Delhi)</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 text-center mt-2.5 italic block">
                Representative image used for design concept.
              </span>
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit">
                Meet Your Doctor
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Dr. Rishabh Mishra, MDS
              </h3>
              <p className="text-blue-600 font-semibold text-base">
                Senior Implantologist, Cosmetologist & Principal Surgeon
              </p>
            </div>

            {/* Quote Block */}
            <div className="relative bg-white border-l-4 border-blue-600 p-5 rounded-r-2xl shadow-sm italic text-slate-700 text-sm">
              <Quote className="absolute top-2 right-3 w-8 h-8 text-blue-100/60 -z-0" />
              <p className="relative z-10 leading-relaxed font-medium">
                "My clinical vision is simple: to make world-class dentistry entirely pain-free, fully transparent, and accessible. We don't just treat teeth; we heal smiles and cultivate lasting patient confidence through advanced medical technology and genuine care."
              </p>
            </div>

            {/* Narrative Bio */}
            <p className="text-slate-600 text-sm leading-relaxed">
              Dr. Rishabh Mishra is a highly acclaimed prosthodontist, cosmetic dentist, and oral implantologist with over 12 years of rich clinical experience. Having completed his post-graduation (MDS) from the prestigious <strong>Maulana Azad Institute of Dental Sciences, New Delhi</strong> (consistently ranked India’s #1 dental institution), he specializes in computer-guided surgeries, conservative microscopic root canals, and advanced clear aligner therapies.
            </p>

            {/* Key Academic & Philosophy Blocks */}
            <div className="space-y-4">
              {qualifications.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-950 text-sm">{q.title}</h5>
                      <p className="text-xs text-slate-500 mt-0.5">{q.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expertise Tags */}
            <div className="pt-4 border-t border-slate-200">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Key Areas of Expertise
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {expertises.map((exp, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium bg-white px-3 py-2 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
