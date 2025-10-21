'use client';

import { useAccounts, useCurrentAccount, useSwitchAccount } from '@mysten/dapp-kit';
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
  const accounts = useAccounts();
  const currentAccount = useCurrentAccount();
  const { mutateAsync: switchAccount } = useSwitchAccount();

  return accounts.length >= 1 ? (
    <DropdownMenuSub onOpenChange={() => {}}>
      <DropdownMenuSubTrigger className="flex cursor-pointer items-center justify-between rounded-lg p-2 pr-1 text-sm duration-400 hover:bg-main-700">
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
          {accounts.map((account) => (
            <DropdownMenuItem
              key={account.address}
              className={cn(
                'flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2 py-2 text-sm duration-400 hover:bg-main-700',
                account === currentAccount ? 'font-medium text-white' : 'text-white/50',
              )}
              onClick={() => switchAccount({ account })}
            >
              <div
                className={cn(
                  'h-2 w-2 rounded-full bg-white',
                  account === currentAccount ? 'bg-white' : 'bg-transparent',
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
