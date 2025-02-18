import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    NextLinkProps {
  target?: "_self" | "_blank" | "_parent" | "_top" | "_unfencedTop";
  isDisabled?: boolean;
}

const isExternalLink = (url: string) => {
  return /^https?:\/\//.test(url);
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      rel,
      target,
      href = "/",
      className,
      isDisabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const external = typeof href === "string" && isExternalLink(href);

    return (
      <NextLink
        ref={ref}
        rel={external ? "nofollow noopener" : rel}
        target={external ? "_blank" : target}
        href={href}
        className={cn(
          "text-blue-500 transition-all duration-200 ease-in-out",
          isDisabled
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "hover:opacity-70 active:opacity-50",
          className
        )}
        aria-disabled={isDisabled}
        role="link"
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
