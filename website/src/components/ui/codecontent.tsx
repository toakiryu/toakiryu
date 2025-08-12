"use client";

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/shadcn/button";
import { Clipboard, ClipboardCheck } from "lucide-react";

export interface CodePreviewProps extends React.HTMLAttributes<HTMLPreElement> {
  code?: string;
  showCopyButton?: boolean;
}
const CodePreview = React.forwardRef<HTMLPreElement, CodePreviewProps>(
  ({ className, code, showCopyButton, ...props }, ref) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = () => {
      if (code) {
        navigator.clipboard
          .writeText(code.toString())
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => console.error("Failed to copy:", err));
      }
    };

    return (
      <div>
        <pre className={cn("overflow-auto", className)} ref={ref} {...props}>
          <code>{code}</code>
        </pre>
        {showCopyButton && (
          <div className="hidden group-hover:flex absolute top-[4px] right-[4px]">
            <Button
              onClick={handleCopy}
              size="icon"
              variant="ghost"
              className="hover:bg-gray-200"
            >
              {copied ? (
                <ClipboardCheck className="w-5" />
              ) : (
                <Clipboard className="w-5" />
              )}
            </Button>
          </div>
        )}
      </div>
    );
  }
);
CodePreview.displayName = "CodePreview";

export interface CodePreviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const CodePreviewCard = React.forwardRef<HTMLDivElement, CodePreviewCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("max-w-full", className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
CodePreviewCard.displayName = "CodePreviewCard";

export interface CodePreviewCardLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const CodePreviewCardLabel = React.forwardRef<
  HTMLDivElement,
  CodePreviewCardLabelProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "w-fit max-w-full py-2 px-3 border border-b-0 rounded-t-lg",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
CodePreviewCardLabel.displayName = "CodePreviewCardLabel";

export interface CodePreviewCardBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const CodePreviewCardBody = React.forwardRef<
  HTMLDivElement,
  CodePreviewCardBodyProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative group py-3 px-4 border rounded-r-lg rounded-b-lg",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
CodePreviewCardBody.displayName = "CodePreviewCardBody";

export interface CodePreviewCardHoverContentBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const CodePreviewCardHoverContentBody = React.forwardRef<
  HTMLDivElement,
  CodePreviewCardHoverContentBodyProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "hidden group-hover:flex absolute top-[5px] right-[5px]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
CodePreviewCardHoverContentBody.displayName = "CodePreviewCardHoverContentBody";

export {
  CodePreview,
  CodePreviewCard,
  CodePreviewCardLabel,
  CodePreviewCardBody,
  CodePreviewCardHoverContentBody,
};
