'use client';

import { useCurrentAccount, useSuiClient, useSuiClientContext } from '@mysten/dapp-kit';
import { normalizeStructTag } from '@mysten/sui/utils';

import { CoinBalance } from '@/types';
import { QUERY_KEY } from '@/consts/keys';
import { ALL_ASSETS, TOKEN_INFO, TOKEN_INFO_BY_TYPE } from '@/consts/tokens';
import useQuery, { CustomUseQueryOptions } from '@/hooks/base/useQuery';
import { toPlainAmount } from '@/libs/format';

const OLD_CETUS_TYPE = '0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS';

const INITIAL_DATA = Object.fromEntries(ALL_ASSETS.map((token) => [token, 0])) as CoinBalance;

const useGetBalances = (options: CustomUseQueryOptions<CoinBalance> = {}) => {
  const ctx = useSuiClientContext();
  const client = useSuiClient();
  const account = useCurrentAccount();

  return useQuery<CoinBalance>({
    queryKey: [QUERY_KEY.BALANCES, ctx.network, account?.address],
    initData: INITIAL_DATA,
    queryFn: async () => {
      if (!account) {
        return INITIAL_DATA;
      }
      const walletBalances = await client.getAllBalances({ owner: account?.address });

      const balances = walletBalances.reduce((balances, item) => {
        const coinType =
          item.coinType === OLD_CETUS_TYPE ? TOKEN_INFO.CETUS.coinType : normalizeStructTag(item.coinType);
        const tokenInfo = TOKEN_INFO_BY_TYPE[coinType];

        if (tokenInfo) {
          balances[tokenInfo.token] = toPlainAmount(Number(item.totalBalance), tokenInfo.token);
        }
        return balances;
      }, {} as Partial<CoinBalance>);

      return {
        ...Object.fromEntries(ALL_ASSETS.map((token) => [token, 0])),
        ...balances,
      } as CoinBalance;
    },
    refetchInterval: 10_000,
    ...options,
  });
};

export default useGetBalances;
