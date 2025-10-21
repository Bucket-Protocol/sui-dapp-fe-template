'use client';

import { LuLink } from 'react-icons/lu';

import { useAppStateStore } from '@/stores/appStateStore';

const ConnectButton = () => {
  const { setIsWalletModalOpen } = useAppStateStore(({ setIsWalletModalOpen }) => ({ setIsWalletModalOpen }));
  return (
    <button
      type="button"
      className="animate-zoom relative flex h-10 items-center gap-2 rounded-lg border border-transparent bg-white/3 p-3 outline-none ring-0 hover:bg-white/7"
      style={{
        backgroundImage:
          'radial-gradient(46.65% 80.24% at 53.54% 100%, rgb(255, 255, 255, 0.15) 0%, rgb(255, 255, 255, 0.03) 100%)',
      }}
      onClick={() => {
        setIsWalletModalOpen(true);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl border border-transparent"
        style={{
          background:
            'conic-gradient(from 0deg, rgb(255, 255, 255, 0) 115deg, rgb(255, 255, 255, 0.8) 180deg, rgb(255, 255, 255, 0) 245deg) border-box',
          mask: 'linear-gradient(white 0 0) content-box, linear-gradient(white 0 0)',
          maskComposite: 'exclude',
        }}
      />
      <span className="text-xs font-medium sm:text-sm">Connect Wallet</span>
      <LuLink calcMode="w-3 h-3" />
    </button>
  );
};
export default ConnectButton;
