import type { MDXComponents } from "mdx/types";
import { cn } from "@/src/lib/utils";
import "highlight.js/styles/atom-one-dark.css";
import MarkdownPre from "@/src/components/ui/markdown/pre";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    pre: MarkdownPre,
    code(props) {
      const { children, className, node, ...rest } = props;
      return (
        <code className={cn("overflow-hidden", className)} {...rest}>
          {children}
        </code>
      );
    },
    ...components,
  };
}
