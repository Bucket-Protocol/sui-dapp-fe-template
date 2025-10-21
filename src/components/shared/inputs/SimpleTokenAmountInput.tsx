'use client';

import { ForwardedRef } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { PiWarningCircleFill } from 'react-icons/pi';

import { Coin } from '@/types';
import { GAS_BUDGET } from '@/consts';
import { TOKEN_INFO } from '@/consts/tokens';
import useGetBalances from '@/hooks/queries/general/useGetBalances';
import useGetPrices from '@/hooks/queries/general/useGetPrices';
import { formatCurrency, formatTokenAmount } from '@/libs/format';
import { cn } from '@/libs/utils';
import { NumericInput } from '@/components/ui/NumericInput';
import TokenImage from '@/components/shared/TokenImage';

const SimpleTokenAmountInput = ({
  ref,
  className,
  label = 'Enter token amount',
  token,
  onSelectToken,
  amount,
  setAmount = () => {},
  error,
  disabled = false,
  readOnly = false,
}: {
  ref?: ForwardedRef<HTMLInputElement>;
  className?: string;
  label: string;
  token: Coin;
  onSelectToken?: () => void;
  amount: number;
  setAmount?: (value: number) => void;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
}) => {
  const { data: balances } = useGetBalances();
  const { data: prices } = useGetPrices();

  const tokenBalance = balances[token];
  const tokenValue = amount * prices[token];

  const maxAmount = tokenBalance - (token === 'SUI' ? GAS_BUDGET : 0);

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl border !bg-white/5 px-4 py-6',
        error ? 'border-[#FF5C5A]' : 'border-transparent',
        className,
      )}
      style={{
        backgroundImage:
          'radial-gradient(245.92% 212.67% at 92.05% 227%, rgb(255, 255, 255, 0.10) 0%, rgb(255, 255, 255, 0.02) 100%)',
      }}
    >
      <div className="relative flex w-full items-start justify-between pb-5">
        <div className="text-sm !leading-tight text-white/50">{label}</div>
        <div className="flex gap-1 text-sm !leading-tight text-white/50">
          <div>Balance: </div>
          <button
            type="button"
            className="tabular-nums text-white duration-400"
            onClick={() => setAmount(maxAmount)}
          >
            {formatTokenAmount(tokenBalance)} {TOKEN_INFO[token].symbol}
          </button>
        </div>
        {error && (
          <div className="absolute bottom-0 mb-0 flex items-center gap-1 text-xs text-error">
            <PiWarningCircleFill className="h-3 w-3 shrink-0" />
            <div>{error}</div>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex h-9 w-full items-center justify-between gap-1">
          <NumericInput
            ref={ref}
            type="text"
            className="bg-transparent w-full text-[28px] font-medium tabular-nums !leading-normal -tracking-[0.28px] caret-white placeholder:text-white/50 disabled:text-white/50"
            value={amount}
            onChange={(value) => setAmount?.(value)}
            allowNegative={false}
            maxDecimals={TOKEN_INFO[token].decimals}
            disabled={disabled}
            readOnly={readOnly}
          />
          <button
            type="button"
            className="flex h-8 shrink-0 items-center justify-end gap-1.5 rounded-full border-none bg-white/10 p-1 pr-2 hover:bg-white/20"
            onClick={onSelectToken}
          >
            <TokenImage
              className="shrink-0"
              token={token}
              size={24}
            />
            <span className="w-full whitespace-nowrap text-xl !leading-none">{TOKEN_INFO[token].symbol}</span>
            <LuChevronDown className="h-4 w-4 shrink-0" />
          </button>
        </div>
      </div>
      <div className="mt-1 h-2.5 w-full text-sm tabular-nums text-white/50">
        {!!tokenValue && <span>~ {formatCurrency(tokenValue, { spaceBetween: true })}</span>}
      </div>
    </div>
  );
};

export default SimpleTokenAmountInput;
