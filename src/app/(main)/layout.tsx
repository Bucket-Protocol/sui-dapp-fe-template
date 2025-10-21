import { ReactNode, Suspense } from 'react';

import { TooltipProvider } from '@/components/ui/Tooltip';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/header/Header';
import Marquee from '@/components/layout/header/Marquee';
import Main from '@/components/layout/Main';
import TermOfServiceModal from '@/components/layout/modals/TermOfServiceModal';
import WalletModal from '@/components/layout/modals/WalletModal';
import ToastContainer from '@/components/layout/toast/ToastContainer';

const Layout = ({ children }: { children: ReactNode }) => (
  <Suspense>
    <TooltipProvider>
      <main
        className="relative flex h-svh w-full flex-col bg-cover bg-fixed bg-no-repeat"
        style={{ backgroundImage: 'url(/bgs/main-bg.png)' }}
      >
        <Header />
        <Marquee />
        <Main>{children}</Main>
        <Footer />
        <WalletModal />
        <TermOfServiceModal />
        <ToastContainer />
      </main>
    </TooltipProvider>
  </Suspense>
);

export default Layout;
