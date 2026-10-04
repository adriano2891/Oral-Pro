import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface FAQSectionProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking, onOpenChat }) => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.faq.tag}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            {t.faq.title}
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-6 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">
              {t.faq.bannerTitle}
            </h4>
            <p className="text-xs text-slate-500">
              {t.faq.bannerSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenChat}
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              {t.faq.chatBtn}
            </button>
            <button
              onClick={onOpenBooking}
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              {t.faq.bookBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
