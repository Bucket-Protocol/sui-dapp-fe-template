// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Empty = {};

type TrackingEvents = {
  // layout
  wallet: {
    wallet: string;
    installed: boolean;
    addresses: string[];
  };
  rpc: {
    rpc: string;
  };
  tab_landing: Empty;
};

export type EventName = keyof TrackingEvents;

export type EventPayload = {
  [K in EventName]: {
    event: K;
    from?: string;
  } & TrackingEvents[K];
}[EventName];
