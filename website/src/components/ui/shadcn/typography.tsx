import {
  BlockquoteHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";

const typography = {
  h1({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) {
    return (
      <h1
        className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) {
    return (
      <h2
        className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) {
    return (
      <h3
        className="scroll-m-20 text-2xl font-semibold tracking-tight"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) {
    return (
      <h4
        className="scroll-m-20 text-xl font-semibold tracking-tight"
        {...props}
      >
        {children}
      </h4>
    );
  },
  p({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >) {
    return (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
        {children}
      </p>
    );
  },
  blockquote({
    children,
    ...props
  }: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  >) {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
        {children}
      </blockquote>
    );
  },
  table({}) {},
  list({
    items,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
    items: string[] | React.ReactNode[];
  }) {
    return (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
        {items.map((_, index) => {
          return <li key={index}>{_}</li>;
        })}
      </ul>
    );
  },
  inlineCode({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
      <code
        className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      >
        {children}
      </code>
    );
  },
  lead({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >) {
    return (
      <p className="text-muted-foreground text-xl" {...props}>
        {children}
      </p>
    );
  },
  large({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
      <div className="text-lg font-semibold" {...props}>
        {children}
      </div>
    );
  },
  small({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
      <small className="text-sm leading-none font-medium" {...props}>
        {children}
      </small>
    );
  },
  muted({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >) {
    return (
      <p className="text-muted-foreground text-sm" {...props}>
        {children}
      </p>
    );
  },
};

export { typography };
