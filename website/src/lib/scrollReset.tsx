"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // ページ遷移のたびに最上部へスクロール
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
