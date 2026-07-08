import React, { useState } from 'react';
import { 
  X, Calendar, Check, MessageSquare, Trash2, ShieldCheck, 
  Mail, Phone, Clock, Send, Eye, MessageCircle, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { Lead } from '../types';

interface LeadDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onUpdateStatus: (id: string, status: 'new' | 'contacted' | 'completed') => void;
  onDeleteLead: (id: string) => void;
  onResetLeads: () => void;
}

export default function LeadDashboard({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
  onDeleteLead,
  onResetLeads,
}: LeadDashboardProps) {
  // Navigation tab: 'leads' (default list) or 'communications' (notif dispatches)
  const [activeTab, setActiveTab] = useState<'leads' | 'communications'>('leads');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
  const completedLeads = leads.filter((l) => l.status === 'completed').length;

  const toggleExpandLog = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <div id="lead-dashboard-overlay" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex justify-end transition-opacity duration-350">
      <div
        id="lead-dashboard-drawer"
        className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-350"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-teal-500/10 rounded-lg border border-teal-500/30">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                Cliniva Care Desk Portal
                <span className="text-[10px] bg-slate-800 text-teal-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                  Live Sync
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Practice management center with integrated patient notifications and dispatch tracking.
              </p>
            </div>
          </div>
          <button
            id="close-dashboard"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lead Statistics Dashboard Widget Grid */}
        <div className="p-5 bg-slate-900 grid grid-cols-4 gap-2.5 border-b border-slate-800 shrink-0">
          <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wide">Total Leads</span>
            <span className="text-lg font-bold font-mono text-blue-400">{totalLeads}</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wide">New Inquiries</span>
            <span className="text-lg font-bold font-mono text-amber-400">{newLeads}</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wide">In Contact</span>
            <span className="text-lg font-bold font-mono text-teal-400">{contactedLeads}</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wide">Scheduled</span>
            <span className="text-lg font-bold font-mono text-emerald-400">{completedLeads}</span>
          </div>
        </div>

        {/* TAB NAVIGATION: Leads vs Communications Log */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Active Leads Inbox ({totalLeads})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('communications')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'communications'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5 animate-pulse" />
            <span>Communications Log</span>
          </button>
        </div>

        {/* ACTIVE TAB CONTENTS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950">
          
          {/* TAB 1: ACTIVE LEADS INBOX */}
          {activeTab === 'leads' && (
            totalLeads === 0 ? (
              <div className="text-center py-16">
                <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-400 font-bold text-sm">No leads in the database yet</p>
                <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto leading-relaxed">
                  Go back to the homepage and submit any booking or contact form. Real-time leads will populate here instantly.
                </p>
              </div>
            ) : (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-4 rounded-xl border transition-all ${
                    lead.status === 'new'
                      ? 'bg-slate-900 border-amber-500/20 shadow-md shadow-amber-500/5'
                      : lead.status === 'contacted'
                      ? 'bg-slate-900/80 border-teal-500/10'
                      : 'bg-slate-900/60 border-slate-800 opacity-75'
                  }`}
                >
                  {/* Lead header */}
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-100">{lead.name}</h4>
                        {lead.status === 'new' && (
                          <span className="bg-amber-500/15 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30 uppercase tracking-wider font-mono">
                            New Inquiry
                          </span>
                        )}
                        {lead.status === 'contacted' && (
                          <span className="bg-teal-500/15 text-teal-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-teal-500/30 uppercase tracking-wider font-mono">
                            In Contact
                          </span>
                        )}
                        {lead.status === 'completed' && (
                          <span className="bg-emerald-500/15 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30 uppercase tracking-wider font-mono">
                            Confirmed
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                        <span>Logged: {new Date(lead.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <span>•</span>
                        <span>{new Date(lead.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-1.5">
                      {lead.status !== 'contacted' && lead.status !== 'completed' && (
                        <button
                          onClick={() => onUpdateStatus(lead.id, 'contacted')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-teal-400 transition-all text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          title="Mark as Contacted"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Mark Contacted</span>
                        </button>
                      )}
                      {lead.status !== 'completed' && (
                        <button
                          onClick={() => onUpdateStatus(lead.id, 'completed')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 transition-all text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          title="Mark as Scheduled / Confirmed"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Confirm Slot</span>
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-all cursor-pointer"
                        title="Delete Lead Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border-t border-slate-800/80 pt-3">
                    <div className="space-y-1.5 text-slate-300">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <a href={`tel:${lead.phone}`} className="hover:text-blue-400 font-mono">
                          {lead.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <a href={`mailto:${lead.email}`} className="hover:text-blue-400 truncate">
                          {lead.email}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-slate-300 border-l border-slate-800 pl-0 sm:pl-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500">Service:</span>
                        <span className="font-bold text-blue-400">{lead.treatment}</span>
                      </div>
                      {lead.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-medium text-slate-200">
                            {lead.date} at {lead.time || '10:00 AM'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message body */}
                  {lead.message && (
                    <div className="mt-3 bg-slate-950 p-2.5 rounded-lg text-xs text-slate-400 border border-slate-800 italic leading-relaxed">
                      "{lead.message}"
                    </div>
                  )}

                  {/* Micro Indicator of Dispatched channels */}
                  <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                    <span className="font-semibold text-[9px] uppercase tracking-wider text-slate-500">Dispatched:</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span>✓</span> Email
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span>✓</span> SMS Alert
                    </span>
                    <span className="flex items-center gap-1 text-sky-400">
                      <span>✓</span> CRM Portal Synced
                    </span>
                  </div>
                </div>
              ))
            )
          )}

          {/* TAB 2: COMMUNICATIONS & NOTIFICATIONS DISPATCH AUDIT LOG */}
          {activeTab === 'communications' && (
            <div className="space-y-3">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 mb-1">
                  <Send className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Outbox Delivery Dashboard</span>
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  This console tracks all transactional confirmations triggered by the appointment scheduling engine. Clicking any log row below will open the delivery trace and message payload.
                </p>
              </div>

              {leads.map((lead) => {
                const isExpanded = expandedLogId === lead.id;
                const hasNotifs = lead.notificationsSent || { email: true, sms: true, staff: true, timestamp: lead.timestamp };
                
                return (
                  <div 
                    key={`log-${lead.id}`}
                    className="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden transition-all hover:border-slate-700"
                  >
                    {/* Log Row Header */}
                    <div 
                      onClick={() => toggleExpandLog(lead.id)}
                      className="p-4 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200 text-xs">{lead.name}</span>
                          <span className="text-[10px] bg-slate-950 text-blue-400 px-1.5 py-0.5 rounded font-mono">
                            {lead.treatment.split(' ')[0]}...
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Trace ID: cliniva-tx-{lead.id.split('-')[1] || 'demo'}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Channel Delivery Indicators */}
                        <div className="flex items-center gap-1.5">
                          <span 
                            className={`p-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                              hasNotifs.email ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-950 text-slate-600'
                            }`}
                            title="Email Delivery Success"
                          >
                            Email
                          </span>
                          <span 
                            className={`p-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                              hasNotifs.sms ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-950 text-slate-600'
                            }`}
                            title="SMS Delivery Success"
                          >
                            SMS
                          </span>
                          <span 
                            className={`p-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                              hasNotifs.staff ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-slate-950 text-slate-600'
                            }`}
                            title="Staff Alert Notified"
                          >
                            Staff
                          </span>
                        </div>

                        {/* Dropdown Toggle */}
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    </div>

                    {/* Log Row Expanded Detail tracing */}
                    {isExpanded && (
                      <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3.5 animate-in slide-in-from-top-1 duration-150">
                        {/* Timeline trace */}
                        <div className="space-y-2 border-l border-slate-800 pl-4 relative text-[11px] font-mono leading-relaxed text-slate-300">
                          <div className="relative">
                            <span className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <p className="text-slate-400">
                              <span className="text-emerald-400">✓</span> Delivered Email Booking Confirmation to <span className="text-slate-200 underline">{lead.email}</span>
                            </p>
                            <span className="text-[9px] text-slate-500">Timestamp: {new Date(hasNotifs.timestamp).toISOString()}</span>
                          </div>
                          
                          <div className="relative pt-1">
                            <span className="absolute -left-[20.5px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <p className="text-slate-400">
                              <span className="text-emerald-400">✓</span> Delivered SMS Booking Alert to patient phone <span className="text-slate-200">{lead.phone}</span>
                            </p>
                            <span className="text-[9px] text-slate-500">Gateway Route: CLINIVA_ALERT</span>
                          </div>

                          <div className="relative pt-1">
                            <span className="absolute -left-[20.5px] top-2 w-2.5 h-2.5 rounded-full bg-sky-500" />
                            <p className="text-slate-400">
                              <span className="text-sky-400">✦</span> Practice CRM notified. Active session alert pushed to clinic staff desk consoles.
                            </p>
                            <span className="text-[9px] text-slate-500">Status: Read and Logged</span>
                          </div>
                        </div>

                        {/* Interactive Message Preview */}
                        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dispatched Email Content:</span>
                          <div className="text-xs text-slate-400 space-y-1 italic bg-slate-950 p-2.5 rounded border border-slate-800 font-sans leading-relaxed">
                            <p>Subject: Scheduled: VIP Dental Consultation for {lead.name}</p>
                            <p className="mt-1">"Dear {lead.name}, your treatment consultation for {lead.treatment} has been successfully reserved on {lead.date} at {lead.time || '10:00 AM'}. Location: DLF Phase 2, Gurugram."</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-between items-center shrink-0">
          <p className="text-xs text-slate-500">
            Automated notifications system is active. All communications records are archived.
          </p>
          <button
            onClick={onResetLeads}
            className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Reset Demo Logs
          </button>
        </div>
      </div>
    </div>
  );
}
