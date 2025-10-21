'use client';

import { useMemo } from 'react';
import { isValidNamedType } from '@mysten/sui/utils';

import { Coin } from '@/types';
import { TOKEN_INFO } from '@/consts/tokens';
import useGetBalances from '@/hooks/queries/general/useGetBalances';
import useGetPrices from '@/hooks/queries/general/useGetPrices';

const useSortAndFilterTokens = <T extends Coin>({
  tokens,
  promotedTokens,
  input,
  highlightNew = false,
  sortFn,
}: {
  tokens: readonly T[];
  promotedTokens?: readonly T[];
  input?: string;
  highlightNew?: boolean;
  sortFn?: ((a: T, b: T) => number) | null;
}) => {
  const { data: prices } = useGetPrices();
  const { data: balances } = useGetBalances();

  const sortedTokenList = useMemo(() => {
    if (sortFn === null) {
      return tokens;
    }
    return tokens.toSorted(
      sortFn ||
        ((a, b) => {
          const valueA = balances[a] * prices[a];
          const valueB = balances[b] * prices[b];
          const isANew = TOKEN_INFO[a].isNew;
          const isBNew = TOKEN_INFO[b].isNew;

          if (!!valueA !== !!valueB) {
            return valueA ? -1 : 1;
          }
          if (highlightNew && isANew !== isBNew) {
            return isANew ? -1 : 1;
          }
          if (valueA && valueB) {
            return valueB - valueA;
          }
          if (promotedTokens?.includes?.(a) || promotedTokens?.includes?.(b)) {
            return promotedTokens.toReversed().indexOf(b) - promotedTokens.toReversed().indexOf(a);
          }
          return a.localeCompare(b);
        }),
    );
  }, [tokens, promotedTokens, highlightNew, sortFn, prices, balances]);

  const filteredTokenList = useMemo(() => {
    if (!input) {
      return sortedTokenList;
    }
    return sortedTokenList.filter((token) => {
      const { symbol, name, coinType } = TOKEN_INFO[token];
      const normalizedInput = input.trim().toLocaleLowerCase();

      return (
        symbol.toLocaleLowerCase().includes(normalizedInput) ||
        name.toLocaleLowerCase().includes(normalizedInput) ||
        (isValidNamedType(normalizedInput) && coinType.toLocaleLowerCase() === normalizedInput)
      );
    });
  }, [input, sortedTokenList]);
  return filteredTokenList;
};

export default useSortAndFilterTokens;
