import { ReactNode, StrictMode } from 'react';

import GrowthBookProvider from '@/components/layout/providers/GrowthBookProvider';
import TrackingProvider from '@/components/layout/providers/TrackingProvider';
import { TTInterphasesPro } from '@/fonts';

import './globals.css';

import DappProvider from '@/components/layout/providers/DappProvider';
import QueryProvider from '@/components/layout/providers/QueryClientProvider';

export { metadata } from '@/consts/metadata';

const Layout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className={TTInterphasesPro.className}>
      <StrictMode>
        <QueryProvider>
          <DappProvider>
            <GrowthBookProvider>
              <TrackingProvider>{children}</TrackingProvider>
            </GrowthBookProvider>
          </DappProvider>
        </QueryProvider>
      </StrictMode>
    </body>
  </html>
);

export default Layout;
