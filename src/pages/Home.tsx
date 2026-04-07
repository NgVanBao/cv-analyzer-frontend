import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PartnerLogos from '../components/PartnerLogos';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import FeaturedJobs from '../components/FeaturedJobs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AuthModal, { type AuthViewType } from '../components/Auth/AuthModal';

const Home: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthViewType>('login');

  const openAuthModal = (view: AuthViewType) => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="app-wrapper">
      <Header onOpenAuth={openAuthModal} />
      <main>
        <HeroSection />
        <PartnerLogos />
        <FeaturesSection />
        <HowItWorks />
        <FeaturedJobs />
        <Testimonials />
      </main>
      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialView={authView}
        onViewChange={setAuthView}
      />
    </div>
  );
};

export default Home;
