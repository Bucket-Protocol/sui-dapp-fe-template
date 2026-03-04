'use client';

import type { UiWalletAccount } from '@mysten/dapp-kit-core';
import { useCurrentAccount, useCurrentWallet, useDAppKit } from '@mysten/dapp-kit-react';
import { LuToggleLeft } from 'react-icons/lu';

import { formatLongString } from '@/libs/format';
import { cn } from '@/libs/utils';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/Dropdown';

const AccountSwitcher = () => {
  const dAppKit = useDAppKit();
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();

  const accounts = currentWallet?.accounts ?? [];

  return accounts.length >= 1 ? (
    <DropdownMenuSub onOpenChange={() => {}}>
      <DropdownMenuSubTrigger className="flex cursor-pointer items-center justify-between rounded-lg p-2 pr-1 text-sm duration-400 hover:bg-fill-weak">
        <LuToggleLeft
          strokeWidth={2}
          className="h-4 w-4"
        />
        <span>Switch Account</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          sideOffset={12}
          alignOffset={-8}
          className="relative flex flex-col gap-1.5 rounded-xl border-none bg-white/7 p-2 backdrop-blur-md"
        >
          {accounts.map((account: UiWalletAccount) => (
            <DropdownMenuItem
              key={account.address}
              className={cn(
                'flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2 py-2 text-sm duration-400 hover:bg-fill-weak',
                account.address === currentAccount?.address ? 'font-medium text-white' : 'text-white/50',
              )}
              onClick={() => dAppKit.switchAccount({ account })}
            >
              <div
                className={cn(
                  'h-2 w-2 rounded-full bg-white',
                  account.address === currentAccount?.address ? 'bg-white' : 'bg-transparent',
                )}
              />
              <span>{formatLongString(account.address)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  ) : null;
};

export default AccountSwitcher;
