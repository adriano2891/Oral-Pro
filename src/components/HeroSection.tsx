import React, { useState } from 'react';
import { ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenChat }) => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(0);

  const acquisitionSteps = t.hero.steps;

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-50/70 via-white to-white">
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -z-10 w-80 h-80 bg-red-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Commercial Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust badge with unboxed metadata separator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50/80 border border-blue-100/80 text-xs font-medium text-blue-900">
              <span className="font-semibold text-blue-700">{t.hero.badgeTag}</span>
              <span aria-hidden="true" className="text-blue-300">·</span>
              <span>{t.hero.badgeCount}</span>
              <span aria-hidden="true" className="text-blue-300">·</span>
              <span className="text-slate-600">{t.hero.badgeRef}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] text-balance">
              {t.hero.headlineStart}
              <span className="relative whitespace-nowrap text-blue-600 inline-block">
                {t.hero.headlineAccent}
                <svg
                  className="absolute left-0 -bottom-1.5 w-full h-2.5 text-blue-200 -z-10"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.hero.support}
            </p>

            {/* Direct Commercial CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-lg shadow-sm hover:shadow transition-all group whitespace-nowrap"
              >
                <span>{t.hero.ctaStrategy}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>{t.hero.ctaChat}</span>
              </button>
            </div>

            {/* Focus Specialities from Instagram Profile */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
                {t.hero.specialtiesLabel}
              </span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.hero.specImplants}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.hero.specOrtho}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.hero.specAesthetics}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Keynote Photo & Interactive Acquisition Flow Animation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100/70 p-5 overflow-hidden">
              {/* Photo Representation with Context */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                  alt="Mario Provenzano - OralPro"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                {/* Official Tag Overlay */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.hero.photoLeaderTag}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-medium text-slate-200">
                    {t.hero.photoCaption}
                  </p>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                    <span>{t.hero.photoSubcaption}</span>
                  </p>
                </div>
              </div>

              {/* Graphic Animation / Interactive Acquisition Pipeline */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {t.hero.pipelineTitle}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {t.hero.pipelineSubtitle}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">
                    {t.hero.stepCount(activeStep + 1, 4)}
                  </span>
                </div>

                {/* Progress bar line */}
                <div className="grid grid-cols-4 gap-1.5">
                  {acquisitionSteps.map((step, idx) => (
                    <button
                      key={step.title}
                      onClick={() => setActiveStep(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeStep === idx
                          ? 'bg-blue-600'
                          : activeStep > idx
                          ? 'bg-blue-200'
                          : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                      aria-label={`Ver ${step.title}`}
                    />
                  ))}
                </div>

                {/* Active Step Details */}
                <div className="bg-slate-50/90 rounded-lg p-3.5 border border-slate-100 min-h-[72px] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      {acquisitionSteps[activeStep].title}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/60 px-1.5 py-0.5 rounded">
                      {acquisitionSteps[activeStep].tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {acquisitionSteps[activeStep].description}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setActiveStep((prev) => (prev === 0 ? 3 : prev - 1))}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 px-2 py-1"
                  >
                    {t.hero.prevStep}
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev === 3 ? 0 : prev + 1))}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 px-2.5 py-1 bg-blue-50 rounded"
                  >
                    {t.hero.nextStep}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
