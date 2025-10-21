'use client';

import { useEffect, useMemo } from 'react';
import {
  QueryFunctionContext,
  useQueryClient,
  UseQueryOptions,
  useQuery as useQueryPrimitive,
  UseQueryResult,
} from '@tanstack/react-query';

import useDebounce from '@/hooks/utils/useDebounce';

export type CustomUseQueryOptions<T> = Omit<UseQueryOptions<T>, 'queryFn' | 'queryKey'> & {
  debounced?: boolean;
  silent?: boolean;
};

export type CustomUseQueryParams<T, U extends unknown[] = []> = CustomUseQueryOptions<T> &
  Omit<UseQueryOptions<T>, 'queryFn'> & {
    initData: T;
    dependentQueries?: { [K in keyof U]: CustomUseQueryResult<U[K]> };
    queryFn: (context: QueryFunctionContext, ...rest: U) => T | Promise<T>;
  };

export type CustomUseQueryResult<T = unknown> = Omit<UseQueryResult<T>, 'isLoading' | 'data'> & {
  data: T;
  isLoading: boolean;
  invalidate: () => Promise<void>;
};

const useQuery = <T, U extends unknown[] = []>({
  initData,
  queryKey,
  dependentQueries = [] as unknown as { [K in keyof U]: CustomUseQueryResult<U[K]> },
  queryFn,
  debounced = false,
  silent = false,
  ...options
}: CustomUseQueryParams<T, U>): CustomUseQueryResult<T> => {
  const queryClient = useQueryClient();

  const isLoadingDependentQueries = dependentQueries.some(({ isLoading }) => isLoading);
  const isFetchingDependentQueries = dependentQueries.some(({ isFetching }) => isFetching);

  // eslint-disable-next-line react-hooks/use-memo
  const memorizedQueryKey = useMemo(() => queryKey, [...queryKey]);

  const { debouncedValue: debouncedQueryKey, isDebouncing } = useDebounce(memorizedQueryKey);

  const { isLoading, isFetching, data, refetch, ...rest } = useQueryPrimitive<T>({
    queryKey: debounced ? debouncedQueryKey : memorizedQueryKey,
    enabled: !isDebouncing && !isFetchingDependentQueries && (options.enabled ?? true),
    queryFn: async (context) => await queryFn(context, ...(dependentQueries.map(({ data }) => data) as U)),
    ...options,
  });
  useEffect(() => {
    if (!isFetchingDependentQueries) {
      refetch();
    }
  }, [isFetchingDependentQueries]);

  return {
    ...rest,
    isLoading: !silent && (isLoading || (debounced && isDebouncing) || isLoadingDependentQueries),
    isFetching: !silent && (isFetching || (debounced && isDebouncing) || isFetchingDependentQueries),
    data: data ?? initData,
    refetch,
    invalidate: () => queryClient.invalidateQueries({ queryKey }),
  };
};

export default useQuery;
