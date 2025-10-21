import { ComponentProps, MouseEventHandler, PointerEventHandler, ReactNode, useState } from 'react';
import { PiQuestion, PiQuestionFill } from 'react-icons/pi';

import { cn } from '@/libs/utils';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from '@/components/ui/Tooltip';

export const enum VARIANT {
  SOLID = 'solid',
  OUTLINE = 'outline',
}

const TooltipIcon = ({
  className,
  variant = VARIANT.SOLID,
  title,
  content,
  contentOverride,
  contentProps,
  onClick,
  bypass,
  children,
}: {
  className?: string;
  variant?: VARIANT;
  title?: ReactNode;
  content?: ReactNode;
  contentOverride?: ReactNode;
  contentProps?: ComponentProps<typeof TooltipContent>;
  onClick?: () => void;
  bypass?: boolean;
  children?: ReactNode;
}) => {
  const [isOpen, setOpen] = useState(false);

  const handlePointerDown: PointerEventHandler = (e) => {
    if (e.nativeEvent.pointerType === 'touch') {
      setOpen(!isOpen);
      e.preventDefault();
    }
  };
  const handleClick: MouseEventHandler = (e) => {
    onClick?.();

    if ((e.nativeEvent as PointerEvent).pointerType === 'touch') {
      e.preventDefault();
    }
  };
  return (
    <Tooltip
      delayDuration={0}
      open={isOpen}
      onOpenChange={setOpen}
    >
      <TooltipTrigger
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        asChild
      >
        <span className={cn('-m-1.5 cursor-pointer p-1.5 leading-none', className)}>
          {children ? (
            children
          ) : variant === VARIANT.SOLID ? (
            <PiQuestionFill className="inline size-3.5 text-white/30 lg:size-4" />
          ) : (
            <PiQuestion className="inline size-3.5 text-white/30 lg:size-4" />
          )}
        </span>
      </TooltipTrigger>
      {!bypass && (
        <TooltipPortal>
          {contentOverride || (
            <TooltipContent
              align="start"
              sideOffset={8}
              className="flex max-w-[248px] flex-col gap-1 !border-white/20 !bg-black/10 p-2 backdrop-blur-xl"
              style={{
                boxShadow: '0 4px 16px 0 rgb(0, 0, 0, 0.2)',
              }}
              {...contentProps}
            >
              {!!title && <div className="text-xs font-medium">{title}</div>}
              {!!content && <div className="text-pretty text-xs !leading-[1.68]">{content}</div>}
            </TooltipContent>
          )}
        </TooltipPortal>
      )}
    </Tooltip>
  );
};

export default TooltipIcon;
