export const RPC_NODES = {
  official: {
    name: 'Sui Official',
    baseUrl: 'https://fullnode.mainnet.sui.io:443',
    network: 'mainnet',
  },
  blast: {
    name: 'Blast',
    baseUrl: 'https://sui-mainnet.blastapi.io/7f3d6363-73f1-4e69-b820-0c628d97f412',
    network: 'mainnet',
  },
  blockVision: {
    name: 'Blockvision',
    baseUrl: 'https://sui-mainnet-endpoint.blockvision.org/',
    network: 'mainnet',
  },
  suiScan: {
    name: 'Suiscan',
    baseUrl: 'https://rpc-mainnet.suiscan.xyz/',
    network: 'mainnet',
  },
} as const;
