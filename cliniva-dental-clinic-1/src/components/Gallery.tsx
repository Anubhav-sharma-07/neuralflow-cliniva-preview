import { motion } from 'motion/react';
import { GALLERY_DATA } from '../data';
import { Camera, Eye } from 'lucide-react';

export default function Gallery() {
  return (
    <section id="before-after" className="py-24 bg-slate-50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit mx-auto">
            Before & After Gallery
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Smile Transformations & Clinic Tour
          </h3>
          <p className="text-slate-600 text-base">
            Explore our smile success cases and take a virtual tour of Cliniva Dental Clinic in DLF Phase 2. Designed for supreme hygienic comfort and premium patient wellness.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-100 shadow-sm cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono mb-1.5 flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{item.category}</span>
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-slate-300 text-xs mt-1 font-light flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>Click to view clinical details</span>
                </p>
              </div>

              {/* Static Category Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-slate-800 shadow-sm z-20 uppercase tracking-wider font-mono border border-slate-150 group-hover:opacity-0 transition-opacity duration-200">
                {item.category}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
