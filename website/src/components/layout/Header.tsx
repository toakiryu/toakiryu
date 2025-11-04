"use client";

import { ColorModeToggle } from "@/components/ui/custom/color-mode-toggle.tsx";

export function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-backdrop-filter:bg-background/60 bg-background/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="size-2 shrink-0 rounded-full bg-primary shadow-[0_0_24px_4px_var(--color-blue-500)]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide truncate">
            Next.js Rich Tpl
          </span>
        </div>
        <nav className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ColorModeToggle />
        </nav>
      </div>
    </header>
  );
}
