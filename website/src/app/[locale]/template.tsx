"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function Template({ children }: { children: React.ReactNode }) {
  // スクロールコンテナを参照するための ref を作成
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ref がまだ初期化されていない場合は何もしない
    if (!scrollRef.current) return;

    // Lenis インスタンスを生成
    const lenis = new Lenis({
      // アニメーションの継続時間（秒）を指定：値を大きくするとスクロールがよりなめらかになる
      duration: 2,
      // イージング関数：スクロールの加速度に関係する（この関数は指数的に減速する）
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // requestAnimationFrame を使って毎フレーム lenis の状態を更新する関数
    function raf(time: number) {
      lenis.raf(time); // Lenis に現在の時間を渡して更新
      requestAnimationFrame(raf); // 次のフレームでも raf を呼び出す
    }

    // 初回の requestAnimationFrame を開始
    requestAnimationFrame(raf);

    // コンポーネントのアンマウント時に Lenis を破棄してリソースを開放
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main
      ref={scrollRef} // スクロール対象の DOM 要素を指定
      data-scroll-container // Lenis 用の属性（主にスタイル用途）
      className="relative w-full h-full" // Tailwind によるスタイル
    >
      {children}
    </main>
  );
}
