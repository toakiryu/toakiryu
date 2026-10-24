import { cn } from 'cn';
import type { HTMLAttributes } from 'react';

function RailSection({
  children,
  className,
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <section
      className={cn(
        '[counter-increment:rail]',
        'md:not-[.rail-section--inline]:grid',
        'md:not-[.rail-section--inline]:grid-cols-[var(--rail-width)_minmax(0,1fr)]',
        'md:not-[.rail-section--inline]:gap-x-(--rail-gap)',
        className,
      )}
    >
      {children}
    </section>
  );
}

function RailLabel({ children, className }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'block sticky top-0.5 self-start items-baseline mb-3 text-sm uppercase',
        className,
      )}
    >
      {children}
    </span>
  );
}

function RailBody({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('max-w-xl', className)}>{children}</div>;
}

function RailTitle({
  children,
  className,
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('text-2xl font-medium tracking-tight', className)}>
      {children}
    </h2>
  );
}

function RailContent({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-7', className)}>{children}</div>;
}

export { RailSection, RailLabel, RailBody, RailTitle, RailContent };
