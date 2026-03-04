'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useCurrentAccount, useCurrentClient, useDAppKit } from '@mysten/dapp-kit-react';
import { useQuery } from '@tanstack/react-query';
import { BiExit } from 'react-icons/bi';
import { LuClipboardCopy } from 'react-icons/lu';
import { SlMagnifier } from 'react-icons/sl';
import { toast } from 'react-toastify';

import { formatLongString } from '@/libs/format';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/Dropdown';
import AccountSwitcher from '@/components/layout/header/dropdowns/AccountSwitcher';
import RpcMenu from '@/components/layout/header/dropdowns/RpcSwitcher';

const AccountMenu = () => {
  const dAppKit = useDAppKit();
  const account = useCurrentAccount();
  const client = useCurrentClient();

  const { data: suiName } = useQuery({
    queryKey: ['suiNS', account?.address],
    queryFn: async () => {
      const result = await client.nameService.reverseLookupName({ address: account!.address });

      return result?.response.record?.name;
    },
    enabled: !!account?.address,
    staleTime: 300_000,
  });
  const displayName = useMemo(() => {
    if (suiName) {
      if (suiName.length < 14) {
        return suiName.slice(0, 6) + '...' + suiName.slice(-3);
      }
      return suiName;
    }
    if (account) {
      return formatLongString(account.address);
    }
    return undefined;
  }, [account, suiName]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="animate-zoom relative flex h-10 items-center gap-1.5 rounded-lg bg-white/3 p-3 outline-none ring-0 duration-400 hover:bg-white/7"
        style={{
          backgroundImage:
            'radial-gradient(46.65% 80.24% at 53.54% 100%, rgb(255, 255, 255, 0.15) 0%, rgb(255, 255, 255, 0.03) 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-xl border border-transparent"
          style={{
            background:
              'conic-gradient(from 0deg, rgb(255, 255, 255, 0) 115deg, rgb(255, 255, 255, 0.8) 180deg, rgb(255, 255, 255, 0) 245deg) border-box',
            mask: 'linear-gradient(white 0 0) content-box, linear-gradient(white 0 0)',
            maskComposite: 'exclude',
          }}
        />
        <div className="aspect-square w-2.5 rounded-full bg-white" />
        <span className="text-sm font-medium">{displayName ? displayName : 'Connect'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col gap-1.5 !rounded-2xl border-none bg-white/7 p-2 backdrop-blur-md"
        align="end"
      >
        <AccountSwitcher />
        <DropdownMenuItem
          className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg p-2 text-sm duration-400 hover:bg-fill-weak"
          onClick={() => {
            window.navigator.clipboard.writeText(account?.address || '');
            toast.info('Your address copied to clipboard');
          }}
        >
          <LuClipboardCopy
            strokeWidth={2}
            className="h-4 w-4"
          />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="m-0 w-full p-0">
          <Link
            className="flex w-full items-center justify-start gap-2 rounded-lg p-2 text-sm duration-400 hover:bg-fill-weak"
            href={`https://suivision.xyz/account/${account?.address || ''}`}
            target="_blank"
          >
            <SlMagnifier
              strokeWidth={2}
              className="h-4 w-4"
            />
            <span>Explorer</span>
          </Link>
        </DropdownMenuItem>
        <RpcMenu />
        <DropdownMenuItem
          className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg p-2 text-sm duration-400 hover:bg-fill-weak"
          onClick={() => dAppKit.disconnectWallet()}
        >
          <BiExit
            strokeWidth={1}
            className="h-4 w-4"
          />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
