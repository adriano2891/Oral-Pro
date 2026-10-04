import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.about.tag}
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            {t.about.title}
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            {t.about.p1}
          </p>
        </div>

        {/* Narrative & Visuals */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {t.about.integrityTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {t.about.p2}
            </p>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>OralPro Core Standards</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.about.integrityText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                alt="Mario Provenzano - OralPro"
                className="w-full aspect-[16/10] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">{t.about.photoCaption1}</span>
                <span className="text-slate-500">{t.about.photoSub1}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
                alt="Masterclass with Partnered Clinicians"
                className="w-full aspect-[16/9] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">{t.about.photoCaption2}</span>
                <span className="text-slate-500">{t.about.photoSub2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {t.finalCta.title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {t.finalCta.footnote}
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            {t.common.scheduleMeeting}
          </button>
        </div>
      </div>
    </div>
  );
};
