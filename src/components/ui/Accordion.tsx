'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { cn } from '@/libs/utils';

export const AccordionRoot = AccordionPrimitive.Root;

export const AccordionItem = AccordionPrimitive.Item;

export const AccordionHeader = AccordionPrimitive.Header;

export const AccordionTrigger = ({
  className,
  children,
  icon,
  ...props
}: { icon?: React.ReactNode } & AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Trigger
    className={cn('-m-2 flex cursor-pointer items-center gap-1 p-2 text-sm', className)}
    {...props}
  >
    {children}
    {!!icon ? (
      icon
    ) : (
      <HiOutlineChevronDown className="-mx-1 h-6 w-6 shrink-0 py-1 transition-transform duration-400 [[data-state=open]_&]:-rotate-180" />
    )}
  </AccordionPrimitive.Trigger>
);

export const AccordionContent = ({ className, children, ...props }: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content
    className={cn(
      'overflow-hidden duration-400 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
);
