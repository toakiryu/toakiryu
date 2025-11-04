"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider, ThemeProviderProps } from "next-themes";

type Props = {
  children: React.ReactNode;
  defaultTheme?: string | undefined;
  // optional ThemeProvider custom props from site config
  custom?: ThemeProviderProps | undefined;
};

export default function AdaptiveThemeProvider({
  children,
  defaultTheme,
  custom,
}: Props) {
  const [enableColorScheme, setEnableColorScheme] = useState<boolean>(true);

  useEffect(() => {
    try {
      const ua = navigator.userAgent || "";
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      const hasCoarsePointer =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches;

      const isMobile = isMobileUA || hasCoarsePointer;

      // On mobile browsers we disable setting color-scheme to avoid forced
      // UA-level repaint that can cause flash/flicker during transitions.
      setEnableColorScheme(!isMobile);
    } catch (e) {
      setEnableColorScheme(true);
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableColorScheme={enableColorScheme}
      defaultTheme={defaultTheme}
      {...(custom as any)}
    >
      {children}
    </ThemeProvider>
  );
}
