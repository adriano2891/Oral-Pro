import React from 'react';
import { PhoneMissed, EyeOff, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ChallengesSectionProps {
  onOpenBooking: () => void;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();
  const icons = [PhoneMissed, EyeOff, AlertCircle];

  return (
    <section id="desafios" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.challenges.tag}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            {t.challenges.title}
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            {t.challenges.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {t.challenges.items.map((c, idx) => {
            const Icon = icons[idx] || PhoneMissed;
            return (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">
                    {c.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2.5">
                    {c.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500">
                    <strong className="text-blue-700 font-semibold">OralPro:</strong> {c.solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {t.challenges.ctaBannerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.challenges.ctaBannerSubtitle}
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg shadow-sm whitespace-nowrap transition-colors"
          >
            <span>{t.challenges.ctaBannerButton}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
