'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { range } from 'lodash';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';

import { cn } from '@/libs/utils';
import ScrollbarContainer from '@/components/ui/ScrollbarContainer';
import Skeleton from '@/components/ui/Skeleton';

export type TableColumn<T> = {
  id?: string;
  label: ReactNode;
  getCell: (datum: T) => ReactNode;
  getSortKey?: (datum: T) => number;
  defaultSort?: boolean;
  align?: 'start' | 'center' | 'end';
  onClick?: () => void;
};

const ALIGN_STYLE_MAP = {
  start: 'text-start justify-self-start',
  center: 'text-center justify-self-center',
  end: 'text-end justify-self-end',
};

const Table = <T,>({
  className,
  classNames,
  data,
  columns,
  getRowId,
  isLoading = false,
  endIndicator = false,
}: {
  className?: string;
  classNames?: {
    root?: string;
    header?: string;
    headerCell?: string;
    content?: string;
    skeleton?: string;
    row?: string;
    cell?: string;
  };
  data: T[];
  columns: TableColumn<T>[];
  getRowId?: (datum: T) => string;
  isLoading?: boolean;
  endIndicator?: ReactNode;
}) => {
  const defaultSortIndex = columns.findIndex(({ defaultSort }) => defaultSort);

  const observerRef = useRef<IntersectionObserver>(null);
  const [sortColumnIndex, setSortColumnIndex] = useState(defaultSortIndex !== -1 ? defaultSortIndex : 0);
  const [isAtTop, setIsAtTop] = useState(true);

  const sortFn = useCallback(
    (datum: T) => (columns[Math.abs(sortColumnIndex)]?.getSortKey?.(datum) ?? 0) * (sortColumnIndex > 0 ? 1 : -1),
    [columns, sortColumnIndex],
  );
  const sortedData = data.toSorted((a, b) => sortFn(b) - sortFn(a));

  useEffect(() => {
    return () => observerRef.current?.disconnect?.();
  }, []);

  const handleObserve = (e?: HTMLDivElement | null) => {
    if (!e) {
      return;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current = new IntersectionObserver((entries) => {
      setIsAtTop(entries?.[0]?.isIntersecting);
    });
    observerRef.current.observe(e);
  };
  return (
    <div
      className={cn('-mr-4 grid gap-x-2 overflow-hidden pr-4', className, classNames?.root)}
      style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}
    >
      <div
        className={cn('grid grid-cols-subgrid', classNames?.header)}
        style={{ gridColumn: `span ${columns.length} / span ${columns.length}` }}
      >
        {columns.map(({ id, label, getSortKey, align = 'start', onClick }, columnIndex) => (
          <button
            key={id ?? columnIndex}
            type="button"
            className={cn(
              'flex items-center gap-1 text-left',
              ALIGN_STYLE_MAP[align],
              getSortKey ? 'cursor-pointer' : 'cursor-default',
              classNames?.headerCell,
            )}
            onClick={() => {
              if (!getSortKey) {
                return;
              }
              setSortColumnIndex(
                Math.abs(sortColumnIndex) !== columnIndex
                  ? columnIndex
                  : sortColumnIndex === columnIndex
                    ? -columnIndex
                    : 0,
              );
              onClick?.();
            }}
          >
            {label}
            {getSortKey && (
              <div className="-m-1 flex flex-col items-center gap-px p-1">
                <TbTriangleFilled
                  className={cn(
                    '-m-px size-2 scale-y-[0.8] duration-400',
                    columnIndex !== -sortColumnIndex && 'text-white/30',
                  )}
                  style={{
                    filter:
                      columnIndex === -sortColumnIndex
                        ? 'drop-shadow(0 0 1px rgb(255 255 255 / 0.8)) drop-shadow(0 0 2px rgb(255 255 255 / 0.3))'
                        : 'none',
                  }}
                />
                <TbTriangleInvertedFilled
                  className={cn(
                    '-m-px size-2 scale-y-[0.8] duration-400',
                    columnIndex !== sortColumnIndex && 'text-white/30',
                  )}
                  style={{
                    filter:
                      columnIndex === sortColumnIndex
                        ? 'drop-shadow(0 0 1px rgb(255 255 255 / 0.8)) drop-shadow(0 0 2px rgb(255 255 255 / 0.3))'
                        : 'none',
                  }}
                />
              </div>
            )}
          </button>
        ))}
      </div>
      <ScrollbarContainer
        className={cn(
          '-mr-4 grid grid-cols-subgrid gap-y-2 pr-4 duration-400 [&>[data-overlayscrollbars-contents]]:grid [&>[data-overlayscrollbars-contents]]:grid-cols-subgrid [&>[data-overlayscrollbars-contents]]:gap-[inherit] [&>[data-overlayscrollbars-contents]]:[grid-column:inherit]',
          classNames?.content,
        )}
        style={{
          gridColumn: `span ${columns.length} / span ${columns.length}`,
          maskImage: 'linear-gradient(to bottom, transparent -48px, rgb(255 255 255 / 0.8) -16px, white 0)',
          maskPosition: isAtTop ? '0' : '0 48px',
          maskRepeat: 'none',
        }}
      >
        <div ref={handleObserve} />
        {isLoading
          ? range(12).map((index) => (
              <Skeleton
                key={index}
                className={cn('[grid-column:inherit]', classNames?.skeleton)}
              />
            ))
          : sortedData.map((datum, rowIndex) => (
              <div
                key={getRowId?.(datum) ?? rowIndex}
                className={cn('grid grid-cols-subgrid items-center [grid-column:inherit]', classNames?.row)}
              >
                {columns.map(({ id: columnId, getCell, align = 'start' }, columnIndex) => (
                  <div
                    key={`${getRowId?.(datum) ?? rowIndex}-${columnId ?? columnIndex}`}
                    className={cn(ALIGN_STYLE_MAP[align], className)}
                  >
                    {getCell(datum)}
                  </div>
                ))}
              </div>
            ))}
        {endIndicator && <div className="[grid-column:inherit]">{endIndicator}</div>}
      </ScrollbarContainer>
    </div>
  );
};

export default Table;
