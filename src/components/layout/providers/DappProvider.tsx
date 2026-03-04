'use client';

import React from 'react';
import { createDAppKit, DAppKitProvider } from '@mysten/dapp-kit-react';
import { SuiGrpcClient } from '@mysten/sui/grpc';

import { RpcNode } from '@/types';
import { RPC_NODES } from '@/consts/network';

const getDefaultRpcNode = (): RpcNode => {
  if (typeof window === 'undefined') {
    return Object.keys(RPC_NODES)[0] as RpcNode;
  }
  try {
    const stored = localStorage.getItem('sui-dapp-preference');

    if (stored) {
      const { state } = JSON.parse(stored);
      if (state?.rpcNode && state.rpcNode in RPC_NODES) {
        return state.rpcNode as RpcNode;
      }
    }
  } catch {}

  return Object.keys(RPC_NODES)[0] as RpcNode;
};

// Module-level inner client — swapped when the user changes RPC node
let _innerClient = new SuiGrpcClient({
  baseUrl: RPC_NODES[getDefaultRpcNode()].baseUrl,
  network: 'mainnet',
});

// Proxy that always delegates to the current _innerClient.
// Using a Proxy means we never need to re-create the dAppKit instance when
// switching RPC nodes: every call is forwarded to the latest _innerClient.
const rpcClient = new Proxy(_innerClient, {
  get(_target, prop: string | symbol) {
    const value = Reflect.get(_innerClient, prop, _innerClient);
    return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(_innerClient) : value;
  },
}) as SuiGrpcClient;

/** Swap the underlying gRPC client when the user selects a different RPC node. */
export function switchRpcEndpoint(baseUrl: string) {
  _innerClient = new SuiGrpcClient({ baseUrl, network: 'mainnet' });
}

const dAppKit = createDAppKit({
  networks: ['mainnet'],
  defaultNetwork: 'mainnet',
  createClient: () => rpcClient,
  slushWalletConfig: {
    appName: 'Bucket Protocol',
  },
});

declare module '@mysten/dapp-kit-react' {
  interface Register {
    dAppKit: typeof dAppKit;
  }
}

const DappProvider = ({ children }: { children: React.ReactNode }) => (
  <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>
);

export default DappProvider;
