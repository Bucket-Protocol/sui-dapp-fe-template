import { ReactNode } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { EventPayload } from '@/types/tracking';
import { cn } from '@/libs/utils';

const Slider = ({
  className,
  classNames,
  value,
  onChange,
  min,
  max,
  step = 1,
  cursor,
  thumbIcon,
  ticks,
  readOnly = false,
  tracking,
}: {
  className?: string;
  classNames?: {
    root?: string;
    track?: string;
    range?: string;
    thumb?: string;
    tick?: string;
  };
  value: number;
  onChange?: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  cursor?: ReactNode;
  thumbIcon?: ReactNode;
  ticks?: (number | { value: number; label: ReactNode })[];
  readOnly?: boolean;
  tracking?: EventPayload;
}) => {
  const position = ((value - min) / (max - min)) * 100;

  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex h-4 w-full touch-none select-none items-center',
        ticks && 'mb-[22px]',
        className,
        classNames?.root,
      )}
      min={min}
      max={max}
      value={[value]}
      onValueChange={(e) => onChange?.(e[0])}
      step={step}
      disabled={readOnly}
    >
      <SliderPrimitive.Track className={cn('relative h-2 w-full grow rounded-full bg-[#4C505B]', classNames?.track)}>
        <div className="absolute inset-x-2.5 inset-y-0">
          {cursor && (
            <div
              className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2"
              style={{
                left: `min(max(${Math.max(Math.min(position, Number.MAX_VALUE), -Number.MAX_VALUE)}%, -6px), 100% + 6px)`,
              }}
            >
              {cursor}
            </div>
          )}
        </div>
        <SliderPrimitive.Range className={cn('absolute h-full rounded-full bg-[#7D95CC]', classNames?.range)} />
        <div className="absolute inset-x-2.5 inset-y-0">
          {ticks?.map?.((tick) => {
            const value = typeof tick === 'number' ? tick : tick.value;
            const label = typeof tick === 'number' ? tick : tick.label;

            return (
              <div
                key={value}
                className={cn(
                  'absolute inset-y-0 w-0.5 -translate-x-1/2',
                  ![min, max].includes(value) && 'bg-white/20',
                  classNames?.tick,
                )}
                style={{
                  left: `${((value - min) / (max - min)) * 100}%`,
                }}
              >
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 translate-y-full text-nowrap text-xs font-medium tabular-nums !leading-none">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'flex h-4 w-7 cursor-pointer items-center justify-center rounded-full bg-white duration-400 hover:bg-[#CCCCCC]',
          classNames?.thumb,
        )}
        {...(tracking && { 'data-tracking': JSON.stringify(tracking) })}
      >
        {thumbIcon}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
};

export { Slider };
