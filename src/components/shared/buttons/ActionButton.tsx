'use client';

import { ComponentProps, HtmlHTMLAttributes } from 'react';
import Link from 'next/link';

import { EventPayload } from '@/types/tracking';
import { useAppStateStore } from '@/stores/appStateStore';
import { cn } from '@/libs/utils';
import Loader from '@/components/ui/Loader';

type ColorVariant = 'light' | 'dark' | 'transparent';
type SizeVariant = 'lg' | 'md' | 'sm';

const COLOR_VARIANT_MAP = {
  light: 'bg-white text-black',
  dark: 'bg-white/5 hover:bg-white/8 backdrop-blur-md',
  transparent: 'bg-transparent text-white/80 hover:bg-white/5',
};

const SIZE_VARIANT_MAP = {
  lg: 'h-14 rounded-xl !leading-6 px-5 py-4 sm:h-16 sm:text-lg sm:px-6 sm:py-5',
  md: 'h-[50px] rounded-xl !leading-[18px] px-5 py-4',
  sm: 'h-10 rounded-lg text-sm !leading-4 px-4 py-3',
};

const ActionButton = ({
  className: classNameProp,
  colorVariant = 'light',
  sizeVariant = 'lg',
  isConnected = true,
  isLoading = false,
  disabled = false,
  onClick,
  tracking,
  children = 'Connect',
  ...props
}: (HtmlHTMLAttributes<HTMLButtonElement> | ComponentProps<typeof Link>) & {
  colorVariant?: ColorVariant;
  sizeVariant?: SizeVariant;
  isConnected?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  tracking?: EventPayload;
}) => {
  const { setIsWalletModalOpen } = useAppStateStore(({ setIsWalletModalOpen }) => ({ setIsWalletModalOpen }));

  const isDisabled = isConnected && disabled;

  const className = cn(
    'relative animate-zoom flex items-center justify-center gap-2 !transition-[opacity,transform] !duration-400',
    isLoading && '!text-transparent',
    isDisabled && 'opacity-40 pointer-events-none',
    COLOR_VARIANT_MAP[colorVariant],
    SIZE_VARIANT_MAP[sizeVariant],
    classNameProp,
  );
  const handleClick = () => {
    if (!isConnected) {
      setIsWalletModalOpen(true);
    } else if (!isLoading) {
      onClick?.();
    }
  };
  return 'href' in props ? (
    <Link
      className={className}
      onClick={handleClick}
      {...(tracking && { 'data-tracking': JSON.stringify(tracking) })}
      {...props}
    >
      {isLoading && (
        <div className="transition-[property:opacity,transform] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
      {children}
    </Link>
  ) : (
    <button
      className={className}
      disabled={isDisabled}
      onClick={handleClick}
      {...(tracking && { 'data-tracking': JSON.stringify(tracking) })}
      {...props}
    >
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
      {children}
    </button>
  );
};

export default ActionButton;
