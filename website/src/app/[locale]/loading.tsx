"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("pages.errors.loading");

  return (
    <div className="min-h-dvh font-sans flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 flex-1 flex items-center justify-center">
        <div className="relative py-16 md:py-24 text-center">
          <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] overflow-hidden">
            <div className="w-[min(400px,100vw)] h-[min(400px,100vw)] bg-radial from-primary/40 to-transparent rounded-full blur-3xl mx-auto animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="size-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
            <p className="text-lg md:text-xl text-muted-foreground animate-pulse">
              {t("text")}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
