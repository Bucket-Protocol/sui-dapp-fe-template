'use client';

import { useEffect, useState } from 'react';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { LuNetwork } from 'react-icons/lu';

import { RpcNode } from '@/types';
import { EventPayload } from '@/types/tracking';
import { RPC_NODES } from '@/consts/network';
import { cn } from '@/libs/utils';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/Dropdown';

const loadLatency = async (url: string) => {
  try {
    const startTs = new Date().getTime();

    await fetch(`${url}`, {
      method: 'POST',
      body: `{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const endTs = new Date().getTime();

    return endTs - startTs;
  } catch {
    return undefined;
  }
};

const RpcSwitcher = () => {
  const { network: selectedRpcNode, selectNetwork: setSelectedRpcNode } = useSuiClientContext();

  const [isOpen, setIsOpen] = useState(false);
  const [latencies, setLatencies] = useState<Partial<Record<RpcNode, number>>>({});

  const loadLatencies = async () => {
    const results = await Promise.all(Object.values(RPC_NODES).map(({ url }) => loadLatency(url)));
    const latencies = Object.fromEntries(Object.keys(RPC_NODES).map((rpcNode, index) => [rpcNode, results[index]]));

    setLatencies(latencies);
  };
  useEffect(() => {
    loadLatencies();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        loadLatencies();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <DropdownMenuSub onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuSubTrigger className="flex cursor-pointer items-center justify-between rounded-lg p-2 pr-1 text-sm duration-400 hover:bg-main-700">
        <LuNetwork
          strokeWidth={2}
          className="h-4 w-4"
        />
        <span>RPC Setting</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          sideOffset={12}
          alignOffset={-8}
          className="relative flex flex-col gap-1.5 rounded-xl border-none bg-white/7 p-2 backdrop-blur-md"
        >
          {Object.entries(RPC_NODES).map(([rpcNode, { name }]) => (
            <DropdownMenuItem
              key={rpcNode}
              className={cn(
                'flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-2 py-2 text-sm duration-400 hover:bg-main-700',
                rpcNode === selectedRpcNode ? 'font-medium text-white' : 'text-white/50',
              )}
              onClick={() => {
                setSelectedRpcNode(rpcNode);
              }}
              data-tracking={JSON.stringify({ event: 'rpc', rpc: rpcNode } satisfies EventPayload)}
            >
              <span>{name}</span>
              <div className="flex items-center justify-end">
                <div className="h-2 w-2 rounded-full bg-white" />
                <div className="min-w-13 text-right">{latencies[rpcNode as RpcNode]}ms</div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export default RpcSwitcher;
