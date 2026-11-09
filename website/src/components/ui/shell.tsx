import { cn } from 'cn';
import type { HTMLAttributes } from 'react';

function Shell({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col max-w-xl md:ml-[calc(var(--rail-width)+var(--rail-gap))] pt-14 pb-16',
        className,
      )}
    >
      {children}
    </div>
  );
}

function ShellBanner({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <span className={cn('text-[11px] font-mono text-neutral-500', className)}>
      {children}
    </span>
  );
}

function ShellTitle({
  children,
  className,
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'text-4xl sm:text-5xl font-medium font-heading tracking-tight mt-4',
        className,
      )}
    >
      {children}
    </h1>
  );
}

function ShellDescription({
  children,
  className,
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-lg font-furifont mt-5', className)}>{children}</p>
  );
}

function ShellActions({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-6 gap-y-3 mt-8',
        className,
      )}
    >
      {children}
    </div>
  );
}

function ShellFooter({ children, className }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-[11px] font-mono text-neutral-500 mt-7', className)}
    >
      {children}
    </span>
  );
}

export {
  Shell,
  ShellBanner,
  ShellTitle,
  ShellDescription,
  ShellActions,
  ShellFooter,
};
