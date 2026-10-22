import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/formats.css';
import './styles/kit.css';
import './styles/pay.css';
import './styles/atelier.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
