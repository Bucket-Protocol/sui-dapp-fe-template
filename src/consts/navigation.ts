import { BsFileTextFill } from 'react-icons/bs';
import { FaMediumM, FaTelegramPlane } from 'react-icons/fa';
import { FaDiscord, FaXTwitter } from 'react-icons/fa6';

export const enum TAB {
  LANDING = 'landing',
}

export const TABS = {
  [TAB.LANDING]: {
    label: 'Landing',
    href: '/',
    external: false,
    event: 'tab_landing',
  },
} as const;

export const MORE_ITEMS = [] as const;

export const SOCIALS_LINKS = [
  {
    name: 'X(Twitter)',
    Icon: FaXTwitter,
    link: '#',
  },
  {
    name: 'Discord',
    Icon: FaDiscord,
    link: '#',
  },
  {
    name: 'Telegram',
    Icon: FaTelegramPlane,
    link: '#',
  },
  {
    name: 'Medium',
    Icon: FaMediumM,
    link: '#',
  },
  {
    name: 'Docs',
    Icon: BsFileTextFill,
    link: '#',
  },
] as const;
