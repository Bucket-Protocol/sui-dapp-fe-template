'use client';

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import type { UiWallet } from '@mysten/dapp-kit-core';
import { useCurrentWallet, useDAppKit, useWallets } from '@mysten/dapp-kit-react';
import { isAndroid, isIOS, isMobile } from 'react-device-detect';
import { LuChevronDown, LuX } from 'react-icons/lu';

import { Wallet } from '@/types';
import { WALLET_LIST } from '@/consts/wallets';
import { useAppStateStore } from '@/stores/appStateStore';
import { usePreferenceStore } from '@/stores/preferenceStore';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import ScrollbarContainer from '@/components/ui/ScrollbarContainer';
import { TrackingContext } from '@/components/layout/providers/TrackingProvider';

const getInstallLink = (wallet: Wallet) => {
  if (!isMobile && wallet.link?.desktop) {
    return wallet.link.desktop;
  }
  if (isIOS && wallet.link?.mobile?.ios) {
    return wallet.link.mobile.ios;
  }
  if (isAndroid && wallet.link?.mobile?.android) {
    return wallet.link.mobile.android;
  }
  return undefined;
};

const WalletButton = ({
  name,
  title,
  icon,
  isInstalled,
  onClick,
}: {
  name: string;
  title: string;
  icon: string;
  isInstalled: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    key={name}
    className="group flex w-full items-center gap-4 rounded-lg p-1.5 duration-400 hover:bg-white/8"
    onClick={onClick}
  >
    <Image
      src={icon}
      alt={name}
      width={32}
      height={32}
      className="rounded-xl"
    />
    <span className="text-white/75 duration-400 group-hover:text-white">{title}</span>
    <span className="ml-auto text-sm font-semibold text-white/50 duration-400 group-hover:text-white">
      {isInstalled ? 'Connect' : 'Install'}
    </span>
  </button>
);

const WalletModal = () => {
  const { sendTrackingEvent } = useContext(TrackingContext);

  const dAppKit = useDAppKit();
  const currentWallet = useCurrentWallet();
  const installedWallets = useWallets();

  const { isWalletModalOpen, setIsWalletModalOpen } = useAppStateStore(
    ({ isWalletModalOpen, setIsWalletModalOpen }) => ({ isWalletModalOpen, setIsWalletModalOpen }),
  );
  const { termOfServiceAccepted } = usePreferenceStore(({ termOfServiceAccepted }) => ({ termOfServiceAccepted }));

  const [viewMore, setViewMore] = useState(false);

  const isOpen = isWalletModalOpen && termOfServiceAccepted;
  const allWallets: Wallet[] = installedWallets
    .filter(({ name }) => !WALLET_LIST.find((wallet) => name === wallet.name))
    .map(({ name, icon }) => ({
      name,
      title: name,
      icon: icon as string,
    }))
    .concat(WALLET_LIST.filter(getInstallLink));

  const sortedWallets = allWallets.sort((a, b) => {
    const isAInstalled = !!installedWallets.find(({ name }) => name === a.name);
    const isBInstalled = !!installedWallets.find(({ name }) => name === b.name);
    const aIndex = WALLET_LIST.toReversed().findIndex(({ name }) => name === a.name);
    const bIndex = WALLET_LIST.toReversed().findIndex(({ name }) => name === b.name);

    if (isAInstalled !== isBInstalled) {
      return isAInstalled ? -1 : 1;
    } else {
      return bIndex - aIndex;
    }
  });

  useEffect(() => {
    setViewMore(false);
  }, [isOpen]);

  const handleConnect = async (wallet: Wallet) => {
    const installedWallet = installedWallets.find(({ name }) => name === wallet.name) as UiWallet | undefined;

    if (installedWallet) {
      const result = await dAppKit.connectWallet({ wallet: installedWallet });

      sendTrackingEvent({
        event: 'wallet',
        wallet: currentWallet?.name ?? installedWallet.name,
        installed: true,
        addresses: result.accounts.map((account) => account.address),
      });
      setIsWalletModalOpen(false);
    } else {
      window.open(getInstallLink(wallet), '_blank');
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        withClose={false}
        className="flex max-h-[592px] w-full max-w-96 flex-col gap-4 p-4"
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg">Connect a wallet from list</DialogTitle>
          <button
            onClick={() => setIsWalletModalOpen(false)}
            className="rounded-full bg-white/10 p-1.5 duration-400 hover:bg-white/20"
          >
            <LuX size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <ScrollbarContainer className="-m-1.5 -mb-4 -mr-4 max-h-[384px] pb-2.5 pr-2.5 sm:max-h-[530px] [&_.os-scrollbar-vertical]:pb-4">
            <div className="flex flex-col gap-1">
              {sortedWallets.slice(0, 5).map((wallet) => (
                <WalletButton
                  key={wallet.name}
                  name={wallet.name}
                  title={wallet.title}
                  icon={wallet.icon}
                  isInstalled={!!installedWallets.find(({ name }) => name === wallet.name)}
                  onClick={() => handleConnect(wallet)}
                />
              ))}
              {viewMore &&
                sortedWallets.slice(5).map((wallet) => (
                  <WalletButton
                    key={wallet.name}
                    name={wallet.name}
                    title={wallet.title}
                    icon={wallet.icon}
                    isInstalled={!!installedWallets.find(({ name }) => name === wallet.name)}
                    onClick={() => handleConnect(wallet)}
                  />
                ))}
            </div>
          </ScrollbarContainer>
          {sortedWallets.length > 5 && !viewMore && (
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-[8px] p-2 font-medium text-white/75 duration-400 hover:bg-white/7"
              onClick={() => setViewMore(!viewMore)}
            >
              View More
              <LuChevronDown className="size-4" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
