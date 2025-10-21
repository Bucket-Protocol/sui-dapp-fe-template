'use client';

import { ComponentProps, Dispatch, useRef, useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { Coin } from '@/types';
import { EventPayload } from '@/types/tracking';
import { TOKEN_INFO } from '@/consts/tokens';
import SelectTokenModal from '@/components/shared/modals/SelectTokenModal';
import TokenImage from '@/components/shared/TokenImage';
import TooltipIcon from '@/components/shared/TooltipIcon';

const SelectTokenButton = <T extends Coin>({
  token,
  tokens,
  setToken,
  modalProps,
  tracking,
}: {
  token: T;
  tokens: readonly T[];
  setToken?: Dispatch<T>;
  modalProps?: Omit<
    ComponentProps<typeof SelectTokenModal<T>>,
    'isModalOpen' | 'setModalOpen' | 'token' | 'tokens' | 'setToken'
  >;
  tracking?: EventPayload;
}) => {
  const symbolRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // eslint-disable-next-line react-hooks/refs
  const isTruncated = symbolRef.current?.offsetWidth !== symbolRef.current?.scrollWidth;

  const symbolComponent = (
    <div
      ref={symbolRef}
      className="max-w-[64px] overflow-hidden text-ellipsis whitespace-nowrap text-xl font-medium !leading-none sm:max-w-[164px] sm:text-2xl md:text-[28px] md:-tracking-[0.28px]"
    >
      {TOKEN_INFO[token].symbol}
    </div>
  );
  return (
    <>
      <button
        type="button"
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/5 p-2 pr-3 duration-400 hover:bg-white/8 md:gap-2"
        style={{
          backgroundImage:
            'radial-gradient(245.92% 212.67% at 92.05% 227%, rgb(255, 255, 255, 0.10) 0%, rgb(255, 255, 255, 0.02) 100%)',
        }}
        onClick={() => setIsModalOpen(true)}
        {...(tracking && { 'data-tracking': JSON.stringify(tracking) })}
      >
        <TokenImage
          className="aspect-square w-6 sm:w-7 md:w-8"
          token={token}
          size={32}
        />
        {isTruncated ? (
          <TooltipIcon content={TOKEN_INFO[token].symbol}>{symbolComponent}</TooltipIcon>
        ) : (
          symbolComponent
        )}
        <HiOutlineChevronDown className="h-4 w-4 text-white/60 sm:h-5 sm:w-5" />
      </button>
      <SelectTokenModal
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        tokens={tokens}
        setToken={setToken}
        {...modalProps}
      />
    </>
  );
};

export default SelectTokenButton;
