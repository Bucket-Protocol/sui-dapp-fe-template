'use client';

import { ReactNode } from 'react';
import { GrowthBook, GrowthBookProvider as GrowthBookProviderBase } from '@growthbook/growthbook-react';

import { GROWTHBOOK_API_HOST, GROWTHBOOK_API_KEY } from '@/consts/monitoring';

const gb = new GrowthBook({
  apiHost: GROWTHBOOK_API_HOST,
  clientKey: GROWTHBOOK_API_KEY,
});

gb.init({
  streaming: true,
});

const GrowthBookProvider = ({ children }: { children: ReactNode }) => {
  return <GrowthBookProviderBase growthbook={gb}>{children}</GrowthBookProviderBase>;
};

export default GrowthBookProvider;
