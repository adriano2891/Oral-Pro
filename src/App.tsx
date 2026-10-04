import React, { useState, useEffect } from 'react';
import { PageView, Language } from './types';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChallengesSection } from './components/ChallengesSection';
import { ServicesSection } from './components/ServicesSection';
import { MethodSection } from './components/MethodSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceTrustSection } from './components/ExperienceTrustSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { ServicesPage } from './components/ServicesPage';
import { MethodPage } from './components/MethodPage';
import { AreasPage } from './components/AreasPage';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { ContactPage } from './components/ContactPage';
import { BookingPage } from './components/BookingPage';
import { BookingSystem } from './components/BookingSystem';
import { ChatAgent } from './components/ChatAgent';
import { AdminDashboard } from './components/AdminDashboard';
import { InstagramGallerySection } from './components/InstagramGallerySection';
import { DynamicCustomSections } from './components/DynamicCustomSections';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';
import { Footer } from './components/Footer';

const PAGE_ALIASES: Record<string, PageView> = {
  '': 'home',
  'inicio': 'home',
  'home': 'home',
  'servicos': 'servicos',
  'services': 'servicos',
  'servizi': 'servicos',
  'metodo': 'metodo',
  'method': 'metodo',
  'areas': 'areas',
  'aree': 'areas',
  'specialties': 'areas',
  'sobre': 'sobre',
  'about': 'sobre',
  'chi-siamo': 'sobre',
  'duvidas': 'duvidas',
  'faq': 'duvidas',
  'contactos': 'contactos',
  'contact': 'contactos',
  'contatti': 'contactos',
  'agendamento': 'agendamento',
  'booking': 'agendamento',
  'prenota': 'agendamento',
  'admin': 'admin',
};

const PAGE_TITLES: Record<string, Record<PageView, string>> = {
  pt: {
    home: 'OralPro - Marketing e Captação para Clínicas Dentárias',
    servicos: 'Serviços Especializados | OralPro',
    metodo: 'O Método em 4 Etapas | OralPro',
    areas: 'Áreas Clínicas de Alto Valor | OralPro',
    sobre: 'Sobre a OralPro & Mario Provenzano | OralPro',
    duvidas: 'Perguntas Frequentes & Dúvidas | OralPro',
    contactos: 'Contactos & Localização | OralPro',
    agendamento: 'Agendar Reunião de Diagnóstico | OralPro',
    admin: 'Painel de Gestão Comercial | OralPro',
  },
  it: {
    home: 'OralPro - Marketing e Acquisizione Pazienti per Studi Dentistici',
    servicos: 'Servizi Specialistici | OralPro',
    metodo: 'Il Metodo in 4 Fasi | OralPro',
    areas: 'Aree Cliniche ad Alto Valore | OralPro',
    sobre: 'Chi Siamo & Mario Provenzano | OralPro',
    duvidas: 'Domande Frequenti (FAQ) | OralPro',
    contactos: 'Contatti & Sede | OralPro',
    agendamento: 'Prenota Diagnosi Strategica | OralPro',
    admin: 'Pannello di Gestione | OralPro',
  },
  en: {
    home: 'OralPro - Dental Practice Marketing & High-Value Patient Acquisition',
    servicos: 'Specialized Services | OralPro',
    metodo: 'The 4-Step Methodology | OralPro',
    areas: 'High-Ticket Clinical Specialties | OralPro',
    sobre: 'About OralPro & Mario Provenzano | OralPro',
    duvidas: 'Frequently Asked Questions | OralPro',
    contactos: 'Contact Us | OralPro',
    agendamento: 'Schedule Strategic Diagnostic | OralPro',
    admin: 'Management Portal | OralPro',
  },
};

function parsePath(pathname: string): { lang?: Language; page: PageView } {
  // Support hash routing (e.g., #admin, #/admin)
  if (typeof window !== 'undefined' && window.location.hash) {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (hash && PAGE_ALIASES[hash]) {
      return { page: PAGE_ALIASES[hash] };
    }
  }

  // Support query param (e.g., ?page=admin)
  if (typeof window !== 'undefined' && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page')?.toLowerCase().trim();
    if (pageParam && PAGE_ALIASES[pageParam]) {
      return { page: PAGE_ALIASES[pageParam] };
    }
    if (params.has('admin')) {
      return { page: 'admin' };
    }
  }

  const clean = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  if (!clean) return { page: 'home' };

  const segments = clean.split('/');
  let detectedLang: Language | undefined;
  let pageSegment = segments[0];

  if (['pt', 'it', 'en'].includes(segments[0])) {
    detectedLang = segments[0] as Language;
    pageSegment = segments[1] || '';
  }

  const resolvedPage = PAGE_ALIASES[pageSegment] || 'home';
  return { lang: detectedLang, page: resolvedPage };
}

function MainAppLayout() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      return parsePath(window.location.pathname).page;
    }
    return 'home';
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Sync document title on page or language change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentLang = localStorage.getItem('oralpro_language') || 'pt';
      const titles = PAGE_TITLES[currentLang] || PAGE_TITLES.pt;
      document.title = titles[currentPage] || titles.home;
    }
  }, [currentPage]);

  // Handle browser Back & Forward buttons and hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window !== 'undefined') {
        const parsed = parsePath(window.location.pathname);
        setCurrentPage(parsed.page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL path while preserving current language prefix
    if (typeof window !== 'undefined') {
      const currentLang = localStorage.getItem('oralpro_language') || 'pt';
      const pagePath = page === 'home' ? '' : `/${page}`;
      const newUrl = `/${currentLang}${pagePath}`;
      window.history.pushState({ lang: currentLang, page }, '', newUrl);

      const titles = PAGE_TITLES[currentLang] || PAGE_TITLES.pt;
      document.title = titles[page] || titles.home;
    }
  };

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const { getCustomSectionsForPage } = useSiteContent();
  const currentCustomSections = getCustomSectionsForPage(currentPage);

  // If in admin view, render AdminDashboard full-screen
  if (currentPage === 'admin') {
    return (
      <LanguageProvider currentPage={currentPage} onPageChange={setCurrentPage}>
        <AdminDashboard onBackToSite={() => handleNavigate('home')} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider currentPage={currentPage} onPageChange={setCurrentPage}>
      <div className="min-h-screen flex flex-col bg-white selection:bg-blue-600 selection:text-white">
        {/* Top Header - Always visible with active page indicator */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBooking={() => handleNavigate('agendamento')}
          onOpenChat={handleOpenChat}
        />

        {/* Main Content Router */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <>
              <HeroSection
                onOpenBooking={() => handleNavigate('agendamento')}
                onOpenChat={handleOpenChat}
              />
              <ChallengesSection onOpenBooking={() => handleNavigate('agendamento')} />
              <ServicesSection
                onOpenBooking={() => handleNavigate('agendamento')}
                onNavigate={handleNavigate}
              />
              <MethodSection
                onOpenBooking={() => handleNavigate('agendamento')}
                onNavigate={handleNavigate}
              />
              <SpecialtiesSection
                onOpenBooking={() => handleNavigate('agendamento')}
                onNavigate={handleNavigate}
              />
              <AboutSection
                onOpenBooking={() => handleNavigate('agendamento')}
                onNavigate={handleNavigate}
              />
              <InstagramGallerySection />
              <ExperienceTrustSection onOpenBooking={() => handleNavigate('agendamento')} />
              <FAQSection
                onOpenBooking={() => handleNavigate('agendamento')}
                onOpenChat={handleOpenChat}
                onNavigate={handleNavigate}
              />
              <CTASection onOpenBooking={() => handleNavigate('agendamento')} />
            </>
          )}

          {currentPage === 'servicos' && (
            <ServicesPage
              onOpenBooking={() => handleNavigate('agendamento')}
              onOpenChat={handleOpenChat}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'metodo' && (
            <MethodPage
              onNavigate={handleNavigate}
              onOpenBooking={() => handleNavigate('agendamento')}
              onOpenChat={handleOpenChat}
            />
          )}

          {currentPage === 'areas' && (
            <AreasPage
              onNavigate={handleNavigate}
              onOpenBooking={() => handleNavigate('agendamento')}
              onOpenChat={handleOpenChat}
            />
          )}

          {currentPage === 'sobre' && (
            <AboutPage
              onOpenBooking={() => handleNavigate('agendamento')}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'duvidas' && (
            <FAQPage
              onNavigate={handleNavigate}
              onOpenBooking={() => handleNavigate('agendamento')}
              onOpenChat={handleOpenChat}
            />
          )}

          {currentPage === 'contactos' && (
            <ContactPage
              onOpenBooking={() => handleNavigate('agendamento')}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'agendamento' && (
            <BookingPage onNavigate={handleNavigate} />
          )}

          {/* Dynamic Custom Sections created via Admin CMS */}
          <DynamicCustomSections
            sections={currentCustomSections}
            onOpenBooking={() => handleNavigate('agendamento')}
            onNavigate={handleNavigate}
          />
        </main>

        {/* Footer - Always visible across all pages */}
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={() => handleNavigate('agendamento')}
        />

        {/* Reusable Booking Modal (when triggered via modal) */}
        {isBookingModalOpen && (
          <BookingSystem
            isOpenModal={true}
            onClose={handleCloseBookingModal}
            onBookingSuccess={() => {}}
          />
        )}

        {/* Humanized Conversational Agent - Always visible across all pages */}
        <ChatAgent
          isOpen={isChatOpen}
          onToggle={handleToggleChat}
          onOpenBooking={() => handleNavigate('agendamento')}
        />
      </div>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <MainAppLayout />
    </SiteContentProvider>
  );
}

