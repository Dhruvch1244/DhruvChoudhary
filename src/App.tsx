import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import Constellation from './components/Constellation';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Kaabo from './pages/Kaabo';
import CaseStudy from './pages/CaseStudy';
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
        <Constellation />
        <ScrollToTop />
        <Nav />
        <div className="content">
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
                path="/projects/:slug"
                element={
                  <PageTransition>
                    <CaseStudy />
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
