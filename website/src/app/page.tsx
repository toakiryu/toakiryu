import {
  IconChartColumn,
  IconCloudExclamation,
  IconComponents,
  IconLockCheck,
  IconTemplate,
  IconTerminal,
} from "@tabler/icons-react";

import { ScrollProgress } from "@/components/magicui/scroll-progress";

import Header from "@/components/header";
import SectionHero from "@/components/sections/hero";
import SectionSocials from "@/components/sections/socials";
import SectionUseCases from "@/components/sections/use-cases";
import SectionProjects from "@/components/sections/projects";
import SectionMyStatus from "@/components/sections/my-status";
import SectionTestimonials from "@/components/sections/testimonials";
import SectionCommunity from "@/components/sections/community";
import SectionCta from "@/components/sections/cta";
import Footer from "@/components/footer";
import SectionCertifications from "@/components/sections/certifications";

export default function Home() {
  return (
    <div className="relative w-full h-full">
      <Header />
      <ScrollProgress className="top-[56px]" />
      <SectionHero />
      <SectionSocials
        socialLinks={[
          {
            name: "GitHub",
            href: "http://l.toakiryu.com/github",
            src: "/wp-content/companies/github.svg",
          },
          {
            name: "Discord",
            href: "http://l.toakiryu.com/discord",
            src: "/wp-content/companies/discord.svg",
          },
          {
            name: "YouTube",
            href: "http://l.toakiryu.com/youtube",
            src: "/wp-content/companies/youtube.svg",
          },
          {
            name: "Spotify",
            href: "http://l.toakiryu.com/spotify",
            src: "/wp-content/companies/spotify.svg",
          },
          { name: "Zoom", href: "", src: "/wp-content/companies/zoom.svg" },
          {
            name: "Amazon",
            href: "http://l.toakiryu.com/amazon-ls",
            src: "/wp-content/companies/amazon.svg",
          },
        ]}
      />
      <SectionCertifications />
      <SectionUseCases />
      <SectionProjects
        projects={[
          {
            icon: IconComponents,
            title: "Next.js Custom Components",
            description:
              "Next.js の従来のコンポーネントを自分好みにカスタマイズをしています。",
            link: "https://github.com/toakiryu/nextjs-custom-components",
          },
          {
            icon: IconChartColumn,
            title: "Scratch Status",
            description:
              "Scratchサービスの稼働状況をリアルタイムで監視し、稼働時間、バージョン、サーバー負荷、データベースの健康状態などの詳細なステータス情報を提供します。Scratchの主要なサービスとキャッシュ接続の状態を確認できます。",
            link: "https://github.com/toakiryu/scratch-status",
          },
          {
            icon: IconLockCheck,
            title: "Scratch Auth v2",
            description:
              "Scratch用のシンプルなOAuthサービスで、開発者にはわかりやすいAPIを、ユーザーにはスムーズなログイン体験を提供します。これを使用すると、WebサイトにOAuth機能を簡単に実装できます。",
            link: "https://github.com/scratch-auth/pkg",
          },
          {
            icon: IconTemplate,
            title: "Next.js Rich Tpl",
            description:
              "Next.jsを使用してモダンなWebアプリケーションを構築するための堅牢なスタートポイントを提供するテンプレートです。ローカリゼーションやテーマ切り替え機能を事前に組み込み、さらに簡単に開発を開始できます。",
            link: "https://github.com/toakiryu/nextjs-rich-tpl",
          },
          {
            icon: IconTerminal,
            title: "Zshmgr",
            description:
              "Zsh用のシンプルなパッケージマネージャーです。ユーザーはパッケージのインストール、アンインストール、アップデート、リスト表示を簡単に行うことができます。このツールはGitHubリポジトリとシームレスに連携するように設計されており、Zshスクリプトやツールの管理が容易になります。",
            link: "https://github.com/toakiryu/zshmgr",
          },
          {
            icon: IconCloudExclamation,
            title: "Scratch Hack Alert",
            description:
              "Scratchプロジェクトのクラウド変数を監視して、レートを超える不正なリクエストを検知したりします。このプロジェクトは現在開発初期段階にあります。",
            link: "https://github.com/toakiryu/scratchhackalert",
          },
        ]}
      />
      <SectionMyStatus />
      <SectionTestimonials
        testimonials={[
          {
            name: "?????",
            role: "??",
            description:
              "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description: "?????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description:
              "??????????????????????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description:
              "????????????????????????????????????????????????????????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description:
              "???????????????????????????????????????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description: "????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description: "???",
          },
          {
            name: "?????",
            role: "??",
            description:
              "??????????????????????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description:
              "????????????????????????????????????????????????????????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description: "?????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description:
              "???????????????????????????????????????????????????????????????????????",
          },
          {
            name: "?????",
            role: "??",
            description:
              "??????????????????????????????????????????????????????",
          },
        ]}
      />
      <SectionCommunity />
      <SectionCta />
      <Footer />
    </div>
  );
}
