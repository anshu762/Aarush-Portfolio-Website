import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import Certificates from './components/sections/Certificates';
import Extracurriculars from './components/sections/Extracurriculars';
import Contact from './components/sections/Contact.jsx';
import BackToTop from './components/comman/BackToTop.jsx';
import Loader from './components/comman/Loader.jsx';
import ErrorBoundary from './components/comman/ErrorBoundary.jsx';
import DeafAssist from './components/sections/DeafAssist';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Ensure smooth loading experience
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      setTimeout(handleLoad, 1500);
    } else {
      window.addEventListener('load', () => setTimeout(handleLoad, 1500));
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <DeafAssist />
        <Achievements />
        <Certificates />
        <Extracurriculars />
        <Contact />
        <BackToTop />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;