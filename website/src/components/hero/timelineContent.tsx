"use client";

import { Image } from "@heroui/react";
import { Timeline } from "../ui/timeline";

export const timelineData = [
  {
    title: "2021",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          学校で新たにプログラミングの授業が始まり、Scratch Jr
          のブロックプログラミングを体験しました。この授業をきっかけに、プログラミングに対する興味が芽生え、さらに自宅でも学習を続けるようになりました。学校から全生徒に支給された
          iPad では、Scratch Jr
          を使って遊びながら学び、プログラミングの基本的な概念に触れることができました。
        </p>
        <div className="grid grid-cols-1 sm:!grid-cols-2 gap-4">
          <Image
            src="/wp-content/images/scratchjr.webp"
            alt="Scratch Jr"
            width={200}
            height={100}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          プログラミングに興味を持ち始めた私は、独学でさらに学びを深めることを決意し、Scratch
          Jr から発展した Scratch を発見しました。Scratch
          は、視覚的なプログラミングだけでなく、より本格的なプロジェクト作成を可能にするツールであり、そこから私は自分のプロジェクト制作に取り組み始めました。最初は簡単なゲームやアニメーションを作成して、プログラミングに慣れていきました。
        </p>
        <div className="grid grid-cols-1 sm:!grid-cols-2 gap-4">
          <Image
            src="/wp-content/images/scratch.webp"
            alt="Scratch"
            width={200}
            height={100}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          中学校に進学した私は、初めて自分のお小遣いで PC
          を購入しました。これにより、プログラミングへの関わりがさらに深まり、ブロックプログラミングからコーディングの世界へ挑戦することになりました。最初に挑戦したのは、HTML
          と CSS を使用して静的なウェブサイトを作成することでした。約一年間 HTML
          を学び、その後、JavaScript
          を使って動的なウェブサイトの作成に挑戦しました。
        </p>
        <div className="flex flex-wrap gap-4">
          <Image
            src="/wp-content/images/html-icon.webp"
            alt="HTML 5"
            width={50}
            height={50}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
          <Image
            src="/wp-content/images/css-icon.webp"
            alt="CSS 3"
            width={50}
            height={50}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
          <Image
            src="/wp-content/images/javascript-icon.webp"
            alt="JavaScript"
            width={50}
            height={50}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          静的なサイトの開発から、動的なウェブサイトの開発に進展しました。YouTube
          で React を知り、その後 UI
          構築ライブラリを学び始めました。また、Next.js
          などのトレンドのフレームワークを集中的に学び、約半年で基本的な使い方を習得しました。この過程で、React
          のスキルだけでなく、JavaScript と TypeScript
          の使用にも慣れました。これにより、Next.js
          を使って本格的なウェブサイトを制作することができるようになりました。
        </p>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          2024年は技術的な成長を遂げた年でした。特に、データベースの Supabase
          や認証機能の Clerk
          を学んだことが印象深いです。年の終わりには、フロントエンドとバックエンドの技術をバランスよく学び、ウェブ開発における幅広いスキルを持つようになりました。
        </p>
        <div className="flex flex-wrap gap-4">
          <Image
            src="/wp-content/images/nextjs.webp"
            alt="Next.js"
            width={200}
            height={100}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
          <Image
            src="/wp-content/images/react.webp"
            alt="React"
            width={200}
            height={100}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
          <Image
            src="/wp-content/images/supabase.webp"
            alt="Supabase"
            width={200}
            height={100}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
          <Image
            src="/wp-content/images/clerk.webp"
            alt="Clerk"
            width={200}
            height={100}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
          <Image
            src="/wp-content/images/typescript.webp"
            alt="TypeScript"
            width={200}
            height={100}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            loading="lazy"
          />
        </div>
      </>
    ),
  },
];

export default function HeroTimelineContent() {
  return (
    <div className="w-full mt-5">
      <Timeline data={timelineData} />
    </div>
  );
}
