'use client';

import { createContext, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as amplitude from '@amplitude/analytics-browser';
import clarity from '@microsoft/clarity';
import { useCurrentAccount } from '@mysten/dapp-kit';
import ga from 'react-ga4';

import { EventPayload } from '@/types/tracking';
import { AMPLITUDE_API_KEY, CLARITY_PROJECT_ID, GA_MEASUREMENT_ID } from '@/consts/monitoring';

export const TrackingContext = createContext<{
  sendTrackingEvent: (payload: EventPayload) => void;
}>({
  sendTrackingEvent: () => {},
});

const sendEvent = (event: string, properties?: object) => {
  ga.event(event, properties);
  amplitude.track(event, properties);
};

const TrackingProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const account = useCurrentAccount();

  const from = pathname.split('/')[1] || 'earn';

  const sendTrackingEvent = useCallback(
    ({ event, ...properties }: EventPayload) => {
      sendEvent(event, {
        from: properties.from ?? from,
        address: !!account ? account.address.slice(2) : null,
        ...properties,
      });
    },
    [account, from],
  );
  useEffect(() => {
    if (CLARITY_PROJECT_ID) {
      clarity.init(CLARITY_PROJECT_ID);
    }
    if (GA_MEASUREMENT_ID) {
      ga.initialize(GA_MEASUREMENT_ID);
    }
    if (AMPLITUDE_API_KEY) {
      amplitude.init(AMPLITUDE_API_KEY, {
        defaultTracking: true,
      });
    }
  }, []);

  useEffect(() => {
    const handleSendEvent = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement || target instanceof SVGElement)) {
        return;
      }
      try {
        if (target.dataset.tracking) {
          const { event, ...properties } = JSON.parse(target.dataset.tracking) || {};

          sendEvent(event, {
            from: target?.dataset?.from || from,
            address: !!account ? account.address.slice(2) : null,
            ...properties,
          });
        }
      } catch {}

      handleSendEvent(target.parentNode);
    };
    const handleClick = (e: MouseEvent) => {
      handleSendEvent(e.target);
    };
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [pathname, account, from]);

  return <TrackingContext.Provider value={{ sendTrackingEvent }}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
