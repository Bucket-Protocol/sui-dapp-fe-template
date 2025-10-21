'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuExternalLink } from 'react-icons/lu';
import { VscTriangleDown } from 'react-icons/vsc';

import { EventPayload } from '@/types/tracking';
import { MORE_ITEMS, SOCIALS_LINKS, TAB, TABS } from '@/consts/navigation';
import { useAppStateStore } from '@/stores/appStateStore';
import { cn } from '@/libs/utils';
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/Accordion';
import ScrollbarContainer from '@/components/ui/ScrollbarContainer';
import SocialLinkButton from '@/components/layout/SocialLinkButton';

const DUMMY_VALUE = '#';

const MoreAccordion = () => {
  const { isMobileNavOpen, setIsMobileNavOpen } = useAppStateStore(({ isMobileNavOpen, setIsMobileNavOpen }) => ({
    isMobileNavOpen,
    setIsMobileNavOpen,
  }));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [isMobileNavOpen]);

  return (
    <AccordionRoot
      type="single"
      className="flex w-full flex-col gap-2"
      value={isOpen ? DUMMY_VALUE : ''}
      onValueChange={() => setIsOpen(!isOpen)}
      collapsible={true}
    >
      <AccordionItem value="#">
        <AccordionTrigger
          className="group m-0 flex h-15 w-full cursor-pointer gap-1 px-4 text-base font-medium leading-[1.1] text-white/50 duration-400 hover:bg-white/10 hover:text-white data-[state=open]:text-white sm:px-8"
          icon={<VscTriangleDown className="size-3 duration-400 [[data-state=open]_&]:-scale-y-100" />}
        >
          <div>More</div>
        </AccordionTrigger>
        <AccordionContent className="w-full pl-4 sm:pl-8">
          <div className="flex flex-col">
            {MORE_ITEMS.map(({ label, href, external, event }) => (
              <Link
                key={label}
                className="flex h-15 w-full cursor-pointer items-center gap-2 px-4 font-medium text-white/50 duration-400 hover:bg-white/10 hover:text-white"
                href={href}
                target={external ? '_blank' : '_self'}
                onClick={() => setIsMobileNavOpen(false)}
                data-tracking={JSON.stringify({ event } satisfies EventPayload)}
              >
                <span>{label}</span>
                <LuExternalLink className="size-3" />
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
};

const MobileNavMenu = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const { isMobileNavOpen, setIsMobileNavOpen } = useAppStateStore(({ isMobileNavOpen, setIsMobileNavOpen }) => ({
    isMobileNavOpen,
    setIsMobileNavOpen,
  }));
  const currentTab = Object.keys(TABS).find((tab) => pathname.startsWith(TABS[tab as TAB].href));

  return (
    <div
      className={cn(
        'absolute inset-x-0 top-0 flex w-full flex-col justify-between overflow-hidden backdrop-blur-lg duration-400',
        isMobileNavOpen ? 'h-dvh bg-black/65' : 'h-0',
        className,
      )}
    >
      <ScrollbarContainer className="mt-16 h-full">
        <div className={cn('flex flex-col items-start justify-center', isMobileNavOpen ? 'visible' : 'invisible')}>
          {Object.entries(TABS).map(([tab, { label, href, external, event }]) => (
            <Link
              key={tab}
              className={cn(
                'flex h-15 w-full items-center justify-start px-4 font-medium duration-400 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white sm:px-8',
                tab === currentTab ? 'text-white' : 'text-white/50',
              )}
              href={href}
              target={external ? '_blank' : '_self'}
              onClick={() => setIsMobileNavOpen(false)}
              {...(event && { 'data-tracking': JSON.stringify({ event } satisfies EventPayload) })}
            >
              {label}
            </Link>
          ))}
          {!!MORE_ITEMS.length && <MoreAccordion />}
        </div>
      </ScrollbarContainer>
      <div className="relative flex shrink-0 flex-col items-center justify-center gap-6 border-t border-white/10 py-6">
        <div className="flex gap-2">
          {SOCIALS_LINKS.map((link) => (
            <SocialLinkButton
              key={link.name}
              {...link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNavMenu;
