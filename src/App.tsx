import { Routes, Route } from 'react-router-dom';
import AuroraBackground from './components/AuroraBackground';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import KaaboPage from './pages/KaaboPage';
import './App.css';

export default function App() {
  return (
    <>
      <AuroraBackground />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kaabo" element={<KaaboPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
