import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, CheckCircle, ShieldAlert, Sparkles, 
  Clock, User, Phone, Mail, ChevronRight, ChevronLeft, 
  Send, Eye, Bell, Check, Landmark, MessageSquare
} from 'lucide-react';
import { Lead } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatment: string;
  onAddLead: (lead: Lead) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedTreatment,
  onAddLead,
}: BookingModalProps) {
  // Wizard Step State
  const [step, setStep] = useState(1);

  // Form Field States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  
  // Notification Toggles
  const [sendEmailNotify, setSendEmailNotify] = useState(true);
  const [sendSMSNotify, setSendSMSNotify] = useState(true);
  const [sendStaffNotify, setSendStaffNotify] = useState(true);

  // Preview Mode Tab ('email' or 'sms')
  const [previewTab, setPreviewTab] = useState<'email' | 'sms'>('email');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const treatmentsList = [
    'General Checkup & Scaling',
    'Root Canal Treatment',
    'Dental Implants',
    'Clear Aligners',
    'Smile Makeover',
    'Wisdom Tooth Removal',
    'Kids Dentistry',
    'Other Cosmetic Procedures',
  ];

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '02:30 PM - 03:30 PM',
    '03:30 PM - 04:30 PM',
    '04:30 PM - 05:30 PM',
    '05:30 PM - 06:30 PM',
    '06:30 PM - 07:30 PM',
  ];

  // Set default treatment on open
  useEffect(() => {
    if (isOpen) {
      if (preselectedTreatment) {
        setTreatment(preselectedTreatment);
      } else if (!treatment) {
        setTreatment('General Checkup & Scaling');
      }
      
      // Auto-set tomorrow's date if empty
      if (!date) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow.toISOString().split('T')[0]);
      }
    }
  }, [preselectedTreatment, isOpen]);

  // Deterministic reservation generator so each date looks realistic
  const isSlotBooked = (slotName: string, selectedDate: string) => {
    if (!selectedDate) return false;
    
    // Amit Khurana demo booking:
    if (selectedDate === '2026-07-09' && slotName === '11:00 AM - 12:00 PM') return true;
    // Shalini Sharma demo booking:
    if (selectedDate === '2026-07-12' && slotName === '04:30 PM - 05:30 PM') return true;

    // Standard hash selection so it's deterministic and interactive
    const charCodeSum = selectedDate.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index1 = charCodeSum % timeSlots.length;
    const index2 = (charCodeSum + 3) % timeSlots.length;
    
    const currentIndex = timeSlots.indexOf(slotName);
    return currentIndex === index1 || currentIndex === index2;
  };

  // Keep first available slot auto-selected when date changes
  useEffect(() => {
    if (date) {
      const available = timeSlots.find(slot => !isSlotBooked(slot, date));
      if (available) {
        setTime(available);
      }
    }
  }, [date]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!treatment) newErrors.treatment = 'Please select a treatment';
    if (!date) newErrors.date = 'Preferred date is required';
    if (!time) newErrors.time = 'Preferred time slot is required';
    if (time && isSlotBooked(time, date)) newErrors.time = 'This slot has just been reserved';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Patient name is required';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(phone)) {
      newErrors.phone = 'Enter a valid phone number (8-15 digits)';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return;

    const newLead: Lead = {
      id: 'lead-' + Date.now(),
      name,
      email,
      phone,
      treatment,
      message: message || undefined,
      date,
      time,
      status: 'new',
      timestamp: new Date().toISOString(),
      notificationsSent: {
        email: sendEmailNotify,
        sms: sendSMSNotify,
        staff: sendStaffNotify,
        timestamp: new Date().toISOString(),
      }
    };

    onAddLead(newLead);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    // Reset state on close
    setName('');
    setPhone('');
    setEmail('');
    setDate('');
    setTime('');
    setMessage('');
    setStep(1);
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  // Date formatting
  const getReadableDate = (dateStr: string) => {
    if (!dateStr) return '';
    const option: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', option);
  };

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <div
        id="booking-modal-container"
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors z-20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* SUCCESS STATE - HIGH DENSITY CONFIRMATION SHEET */
          <div className="p-8 text-center flex flex-col overflow-y-auto max-h-[85vh] space-y-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Appointment Scheduled!</h3>
              <p className="text-slate-600 text-xs max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{name}</strong>. Your requested time has been synchronized and confirmed on our digital dashboard.
              </p>
            </div>

            {/* Voucher Booking Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3.5 max-w-md mx-auto w-full shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-[10px] font-extrabold text-teal-600 uppercase tracking-widest">Clinic Voucher</span>
                <span className="text-[10px] text-slate-400 font-mono">ID: {Date.now().toString().slice(-8)}</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Treatment:</span>
                  <span className="font-bold text-slate-900">{treatment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-bold text-slate-900">{getReadableDate(date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Slot:</span>
                  <span className="font-bold text-blue-600">{time}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-[11px]">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-bold text-slate-900">DLF Phase 2, Sector 25, Gurugram</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Broadcast Channels Activity Logger */}
            <div className="border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto w-full bg-slate-950 text-slate-100 font-mono text-[11px] space-y-2 shadow-inner">
              <div className="flex items-center gap-1.5 text-teal-400 border-b border-slate-800 pb-2 mb-2 font-bold uppercase tracking-wider text-[10px]">
                <Send className="w-3.5 h-3.5" />
                <span>Automated Dispatches Log</span>
              </div>
              
              {sendEmailNotify && (
                <div className="flex items-start gap-2 text-emerald-400">
                  <span>✓</span>
                  <div>
                    <span className="text-slate-400">[Email Dispatched]</span> Confirmation sent to <span className="text-slate-200 underline">{email}</span> containing appointment itinerary and prep instructions.
                  </div>
                </div>
              )}
              {sendSMSNotify && (
                <div className="flex items-start gap-2 text-emerald-400">
                  <span>✓</span>
                  <div>
                    <span className="text-slate-400">[SMS Dispatched]</span> Delivery notification queued for patient mobile <span className="text-slate-200">{phone}</span>.
                  </div>
                </div>
              )}
              {sendStaffNotify && (
                <div className="flex items-start gap-2 text-sky-400">
                  <span>✦</span>
                  <div>
                    <span className="text-slate-400">[CRM Synchronized]</span> Clinic care desk alerted. Added to "Practice Leads Console" under status <span className="bg-amber-500/20 text-amber-400 px-1 rounded">New Inquiry</span>.
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="w-full max-w-md mx-auto pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919810371228?text=Hello%20Cliniva%20Dental%20Clinic,%20I'd%20like%20to%20confirm%20my%20appointment%20for%20${encodeURIComponent(name)}%20for%20${encodeURIComponent(treatment)}%20on%20${date}%20at%20${encodeURIComponent(time)}.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors text-xs uppercase tracking-wider cursor-pointer"
              >
                {/* WhatsApp logo path */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.03 14.05 1.01 11.416 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.463 3.39 1.337 4.842l-.991 3.614 3.755-.97z" />
                </svg>
                <span>WhatsApp Desk</span>
              </a>
              <button
                onClick={handleClose}
                className="flex-1 py-3 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-350 bg-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Portal
              </button>
            </div>
          </div>
        ) : (
          /* MULTI-STEP APPOINTMENT SCHEDULER WIZARD */
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 shrink-0 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-[0.2em] flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cliniva Digital Scheduler</span>
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">VIP Appointment Booking</h3>
              </div>
              
              {/* Wizard Step Progress Tracker */}
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400'}`}>1</span>
                <span className={`h-[2px] w-4 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></span>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400'}`}>2</span>
                <span className={`h-[2px] w-4 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></span>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400'}`}>3</span>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              
              {/* STEP 1: SERVICE & TIMELINE SELECTOR */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      <span>Select Clinic Treatment / Service</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {treatmentsList.map((t) => (
                        <div
                          key={t}
                          onClick={() => setTreatment(t)}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                            treatment === t
                              ? 'bg-blue-50 border-blue-500 text-blue-950 shadow-sm'
                              : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span>{t}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            treatment === t ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                          }`}>
                            {treatment === t && <Check className="w-2.5 h-2.5" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
                    {/* Calendar Preferred Date Input */}
                    <div className="md:col-span-5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.date ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
                        }`}
                      />
                      {errors.date && (
                        <p className="text-rose-500 text-[10px] font-medium mt-1 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> {errors.date}
                        </p>
                      )}
                      
                      <div className="mt-3 bg-slate-50 border border-slate-100 p-3 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                        📆 <strong>Selected Day:</strong>
                        <p className="font-bold text-slate-700 mt-0.5">{getReadableDate(date) || 'No date selected'}</p>
                      </div>
                    </div>

                    {/* Highly Visual Available Time Slots Selection Card Grid */}
                    <div className="md:col-span-7">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>Interactive Available Time Slots</span>
                      </label>
                      
                      <div className="grid grid-cols-2 gap-2 max-h-[190px] overflow-y-auto pr-1">
                        {timeSlots.map((ts) => {
                          const booked = isSlotBooked(ts, date);
                          const isSelected = time === ts;
                          return (
                            <button
                              key={ts}
                              type="button"
                              disabled={booked}
                              onClick={() => setTime(ts)}
                              className={`p-2.5 rounded-xl border text-left text-[11px] transition-all relative overflow-hidden cursor-pointer ${
                                booked
                                  ? 'bg-slate-100 border-slate-200/60 text-slate-400 line-through cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                                  : 'bg-white border-slate-200 hover:border-blue-400 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{ts}</span>
                                <span className={`w-1.5 h-1.5 rounded-full ${booked ? 'bg-slate-300' : isSelected ? 'bg-white' : 'bg-green-500 animate-pulse'}`} />
                              </div>
                              <span className="text-[9px] block mt-0.5 opacity-80">
                                {booked ? 'Reserved' : 'Available'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      
                      {errors.time && (
                        <p className="text-rose-500 text-[10px] font-medium mt-1.5 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> {errors.time}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PATIENT CONTACT INFORMATION */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
                    <User className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wide">Enter Patient Credentials</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                        Please provide valid contact information. Your digital confirmations and reminders will be dispatched to these channels.
                      </p>
                    </div>
                  </div>

                  {/* Patient Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Patient Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.name ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
                        }`}
                        placeholder="e.g. Arjun Kapoor"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-rose-500 text-[10px] font-medium mt-1 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Grid: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Contact Mobile *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            errors.phone ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
                          }`}
                          placeholder="e.g. +91 98103 71228"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-rose-500 text-[10px] font-medium mt-1 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            errors.email ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
                          }`}
                          placeholder="e.g. arjun@kapoor.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-rose-500 text-[10px] font-medium mt-1 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Special requests or dental symptoms (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                      placeholder="e.g. Suffering from wisdom tooth discomfort or request wheelchair access..."
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: DUAL CONFIRMATIONS & BROADCAST PREVIEW */}
              {step === 3 && (
                <div className="space-y-4">
                  {/* Summary Header */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Appointment Summary</span>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                      <div>
                        <span className="text-slate-500">Service: </span>
                        <strong className="text-slate-950">{treatment}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Scheduled: </span>
                        <strong className="text-slate-950">{date} at {time}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Patient: </span>
                        <strong className="text-slate-950">{name}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Real-Time Notification Channel Selectors */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                      <Bell className="w-4 h-4 text-amber-500" />
                      <span>Select Integrated Notification Targets</span>
                    </label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {/* Email Toggle */}
                      <div 
                        onClick={() => setSendEmailNotify(!sendEmailNotify)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          sendEmailNotify ? 'bg-white border-blue-300 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${sendEmailNotify ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                          {sendEmailNotify && <Check className="w-3 h-3" />}
                        </div>
                        <div className="leading-none">
                          <p className="text-[11px] font-bold text-slate-800">Email Confirmation</p>
                          <span className="text-[9px] text-slate-500">To: {email || 'Email'}</span>
                        </div>
                      </div>

                      {/* SMS Toggle */}
                      <div 
                        onClick={() => setSendSMSNotify(!sendSMSNotify)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          sendSMSNotify ? 'bg-white border-blue-300 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${sendSMSNotify ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                          {sendSMSNotify && <Check className="w-3 h-3" />}
                        </div>
                        <div className="leading-none">
                          <p className="text-[11px] font-bold text-slate-800">SMS Confirmation</p>
                          <span className="text-[9px] text-slate-500">To: {phone || 'Mobile'}</span>
                        </div>
                      </div>

                      {/* Staff Notify Toggle */}
                      <div 
                        onClick={() => setSendStaffNotify(!sendStaffNotify)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          sendStaffNotify ? 'bg-white border-blue-300 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${sendStaffNotify ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                          {sendStaffNotify && <Check className="w-3 h-3" />}
                        </div>
                        <div className="leading-none">
                          <p className="text-[11px] font-bold text-slate-800">Clinic Staff Alert</p>
                          <span className="text-[9px] text-slate-500">Practice Leads CRM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HIGH-DENSITY INTERACTIVE NOTIFICATION PREVIEW PANEL */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-inner">
                    <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Interactive Dispatch Preview</span>
                      </span>
                      <div className="flex bg-slate-200 p-0.5 rounded-lg text-[10px] font-bold">
                        <button
                          type="button"
                          onClick={() => setPreviewTab('email')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${previewTab === 'email' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}
                        >
                          Email Template
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('sms')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${previewTab === 'sms' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'}`}
                        >
                          SMS Template
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-white min-h-[140px] flex flex-col justify-between">
                      {previewTab === 'email' ? (
                        /* EMAIL NOTIFICATION SIMULATION */
                        <div className="space-y-3">
                          <div className="border-b border-slate-100 pb-2 text-[10px] space-y-1">
                            <p className="text-slate-400 font-mono"><strong className="text-slate-700">From:</strong> care@clinivadental.in</p>
                            <p className="text-slate-400 font-mono"><strong className="text-slate-700">Subject:</strong> Scheduled: VIP Dental Consultation for {name || '[Patient Name]'}</p>
                          </div>
                          <div className="text-xs text-slate-600 font-sans space-y-2 leading-relaxed">
                            <p>Dear <strong>{name || '[Patient Name]'}</strong>,</p>
                            <p>
                              We have successfully scheduled your premium dental treatment consultation for <strong className="text-blue-600">{treatment}</strong> on <strong className="text-slate-800">{getReadableDate(date) || '[Selected Date]'}</strong> at <strong className="text-slate-800">{time || '[Selected Time]'}</strong>.
                            </p>
                            <p>
                              📍 <strong>Location:</strong> Cliniva Dental Care, 5, N-12 Road, DLF Phase 2, Sector 25, Gurugram.
                            </p>
                            <p className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 italic">
                              Please arrive 10 minutes early. Contact us at +91 98103 71228 if you need to reschedule.
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* SMS NOTIFICATION SIMULATION */
                        <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed relative max-w-sm mx-auto w-full shadow-inner border border-slate-800">
                          <div className="absolute top-1.5 right-2 text-[8px] text-slate-500 uppercase">ClinivaAlert</div>
                          <p className="text-emerald-400 font-bold mb-1">💬 [SMS Delivery Preview]</p>
                          <p>
                            Dear {name || '[PatientName]'}, your booking for {treatment} is confirmed at Cliniva Dental Gurugram. Date: {date || 'YYYY-MM-DD'}, Time: {time || 'TimeSlot'}. Need help? Call +91 98103 71228.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4 shrink-0">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 py-3 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-350 bg-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 text-slate-600 hover:text-slate-800 border border-slate-200 bg-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-md shadow-blue-600/10"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  id="modal-submit-btn"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/35"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm & Dispatch</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
