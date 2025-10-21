import { cn } from '@/libs/utils';

const SVGImage = ({
  className,
  src,
  width,
  height,
}: {
  className?: string;
  src: string;
  width: number;
  height: number;
}) => {
  return (
    <span
      className={cn('bg-white', className)}
      style={{
        mask: `url(${src}) no-repeat center/100% 100%`,
        width,
        height,
      }}
    />
  );
};

export default SVGImage;
