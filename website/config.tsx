import { IconType } from "react-icons";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const products = [
  {
    title: "Craft Recycle",
    thumbnail: "/wp-content/product/craftrecycle.toakiryu.com.webp",
  },
  {
    title: "GForm Quick Submit",
    thumbnail: "/wp-content/product/gform-quick-submit.toakiryu.com.webp",
  },
  {
    title: "Next.js Rich Template",
    thumbnail: "/wp-content/product/nextjs-rich-tpl.toakiryu.com.webp",
  },

  {
    title: "Safe Encode",
    thumbnail: "/wp-content/product/safe-encode.vercel.app.webp",
  },
  {
    title: "ScPay",
    thumbnail: "/wp-content/product/scpay.vercel.app.webp",
  },
  {
    title: "Scratch Building",
    thumbnail: "/wp-content/product/scratch-building.vercel.app.webp",
  },

  {
    title: "Scratch Status",
    thumbnail: "/wp-content/product/scratch-status.toakiryu.com.webp",
  },
  {
    title: "Support Scripts",
    thumbnail: "/wp-content/product/support-scripts.toakiryu.com.webp",
  },
  {
    title: "VspoDB",
    thumbnail: "/wp-content/product/vspodb.vercel.app.webp",
  },
  {
    title: "Zshmgr",
    thumbnail: "/wp-content/product/zshmgr.vercel.app.webp",
  },
  {
    title: "StreamKit Portal",
    thumbnail: "/wp-content/product/streamkitportal.com.webp",
  },

  {
    title: "COMING SOON",
    thumbnail: "/wp-content/product/comingsoon.webp",
  },
  {
    title: "COMING SOON",
    thumbnail: "/wp-content/product/comingsoon.webp",
  },
  {
    title: "COMING SOON",
    thumbnail: "/wp-content/product/comingsoon.webp",
  },
  {
    title: "COMING SOON",
    thumbnail: "/wp-content/product/comingsoon.webp",
  },
];

export type socialType = {
  id: string;
  label: string;
  link: string;
  icon: IconType;
  className?: string;
};

export const socials: socialType[] = [
  {
    id: "github",
    label: "GitHub",
    link: "https://l.toakiryu.com/github",
    icon: FaGithub,
    className: "bg-black text-white",
  },
  {
    id: "x",
    label: "X (Twitter)",
    link: "https://l.toakiryu.com/x",
    icon: FaXTwitter,
    className: "bg-black text-white",
  },
  {
    id: "discord",
    label: "Discord",
    link: "https://l.toakiryu.com/discord",
    icon: FaDiscord,
    className: "bg-blue-500 text-white",
  },
];
