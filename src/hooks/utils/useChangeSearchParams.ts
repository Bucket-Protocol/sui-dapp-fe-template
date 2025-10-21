'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { assign, isEqual, pickBy } from 'lodash';

import { useAppStateStore } from '@/stores/appStateStore';

const useChangeSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsObj = useSearchParams();

  const { searchParams: searchParamsInner, setSearchParams: setSearchParamsInner } = useAppStateStore(
    ({ searchParams, setSearchParams }) => ({
      searchParams,
      setSearchParams,
    }),
  );
  const searchParams = useMemo(() => Object.fromEntries(searchParamsObj.entries()), [searchParamsObj]);

  const setSearchParams = (params: Record<string, undefined | null | string>, scroll: boolean = false) => {
    const newSearchParams = pickBy(assign({}, searchParamsInner, params));

    if (isEqual(newSearchParams, searchParamsInner)) {
      return;
    }
    const newSearchParamsObj = new URLSearchParams(newSearchParams);

    router.replace(`${pathname}?${newSearchParamsObj.toString()}`, { scroll });

    setSearchParamsInner(newSearchParams);
  };
  useEffect(() => {
    const searchParams = Object.fromEntries(searchParamsObj.entries());

    setSearchParamsInner(searchParams);
  }, []);

  return {
    searchParams,
    setSearchParams,
  };
};

export default useChangeSearchParams;
