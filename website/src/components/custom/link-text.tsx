import * as React from "react";
import NextLink, { LinkProps } from "next/link";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/src/lib/utils";

const isExternalLink = (url: string) => {
  return /^https?:\/\//.test(url);
};

function LinkText({
  className,
  isLoading = false,
  isDefClass = true,
  ...props
}: React.ComponentProps<"a"> &
  LinkProps & {
    isLoading?: boolean;
    isDefClass?: boolean;
  }) {
  const external = typeof props.href === "string" && isExternalLink(props.href);

  return (
    <NextLink
      rel={external ? "nofollow noopener" : props.rel}
      target={external ? "_blank" : props.target}
      className={cn(
        isDefClass &&
          "text-blue-500 hover:opacity-60 transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {isLoading && <IconLoader2 className="animate-spin" />}
      {props.children}
    </NextLink>
  );
}

export { LinkText };
