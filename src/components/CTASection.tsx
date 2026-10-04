import React from 'react';
import { Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface CTASectionProps {
  onOpenBooking: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative pulse element matching brand ECG */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 1000 200" className="w-full h-auto text-red-500 stroke-current">
          <path
            d="M0,100 L350,100 L380,40 L420,160 L450,20 L480,140 L520,100 L1000,100"
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 border border-blue-700/60 text-xs font-semibold text-blue-200 mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
          <span>{t.finalCta.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-balance leading-tight">
          {t.finalCta.title}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.finalCta.subtitle}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-sm sm:text-base group"
          >
            <Calendar className="w-5 h-5 text-slate-950" />
            <span>{t.finalCta.button}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-4">
          {t.finalCta.footnote}
        </p>
      </div>
    </section>
  );
};
