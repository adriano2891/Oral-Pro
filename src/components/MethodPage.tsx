import React from 'react';
import { Search, Compass, Rocket, Activity, Check, ArrowRight, ShieldCheck, ChevronRight, Calendar, Users, Target } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PageView } from '../types';

interface MethodPageProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const MethodPage: React.FC<MethodPageProps> = ({ onNavigate, onOpenBooking, onOpenChat }) => {
  const { t } = useLanguage();
  const icons = [Search, Compass, Rocket, Activity];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">
            {t.nav.home}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{t.nav.method}</span>
        </nav>

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>{t.method.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            {t.method.title}
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            {t.method.subtitle}
          </p>
        </div>

        {/* 4 Steps In-Depth Layout */}
        <div className="space-y-12 mb-20">
          {t.method.steps.map((s, idx) => {
            const Icon = icons[idx] || Search;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={s.step}
                className={`p-8 sm:p-10 rounded-2xl border transition-all ${
                  isEven
                    ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
                    : 'bg-slate-50 text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-md tracking-wider ${
                          isEven
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {s.step}
                      </span>
                      <span className={`text-xs font-semibold uppercase tracking-wider ${isEven ? 'text-blue-400' : 'text-slate-500'}`}>
                        {s.subtitle}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {s.title}
                    </h2>

                    <p className={`text-sm sm:text-base leading-relaxed ${isEven ? 'text-slate-300' : 'text-slate-700'}`}>
                      {s.description}
                    </p>

                    <div className="pt-4 space-y-2.5">
                      <h4 className={`text-xs font-bold uppercase tracking-wider ${isEven ? 'text-slate-400' : 'text-slate-900'}`}>
                        Ações Clínicas & Comerciais:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                        {s.details.map((d) => (
                          <div
                            key={d}
                            className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs leading-relaxed ${
                              isEven
                                ? 'bg-slate-800/90 border-slate-700 text-slate-200'
                                : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                            }`}
                          >
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
                    <div
                      className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center ${
                        isEven ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-3">
                        <Icon className="w-7 h-7 text-blue-600" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Impacto na Clínica
                      </span>
                      <p className={`text-xs font-medium leading-relaxed ${isEven ? 'text-slate-300' : 'text-slate-600'}`}>
                        {idx === 0 && 'Previsibilidade exata da capacidade produtiva sem sobrecarregar a equipa médica.'}
                        {idx === 1 && 'Posicionamento clínico sólido que afasta curiosos e atrai quem valoriza qualidade.'}
                        {idx === 2 && 'Campanhas hiper-segmentadas gerando contactos já pré-qualificados para a receção.'}
                        {idx === 3 && 'Revisão constante da taxa de comparência e fecho de tratamentos integrais.'}
                      </p>
                    </div>

                    <button
                      onClick={onOpenBooking}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isEven
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                      }`}
                    >
                      <span>Aplicar este passo à clínica</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Methodology Comparison Table */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 mb-16">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
              A Diferença Entre Marketing Genérico e a Assessoria OralPro
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
              Não entregamos apenas cliques ou visualizações vazias. Estruturamos o fluxo completo de pacientes de alto valor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-rose-200/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Agências Genéricas de Marketing</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Focam-se em métricas de vaidade (gostos, seguidores e impressões).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Atraem curiosos que apenas procuram o preço mais barato ou limpeza gratuita.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Desconhecem os procedimentos clínicos (All-on-4, alinhadores, facetas cerâmicas).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Não formam a receção da clínica para converter contactos em presenças reais.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-blue-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Método Exclusivo OralPro</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Foco direto em primeiras consultas de tratamentos de alto valor e faturação.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Triagem ativa que afasta curiosos antes de ocuparem a agenda do consultório.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Especialização 100% odontológica com experiência de mais de 281 clínicas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Scripts e acompanhamento comercial da equipa da receção em tempo real.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Quer ver este método aplicado à sua clínica?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Agende uma reunião de diagnóstico comercial de 30 minutos em Horário de Lisboa (Europe/Lisbon) com a nossa equipa.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{t.common.scheduleMeeting}</span>
            </button>
            <button
              onClick={onOpenChat}
              className="bg-blue-800/80 hover:bg-blue-800 text-white border border-blue-400/40 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all cursor-pointer"
            >
              {t.common.speakWithOralPro}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
