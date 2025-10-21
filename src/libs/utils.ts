import { isValidElement } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { getPrecision } from '@/libs/format';

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const range = (start: number, end?: number, step: number = 1): number[] => {
  if (end === undefined) {
    [start, end] = [0, start];
  }
  const precision = Math.max(getPrecision(start), getPrecision(step), 0);
  const size = Math.floor(Math.max((end - start) / step + 1, 0));

  return Array.from(new Array(size), (_, i) => Number((start + i * step).toFixed(precision)));
};

export const isReactNode = (node: unknown): boolean => {
  switch (typeof node) {
    case 'undefined':
    case 'boolean':
    case 'number':
    case 'bigint':
    case 'string':
      return true;
    case 'object':
      if (node === null || isValidElement(node)) {
        return true;
      }
      if (Array.isArray(node)) {
        return node.every(isReactNode);
      }
    default:
      return false;
  }
};
