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

            {/* Embedded Google Map */}
            <div className="border border-slate-200/85 rounded-3xl overflow-hidden shadow-md flex flex-col bg-white group">
              <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.4716766779435!2d77.0863066!3d28.4954497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193ef1ef82ab%3A0xe67caec721dfcf48!2sCliniva%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cliniva Dental Clinic Google Map"
                />
              </div>

              {/* Map Actions Footer Bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <a
                  href="https://maps.google.com/?q=Cliniva+Dental+Clinic+DLF+Phase+2+Gurugram"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-4 text-center bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Cliniva+Dental+Clinic+DLF+Phase+2+Gurugram"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Get Directions</span>
                </a>
                <a
                  href="https://wa.me/919810371228?text=Hello%20Cliniva%20Dental%20Clinic,%20please%20share%20your%20exact%20location%20and%20directions%20for%20my%20appointment."
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 text-center bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.03 14.05 1.01 11.416 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.463 3.39 1.337 4.842l-.991 3.614 3.755-.97z" />
                  </svg>
                  <span className="sm:hidden lg:inline">WhatsApp</span>
                </a>
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
