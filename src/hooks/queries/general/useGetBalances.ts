'use client';

import { useCurrentAccount, useCurrentClient } from '@mysten/dapp-kit-react';
import { SuiClientTypes } from '@mysten/sui/client';
import { SuiGrpcClient } from '@mysten/sui/grpc';
import { normalizeStructTag } from '@mysten/sui/utils';

import { CoinBalance } from '@/types';
import { QUERY_KEY } from '@/consts/keys';
import { ALL_ASSETS, TOKEN_INFO, TOKEN_INFO_BY_TYPE } from '@/consts/tokens';
import { usePreferenceStore } from '@/stores/preferenceStore';
import useQuery, { CustomUseQueryOptions } from '@/hooks/base/useQuery';
import { toPlainAmount } from '@/libs/format';

const OLD_CETUS_TYPE = '0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS';

const INITIAL_DATA = Object.fromEntries(ALL_ASSETS.map((token) => [token, 0])) as CoinBalance;

const getAllBalances = async ({
  client,
  address,
  limit = 1000,
}: {
  client: SuiGrpcClient;
  address: string;
  limit?: number;
}) => {
  const responses: SuiClientTypes.Balance[] = [];
  let cursor: string | null | undefined = undefined;

  while (true) {
    const { balances, hasNextPage, cursor: nextCursor } = await client.listBalances({ owner: address, cursor });

    responses.concat(balances);
    cursor = nextCursor;

    if (!hasNextPage || responses.length > limit) {
      return responses;
    }
  }
};

const useGetBalances = (options: CustomUseQueryOptions<CoinBalance> = {}) => {
  const rpcNode = usePreferenceStore((state) => state.rpcNode);
  const client = useCurrentClient();
  const account = useCurrentAccount();

  return useQuery<CoinBalance>({
    queryKey: [QUERY_KEY.BALANCES, rpcNode, account?.address],
    initData: INITIAL_DATA,
    queryFn: async () => {
      if (!account) {
        return INITIAL_DATA;
      }
      const response = await getAllBalances({ client, address: account.address });

      const balances = response.reduce((balances, item) => {
        const coinType =
          item.coinType === OLD_CETUS_TYPE ? TOKEN_INFO.CETUS.coinType : normalizeStructTag(item.coinType);
        const tokenInfo = TOKEN_INFO_BY_TYPE[coinType];

        if (tokenInfo) {
          balances[tokenInfo.token] = toPlainAmount(Number(item.balance), tokenInfo.token);
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
