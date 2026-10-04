import React from 'react';
import { Calendar as CalendarIcon, Clock, ShieldCheck, ChevronRight, CheckCircle2, UserCheck, Video } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { BookingSystem } from './BookingSystem';
import { PageView } from '../types';

interface BookingPageProps {
  onNavigate: (page: PageView) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">
            {t.nav.home}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{t.common.scheduleMeeting}</span>
        </nav>

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.common.lisbonTime} (Europe/Lisbon · UTC+1)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            Agendar Reunião de Diagnóstico Comercial
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Reunião estratégica individual online de 30 a 45 minutos com a equipa da OralPro. Analisamos a capacidade instalada da sua clínica dentária e desenhamos o plano de atração para pacientes de alto valor.
          </p>
        </div>

        {/* Key meeting guarantees */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Video className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">Online & Sem Deslocações</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Link direto de videoconferência enviado imediatamente.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">30 a 45 Minutos Focados</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Sem rodeios: análise direta de gabinetes e faturação clínica.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">Confidencial & Sem Compromisso</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Dados da sua clínica protegidos e sem pressão comercial.</p>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Booking System */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-16">
          <BookingSystem isOpenModal={false} onBookingSuccess={() => {}} />
        </div>
      </div>
    </div>
  );
};
