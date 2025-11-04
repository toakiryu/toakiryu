"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFoundPage() {
  const t = useTranslations("pages.errors.notFound");

  return (
    <div className="min-h-dvh font-sans flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 flex-1 flex items-center justify-center">
        <div className="relative py-16 md:py-24 text-center">
          <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] overflow-hidden">
            <div className="w-[min(400px,100vw)] h-[min(400px,100vw)] bg-radial from-destructive/40 to-transparent rounded-full blur-3xl mx-auto" />
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight md-4">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground md-8">
            {t("subtitle")}
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto md-8">
            {t("description")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground text-background px-6 text-sm font-medium hover:opacity-90 transition whitespace-nowrap"
            >
              {t("goHome")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
