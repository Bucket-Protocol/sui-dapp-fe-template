import { getFullnodeUrl } from '@mysten/sui/client';

export const NETWORK = 'mainnet';

export const RPC_NODES = {
  official: {
    name: 'Sui Official',
    url: getFullnodeUrl('mainnet'),
  },
  blast: {
    name: 'Blast',
    url: 'https://sui-mainnet.blastapi.io/7f3d6363-73f1-4e69-b820-0c628d97f412',
  },
  blockVision: {
    name: 'Blockvision',
    url: 'https://sui-mainnet-endpoint.blockvision.org/',
  },
  suiScan: {
    name: 'Suiscan',
    url: 'https://rpc-mainnet.suiscan.xyz/',
  },
} as const;
