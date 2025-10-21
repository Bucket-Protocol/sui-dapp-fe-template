'use client';

import { ReactNode } from 'react';

import { useAppStateStore } from '@/stores/appStateStore';
import { cn } from '@/libs/utils';
import ScrollbarContainer from '@/components/ui/ScrollbarContainer';

const Main = ({ children }: { children: ReactNode }) => {
  const { isMarqueeShown } = useAppStateStore(({ isMarqueeShown }) => ({ isMarqueeShown }));

  return (
    <ScrollbarContainer className="[&_.os-scrollbar]:z-50">
      <div
        className={cn(
          'mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-8 md:px-12 lg:mb-22 lg:px-16',
          isMarqueeShown ? 'mt-[106px]' : 'mt-16',
        )}
      >
        {children}
      </div>
    </ScrollbarContainer>
  );
};

export default Main;
