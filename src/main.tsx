import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "realgrid/dist/realgrid-style.css";
import App from './App.tsx';
import './styles/index.css';
import './styles/realgrid-custom.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
