import React, { useState } from 'react';
import { OralProLogo, OralProEmblem } from './OralProLogo';
import { AgentAvatarImage } from './ChatAgent';
import { PageView } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Calendar, ShieldAlert, Menu, X, Headset } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenChat,
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark (Single Element Lockup) */}
        <button
          onClick={() => onNavigate('home')}
          className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-0.5 shrink-0 transition-opacity hover:opacity-90 cursor-pointer flex items-center"
        >
          <OralProLogo size="header" />
        </button>

        {/* Zone 2: Clean Text Navigation Links with Active Page Indicator */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {[
            { page: 'home' as PageView, label: t.nav.home },
            { page: 'servicos' as PageView, label: t.nav.services },
            { page: 'metodo' as PageView, label: t.nav.method },
            { page: 'areas' as PageView, label: t.nav.areas },
            { page: 'sobre' as PageView, label: t.nav.about },
            { page: 'duvidas' as PageView, label: t.nav.faq },
            { page: 'contactos' as PageView, label: t.nav.contact },
          ].map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`relative py-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Selector & Primary Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Discrete Language Switcher */}
          <LanguageSelector />

          {/* Admin link */}
          <button
            onClick={() => onNavigate('admin')}
            className={`p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 ${
              currentPage === 'admin' ? 'bg-slate-100 text-blue-600' : ''
            }`}
            title={t.common.adminPortal}
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Primary Action Button - Opens Dedicated Agendamento Page */}
          <button
            onClick={() => onNavigate('agendamento')}
            className={`hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer ${
              currentPage === 'agendamento'
                ? 'bg-blue-700 text-white ring-2 ring-blue-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.common.scheduleMeeting}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
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
            {[
              { page: 'home' as PageView, label: t.nav.home },
              { page: 'servicos' as PageView, label: t.nav.services },
              { page: 'metodo' as PageView, label: t.nav.method },
              { page: 'areas' as PageView, label: t.nav.areas },
              { page: 'sobre' as PageView, label: t.nav.about },
              { page: 'duvidas' as PageView, label: t.nav.faq },
              { page: 'contactos' as PageView, label: t.nav.contact },
            ].map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleMobileNav(item.page)}
                  className={`text-left px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'text-blue-600 font-bold bg-blue-50/80 border-l-4 border-blue-600'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </button>
              );
            })}
          </nav>

          {/* Mobile Language Selector */}
          <LanguageSelector variant="mobile" />

          {/* Mobile Chat with Attendant Action */}
          {onOpenChat && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-blue-200 transition-colors"
            >
              <AgentAvatarImage className="w-4 h-4 rounded-full object-cover shrink-0" />
              <span>{t.chat.buttonLabel}</span>
            </button>
          )}

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
