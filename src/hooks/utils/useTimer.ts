'use client';

import { useEffect } from 'react';
import { differenceInMilliseconds } from 'date-fns/differenceInMilliseconds';

const useTimer = (targetTime: Date, callback: () => void, disabled: boolean = false) => {
  useEffect(() => {
    if (disabled) {
      return;
    }
    const delay = differenceInMilliseconds(targetTime, new Date());
    const timer = setTimeout(callback, delay);

    return () => clearTimeout(timer);
  }, [targetTime, callback, disabled]);
};

export default useTimer;
