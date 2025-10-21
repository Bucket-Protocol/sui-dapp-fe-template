'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuExternalLink } from 'react-icons/lu';
import { VscTriangleDown } from 'react-icons/vsc';

import { EventPayload } from '@/types/tracking';
import { MORE_ITEMS, SOCIALS_LINKS, TAB, TABS } from '@/consts/navigation';
import { cn } from '@/libs/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/Dropdown';
import SocialLinkButton from '@/components/layout/SocialLinkButton';

const MoreDropdown = () => {
  const timerRef = useRef<NodeJS.Timeout>(null);
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };
  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <DropdownMenuTrigger
        className="flex cursor-pointer items-center gap-1 p-3 font-medium leading-[1.1] text-white/50 duration-400 hover:text-white data-[state=open]:text-white"
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
      >
        <div>More</div>
        <VscTriangleDown className="size-3 duration-400 [[data-state=open]_&]:-scale-y-100" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col gap-2 rounded-2xl border-none bg-white/7 p-2 backdrop-blur-md"
        align="start"
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
      >
        <div className="flex flex-col">
          {MORE_ITEMS.map(({ label, href, external, event }) => (
            <DropdownMenuItem
              key={label}
              className="flex h-[50px] w-full cursor-pointer items-center gap-2 rounded-lg p-4 text-base font-medium duration-400 hover:bg-white/10"
              asChild
            >
              <Link
                href={href}
                target={external ? '_blank' : '_self'}
                data-tracking={JSON.stringify({ event } satisfies EventPayload)}
              >
                <span>{label}</span>
                <LuExternalLink className="size-3 text-white/50" />
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
        <div className="flex gap-2">
          {SOCIALS_LINKS.map((link) => (
            <SocialLinkButton
              key={link.name}
              classNames={{
                root: '!scale-100 size-12 bg-transparent hover:bg-white/10',
                icon: 'size-6',
              }}
              {...link}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NavBar = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const currentTab = Object.keys(TABS).find((tab) => pathname.startsWith(TABS[tab as TAB].href));

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-2', className)}>
      {Object.entries(TABS).map(([tab, { label, href, external, event }]) => (
        <Link
          key={label}
          className={cn(
            'flex items-center justify-center p-3 font-medium leading-[1.1] duration-400 hover:text-white',
            tab === currentTab ? 'text-white' : 'text-white/50',
          )}
          href={href}
          target={external ? '_blank' : '_self'}
          {...(event && { 'data-tracking': JSON.stringify({ event } satisfies EventPayload) })}
        >
          {label}
        </Link>
      ))}
      {!!MORE_ITEMS.length && <MoreDropdown />}
    </div>
  );
};

export default NavBar;
