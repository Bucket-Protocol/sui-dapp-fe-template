import { pickBy } from 'lodash';

import { Coin, CoinPrices } from '@/types';
import {
  ALL_ASSETS,
  BTC_ASSETS,
  SCOIN_ASSETS,
  STABLE_ASSETS,
  SUI_ASSETS,
  TOKEN_INFO,
  TOKEN_INFO_BY_TYPE,
} from '@/consts/tokens';

type PartialCoinPrices = Partial<CoinPrices>;

const fetchPricesFrom7k = async (...tokenList: Coin[]): Promise<PartialCoinPrices> => {
  try {
    const coinTypes = tokenList.map((token) => TOKEN_INFO[token].coinType);

    const res: Record<string, { price: number }> = await (
      await fetch('https://prices.7k.ag/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: coinTypes,
          vsCoin: TOKEN_INFO.USDC.coinType,
        }),
      })
    ).json();

    const prices = Object.entries(res).reduce((prices, [coinType, { price }]) => {
      const token = TOKEN_INFO_BY_TYPE[coinType]?.token;
      if (token) {
        prices[token] = Number(price);
      }
      return prices;
    }, {} as PartialCoinPrices);

    return prices;
  } catch {
    return {};
  }
};

const fetchPricesFromCetus = async (): Promise<PartialCoinPrices> => {
  try {
    const res = await (await fetch('https://api-sui.cetus.zone/v3/sui/market_price')).json();

    const prices = res.data.prices.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prices: PartialCoinPrices, { base_symbol, quote_symbol, price }: any) => {
        const token = TOKEN_INFO_BY_TYPE[base_symbol]?.token;
        if (token && quote_symbol === 'usd') {
          prices[token] = Number(price);
        }
        return prices;
      },
      {} as PartialCoinPrices,
    );
    return prices;
  } catch {
    return {};
  }
};

export const fetchPrices = async (): Promise<CoinPrices> => {
  const [sevenKPrices, cetusPrices] = (
    await Promise.allSettled([
      fetchPricesFrom7k(...SUI_ASSETS, ...BTC_ASSETS, ...SCOIN_ASSETS, ...STABLE_ASSETS),
      fetchPricesFromCetus(),
    ])
  ).map((result) => (result.status === 'fulfilled' ? pickBy<PartialCoinPrices>(result.value) : {}));

  return {
    ...Object.fromEntries(ALL_ASSETS.map((token) => [token, 0])),
    ...Object.fromEntries(STABLE_ASSETS.map((token) => [token, 1])),
    ...cetusPrices,
    ...sevenKPrices,
  } as CoinPrices;
};
