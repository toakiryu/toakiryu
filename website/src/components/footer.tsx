"use client";

import { Link } from "@/i18n/routing";
import { Image, Tooltip } from "@heroui/react";
import React from "react";
import { socials } from "../../config";
import { useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./ui/LocaleSwitcherSelect";
import { ColorModeSwitcherSelect } from "./ui/colorModeSwitcherSelect";

export type FooterNavItemLinkType = {
  href: string;
  label: string;
};
export type FooterNavItemType = {
  label: string;
  items: FooterNavItemLinkType[];
};

export const footerItems: FooterNavItemType[] = [
  {
    label: "website",
    items: [
      {
        href: "/",
        label: "home",
      },
      {
        href: "/projects",
        label: "projects",
      },
      {
        href: "/contact",
        label: "contact",
      },
    ],
  },
  {
    label: "projects",
    items: [
      {
        href: "https://craftrecycle.toakiryu.com",
        label: "craftrecycle",
      },
      {
        href: "https://gform-quick-submit.toakiryu.com",
        label: "gform-quick-submit",
      },
      {
        href: "https://nextjs-rich-tpl.toakiryu.com",
        label: "nextjs-rich-tpl",
      },
      {
        href: "https://safe-encode.vercel.app",
        label: "safe-encode",
      },
      {
        href: "https://scpay.vercel.app",
        label: "scpay",
      },
      {
        href: "https://scratch-building.vercel.app",
        label: "scratch-building",
      },
      {
        href: "https://scratch-status.toakiryu.com",
        label: "scratch-status",
      },
      {
        href: "https://support-scripts.toakiryu.com",
        label: "support-scripts",
      },
      {
        href: "https://vspodb.vercel.app",
        label: "vspodb",
      },
      {
        href: "https://zshmgr.vercel.app",
        label: "zshmgr",
      },
    ],
  },
];

function Footer() {
  const t = useTranslations("footer");

  // const returnTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <footer className="w-full pt-10 bg-neutral-100 dark:bg-neutral-900">
      <div className="container max-w-5xl p-5">
        <div className="grid grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 gap-10 w-full">
          <div className="mb-10">
            <Image
              alt="Toa Kiryu icon"
              src="/wp-content/toakiryu/icon.webp"
              className="w-10 h-10"
              loading="lazy"
            />
            <div className="mt-5">
              <p>{t("description")}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {socials.map((social, index) => {
                return (
                  <Tooltip key={index} content={social.label} showArrow>
                    <Link
                      href={social.link}
                      target="_blank"
                      className="hover:opacity-50 transition-all duration-300 ease-in-out"
                    >
                      <span className="sr-only">{social.label}</span>
                      <social.icon className="text-lg" />
                    </Link>
                  </Tooltip>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <LocaleSwitcherSelect />
              <ColorModeSwitcherSelect />
            </div>
          </div>
          <div className="flex gap-10">
            {footerItems.map((item, index) => {
              return (
                <div key={index}>
                  <h2 className="font-bold">
                    {t(`items.${item.label}.label`)}
                  </h2>
                  <ul className="flex flex-col mt-5 *:mb-1">
                    {item.items.map((link, idx) => {
                      const isSiteUrl = link.href.indexOf(`https://`) !== 0;
                      return (
                        <li key={idx}>
                          <Link
                            href={link.href}
                            target={isSiteUrl ? "_self" : "_blank"}
                            className="opacity-70 hover:!opacity-50 transition-all duration-300 ease-in-out"
                          >
                            {t(`items.${item.label}.links.${link.label}`)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
