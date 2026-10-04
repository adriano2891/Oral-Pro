import React from 'react';
import { Search, Compass, Rocket, Activity, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PageView } from '../types';

interface MethodSectionProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageView) => void;
}

export const MethodSection: React.FC<MethodSectionProps> = ({ onOpenBooking, onNavigate }) => {
  const { t } = useLanguage();
  const icons = [Search, Compass, Rocket, Activity];

  return (
    <section id="metodo" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
            {t.method.tag}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            {t.method.title}
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            {t.method.subtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.method.steps.map((s, idx) => {
            const Icon = icons[idx] || Search;
            return (
              <div
                key={s.step}
                className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/60 hover:bg-slate-800 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/80 px-2 py-0.5 rounded">
                      {s.step}
                    </span>
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    {s.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {s.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 space-y-1.5">
                  {s.details.map((d) => (
                    <div key={d} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real photo accompaniment teaser */}
        <div className="mt-12 rounded-xl bg-slate-800/60 border border-slate-700 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-blue-400 font-display">281</span>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {t.method.bannerTitle}
              </h4>
              <p className="text-xs text-slate-400">
                {t.method.bannerSubtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate('metodo')}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg border border-slate-700 whitespace-nowrap transition-colors cursor-pointer"
              >
                <span>Conhecer Método Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm whitespace-nowrap transition-colors cursor-pointer"
            >
              <span>{t.method.bannerButton}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
