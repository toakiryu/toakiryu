"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("pages.errors.error");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh font-sans flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 flex-1 flex items-center justify-center">
        <div className="relative py-16 md:py-24 text-center">
          <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] overflow-hidden">
            <div className="w-[min(400px,100vw)] h-[min(400px,100vw)] bg-radial from-destructive/40 to-transparent rounded-full blur-3xl mx-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight md-4">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground md-8">
            {t("subtitle")}
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground md-8 font-mono">
              {t("errorId")}: {error.digest}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground text-background px-6 text-sm font-medium hover:opacity-90 transition whitespace-nowrap"
            >
              {t("tryAgain")}
            </button>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium hover:bg-foreground/5 transition whitespace-nowrap"
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
