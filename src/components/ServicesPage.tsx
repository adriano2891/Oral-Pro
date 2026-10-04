import React from 'react';
import { Target, Users, BarChart3, CheckCircle2, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ServicesPageProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onOpenChat }) => {
  const { t } = useLanguage();
  const icons = [Target, Users, BarChart3];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.services.tag}
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            {t.services.title}
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Detailed Services Sections */}
        <div className="space-y-16">
          {t.services.serviceList.map((service, idx) => {
            const Icon = icons[idx] || Target;
            const isAlternate = idx % 2 !== 0;

            return (
              <div
                key={service.number}
                className={`p-8 sm:p-10 rounded-2xl border border-slate-200 ${
                  isAlternate ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.services.tag} · {service.number}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {service.title}
                    </h2>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {service.whatItIs}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        {t.services.routineIntegration}:
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-5 p-6 rounded-xl border border-slate-200 flex flex-col justify-between ${
                      isAlternate ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        {t.services.forWhomLabel}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {service.whoIsItFor}
                      </p>

                      <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                        {t.services.howHelpsLabel}
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed mb-4">
                        {service.howItHelps}
                      </p>
                    </div>

                    <button
                      onClick={onOpenBooking}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t.common.scheduleMeeting}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
