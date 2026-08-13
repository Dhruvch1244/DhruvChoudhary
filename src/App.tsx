import { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import './App.css';

const DEEP_LINKS: Record<string, string> = {
  '/': 'help',
  '/kaabo': 'open kaabo',
  '/projects': 'projects',
  '/about': 'about',
  '/experience': 'experience',
  '/skills': 'skills',
  '/contact': 'contact',
  '/resume': 'resume',
};

export default function App() {
  const [initialCommand] = useState(() => DEEP_LINKS[window.location.pathname] ?? 'help');

  return (
    <div className="crt-root">
      <MatrixRain />
      <div className="crt-overlay" aria-hidden="true" />
      <Terminal initialCommand={initialCommand} />
    </div>
  );
}
