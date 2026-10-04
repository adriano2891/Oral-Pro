import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, PageView } from '../types';
import { translations, TranslationSchema } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  availableLanguages: Array<{ code: Language; name: string; locale: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const availableLanguages: Array<{ code: Language; name: string; locale: string }> = [
  { code: 'pt', name: 'Português', locale: 'pt-PT' },
  { code: 'en', name: 'English', locale: 'en-GB' },
  { code: 'it', name: 'Italiano', locale: 'it-IT' },
];

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  currentPage: PageView;
  onPageChange: (page: PageView) => void;
}> = ({ children, currentPage, onPageChange }) => {
  // Determine initial language: URL prefix takes priority, then localStorage, otherwise 'pt'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/en')) return 'en';
      if (path.startsWith('/it')) return 'it';
      if (path.startsWith('/pt')) return 'pt';

      const saved = localStorage.getItem('oralpro_language') as Language;
      if (saved && (saved === 'pt' || saved === 'en' || saved === 'it')) {
        return saved;
      }
    }
    return 'pt'; // Default on first visit is Portuguese (pt-PT)
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('oralpro_language', newLang);

      // Update URL path prefix while keeping same page
      const pagePath = currentPage === 'home' ? '' : `/${currentPage}`;
      const newUrl = `/${newLang}${pagePath}`;
      window.history.pushState({ lang: newLang, page: currentPage }, '', newUrl);
    }
  };

  // Sync document metadata (title, description, html lang, canonicals) for SEO
  useEffect(() => {
    const currentMeta = translations[language].meta;
    document.title = currentMeta.title;
    document.documentElement.lang = currentMeta.langCode;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentMeta.description);

    // Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentMeta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentMeta.description);

    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute('content', currentMeta.ogLocale);
  }, [language]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      let matchedLang: Language = 'pt';
      if (path.startsWith('/en')) matchedLang = 'en';
      else if (path.startsWith('/it')) matchedLang = 'it';
      else if (path.startsWith('/pt')) matchedLang = 'pt';

      setLanguageState(matchedLang);

      // Check if page in path
      const segments = path.split('/').filter(Boolean);
      if (segments.length > 1) {
        const potentialPage = segments[1] as PageView;
        if (['home', 'servicos', 'sobre', 'agendamento', 'contactos', 'admin'].includes(potentialPage)) {
          onPageChange(potentialPage);
        }
      } else if (segments.length === 1 && segments[0] !== 'admin') {
        onPageChange('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onPageChange]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
