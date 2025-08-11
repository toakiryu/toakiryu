import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  type Icon,
  type IconProps,
  IconBrandAws,
  IconBrandBootstrap,
  IconBrandCloudflare,
  IconBrandCss3,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGit,
  IconBrandGithub,
  IconBrandGithubCopilot,
  IconBrandGoogleAnalytics,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandNpm,
  IconBrandNuxt,
  IconBrandOpenai,
  IconBrandPnpm,
  IconBrandPrisma,
  IconBrandPython,
  IconBrandReact,
  IconBrandStorybook,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVscode,
  IconBrandVue,
  IconBrandWix,
  IconBrandWordpress,
} from "@tabler/icons-react";

export type TechCategoryTypes =
  | "tool"
  | "platform"
  | "ai"
  | "devops"
  | "language"
  | "fullstack"
  | "frontend"
  | "backend"
  | "database"
  | "package-manager"
  | "other";

export type techStackType = {
  label: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  category: TechCategoryTypes;
  tags?: string[];
};

export const techStackList: techStackType[] = [
  {
    label: "Aws",
    icon: IconBrandAws,
    category: "devops",
  },
  {
    label: "Bootstrap",
    icon: IconBrandBootstrap,
    category: "frontend",
  },
  {
    label: "Cloudflare",
    icon: IconBrandCloudflare,
    category: "devops",
  },
  {
    label: "Css",
    icon: IconBrandCss3,
    category: "frontend",
  },
  {
    label: "Docker",
    icon: IconBrandDocker,
    category: "devops",
  },
  {
    label: "Figma",
    icon: IconBrandFigma,
    category: "tool",
  },
  {
    label: "Git",
    icon: IconBrandGit,
    category: "tool",
  },
  {
    label: "Github",
    icon: IconBrandGithub,
    category: "tool",
  },
  {
    label: "Github Copilot",
    icon: IconBrandGithubCopilot,
    category: "tool",
  },
  {
    label: "Google Analytics",
    icon: IconBrandGoogleAnalytics,
    category: "tool",
  },
  {
    label: "Html",
    icon: IconBrandHtml5,
    category: "frontend",
  },
  {
    label: "Javascript",
    icon: IconBrandJavascript,
    category: "language",
  },
  {
    label: "Nextjs",
    icon: IconBrandNextjs,
    category: "fullstack",
  },
  {
    label: "Nodejs",
    icon: IconBrandNodejs,
    category: "backend",
  },
  {
    label: "Npm",
    icon: IconBrandNpm,
    category: "package-manager",
  },
  {
    label: "Nuxt",
    icon: IconBrandNuxt,
    category: "fullstack",
  },
  {
    label: "Openai",
    icon: IconBrandOpenai,
    category: "ai",
  },
  {
    label: "Pnpm",
    icon: IconBrandPnpm,
    category: "package-manager",
  },
  {
    label: "Prisma",
    icon: IconBrandPrisma,
    category: "database",
  },
  {
    label: "Python",
    icon: IconBrandPython,
    category: "language",
  },
  {
    label: "React",
    icon: IconBrandReact,
    category: "frontend",
  },
  {
    label: "Storybook",
    icon: IconBrandStorybook,
    category: "frontend",
  },
  {
    label: "Supabase",
    icon: IconBrandSupabase,
    category: "database",
  },
  {
    label: "Tailwind",
    icon: IconBrandTailwind,
    category: "frontend",
  },
  {
    label: "Typescript",
    icon: IconBrandTypescript,
    category: "language",
  },
  {
    label: "Vercel",
    icon: IconBrandVercel,
    category: "devops",
  },
  {
    label: "Vscode",
    icon: IconBrandVscode,
    category: "tool",
  },
  {
    label: "Vue",
    icon: IconBrandVue,
    category: "frontend",
  },
  {
    label: "Wix",
    icon: IconBrandWix,
    category: "platform",
  },
  {
    label: "Wordpress",
    icon: IconBrandWordpress,
    category: "platform",
  },
];
