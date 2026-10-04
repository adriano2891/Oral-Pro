import React from 'react';
import { Target, Users, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PageView } from '../types';

interface ServicesSectionProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageView) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking, onNavigate }) => {
  const { t } = useLanguage();
  const icons = [Target, Users, BarChart3];

  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.services.tag}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            {t.services.title}
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          {t.services.serviceList.map((s, idx) => {
            const Icon = icons[idx] || Target;
            return (
              <div
                key={s.number}
                className="rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-9 hover:border-slate-300 hover:shadow-lg transition-all"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                        {s.number}
                      </span>
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {s.title}
                    </h3>

                    <p className="text-sm font-semibold text-slate-700 leading-snug">
                      {s.headline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {s.whatItIs}
                    </p>

                    <div className="pt-2">
                      <ul className="space-y-2">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 bg-slate-50/80 rounded-xl p-6 border border-slate-100 self-center">
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {t.services.forWhomLabel}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {s.whoIsItFor}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                        {t.services.howHelpsLabel}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {s.howItHelps}
                      </p>
                    </div>

                    <div className="sm:col-span-2 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {t.services.routineIntegration}
                      </span>
                      <button
                        onClick={onOpenBooking}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
                      >
                        <span>{t.services.learnMoreBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Services Page Action */}
        {onNavigate && (
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('servicos')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <span>Consultar Todos os Serviços em Detalhe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
