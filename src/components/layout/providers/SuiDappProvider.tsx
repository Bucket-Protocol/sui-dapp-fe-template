'use client';

import React from 'react';
import { SuiClientProvider, WalletProvider as SuiWalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RPC_NODES } from '@/consts/network';
import { usePreferenceStore } from '@/stores/preferenceStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300_000,
    },
  },
});

const SuiDappProvider = ({ children }: { children: React.ReactNode }) => {
  const { rpcNode, setRpcNode } = usePreferenceStore(({ rpcNode, setRpcNode }) => ({ rpcNode, setRpcNode }));

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={RPC_NODES}
        defaultNetwork={rpcNode}
        onNetworkChange={(rpcNode) => setRpcNode(rpcNode)}
      >
        <SuiWalletProvider
          autoConnect={true}
          slushWallet={{
            name: '* Protocol',
          }}
        >
          {children}
        </SuiWalletProvider>{' '}
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default SuiDappProvider;
