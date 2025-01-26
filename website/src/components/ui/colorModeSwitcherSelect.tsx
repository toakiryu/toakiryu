"use client";

import { Select, SelectItem } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ColorModeSwitcherSelect() {
  const t = useTranslations("colorModeSwitcher");
  const { theme, themes, setTheme } = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Select
      aria-label="color mode select"
      id="ColorModeSwitcherSelect"
      suppressHydrationWarning
      className="inline-flex appearance-none"
      selectedKeys={theme ? [theme] : []}
      disabled={!setTheme}
      onChange={(e) => setTheme(e.target.value)}
      variant="faded"
    >
      {themes.map((color) => (
        <SelectItem key={color} value={color}>
          {t("color", { color: color })}
        </SelectItem>
      ))}
    </Select>
  );
}
