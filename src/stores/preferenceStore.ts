import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { RpcNode } from '@/types';
import { RPC_NODES } from '@/consts/network';

interface PreferenceState {
  rpcNode: RpcNode;
  setRpcNode: (rpcNode: RpcNode) => void;

  termOfServiceAccepted: boolean;
  setTermOfServiceAccepted: (termOfServiceAccepted: boolean) => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      rpcNode: Object.keys(RPC_NODES)[0] as RpcNode,
      setRpcNode: (rpcNode: RpcNode) => set({ rpcNode }),

      termOfServiceAccepted: false,
      setTermOfServiceAccepted: (termOfServiceAccepted: boolean) => set({ termOfServiceAccepted }),
    }),
    {
      name: 'sui-dapp-preference',
      version: 0,
      partialize: ({ rpcNode, termOfServiceAccepted }) => ({
        rpcNode,
        termOfServiceAccepted,
      }),
    },
  ),
);
