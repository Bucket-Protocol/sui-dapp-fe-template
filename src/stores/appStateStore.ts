import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

interface AppStateStore {
  searchParams: Record<string, string>;
  setSearchParams: (params: Record<string, string>) => void;

  isMarqueeShown: boolean;
  setIsMarqueeShown: (shown: boolean) => void;

  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;

  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (open: boolean) => void;
}

const useAppStateStoreInternal = create<AppStateStore>((set) => ({
  searchParams: {},
  setSearchParams: (params) => set({ searchParams: params }),

  isMarqueeShown: false,
  setIsMarqueeShown: (shown: boolean) => set({ isMarqueeShown: shown }),

  isMobileNavOpen: false,
  setIsMobileNavOpen: (open: boolean) => set({ isMobileNavOpen: open }),

  isWalletModalOpen: false,
  setIsWalletModalOpen: (open: boolean) => set({ isWalletModalOpen: open }),
}));

export const useAppStateStore = <U>(selector: (state: AppStateStore) => U) =>
  useAppStateStoreInternal(useShallow<AppStateStore, U>(selector));
