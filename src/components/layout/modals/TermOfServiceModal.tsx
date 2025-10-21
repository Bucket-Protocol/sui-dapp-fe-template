'use client';

import { useEffect, useRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { LuX } from 'react-icons/lu';

import { TERM_OF_SERVICE } from '@/consts/terms';
import { useAppStateStore } from '@/stores/appStateStore';
import { usePreferenceStore } from '@/stores/preferenceStore';
import { cn } from '@/libs/utils';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import Markdown from '@/components/ui/Markdown';
import ScrollbarContainer from '@/components/ui/ScrollbarContainer';
import ActionButton from '@/components/shared/buttons/ActionButton';

const TermOfServiceModal = () => {
  const { termOfServiceAccepted, setTermOfServiceAccepted } = usePreferenceStore(
    ({ termOfServiceAccepted, setTermOfServiceAccepted }) => ({ termOfServiceAccepted, setTermOfServiceAccepted }),
  );
  const { isWalletModalOpen, setIsWalletModalOpen } = useAppStateStore(
    ({ isWalletModalOpen, setIsWalletModalOpen }) => ({ isWalletModalOpen, setIsWalletModalOpen }),
  );
  const observerRef = useRef<IntersectionObserver>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(false);
  const [isBottomReached, setIsBottomReached] = useState(false);

  const isOpen = isWalletModalOpen && !termOfServiceAccepted;

  useEffect(() => {
    if (isOpen) {
      setIsBottomReached(false);
    }
  }, [isOpen]);

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
    bottomAnchorRef.current = e;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries?.[0]?.isIntersecting) {
        setIsBottomReached(true);
      }
      setIsBottom(entries?.[0]?.isIntersecting);
    });
    observerRef.current.observe(bottomAnchorRef.current);
  };
  const handleScrollToBottom = () => {
    if (!bottomAnchorRef.current) {
      return;
    }
    bottomAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent
        withClose={false}
        className="flex w-full max-w-[500px] flex-col gap-4 bg-[#2B303D]/70 p-4 md:gap-6 md:p-6"
        style={{
          boxShadow: '0px 8px 40px 16px rgba(255, 255, 255, 0.03)',
        }}
      >
        <div className="flex items-center justify-between">
          <DialogTitle>Terms of Service and Disclaimer</DialogTitle>
          <button
            onClick={() => setIsWalletModalOpen(false)}
            className="rounded-full bg-white/10 p-1.5 duration-400 hover:bg-white/20"
          >
            <LuX size={20} />
          </button>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-[#1E212A] p-5">
          <ScrollbarContainer className="-mr-4.5 h-[340px] pr-4.5 text-white/80 [&_.os-scrollbar-handle:hover]:bg-white/20 [&_.os-scrollbar-handle]:bg-white/12 [&_.os-scrollbar]:![--os-size:8px]">
            <Markdown>{TERM_OF_SERVICE}</Markdown>
            <div
              ref={handleObserve}
              className="relative bottom-60"
            />
          </ScrollbarContainer>
          <div
            className={cn('absolute inset-x-0 bottom-0 h-[86px] duration-400', isBottom && 'invisible opacity-0')}
            style={{
              backgroundImage: 'linear-gradient(to bottom, #1E212A00 5%, #1E212A 60%)',
            }}
          >
            <button
              type="button"
              className="group absolute inset-x-0 bottom-0 flex items-center justify-center py-6"
              onClick={handleScrollToBottom}
            >
              <IoChevronDown className="size-4 text-[#A3B2FF] duration-400 group-hover:scale-[1.2]" />
            </button>
          </div>
        </div>
        <ActionButton
          onClick={() => {
            if (!isBottomReached) {
              handleScrollToBottom();
            } else {
              setTermOfServiceAccepted(true);
            }
          }}
        >
          {isBottomReached ? 'I have read and agreed' : 'Scroll to the bottom'}
        </ActionButton>
      </DialogContent>
    </Dialog>
  );
};

export default TermOfServiceModal;
