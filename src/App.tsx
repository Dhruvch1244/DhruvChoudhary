import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import Constellation from './components/Constellation';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import EasterEgg from './components/EasterEgg';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Kaabo from './pages/Kaabo';
import Music from './pages/Music';
import Guess from './pages/Guess';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';
import './App.css';

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="shell">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Constellation />
        <ScrollToTop />
        <EasterEgg />
        <CommandPalette />
        <Nav />
        <div className="content" id="main-content" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageTransition>
                    <Projects />
                  </PageTransition>
                }
              />
              <Route
                path="/experience"
                element={
                  <PageTransition>
                    <Experience />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                }
              />
              <Route
                path="/kaabo"
                element={
                  <PageTransition>
                    <Kaabo />
                  </PageTransition>
                }
              />
              <Route
                path="/music"
                element={
                  <PageTransition>
                    <Music />
                  </PageTransition>
                }
              />
              <Route
                path="/guess"
                element={
                  <PageTransition>
                    <Guess />
                  </PageTransition>
                }
              />
              <Route
                path="/projects/:slug"
                element={
                  <PageTransition>
                    <CaseStudy />
                  </PageTransition>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}
