'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCurrentAccount } from '@mysten/dapp-kit';

import ConnectButton from '@/components/layout/header/ConnectButton';
import AccountMenu from '@/components/layout/header/dropdowns/AccountMenu';
import MobileNavButton from '@/components/layout/header/navigation/MobileNavButton';
import MobileNavMenu from '@/components/layout/header/navigation/MobileNavMenu';
import NavBar from '@/components/layout/header/navigation/NavBar';

const Header = () => {
  const account = useCurrentAccount();

  return (
    <header className="fixed inset-x-0 top-0 z-header flex flex-col duration-400 before:absolute before:inset-0 before:-z-10 before:backdrop-blur-md">
      <div className="z-10 mx-auto flex h-16 w-full items-center justify-between px-4 py-3 duration-400 sm:px-8">
        <Link
          className="xl:animate-zoom flex flex-1 items-center"
          href="/"
        >
          <Image
            className="h-6 w-auto sm:h-full"
            src="/logo.svg"
            alt="logo"
            width={120}
            height={32}
          />
        </Link>
        <NavBar className="hidden lg:flex" />
        <div className="flex flex-1 items-center justify-end gap-2">
          {!!account ? <AccountMenu /> : <ConnectButton />}
          <MobileNavButton className="flex lg:hidden" />
        </div>
      </div>
      <MobileNavMenu className="flex lg:hidden" />
    </header>
  );
};

export default Header;
