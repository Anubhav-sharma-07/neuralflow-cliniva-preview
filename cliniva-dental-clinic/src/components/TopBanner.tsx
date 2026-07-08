import { Sparkles, Database, FileText } from 'lucide-react';

interface TopBannerProps {
  onOpenDashboard: () => void;
  leadCount: number;
}

export default function TopBanner({ onOpenDashboard, leadCount }: TopBannerProps) {
  return (
    <div id="top-banner" className="bg-blue-600 text-white py-1.5 px-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]">
          <Sparkles className="w-3 h-3 text-white animate-pulse" />
          <span>
            Complimentary Homepage Concept Prepared by Neural Flow
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="btn-concept-notes"
            onClick={() => {
              const el = document.getElementById('why-choose-us');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white/80 hover:text-white transition-colors flex items-center gap-1 cursor-pointer py-0.5 px-2 rounded hover:bg-white/10 text-[9px] font-bold uppercase tracking-wider"
          >
            <FileText className="w-2.5 h-2.5" />
            <span>Interactive Concept</span>
          </button>
          <div className="h-3 w-[1px] bg-white/20 hidden sm:block"></div>
          <button
            id="btn-lead-dashboard"
            onClick={onOpenDashboard}
            className="bg-white hover:bg-slate-100 text-blue-700 font-bold px-2.5 py-0.5 rounded flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer text-[9px] uppercase tracking-wider"
          >
            <Database className="w-2.5 h-2.5" />
            <span>Practice Leads Portal</span>
            {leadCount > 0 && (
              <span className="bg-blue-600 text-white rounded-full px-1.5 py-0.2 text-[8px] font-extrabold">
                {leadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
