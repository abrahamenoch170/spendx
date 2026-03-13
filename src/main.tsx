import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TabProvider } from './context/TabContext';
import { VenueProvider } from './context/VenueContext';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker
if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TabProvider>
        <VenueProvider>
          <App />
        </VenueProvider>
      </TabProvider>
    </BrowserRouter>
  </StrictMode>,
);
