import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero.tsx';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import HowWeWork from './components/HowWeWork';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import TrustedBy from './components/TrustedBy.tsx';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen">
          <Header />
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <HowWeWork />
          <Portfolio />
          <Testimonials />
          <FAQ />
          <TrustedBy />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
