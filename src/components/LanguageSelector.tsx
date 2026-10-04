import React from 'react';
import { useLanguage, availableLanguages } from '../i18n/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'inline' | 'dropdown' | 'mobile';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'inline',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-selector-container')) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [dropdownOpen]);

  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200/80 ${className}`}>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>Idioma / Language / Lingua</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {availableLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all text-center ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {lang.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Inline format with text labels (Português | English | Italiano)
  return (
    <div className={`lang-selector-container relative inline-flex items-center ${className}`}>
      {/* Desktop segmented switch */}
      <div className="hidden sm:flex items-center text-xs font-medium bg-slate-100/90 rounded-lg p-1 border border-slate-200/60">
        <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
        {availableLanguages.map((lang, idx) => {
          const isSelected = language === lang.code;
          return (
            <React.Fragment key={lang.code}>
              {idx > 0 && <span className="text-slate-300 mx-0.5 select-none">|</span>}
              <button
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={lang.locale}
              >
                {lang.name}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile compact dropdown button */}
      <div className="sm:hidden relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
          aria-label="Selecionar idioma"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>{availableLanguages.find((l) => l.code === language)?.name}</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
            {availableLanguages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
