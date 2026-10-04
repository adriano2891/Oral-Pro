import React, { useState } from 'react';
import { PageView } from './types';
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
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { BookingSystem } from './components/BookingSystem';
import { ChatAgent } from './components/ChatAgent';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

function MainAppLayout() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const segments = path.split('/').filter(Boolean);
      if (segments.length > 1) {
        const potentialPage = segments[1] as PageView;
        if (['home', 'servicos', 'sobre', 'agendamento', 'contactos', 'admin'].includes(potentialPage)) {
          return potentialPage;
        }
      } else if (segments.length === 1 && segments[0] === 'admin') {
        return 'admin';
      }
    }
    return 'home';
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL path while preserving current language prefix
    if (typeof window !== 'undefined') {
      const currentLang = localStorage.getItem('oralpro_language') || 'pt';
      const pagePath = page === 'home' ? '' : `/${page}`;
      window.history.pushState({ lang: currentLang, page }, '', `/${currentLang}${pagePath}`);
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
        {/* Top Header */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBookingModal}
        />

        {/* Main Content Router */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <>
              <HeroSection
                onOpenBooking={handleOpenBookingModal}
                onOpenChat={handleOpenChat}
              />
              <ChallengesSection onOpenBooking={handleOpenBookingModal} />
              <ServicesSection onOpenBooking={handleOpenBookingModal} />
              <MethodSection onOpenBooking={handleOpenBookingModal} />
              <SpecialtiesSection onOpenBooking={handleOpenBookingModal} />
              <AboutSection onOpenBooking={handleOpenBookingModal} />
              <ExperienceTrustSection onOpenBooking={handleOpenBookingModal} />
              <FAQSection
                onOpenBooking={handleOpenBookingModal}
                onOpenChat={handleOpenChat}
              />
              <CTASection onOpenBooking={handleOpenBookingModal} />
            </>
          )}

          {currentPage === 'servicos' && (
            <ServicesPage
              onOpenBooking={handleOpenBookingModal}
              onOpenChat={handleOpenChat}
            />
          )}

          {currentPage === 'sobre' && (
            <AboutPage onOpenBooking={handleOpenBookingModal} />
          )}

          {currentPage === 'contactos' && (
            <ContactPage onOpenBooking={handleOpenBookingModal} />
          )}

          {currentPage === 'agendamento' && (
            <BookingSystem onBookingSuccess={() => {}} />
          )}
        </main>

        {/* Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBookingModal}
        />

        {/* Reusable Booking Modal */}
        {isBookingModalOpen && (
          <BookingSystem
            isOpenModal={true}
            onClose={handleCloseBookingModal}
            onBookingSuccess={() => {}}
          />
        )}

        {/* Humanized Conversational Agent */}
        <ChatAgent
          isOpen={isChatOpen}
          onToggle={handleToggleChat}
          onOpenBooking={handleOpenBookingModal}
        />
      </div>
    </LanguageProvider>
  );
}

export default function App() {
  return <MainAppLayout />;
}
