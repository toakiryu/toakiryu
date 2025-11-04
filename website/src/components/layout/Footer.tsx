"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "@/components/ui/custom/LocaleSwitcher";

export function Footer() {
  const t = useTranslations("pages.home");

  return (
    <footer className="mt-12 md:mt-16 border-t">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Next.js Rich Template</p>
          <div className="flex items-center gap-4">
            <Link className="hover:underline" href="/" aria-label="home">
              {t("footer.home")}
            </Link>
            <Link className="hover:underline" href="#features">
              {t("footer.features")}
            </Link>
            <Link className="hover:underline" href="#usage">
              {t("footer.usage")}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
