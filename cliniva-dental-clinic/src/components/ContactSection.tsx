import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert, Check, PhoneCall } from 'lucide-react';
import { Lead } from '../types';

interface ContactSectionProps {
  onAddLead: (lead: Lead) => void;
}

export default function ContactSection({ onAddLead }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState('General Consultation');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Your name is required';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!message.trim()) newErrors.message = 'Please type a short query';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newLead: Lead = {
      id: 'lead-' + Date.now(),
      name,
      email,
      phone,
      treatment,
      message,
      status: 'new',
      timestamp: new Date().toISOString(),
    };

    onAddLead(newLead);
    setIsSubmitted(true);

    // Reset fields except name (for greeting)
    setPhone('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  const handleResetForm = () => {
    setName('');
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Coordinates & Map */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit">
                Get In Touch
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Location & Contact Info
              </h3>
              <p className="text-slate-600 text-sm">
                We are conveniently located in DLF Phase 2, Gurugram. Easily accessible from MG Road, Cyber City, and National Highway 48. Free valet and clinic parking available.
              </p>
            </div>

            {/* Address Details Block */}
            <div className="space-y-5">
              {/* Address */}
              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0 h-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-[11px]">Clinic Address</h4>
                  <p className="text-slate-700 text-sm font-medium mt-1 leading-relaxed">
                    5, N-12 Road, DLF Phase 2,<br />
                    Sector 25, Gurugram, Haryana - 122002
                  </p>
                </div>
              </div>

              {/* Phone Details */}
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shrink-0 h-fit">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-[11px]">Direct Support</h4>
                  <p className="text-slate-700 text-sm font-bold mt-1">
                    <a href="tel:+919810371228" className="hover:text-blue-600 transition-colors">
                      +91 98103 71228
                    </a>
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">Click any button to tap-to-call directly.</p>
                </div>
              </div>

              {/* Email details */}
              <div className="flex gap-4">
                <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 shrink-0 h-fit">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-[11px]">Email Inquiries</h4>
                  <p className="text-slate-700 text-sm font-medium mt-1">
                    <a href="mailto:info@clinivadental.com" className="hover:text-blue-600 transition-colors">
                      info@clinivadental.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 rounded-2xl text-slate-600 shrink-0 h-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-[11px]">Working Hours</h4>
                  <p className="text-slate-700 text-xs font-semibold mt-1">
                    Mon - Sat: <span className="text-slate-900 font-bold">10:00 AM - 08:30 PM</span>
                  </p>
                  <p className="text-slate-700 text-xs font-semibold mt-0.5">
                    Sun (Appointments Only): <span className="text-slate-900 font-bold">10:00 AM - 02:00 PM</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Placeholder */}
            <div className="border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm aspect-[16/9] relative bg-slate-50 group">
              {/* Styling a clean, modern vector/satellite representation inside React for maximum performance and gorgeous visual branding! */}
              <div className="absolute inset-0 bg-slate-100 flex flex-col justify-between p-6">
                <div className="space-y-1 relative z-10">
                  <span className="text-[9px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">
                    Live GPS Location
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm pt-1">DLF Phase 2, Gurugram</h5>
                  <p className="text-slate-500 text-[11px]">Plot 5, N-12 Road, Sector 25</p>
                </div>

                {/* Minimal vector background representations */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  {/* Fake map streets */}
                  <div className="absolute top-1/4 inset-x-0 h-4 bg-slate-900 transform -rotate-12"></div>
                  <div className="absolute left-1/3 inset-y-0 w-4 bg-slate-900 transform rotate-45"></div>
                  <div className="absolute right-1/4 inset-y-0 w-5 bg-slate-900 transform -rotate-45"></div>
                  <div className="absolute top-2/3 inset-x-0 h-4 bg-slate-900"></div>
                </div>

                {/* Simulated Map Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-rose-500 text-white p-2.5 rounded-full shadow-lg shadow-rose-500/30 animate-pulse relative z-10">
                    <MapPin className="w-5 h-5 fill-current" />
                  </div>
                  <div className="bg-slate-900/10 w-8 h-1.5 rounded-full blur-xs mt-1"></div>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-2 mt-auto">
                  <a
                    href="https://maps.google.com/?q=DLF+Phase+2+Gurugram"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 text-center bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="https://wa.me/919810371228?text=Please%20send%20me%20your%20exact%20clinic%20location."
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Get via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-sm relative overflow-hidden">
              {/* Success Screen inside the same container */}
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-extrabold text-slate-900">Message Received, {name}!</h4>
                    <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                      Your query has been securely transmitted. A dental advisor from Cliniva DLF Phase 2 will contact you shortly on <strong>{phone}</strong>.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-md">
                    <a
                      href="tel:+919810371228"
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/15"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Tap to Call Advisor</span>
                    </a>
                    <button
                      onClick={handleResetForm}
                      className="flex-1 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 font-bold rounded-xl text-xs transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* ACTUAL FORM */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xl font-extrabold text-slate-900">Submit an Instant Consultation Request</h4>
                    <p className="text-xs text-slate-500">
                      Fill out the form below. Our principal dentist reviews all queries directly.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        errors.name ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
                      }`}
                      placeholder="e.g. Rahul Mehta"
                    />
                    {errors.name && (
                      <p className="text-rose-500 text-[10px] font-medium mt-1.5 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Grid: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.phone ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
                        }`}
                        placeholder="e.g. +91 98103 XXXXX"
                      />
                      {errors.phone && (
                        <p className="text-rose-500 text-[10px] font-medium mt-1.5 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.email ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
                        }`}
                        placeholder="e.g. rahul@domain.com"
                      />
                      {errors.email && (
                        <p className="text-rose-500 text-[10px] font-medium mt-1.5 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Treatment Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Interested Dental Treatment
                    </label>
                    <select
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="General Consultation">General Consultation & Scaling</option>
                      <option value="Root Canal Treatment">Root Canal Treatment (Painless)</option>
                      <option value="Dental Implants">Dental Implants (Guided)</option>
                      <option value="Clear Aligners">Clear Aligners (Invisible)</option>
                      <option value="Smile Makeover">Smile Makeover & Veneers</option>
                      <option value="Wisdom Tooth Extraction">Wisdom Tooth Extraction (Senior Surgeons)</option>
                      <option value="Kids Dentistry">Kids Pediatric Treatment</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Dental Concern or Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none ${
                        errors.message ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
                      }`}
                      placeholder="Please details your tooth concern, pain level, or aesthetic goals..."
                    />
                    {errors.message && (
                      <p className="text-rose-500 text-[10px] font-medium mt-1.5 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4.5 h-4.5" />
                    <span>Submit Query securely</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
