import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import WorldProvider from './components/WorldProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WorldProvider>
        <App />
      </WorldProvider>
    </BrowserRouter>
  </StrictMode>,
);
