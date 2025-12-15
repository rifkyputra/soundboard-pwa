import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

// Create QueryClient instance for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <HelmetProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </HelmetProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </StrictMode>,
  );
}

export default render;
