'use client';

import { ElementType } from 'react';
import { merge } from 'lodash';
import type { PartialOptions } from 'overlayscrollbars';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentProps } from 'overlayscrollbars-react';

import { cn } from '@/libs/utils';

const DEFAULT_OPTIONS: PartialOptions = {
  overflow: {
    x: 'scroll',
    y: 'scroll',
  },
  scrollbars: {
    theme: 'os-theme-light',
    visibility: 'auto',
    autoHide: 'move',
    autoHideDelay: 800,
  },
};

const ScrollbarContainer = <T extends ElementType = 'div'>({
  className,
  options: optionsProp,
  defer = true,
  children,
  ...restProps
}: OverlayScrollbarsComponentProps<T>) => {
  const options = merge({}, DEFAULT_OPTIONS, optionsProp);

  return (
    <>
      {/*  @ts-expect-error ignore type check */}
      <OverlayScrollbarsComponent<T>
        className={cn(
          '[&_.os-scrollbar-handle:hover]:bg-white/40 [&_.os-scrollbar-handle]:bg-white/30 [&_.os-scrollbar]:cursor-grab [&_.os-scrollbar]:duration-400 [&_.os-scrollbar]:[--os-handle-max-size:90px] [&_.os-scrollbar]:[--os-size:8px] sm:[&_.os-scrollbar]:[--os-size:10px]',
          className,
        )}
        defer={defer}
        options={options}
        {...restProps}
      >
        {children}
      </OverlayScrollbarsComponent>
    </>
  );
};

export default ScrollbarContainer;
