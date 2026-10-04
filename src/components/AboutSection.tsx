import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Real Context & Live Event Imagery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
                alt="Eventi dal vivo OralPro - Mario Provenzano"
                className="w-full aspect-[16/10] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-600/90 text-[11px] font-semibold mb-1">
                  <span>{t.about.photoCaption2}</span>
                </div>
                <p className="text-sm font-semibold">
                  {t.about.photoSub2}
                </p>
                <p className="text-xs text-slate-300">
                  {t.hero.photoSubcaption}
                </p>
              </div>
            </div>

            {/* Confirmed Indicator Notice Box */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">
                  {t.about.integrityTitle}
                </p>
                <p>
                  {t.about.integrityText}{' '}
                  (<a
                    href="https://www.instagram.com/oralpro.italia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold underline hover:text-blue-800"
                  >
                    @oralpro.italia
                  </a>).
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Leadership */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                {t.about.tag}
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
                {t.about.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.about.p1}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {t.about.p2}
            </p>

            {/* Facts Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-2xl font-display">
                  <span>{t.about.stat1Number}</span>
                </div>
                <p className="text-xs font-semibold text-slate-900 mt-1">
                  {t.about.stat1Title}
                </p>
                <p className="text-[11px] text-slate-500">
                  {t.about.stat1Desc}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-2xl font-display">
                  <span>{t.about.stat2Number}</span>
                </div>
                <p className="text-xs font-semibold text-slate-900 mt-1">
                  {t.about.stat2Title}
                </p>
                <p className="text-[11px] text-slate-500">
                  {t.about.stat2Desc}
                </p>
              </div>
            </div>

            {/* Direct meeting CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg shadow-sm transition-all"
              >
                {t.about.ctaButton}
              </button>

              <a
                href="https://www.instagram.com/oralpro.italia/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <span>{t.about.viewInstagram}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
