import { Coin } from '@/types';
import { TOKEN_INFO } from '@/consts/tokens';

const ROUNDING_METHOD = {
  UP: Math.ceil,
  DOWN: Math.floor,
  OFF: Math.round,
} as const;

export const getPrecision = (value: number) => value.toString().split('.')[1]?.length ?? 0;

export const roundNumber = (value: number, decimal: number, rounding: 'UP' | 'DOWN' | 'OFF' = 'OFF') => {
  const roundingFn = ROUNDING_METHOD[rounding];

  return roundingFn(value * 10 ** decimal) / 10 ** decimal;
};

export const roundPlainAmount = (amount: number, token: Coin, rounding: 'UP' | 'DOWN' | 'OFF' = 'OFF') =>
  roundNumber(amount, TOKEN_INFO[token].decimals, rounding);

export const toRawAmount = (amount: number, token: Coin, rounding: 'UP' | 'DOWN' | 'OFF' = 'OFF') => {
  const roundingFn = ROUNDING_METHOD[rounding];

  return roundingFn(amount * 10 ** TOKEN_INFO[token].decimals);
};

export const toPlainAmount = (amount: number, token: Coin, rounding: 'UP' | 'DOWN' | 'OFF' = 'OFF') => {
  const roundingFn = ROUNDING_METHOD[rounding];

  return roundingFn(amount) / 10 ** TOKEN_INFO[token].decimals;
};

export const formatNumber = (
  value: number,
  {
    minimumFractionDigits = 0,
    maximumFractionDigits = 4,
    significantDigits = null,
    ...options
  }: Intl.NumberFormatOptions & { significantDigits?: number | null } = {},
) => {
  if (isNaN(value)) {
    return '-';
  }
  const orderOfMagnitude = Math.floor(Math.log10(Math.abs(value)));

  const modifiedMaximumFractionDigits = significantDigits
    ? Math.max(Math.min(significantDigits - orderOfMagnitude - 1, maximumFractionDigits), minimumFractionDigits)
    : maximumFractionDigits;

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits: modifiedMaximumFractionDigits,
    notation: 'standard',
    ...options,
  });
  return formatter.format(!isNaN(value) ? value : 0);
};

export const formatCompactNumber = (value: number, options?: Parameters<typeof formatNumber>[1]) => {
  return formatNumber(value, {
    notation: 'compact',
    maximumFractionDigits: 2,
    ...options,
  });
};

export const formatTokenAmount = (
  value: number,
  options: Parameters<typeof formatNumber>[1] & { significantDigits?: number | null } = {},
) => {
  return formatNumber(value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
    significantDigits: 5,
    notation: 'standard',
    ...options,
  });
};

export const formatCurrency = (
  value: number,
  { spaceBetween = false, ...options }: Parameters<typeof formatNumber>[1] & { spaceBetween?: boolean } = {},
) => {
  const string = formatNumber(value, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    significantDigits: 5,
    ...options,
  });
  return spaceBetween ? string.replace('$', '$ ') : string;
};

export const formatPercent = (
  value: number,
  { spaceBetween = false, ...options }: Parameters<typeof formatNumber>[1] & { spaceBetween?: boolean } = {},
) => {
  const string = formatNumber(value, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  });
  return spaceBetween ? string.replace('%', ' %') : string;
};

export const formatLongString = (address: string, first: number = 6, last: number = 4) => {
  return address.substring(0, first) + '...' + address.substring(address.length - last);
};
