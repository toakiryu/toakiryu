import { cn } from 'cn';
import type { HTMLAttributes } from 'react';

function RailSection({
  children,
  className,
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <section className={cn('rail-section', className)}>{children}</section>
  );
}

function RailLabel({ children, className }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('rail-label', className)}>{children}</span>;
}

function RailBody({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rail-body', className)}>{children}</div>;
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
