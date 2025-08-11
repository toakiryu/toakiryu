"use client";

import { useRef, useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/shadcn/button";

const MarkdownPre = (props: any) => {
  const { children, className, node, ...rest } = props;
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    const code = preRef.current?.querySelector("code");
    const text = code?.textContent ?? "";
    navigator.clipboard.writeText(text.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex justify-between bg-neutral-100 dark:bg-neutral-800 overflow-auto">
      <pre ref={preRef} className={cn(className)} {...rest}>
        {children}
      </pre>
      <div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="flex justify-center items-chener m-2 p-0 aspect-square"
        >
          {copied ? <IconCheck /> : <IconCopy />}
        </Button>
      </div>
    </div>
  );
};

export default MarkdownPre;
