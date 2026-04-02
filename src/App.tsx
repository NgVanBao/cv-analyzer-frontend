import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PartnerLogos from './components/PartnerLogos';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import FeaturedJobs from './components/FeaturedJobs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <HeroSection />
        <PartnerLogos />
        <FeaturesSection />
        <HowItWorks />
        <FeaturedJobs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
