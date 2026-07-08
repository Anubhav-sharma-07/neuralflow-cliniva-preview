import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { Lead } from './types';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import DoctorBio from './components/DoctorBio';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import BookingModal from './components/BookingModal';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';
import LeadDashboard from './components/LeadDashboard';

const DEMO_LEADS: Lead[] = [
  {
    id: 'demo-1',
    name: 'Amit Khurana',
    email: 'amit.k@gmail.com',
    phone: '+91 98112 34567',
    treatment: 'Dental Implants',
    message: 'Wants to consult about dental implants cost, bone grafting necessity, and overall treatment timeline in Gurugram.',
    date: '2026-07-09',
    time: '11:00 AM - 12:00 PM',
    status: 'new',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 'demo-2',
    name: 'Shalini Sharma',
    email: 'shalini@outlook.com',
    phone: '+91 99990 12345',
    treatment: 'Clear Aligners',
    message: 'Requesting a digital 3D oral scan consultation for teeth straightening alignment. Prefers evening slot.',
    date: '2026-07-12',
    time: '04:30 PM - 05:30 PM',
    status: 'contacted',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  }
];

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState('');

  // Hydrate Leads from localStorage on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('cliniva_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (err) {
        setLeads(DEMO_LEADS);
        localStorage.setItem('cliniva_leads', JSON.stringify(DEMO_LEADS));
      }
    } else {
      setLeads(DEMO_LEADS);
      localStorage.setItem('cliniva_leads', JSON.stringify(DEMO_LEADS));
    }
  }, []);

  interface AppToast {
    id: string;
    type: 'email' | 'sms' | 'staff' | 'success';
    title: string;
    message: string;
  }

  const [toasts, setToasts] = useState<AppToast[]>([]);

  const triggerToast = (type: 'email' | 'sms' | 'staff' | 'success', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    
    // Auto-dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Sync leads to local storage whenever they change
  const updateLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    localStorage.setItem('cliniva_leads', JSON.stringify(newLeads));
  };

  const handleAddLead = (lead: Lead) => {
    const updated = [lead, ...leads];
    updateLeads(updated);

    const isContactForm = !lead.date; // if no date, it's from the contact page form

    // Trigger beautiful automated staggered notification dispatches!
    // 1. SMS Confirmation
    setTimeout(() => {
      triggerToast(
        'sms',
        '📱 Patient SMS Dispatched',
        isContactForm 
          ? `Thank you alert successfully delivered to patient mobile ${lead.phone}.`
          : `Appointment confirmation SMS successfully delivered to ${lead.phone}.`
      );
    }, 200);

    // 2. Email Confirmation (after 1000ms)
    setTimeout(() => {
      triggerToast(
        'email',
        '📧 Patient Email Sent',
        isContactForm 
          ? `Inquiry received receipt dispatched to ${lead.email}.`
          : `E-voucher & prep checklist dispatched to ${lead.email}.`
      );
    }, 1200);

    // 3. Staff Notification (after 2200ms)
    setTimeout(() => {
      triggerToast(
        'staff',
        '🔔 Clinic Care Team Alerted',
        isContactForm
          ? `New patient query from ${lead.name} added to Cliniva Care Console.`
          : `New booking for ${lead.treatment} added to Practice leads portal.`
      );
    }, 2200);
  };

  const handleUpdateStatus = (id: string, status: 'new' | 'contacted' | 'completed') => {
    const updated = leads.map((lead) => {
      if (lead.id === id) {
        return { ...lead, status };
      }
      return lead;
    });
    updateLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((lead) => lead.id !== id);
    updateLeads(updated);
  };

  const handleResetLeads = () => {
    updateLeads(DEMO_LEADS);
  };

  const handleOpenBookingWithTreatment = (treatmentName?: string) => {
    setPreselectedTreatment(treatmentName || '');
    setIsBookingOpen(true);
  };

  return (
    <div id="cliniva-root" className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner Concept Announcement & Interactive CRM portal toggle */}
      <TopBanner
        onOpenDashboard={() => setIsDashboardOpen(true)}
        leadCount={leads.filter((l) => l.status === 'new').length}
      />

      {/* Sticky High-contrast navigation */}
      <Navbar onOpenBookingModal={() => handleOpenBookingWithTreatment()} />

      {/* Main Structural Page Flow */}
      <main id="homepage-content">
        {/* Hero Area */}
        <Hero onOpenBookingModal={() => handleOpenBookingWithTreatment()} />

        {/* Services / Treatments Overview */}
        <Services onOpenBookingModal={handleOpenBookingWithTreatment} />

        {/* Brand Narrative / Core features */}
        <WhyChooseUs />

        {/* Doctor Biography block */}
        <DoctorBio />

        {/* Patient reviews block */}
        <Reviews />

        {/* Clinic gallery block */}
        <Gallery />

        {/* Frequently asked questions */}
        <FAQSection />

        {/* Direct Contact details & interactive submission form */}
        <ContactSection onAddLead={handleAddLead} />
      </main>

      {/* Professional Healthcare Footer */}
      <Footer />

      {/* Floating Interactive triggers (WhatsApp, phone, sticky booking) */}
      <FloatingButtons onOpenBookingModal={() => handleOpenBookingWithTreatment()} />

      {/* Side drawer SaaS CRM Leads dashboard */}
      <LeadDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        leads={leads}
        onUpdateStatus={handleUpdateStatus}
        onDeleteLead={handleDeleteLead}
        onResetLeads={handleResetLeads}
      />

      {/* Center Modal Booking Scheduler */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedTreatment={preselectedTreatment}
        onAddLead={handleAddLead}
      />

      {/* Staggered Notification Toasts Overlay Container */}
      <div id="toast-notifications-container" className="fixed bottom-6 right-6 z-[250] max-w-sm w-full pointer-events-none space-y-2.5 flex flex-col items-end">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, y: -15, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-start gap-3 w-[335px] relative overflow-hidden"
            >
              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                toast.type === 'sms' 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/10' 
                  : toast.type === 'email' 
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/10' 
                  : 'bg-sky-500/15 text-sky-400 border border-sky-500/10'
              }`}>
                {toast.type === 'sms' && (
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )}
                {toast.type === 'email' && (
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {toast.type === 'staff' && (
                  <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                )}
              </div>
              <div className="space-y-0.5 leading-snug flex-1">
                <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-100">{toast.title}</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{toast.message}</p>
              </div>
              <button 
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-slate-500 hover:text-slate-300 transition-colors shrink-0 p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
