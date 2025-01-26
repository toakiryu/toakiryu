"use client";

import { useTranslations } from "next-intl";
import { footerItems } from "./footer";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { Link, usePathname } from "@/i18n/routing";
import { IconMenu2, IconX } from "@tabler/icons-react";
import LocaleSwitcherSelect from "./ui/LocaleSwitcherSelect";
import { ColorModeSwitcherSelect } from "./ui/colorModeSwitcherSelect";
import { motion } from "framer-motion";

export default function Header() {
  const tFooter = useTranslations("footer");
  const t = useTranslations("header");
  const tContact = useTranslations("pages.contact");
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <header className="fixed z-50 top-0 left-0 right-0">
        <motion.div
          initial={{
            y: -100,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: "easeInOut",
          }}
          className="w-full backdrop-blur-lg border-b"
        >
          <div className="flex justify-between items-center w-full px-5 py-3">
            <div className="w-fit">
              <span className="font-bold">{t("title")}</span>
            </div>
            <div className="hidden md:!block grow">
              <nav className="flex justify-center items-center gap-5 w-full">
                {footerItems
                  .find((item) => item.label === "website")
                  ?.items.map((link, index) => {
                    const isSiteUrl = link.href.indexOf(`https://`) !== 0;
                    const isNow = pathname === link.href;
                    return (
                      <Link
                        key={index}
                        href={link.href}
                        target={isSiteUrl ? "_self" : "_blank"}
                        className={`${
                          isNow ? "font-bold" : "opacity-70"
                        } hover:!opacity-50 transition-all duration-300 ease-in-out`}
                      >
                        {tFooter(`items.website.links.${link.label}`)}
                      </Link>
                    );
                  })}
              </nav>
            </div>
            <div className="hidden md:!block">
              <a
                href={`/contact?subject=${tContact(
                  "form.fields.subject-lists.1"
                )}`}
                className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent active:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none shadow-lg shadow-primary/40 bg-primary text-primary-foreground hover:opacity-hover"
              >
                {t("buttons.request")}
              </a>
            </div>
            <div className="md:!hidden">
              <button
                className="flex justify-center items-center"
                onClick={onOpen}
                aria-label="Header Menu Button"
              >
                {isOpen ? <IconX /> : <IconMenu2 />}
              </button>
              <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top"
                classNames={{
                  base: "!h-dvh !max-h-dvh",
                }}
                motionProps={{
                  variants: {
                    enter: {
                      opacity: 1,
                      y: 0,
                    },
                    exit: {
                      y: -100,
                      opacity: 0,
                    },
                  },
                }}
              >
                <DrawerContent>
                  {(onClose) => (
                    <>
                      <DrawerHeader className="flex flex-col gap-1">
                        {tFooter("description")}
                      </DrawerHeader>
                      <DrawerBody>
                        <nav className="flex flex-col justify-start items-center gap-5 w-full">
                          {footerItems
                            .find((item) => item.label === "website")
                            ?.items.map((link, index) => {
                              const isSiteUrl =
                                link.href.indexOf(`https://`) !== 0;
                              const isNow = pathname === link.href;
                              return (
                                <Link
                                  key={index}
                                  href={link.href}
                                  target={isSiteUrl ? "_self" : "_blank"}
                                  className={`${
                                    isNow ? "font-bold" : "opacity-70"
                                  } hover:!opacity-50 transition-all duration-300 ease-in-out`}
                                  onClick={onClose}
                                >
                                  {tFooter(`items.website.links.${link.label}`)}
                                </Link>
                              );
                            })}
                        </nav>
                      </DrawerBody>
                      <DrawerFooter className="flex flex-wrap gap-3">
                        <div className="grid grid-cols-2 gap-3 w-full">
                          <LocaleSwitcherSelect />
                          <ColorModeSwitcherSelect />
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-full">
                          <a
                            href={`/contact?subject=${tContact(
                              "form.fields.subject-lists.1"
                            )}`}
                            className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent active:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none shadow-lg shadow-primary/40 bg-primary text-primary-foreground hover:opacity-hover"
                            onClick={onClose}
                          >
                            {t("buttons.request")}
                          </a>
                          <Button
                            color="danger"
                            variant="faded"
                            onPress={onClose}
                          >
                            {t("buttons.close")}
                          </Button>
                        </div>
                      </DrawerFooter>
                    </>
                  )}
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </motion.div>
      </header>
    </div>
  );
}
