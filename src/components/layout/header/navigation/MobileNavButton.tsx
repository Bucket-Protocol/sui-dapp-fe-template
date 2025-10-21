'use client';

import { useAppStateStore } from '@/stores/appStateStore';
import { cn } from '@/libs/utils';

const MobileNavButton = ({ className }: { className?: string }) => {
  const { isMobileNavOpen, setIsMobileNavOpen } = useAppStateStore(({ isMobileNavOpen, setIsMobileNavOpen }) => ({
    isMobileNavOpen,
    setIsMobileNavOpen,
  }));
  return (
    <button
      className={cn(
        'animate-zoom flex size-10 flex-col items-center justify-center gap-1 rounded-lg bg-white/3 duration-400 hover:bg-white/7',
        className,
      )}
      style={{
        backgroundImage:
          'radial-gradient(46.65% 80.24% at 53.54% 100%, rgb(255, 255, 255, 0.15) 0%, rgb(255, 255, 255, 0.03) 100%)',
      }}
      onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
    >
      <div
        className={cn('h-[1.5px] w-4 bg-white duration-400', isMobileNavOpen && 'translate-y-[5.5px] rotate-[225deg]')}
      />
      <div className={cn('h-[1.5px] w-4 bg-white duration-400', isMobileNavOpen && 'opacity-0')} />
      <div
        className={cn('h-[1.5px] w-4 bg-white duration-400', isMobileNavOpen && '-translate-y-[5.5px] rotate-[135deg]')}
      />
    </button>
  );
};

export default MobileNavButton;
