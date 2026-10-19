import { cn } from '@/lib/utils';

export const RadialBackground = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'fixed inset-0 -z-10 size-full pointer-events-none bg-white [background:radial-gradient(125%_125%_at_50%_0%,#ffffff_35%,rgba(203,243,240,0.65)_70%,rgba(46,196,182,0.22)_100%)]',
        className
      )}
      aria-hidden="true"
    />
  );
};
