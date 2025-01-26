"use client";

import { useParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectItem } from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";

export default function LocaleSwitcherSelect() {
  const locale = useLocale();
  const t = useTranslations("localeSwitcher");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <Select
      aria-label="locale select"
      id="LocaleSwitcherSelect"
      className="inline-flex appearance-none"
      selectedKeys={[locale]}
      disabled={isPending}
      onChange={onSelectChange}
      variant="faded"
    >
      {routing.locales.map((cur) => (
        <SelectItem key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </SelectItem>
      ))}
    </Select>
  );
}
