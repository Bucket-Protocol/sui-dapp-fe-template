'use client';

import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { MARQUEE_CONTENT_MAP } from '@/consts/marquee';
import { useAppStateStore } from '@/stores/appStateStore';
import { cn } from '@/libs/utils';

const Marquee = () => {
  const path = usePathname();

  const { isMarqueeShown, setIsMarqueeShown } = useAppStateStore(({ isMarqueeShown, setIsMarqueeShown }) => ({
    isMarqueeShown,
    setIsMarqueeShown,
  }));
  const content = useMemo(() => {
    for (const key in MARQUEE_CONTENT_MAP) {
      const regex = new RegExp(key);

      if (regex.test(path)) {
        return MARQUEE_CONTENT_MAP[key];
      }
    }
  }, [path]);

  useEffect(() => setIsMarqueeShown(!!content), [content]);

  return (
    isMarqueeShown && (
      <div
        className={cn('fixed inset-x-0 top-16 z-marquee flex h-[42px] items-center justify-center bg-cover bg-center')}
        style={{ backgroundImage: 'url(/bgs/marquee-bg.png)' }}
      >
        <div
          className="text-sm font-medium"
          style={{ filter: 'drop-shadow(black 0 0 4px)' }}
        >
          {content}
        </div>
      </div>
    )
  );
};

export default Marquee;
