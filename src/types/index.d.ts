import { RPC_NODES } from '@/consts/network';
import { ALL_ASSETS, BTC_ASSETS, SCOIN_ASSETS, STABLE_ASSETS, SUI_ASSETS } from '@/consts/tokens';

export type RpcNode = keyof typeof RPC_NODES;

export type Wallet = {
  title: string;
  name: string;
  icon: string;
  link?: {
    desktop?: string;
    mobile?: {
      ios?: string;
      android?: string;
    };
  };
};

export type Coin = (typeof ALL_ASSETS)[number];
export type SuiCoin = (typeof SUI_ASSETS)[number];
export type BtcCoin = (typeof BTC_ASSETS)[number];
export type Scoin = (typeof SCOIN_ASSETS)[number];
export type StableCoin = (typeof STABLE_ASSETS)[number];

export type CoinBalance = Record<Coin, number>;
export type CoinPrices = Record<Coin, number>;

export type TokenInfo = {
  token: Coin;
  coinType: string;
  decimals: number;
  name: string;
  symbol: string;
  iconPath: string;
  baseToken?: Coin;
  isNew?: boolean;
};
