import { create } from 'zustand';

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

export const useAppStateStore = create<AppStateStore>()((set) => ({
  searchParams: {},
  setSearchParams: (params) => set({ searchParams: params }),

  isMarqueeShown: false,
  setIsMarqueeShown: (shown: boolean) => set({ isMarqueeShown: shown }),

  isMobileNavOpen: false,
  setIsMobileNavOpen: (open: boolean) => set({ isMobileNavOpen: open }),

  isWalletModalOpen: false,
  setIsWalletModalOpen: (open: boolean) => set({ isWalletModalOpen: open }),
}));
