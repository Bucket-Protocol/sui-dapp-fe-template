import { ReactNode, StrictMode } from 'react';

import GrowthBookProvider from '@/components/layout/providers/GrowthBookProvider';
import SuiDappProvider from '@/components/layout/providers/SuiDappProvider';
import TrackingProvider from '@/components/layout/providers/TrackingProvider';
import { TTInterphasesPro } from '@/fonts';

import './globals.css';

export { metadata } from '@/consts/metadata';

const Layout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className={TTInterphasesPro.className}>
      <StrictMode>
        <SuiDappProvider>
          <GrowthBookProvider>
            <TrackingProvider>{children}</TrackingProvider>
          </GrowthBookProvider>
        </SuiDappProvider>
      </StrictMode>
    </body>
  </html>
);

export default Layout;
