"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll helpers
 *
 * - DEFAULT_LENIS_SMOOTHING: 主にスクロールの“滑らかさ”に相当する持続時間（秒）。
 *   値を大きくするとスクロールがよりゆったり（滑らか）に、値を小さくすると速いレスポンスになります。
 * - DEFAULT_LENIS_OPTIONS: Lenis のデフォルト設定。ここを編集すれば全体の挙動を簡単に調整できます。
 *
 * 使い方:
 * - すばやく調整したい場合は `DEFAULT_LENIS_SMOOTHING` を編集してください。
 * - さらに細かく変更したい場合は `DEFAULT_LENIS_OPTIONS` を編集してください。
 */
export const DEFAULT_LENIS_SMOOTHING = 2.0;

export const DEFAULT_LENIS_OPTIONS = {
  duration: DEFAULT_LENIS_SMOOTHING, // スクロールの持続時間 (秒)
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // イージング関数
  orientation: "vertical", // 縦スクロール
  gestureOrientation: "vertical", // ジェスチャーの向き
  smoothWheel: true, // マウスホイールをスムーズに
  wheelMultiplier: 0.8, // ホイールの速度倍率
  touchMultiplier: 0.4, // タッチの速度倍率
  infinite: false, // 無限スクロール
} as const;

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Lenisインスタンスを作成
    // 補助変数 `DEFAULT_LENIS_OPTIONS` を使うことで、滑らか度や挙動を一箇所で調整できます。
    const lenis = new Lenis(DEFAULT_LENIS_OPTIONS as any);

    // アニメーションフレームでLenisを更新
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // クリーンアップ
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
