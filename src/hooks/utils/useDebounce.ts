'use client';

import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, interval = 200) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);

    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, interval);

    return () => clearTimeout(timer);
  }, [value, interval]);

  return {
    debouncedValue,
    isDebouncing,
  };
};

export default useDebounce;
