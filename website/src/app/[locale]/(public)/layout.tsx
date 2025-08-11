import "./globals.css";

import { LayoutProps } from "../layout";

import { ThemeProvider } from "next-themes";

import MenuContent from "@/src/components/footer";
import NoteLayoutContent from "@/src/components/layouts/note-layout";
import LoadingOverlay from "@/src/components/loading/loading-overlay";

export default async function PublicRootLayout({ children }: LayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      forcedTheme="light"
    >
      <LoadingOverlay>
        <NoteLayoutContent>
          {children}
          <MenuContent />
        </NoteLayoutContent>
      </LoadingOverlay>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
        <defs>
          <filter id="filterDistortFirst">
            <feTurbulence baseFrequency="0.8" numOctaves="7" />
            <feDisplacementMap in="SourceGraphic" scale="-10" />
          </filter>
          <filter id="filterDistortSecond">
            <feTurbulence baseFrequency="0.2" numOctaves="15" />
            <feDisplacementMap in="SourceGraphic" scale="12" />
          </filter>
          <filter id="distort">
            <feTurbulence baseFrequency="0.5" numOctaves="10" />
            <feDisplacementMap in="SourceGraphic" scale="8" />
          </filter>
        </defs>
      </svg>
    </ThemeProvider>
  );
}
