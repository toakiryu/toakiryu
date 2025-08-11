import siteConfig from "@/richtpl.config";
import "./globals.css";

import { ThemeProvider } from "next-themes";

export default async function PrivateRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme={siteConfig.themeConfig.colorMode.defaultMode}
      {...siteConfig.themeConfig.colorMode.custom}
    >
      {children}
    </ThemeProvider>
  );
}
