import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { CmsProvider } from './context/CmsContext';
import { useEffect } from 'react';
import ErrorBoundary from './components/common/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';

// SEO is now handled dynamically per-page by the SEO component and react-helmet-async

function App() {
  return (
    <AuthProvider>
      <CustomerAuthProvider>
        <SettingsProvider>
          <CmsProvider>
            <HelmetProvider>
              <ErrorBoundary>
                <RouterProvider router={router} />
              </ErrorBoundary>
            </HelmetProvider>
          </CmsProvider>
        </SettingsProvider>
      </CustomerAuthProvider>
    </AuthProvider>
  );
}

export default App;
