"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";

import { useTheme } from "next-themes";

import { Skeleton } from "../shadcn/skeleton";
import { ClientOnly } from "./client-only";

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleColorMode = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const newTheme = theme === "light" ? "dark" : "light";

    // detect mobile / coarse-pointer devices — on these devices the
    // View Transitions API and browser color-scheme changes can cause
    // unstable repaints (flashes). If mobile, fall back to instant change.
    let isMobile = false;
    try {
      const ua = navigator.userAgent || "";
      const hasCoarsePointer =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches;
      isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || hasCoarsePointer;
    } catch (e) {
      isMobile = false;
    }

    // View Transitions API のサポートチェック
    if (
      !document.startViewTransition ||
      !event.currentTarget ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      isMobile
    ) {
      setTheme(newTheme);
      return;
    }

    // アニメーション中心位置: ボタンの中心にする
    // (以前はクリック位置を中心にしていたため、画面上のどこを押したかで
    //  アニメーションの起点が変わっていました)
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 画面の端までの最大距離を計算（円の半径）
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // View Transition を開始
    // 一時的に既存の CSS トランジション / アニメーションが干渉しないよう抑止する
    const DISABLE_CLASS = "disable-theme-transition";
    try {
      document.documentElement.classList.add(DISABLE_CLASS);
    } catch (e) {
      // ignore
    }

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    // アニメーション用のクリップパスを適用
    try {
      await transition.ready;

      // 常に新しいテーマ (::view-transition-new) が円形に広がる
      try {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      } catch (e) {
        // ignore if pseudoElement animation isn't supported
      }

      await transition.finished;
    } finally {
      // クリーンアップ: 追加した抑止クラスを必ず外す
      try {
        document.documentElement.classList.remove(DISABLE_CLASS);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <ClientOnly fallback={<Skeleton className="w-6 h-6" />}>
      <button
        aria-label="toggle color mode"
        className="cursor-target flex justify-center items-center w-6 h-6 transition-transform hover:scale-110 active:scale-95"
        onClick={toggleColorMode}
        suppressContentEditableWarning
        suppressHydrationWarning
      >
        {theme === "light" ? <IconMoon /> : <IconSun />}
      </button>
    </ClientOnly>
  );
}
