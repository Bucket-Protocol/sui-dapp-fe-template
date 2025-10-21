import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { LuX } from 'react-icons/lu';

import { cn } from '@/libs/utils';
import ScrollbarContainer from '@/components/ui/ScrollbarContainer';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className="fixed inset-0 z-modal data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    {...props}
  >
    <div className="absolute inset-0 -z-10 bg-black/60 backdrop-blur-sm [[data-state=closed]_&]:animate-out [[data-state=closed]_&]:fade-out-0 [[data-state=open]_&]:animate-in [[data-state=open]_&]:fade-in-0" />
    <ScrollbarContainer className="h-full w-full">
      <div className={cn('grid min-h-full min-w-full place-items-center p-2 sm:p-4', className)}>{children}</div>
    </ScrollbarContainer>
  </DialogPrimitive.Overlay>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    withClose?: boolean;
    classNames?: {
      overlay?: string;
      content?: string;
      close?: string;
    };
  }
>(({ className, classNames, withClose = true, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className={classNames?.overlay}>
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'relative grid gap-4 rounded-2xl border border-white/12 bg-[#28292E]/75 p-6 backdrop-blur-3xl duration-400 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className,
          classNames?.content,
        )}
        style={{
          boxShadow: '0px 8px 40px 16px rgba(255, 255, 255, 0.10)',
        }}
        {...props}
      >
        {children}
        {withClose && (
          <DialogPrimitive.Close
            role="close"
            className={cn(
              'absolute right-4 top-4 h-4 w-4 rounded-sm opacity-70 ring-0 transition-opacity hover:opacity-100 disabled:pointer-events-none',
              classNames?.close,
            )}
          >
            <LuX className="h-full w-full" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogOverlay>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-medium !leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
