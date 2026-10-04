import React, { useState } from 'react';
import { OralProLogo } from './OralProLogo';
import { PageView } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Calendar, ShieldAlert, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single Element Lockup) */}
        <button
          onClick={() => onNavigate('home')}
          className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
        >
          <OralProLogo size="md" />
        </button>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-blue-600 ${
              currentPage === 'home' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => onNavigate('servicos')}
            className={`transition-colors hover:text-blue-600 ${
              currentPage === 'servicos' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            {t.nav.services}
          </button>
          <button
            onClick={() => {
              if (currentPage !== 'home') onNavigate('home');
              setTimeout(() => {
                document.getElementById('metodo')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="transition-colors hover:text-blue-600"
          >
            {t.nav.method}
          </button>
          <button
            onClick={() => {
              if (currentPage !== 'home') onNavigate('home');
              setTimeout(() => {
                document.getElementById('areas')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="transition-colors hover:text-blue-600"
          >
            {t.nav.areas}
          </button>
          <button
            onClick={() => onNavigate('sobre')}
            className={`transition-colors hover:text-blue-600 ${
              currentPage === 'sobre' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => {
              if (currentPage !== 'home') onNavigate('home');
              setTimeout(() => {
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="transition-colors hover:text-blue-600"
          >
            {t.nav.faq}
          </button>
          <button
            onClick={() => onNavigate('contactos')}
            className={`transition-colors hover:text-blue-600 ${
              currentPage === 'contactos' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Zone 3: Language Selector & Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Discrete Language Switcher */}
          <LanguageSelector />

          {/* Admin link */}
          <button
            onClick={() => onNavigate('admin')}
            className={`p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors ${
              currentPage === 'admin' ? 'bg-slate-100 text-blue-600' : ''
            }`}
            title={t.common.adminPortal}
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.common.scheduleMeeting}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleMobileNav('home')}
              className={`text-left px-3 py-2 rounded-lg hover:bg-slate-50 ${
                currentPage === 'home' ? 'text-blue-600 font-bold bg-blue-50/50' : ''
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleMobileNav('servicos')}
              className={`text-left px-3 py-2 rounded-lg hover:bg-slate-50 ${
                currentPage === 'servicos' ? 'text-blue-600 font-bold bg-blue-50/50' : ''
              }`}
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => {
                handleMobileNav('home');
                setTimeout(() => {
                  document.getElementById('metodo')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t.nav.method}
            </button>
            <button
              onClick={() => {
                handleMobileNav('home');
                setTimeout(() => {
                  document.getElementById('areas')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t.nav.areas}
            </button>
            <button
              onClick={() => handleMobileNav('sobre')}
              className={`text-left px-3 py-2 rounded-lg hover:bg-slate-50 ${
                currentPage === 'sobre' ? 'text-blue-600 font-bold bg-blue-50/50' : ''
              }`}
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => {
                handleMobileNav('home');
                setTimeout(() => {
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleMobileNav('contactos')}
              className={`text-left px-3 py-2 rounded-lg hover:bg-slate-50 ${
                currentPage === 'contactos' ? 'text-blue-600 font-bold bg-blue-50/50' : ''
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Mobile Language Selector */}
          <LanguageSelector variant="mobile" />

          {/* Mobile Primary Action */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.common.scheduleMeeting}</span>
          </button>
        </div>
      )}
    </header>
  );
};
