'use client';

import { DependencyList, EffectCallback, useEffect, useState } from 'react';

const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList | undefined) => {
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => setInitialRender(false), []);

  useEffect(() => {
    if (initialRender) {
      return;
    }
    effect();
  }, deps);
};

export default useUpdateEffect;
