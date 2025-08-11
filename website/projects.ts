import {
  IconBuildings,
  IconTemplate,
  IconUserShield,
} from "@tabler/icons-react";

const projects = [
  {
    icon: IconTemplate,
    image: null,
    title: "Scratch Auth Base",
    description:
      "SAuthBase (Scratch Auth Base SDK) is a modular SDK designed to help integrate secure and simple authentication into Scratch projects and services. It provides consistent session validation, user identification encryption, and more to reduce implementation complexity for developers.",
    repo: "scratchcore/sauthbase",
  },
  {
    icon: IconTemplate,
    image: null,
    title: "Next.js Rich Template",
    description:
      "This project is a Next.js template aimed at providing a robust starting point for building modern web applications. It comes with pre-configured localization support, theme toggling, and various other features to streamline development.",
    repo: "toakiryu/nextjs-rich-tpl",
  },
  {
    icon: IconUserShield,
    image: null,
    title: "Scratch Status",
    description:
      "Monitor the real-time status of Scratch services, including uptime, version, server load, and database health. Stay informed with detailed status indicators for Scratch's key services and cache connectivity.",
    repo: "toakiryu/scratch-status",
  },
  {
    icon: IconBuildings,
    image: null,
    title: "ビル経営ゲーム",
    description:
      "ビル経営ゲームはScratchプラットフォーム上で開発されたゲームであり、このサイトは公式ウェブサイトとして機能します。アカウント認証、コメント、通知、コミュニティ参加など、さまざまな機能を提供しています。",
    repo: "selcold/scratch-building",
  },
];

export { projects };
