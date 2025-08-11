import React from "react";
import { cn } from "@/src/lib/utils";
import { AspectRatio } from "@/src/components/ui/shadcn/aspect-ratio";

export interface BookCardProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode | React.ReactNode[];
  classNames?: {
    container?: string;
    aspectratio?: string;
    book?: {
      container?: string;
      overlay?: string;
      layout?: string;
      tag?: string;
      cover?: string;
      ribbon?: string;
    };
  };
  book?: {
    aspectratio?: number;
    layout?: "custom" | "use-ribbon" | "use-bg-2";
    children?: {
      tag?: React.ReactNode;
      cover?: React.ReactNode;
      ribbon?: React.ReactNode;
    };
  };
}

export const BookCard = ({
  children,
  classNames,
  book,
  ...props
}: BookCardProps) => {
  function BookContent() {
    if (book?.layout === "custom") {
      return book.children?.cover;
    }
    if (book?.layout === "use-bg-2") {
      return (
        <>
          <div className="absolute left-[-20%] top-[-10%] rotate-[10deg] bg-gradient-to-b from-transparent to-amber-500/20 w-[150%] h-[150%]" />
          <div className="absolute left-[-40%] bottom-[-50%] rotate-[-50deg] bg-gradient-to-b from-transparent to-accent w-full h-[150%]" />
          {book.children?.cover}
        </>
      );
    }
    if (book?.layout === "use-ribbon") {
      return (
        <>
          <div
            className={cn(
              "relative w-full h-4/6 pl-5 pr-2 py-5 select-none",
              classNames?.book?.cover
            )}
          >
            {book?.children?.cover}
          </div>
          <div
            className={cn(
              "relative bg-amber-200 w-full h-2/6 pl-5 pr-2 py-5",
              classNames?.book?.ribbon
            )}
          >
            {book?.children?.ribbon}
          </div>
        </>
      );
    }
  }

  return (
    <div
      className={cn(
        "relative w-full h-full min-w-[103px] max-w-[calc(103px*3)] min-h-[182px] max-h-[calc(182px*3)]",
        classNames?.container
      )}
      {...props}
    >
      <AspectRatio
        ratio={book?.aspectratio ?? 5 / 7}
        className={cn("flex w-full h-full", classNames?.aspectratio)}
      >
        <div
          className={cn(
            "font-sans-serif relative w-full h-full bg-sidebar rounded-[5px] shadow-[-6px_6px_10px_-2px_#001b4440,0_0_3px_#8f9aaf1a] overflow-hidden",
            "after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(-90deg,#fff0,#ffffff1a_80%,#ffffff4d_95%,#fff6_96.5%,#cbcbcb14_98%,#6a6a6a1a)]",
            classNames?.book?.overlay
          )}
        >
          <div
            className={cn(
              "relative w-full h-full rounded-[5px]",
              classNames?.book?.container
            )}
          >
            {book?.children?.tag && (
              <span
                className={cn(
                  "absolute z-10 top-[4%] right-[-42%] text-center w-full bg-accent drop-shadow-sm rotate-[50deg] select-none",
                  classNames?.book?.tag
                )}
              >
                {book?.children.tag}
              </span>
            )}
            <div
              className={cn(
                "relative w-full h-full overflow-hidden",
                classNames?.book?.layout
              )}
            >
              <BookContent />
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};
