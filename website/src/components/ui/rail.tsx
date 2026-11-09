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
        'flex gap-2 md:block sticky top-0.5 self-start items-baseline mb-3 font-heading text-sm uppercase',
        'before:block before:content-[counter(rail,decimal-leading-zero)]',
        className,
      )}
    >
      <span className="hidden md:block w-7 my-2.5 border-y" />
      <span className="md:t-orient-mixed md:writing-mode-vertical-rl">
        {children}
      </span>
    </span>
  );
}

function RailLabelSubtitle({
  children,
  className,
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('hidden md:block text-xs text-muted-foreground', className)}
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
    <h2
      className={cn(
        'text-2xl font-medium font-heading tracking-tight',
        className,
      )}
    >
      {children}
    </h2>
  );
}

function RailDescription({
  children,
  className,
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-muted-foreground mt-4', className)}>
      {children}
    </p>
  );
}

function RailContent({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-7', className)}>{children}</div>;
}

export {
  RailSection,
  RailLabel,
  RailLabelSubtitle,
  RailBody,
  RailTitle,
  RailDescription,
  RailContent,
};
