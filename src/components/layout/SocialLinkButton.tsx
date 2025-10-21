import Link from 'next/link';
import { IconType } from 'react-icons/lib';

import { cn } from '@/libs/utils';

const SocialLinkButton = ({
  className,
  classNames,
  Icon,
  link,
}: {
  className?: string;
  classNames?: { root?: string; icon?: string };
  Icon: IconType;
  link: string;
}) => (
  <Link
    className={cn(
      'animate-zoom flex size-10 items-center justify-center rounded-lg bg-white/10 text-white/70 !transition-all duration-400 hover:bg-white/20 sm:rounded-xl',
      className,
      classNames?.root,
    )}
    href={link}
    target="_blank"
  >
    <Icon className={cn('size-5', classNames?.icon)} />
  </Link>
);

export default SocialLinkButton;
