'use client';

import { ComponentProps, Dispatch, ForwardedRef, JSXElementConstructor, ReactNode, useRef } from 'react';
import { PiWarningCircleFill } from 'react-icons/pi';

import { Coin } from '@/types';
import { EventPayload } from '@/types/tracking';
import { GAS_BUDGET } from '@/consts';
import { TOKEN_INFO } from '@/consts/tokens';
import useGetBalances from '@/hooks/queries/general/useGetBalances';
import useGetPrices from '@/hooks/queries/general/useGetPrices';
import { formatCurrency, formatTokenAmount, roundPlainAmount } from '@/libs/format';
import { cn, isReactNode } from '@/libs/utils';
import { NumericInput } from '@/components/ui/NumericInput';
import SelectTokenButton from '@/components/shared/buttons/SelectTokenButton';
import SelectTokenModal from '@/components/shared/modals/SelectTokenModal';
import TokenImage from '@/components/shared/TokenImage';
import TooltipIcon from '@/components/shared/TooltipIcon';

const PERCENT_BUTTONS = [
  {
    label: '25%',
    value: 0.25,
  },
  {
    label: '50%',
    value: 0.5,
  },
  {
    label: '75%',
    value: 0.75,
  },
  {
    label: 'Max',
    value: 1,
  },
] as const;

const TokenAmountInput = <T extends Coin>({
  ref,
  className,
  classNames,
  token,
  tokens,
  setToken,
  amount,
  setAmount = () => {},
  maxAmount,
  labelComponent = ({ children }) => children,
  balanceComponent = ({ children }) => children,
  valueComponent = ({ children }) => children,
  footerComponent = ({ children }) => children,
  modalProps,
  error,
  disabled = false,
  readOnly = false,
  tracking,
}: {
  ref?: ForwardedRef<HTMLInputElement>;
  className?: string;
  classNames?: {
    root?: string;
    header?: string;
    footer?: string;
    error?: string;
  };
  token: T;
  tokens?: readonly T[];
  setToken?: Dispatch<T>;
  amount: number;
  setAmount?: (value: number) => void;
  maxAmount?: number;
  labelComponent?: ReactNode | JSXElementConstructor<{ children: ReactNode }>;
  balanceComponent?: ReactNode | JSXElementConstructor<{ children: ReactNode }>;
  valueComponent?: ReactNode | JSXElementConstructor<{ children: ReactNode }>;
  footerComponent?: ReactNode | JSXElementConstructor<{ children: ReactNode }>;
  modalProps?: Omit<
    ComponentProps<typeof SelectTokenModal<T>>,
    'isModalOpen' | 'setModalOpen' | 'token' | 'tokens' | 'setToken'
  >;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  tracking?: {
    selectTokenButton?: EventPayload;
    percentButton?: Partial<Record<(typeof PERCENT_BUTTONS)[number]['value'], EventPayload>>;
  };
}) => {
  const { data: prices } = useGetPrices();
  const { data: balances } = useGetBalances();

  const symbolRef = useRef<HTMLDivElement>(null);

  const tokenBalance = balances[token];
  const tokenValue = amount * prices[token];
  const tokenInfo = TOKEN_INFO[token];

  const LabelComponent: JSXElementConstructor<{ children: ReactNode }> = isReactNode(labelComponent)
    ? () => labelComponent as ReactNode
    : (labelComponent as JSXElementConstructor<{ children: ReactNode }>);

  const BalanceComponent: JSXElementConstructor<{ children: ReactNode }> = isReactNode(balanceComponent)
    ? () => balanceComponent as ReactNode
    : (balanceComponent as JSXElementConstructor<{ children: ReactNode }>);

  const ValueComponent: JSXElementConstructor<{ children: ReactNode }> = isReactNode(valueComponent)
    ? () => valueComponent as ReactNode
    : (valueComponent as JSXElementConstructor<{ children: ReactNode }>);

  const FooterComponent: JSXElementConstructor<{ children: ReactNode }> = isReactNode(footerComponent)
    ? () => footerComponent as ReactNode
    : (footerComponent as JSXElementConstructor<{ children: ReactNode }>);

  maxAmount = maxAmount ?? Math.max(tokenBalance - (token === 'SUI' ? GAS_BUDGET : 0), 0);

  const isTruncated = symbolRef.current?.offsetWidth !== symbolRef.current?.scrollWidth;

  const symbolComponent = (
    <div
      ref={symbolRef}
      className="max-w-[64px] overflow-hidden text-ellipsis whitespace-nowrap text-xl font-medium !leading-none sm:max-w-[164px] sm:text-2xl md:text-[28px] md:-tracking-[0.28px]"
    >
      {tokenInfo.symbol}
    </div>
  );
  return (
    <div
      className={cn(
        'relative flex w-full flex-col gap-3 rounded-xl border bg-white/5 p-4 sm:rounded-2xl sm:p-6',
        error ? 'border-[#FF5C5A]' : 'border-transparent',
        className,
        classNames?.root,
      )}
      style={{
        backgroundImage:
          'radial-gradient(245.92% 212.67% at 92.05% 227%, rgb(255, 255, 255, 0.10) 0%, rgb(255, 255, 255, 0.02) 100%)',
      }}
    >
      <div className={cn('flex w-full items-start justify-between gap-4', classNames?.header)}>
        <div className="text-xs !leading-tight text-white/50 sm:text-sm">
          <LabelComponent>Enter token amount</LabelComponent>
        </div>
        <BalanceComponent>
          <div className="flex gap-1.5 text-xs !leading-tight text-white/50 sm:text-sm">
            <div>Balance</div>
            <div className="flex items-center gap-0.5 text-nowrap font-medium text-white">
              <div className="tabular-nums">{formatTokenAmount(tokenBalance)}</div>
              <div className="max-w-[96px] overflow-hidden text-ellipsis sm:max-w-[120px]">{tokenInfo.symbol}</div>
            </div>
          </div>
        </BalanceComponent>
      </div>
      {error && (
        <div
          className={cn(
            'mb-2 flex items-center gap-1.5 text-xs font-medium tabular-nums text-error sm:mb-3 sm:text-sm',
            classNames?.error,
          )}
        >
          <PiWarningCircleFill className="h-3.5 w-3.5 shrink-0" />
          <div>{error}</div>
        </div>
      )}
      <div className="flex w-full items-center justify-between gap-1">
        <NumericInput
          ref={ref}
          type="text"
          className="bg-transparent h-9 w-full text-[28px] font-medium tabular-nums !leading-normal -tracking-[0.28px] caret-white placeholder:text-white/50 disabled:text-white/50 md:h-12 md:text-[40px] md:-tracking-[0.4px]"
          value={amount}
          onChange={(value) => setAmount?.(value)}
          allowNegative={false}
          maxDecimals={tokenInfo.decimals}
          disabled={disabled}
          readOnly={readOnly}
        />
        {!tokens ? (
          <div className="bg-transparent m-0 flex h-9 shrink-0 items-center justify-end gap-1.5 border-none p-0 sm:gap-2">
            <TokenImage
              className="aspect-square w-6 shrink-0 rounded-full sm:w-8"
              token={token}
              size={32}
            />
            {isTruncated ? <TooltipIcon content={tokenInfo.symbol}>{symbolComponent}</TooltipIcon> : symbolComponent}
          </div>
        ) : (
          <SelectTokenButton
            token={token}
            tokens={tokens}
            setToken={setToken}
            modalProps={modalProps}
            tracking={tracking?.selectTokenButton}
          />
        )}
      </div>
      <div
        className={cn(
          'flex w-full flex-col items-start justify-between gap-3 xs:flex-row xs:items-end',
          classNames?.footer,
        )}
      >
        <ValueComponent>
          <div className="flex h-[26px] items-end text-sm tabular-nums text-white/50">
            ~ {formatCurrency(tokenValue, { spaceBetween: true })}
          </div>
        </ValueComponent>
        <FooterComponent>
          <div className="flex w-full items-center gap-2 xs:w-auto">
            {PERCENT_BUTTONS.map(({ label, value }) => (
              <button
                key={label}
                type="button"
                className="flex h-8 basis-full items-center justify-center rounded-md bg-white/5 px-4 py-2 text-xs leading-none duration-400 hover:bg-white/8 disabled:pointer-events-none xs:basis-auto sm:text-sm"
                onClick={() => setAmount(roundPlainAmount(maxAmount * value, tokenInfo.token))}
                disabled={readOnly || disabled}
                {...(tracking?.percentButton?.[value] && {
                  'data-tracking': JSON.stringify(tracking?.percentButton?.[value]),
                })}
              >
                {label}
              </button>
            ))}
          </div>
        </FooterComponent>
      </div>
    </div>
  );
};

export default TokenAmountInput;
