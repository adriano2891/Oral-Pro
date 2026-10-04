import React from 'react';
import { Building2, Quote } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ExperienceTrustSectionProps {
  onOpenBooking: () => void;
}

export const ExperienceTrustSection: React.FC<ExperienceTrustSectionProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.trust.tag}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            {t.trust.title}
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            {t.trust.subtitle}
          </p>
        </div>

        {/* Real Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {t.trust.cases.map((pc) => (
            <div
              key={pc.clinic}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">{pc.clinic}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {t.trust.verifiedCaseBadge}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block">
                    {pc.specialty}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {pc.outcome}
                  </h3>
                </div>

                <div className="relative pl-5 border-l-2 border-blue-600 my-4 text-slate-600 text-xs sm:text-sm italic leading-relaxed">
                  <Quote className="w-3.5 h-3.5 text-blue-400 absolute -top-1 -left-2 bg-white" />
                  "{pc.quote}"
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{pc.location}</span>
                <span className="font-medium text-slate-700">{t.trust.accompanimentTag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live event & masterclasses proof banner */}
        <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {t.trust.eventBannerTag}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {t.trust.eventBannerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.trust.eventBannerDesc}
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-sm whitespace-nowrap transition-colors"
          >
            <span>{t.trust.eventBannerBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
