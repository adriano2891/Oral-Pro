import React from 'react';
import { Sparkles, CheckCircle2, ChevronRight, Calendar, ArrowRight, Shield, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PageView } from '../types';

interface AreasPageProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const AreasPage: React.FC<AreasPageProps> = ({ onNavigate, onOpenBooking, onOpenChat }) => {
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
          <span className="text-slate-900 font-semibold">{t.nav.areas}</span>
        </nav>

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>{t.specialties.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            {t.specialties.title}
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            {t.specialties.subtitle}
          </p>
        </div>

        {/* 3 Core High-Ticket Specialties In-Depth */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {t.specialties.items.map((spec, index) => (
            <div
              key={spec.title}
              className="bg-white rounded-2xl border border-slate-200/90 p-8 flex flex-col justify-between hover:border-blue-300 hover:shadow-xl transition-all relative overflow-hidden"
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg tracking-wider">
                  Prioridade #1
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded">
                    {spec.badge}
                  </span>
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                  {spec.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {spec.description}
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Vantagens Clínicas & Comerciais:
                  </h4>
                  {spec.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">Perfil do Paciente</span>
                  <span className="font-bold text-slate-900">Particular Qualificado</span>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Agendar Diagnóstico desta Área</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Focus on High-Ticket Specialty Treatments */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 mb-16">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Rentabilidade & Estrutura
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              Por que a Captação Focada em Alto Valor Transforma o Consultório?
            </h3>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Tratamentos como reabilitações sobre implantes, alinhadores e facetas cerâmicas possuem ticket médio elevado, permitindo à clínica faturar mais com menos consultas rotineiras e maior rentabilidade por cadeira médica.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Ticket Médio Elevado
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Um plano de reabilitação completa compensa dezenas de consultas de rotina, gerando fluxo financeiro imediato e previsível para investimentos em tecnologia clínica.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Valorização da Equipa Médica
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Os médicos dentistas dedicam o seu tempo a cirurgias e reabilitações avançadas para as quais se especializaram, aumentando a motivação e a reputação do corpo clínico.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Menor Dependência de Seguradoras
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clínica atrai pacientes particulares que pagam o valor integral do tratamento clínico com base na confiança e no resultado estético e funcional.
              </p>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Qual a área clínica prioritária na sua clínica dentária?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Na reunião de diagnóstico de 30 minutos em Horário de Lisboa, desenhamos o plano de atração para a especialidade que deseja expandir.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.common.scheduleMeeting}</span>
            </button>
            <button
              onClick={onOpenChat}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all cursor-pointer"
            >
              {t.common.speakWithOralPro}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
