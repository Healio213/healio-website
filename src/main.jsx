import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/i18n/i18n';
import '@/index.css';
import { capturePrerenderedBlogContent } from '@/lib/prerenderedBlogContent';

const rootElement = document.getElementById('root');
capturePrerenderedBlogContent(rootElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
