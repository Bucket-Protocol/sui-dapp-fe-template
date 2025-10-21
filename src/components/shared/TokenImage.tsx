import { memo, useEffect, useState } from 'react';
import Image from 'next/image';

import { Coin } from '@/types';
import { TOKEN_INFO } from '@/consts/tokens';
import { cn } from '@/libs/utils';

const FALLBACK_ICON = '/coins/unknown-coin.svg';

// TODO: change all the token icons to round ones remove rounded-full

const TokenImage = ({
  className,
  token,
  size,
  alt,
}: {
  className?: string;
  token: Coin;
  size: number;
  alt?: string;
}) => {
  const [src, setSrc] = useState<string>(TOKEN_INFO[token].iconPath);

  useEffect(() => {
    setSrc(TOKEN_INFO[token].iconPath);
  }, [token]);

  return (
    <Image
      key={token}
      className={cn('aspect-square rounded-full', className)}
      src={src}
      height={size}
      width={size}
      alt={alt ?? TOKEN_INFO[token].name}
      priority={true}
      loading="eager"
      onError={() => {
        setSrc(FALLBACK_ICON);
      }}
    />
  );
};

export default memo(TokenImage);
