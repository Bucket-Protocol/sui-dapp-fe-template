'use client';

import { useSuiClientContext } from '@mysten/dapp-kit';

import { CoinPrices } from '@/types';
import { QUERY_KEY } from '@/consts/keys';
import { ALL_ASSETS, STABLE_ASSETS } from '@/consts/tokens';
import useQuery, { CustomUseQueryOptions } from '@/hooks/base/useQuery';
import { fetchPrices } from '@/libs/price';

const INITIAL_DATA = {
  ...Object.fromEntries(ALL_ASSETS.map((token) => [token, 0])),
  ...Object.fromEntries(STABLE_ASSETS.map((token) => [token, 1])),
} as CoinPrices;

const useGetPrices = (options: CustomUseQueryOptions<CoinPrices> = {}) => {
  const ctx = useSuiClientContext();

  return useQuery<CoinPrices>({
    queryKey: [QUERY_KEY.PRICES, ctx.network],
    initData: INITIAL_DATA,
    queryFn: async () => fetchPrices(),
    refetchInterval: 10_000,
    ...options,
  });
};

export default useGetPrices;
