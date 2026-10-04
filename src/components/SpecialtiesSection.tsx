import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SpecialtiesSectionProps {
  onOpenBooking: () => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <section id="areas" className="py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.specialties.tag}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            {t.specialties.title}
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            {t.specialties.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {t.specialties.items.map((spec) => (
            <div
              key={spec.title}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded">
                    {spec.badge}
                  </span>
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {spec.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {spec.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {spec.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  {spec.tagline}
                </span>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {t.specialties.scheduleBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
