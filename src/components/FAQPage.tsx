import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ChevronRight, Calendar, MessageSquare, Search, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PageView } from '../types';

interface FAQPageProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate, onOpenBooking, onOpenChat }) => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = t.faq.items.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">
            {t.nav.home}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{t.nav.faq}</span>
        </nav>

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>{t.faq.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            {t.faq.title}
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            {t.faq.subtitle}
          </p>

          {/* Search filter input */}
          <div className="mt-6 relative max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por dúvida (ex: diagnóstico, preços, triagem)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl space-y-3 mb-16">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-sm text-slate-600 font-medium">
                Nenhuma dúvida encontrada para "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline"
              >
                Limpar pesquisa
              </button>
            </div>
          ) : (
            filteredItems.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white hover:border-slate-300"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50/70 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions card */}
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900">
              Tem alguma dúvida específica sobre a sua clínica?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              O nosso assistente virtual oficial está disponível em tempo real, ou pode agendar um diagnóstico de 30 minutos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenChat}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.common.speakWithOralPro}</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{t.common.scheduleMeeting}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
