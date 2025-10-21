import { cn } from '@/libs/utils';

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('animate-pulse rounded-md bg-slate-800', className)}
    {...props}
  />
);

export default Skeleton;
