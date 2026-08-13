import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Kaabo from './pages/Kaabo';
import './App.css';

export default function App() {
  return (
    <div className="shell">
      <Nav />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/kaabo" element={<Kaabo />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
