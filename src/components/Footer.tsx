import React from 'react';
import { OralProLogo } from './OralProLogo';
import { PageView } from '../types';
import { Instagram, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand lockup */}
          <div className="md:col-span-5 space-y-4">
            <OralProLogo size="md" light />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t.meta.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/oralpro.italia/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-[11px]">@oralpro.italia</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <div className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.common.lisbonTime}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-bold text-slate-200 text-xs uppercase tracking-wider block">
              {t.nav.home}
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('servicos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('metodo')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.method}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('areas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.areas}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('duvidas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contactos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('agendamento')}
                  className="hover:text-white text-blue-400 font-semibold transition-colors cursor-pointer"
                >
                  {t.common.scheduleMeeting}
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Ethics */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-bold text-slate-200 text-xs uppercase tracking-wider block">
              Compliance & Ethics
            </span>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              {t.common.medicalEthicsNotice}
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-900 text-slate-500 text-[11px]">
              <span>{t.common.confirmedClinics}</span>
              <button
                onClick={() => onNavigate('admin')}
                className="hover:text-slate-300 font-semibold"
              >
                {t.common.adminPortal}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-10 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} OralPro. {t.common.allRightsReserved}</p>
          <div className="flex items-center gap-4">
            <span>{t.common.privacy}</span>
            <span>·</span>
            <span>{t.common.terms}</span>
            <span>·</span>
            <span className="text-slate-400">{t.common.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
