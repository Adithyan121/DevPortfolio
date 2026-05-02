import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Background3D = lazy(() => import('./components/Background3D'));
const Hero = lazy(() => import('./components/Hero'));
const AudienceSection = lazy(() => import('./components/AudienceSection'));
const ProblemSolution = lazy(() => import('./components/ProblemSolution'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const Process = lazy(() => import('./components/Process'));
const About = lazy(() => import('./components/About'));
const Pricing = lazy(() => import('./components/Pricing'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));

// Main Landing Page Component
const Home = () => (
  <main>
    <Suspense fallback={null}>
      <Background3D />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <Hero />
      <AudienceSection />
      <ProblemSolution />
      <Services />
      <Projects />
      <Process />
      <About />
      <Pricing />
    </Suspense>
  </main>
);

// Wrapper for individual pages to push content down below Navbar
const PageWrapper = ({ children }) => (
  <div style={{ paddingTop: '100px', minHeight: 'calc(100vh - 200px)' }}>
    {children}
  </div>
);

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={
          <Suspense fallback={null}>
            <PageWrapper><FAQ /></PageWrapper>
          </Suspense>
        } />
        <Route path="/contact" element={
          <Suspense fallback={null}>
            <PageWrapper><Contact /></PageWrapper>
          </Suspense>
        } />
        <Route path="/privacy" element={
          <Suspense fallback={null}>
            <PageWrapper><PrivacyPolicy /></PageWrapper>
          </Suspense>
        } />
        <Route path="/terms" element={
          <Suspense fallback={null}>
            <PageWrapper><TermsOfService /></PageWrapper>
          </Suspense>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
