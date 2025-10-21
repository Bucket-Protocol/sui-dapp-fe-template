'use client';

import { cn } from '@/libs/utils';

const DashedLine = ({ className }: { className?: string }) => (
  <div
    className={cn('h-px grow bg-[length:4px] bg-repeat', className)}
    style={{
      backgroundImage: 'linear-gradient(to right, rgb(255,255,255,0.12) 50%, transparent 50%)',
    }}
  />
);

export default DashedLine;
