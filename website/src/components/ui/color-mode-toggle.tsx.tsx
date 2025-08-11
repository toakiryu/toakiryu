"use client";

import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Skeleton } from "@/src/components/ui/shadcn/skeleton";
import { ClientOnly } from "./client-only";

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ClientOnly fallback={<Skeleton className="w-6 h-6" />}>
      <button
        aria-label="toggle color mode"
        className="flex justify-center items-center w-6 h-6"
        onClick={toggleColorMode}
        suppressContentEditableWarning
        suppressHydrationWarning
      >
        {theme === "light" ? <IconMoon /> : <IconSun />}
      </button>
    </ClientOnly>
  );
}
