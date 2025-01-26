"use client";

import React, { ReactNode, useRef } from "react";

import { motion, useInView } from "framer-motion";

import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import BorderSocialButtons from "./borderSocialButtons";
import { useTranslations } from "next-intl";
import { technologies, technologiesType } from "./technologies";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Tooltip,
  useDisclosure,
} from "@heroui/react";

function AnimateContentDiv({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <motion.div
      ref={ref}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 1,
            delay: 0,
            ease: "easeInOut",
          },
        },
        hidden: {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
          transition: {
            duration: 1,
            delay: 0,
            ease: "easeInOut",
          },
        },
      }}
      initial={false}
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col justify-start items-center text-center"
    >
      {children}
    </motion.div>
  );
}

function TechContentCard({ tech }: { tech: technologiesType }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <AnimateContentDiv>
      <Tooltip showArrow content={tech.label}>
        <span className="p-3 border rounded-lg cursor-pointer" onClick={onOpen}>
          <tech.icon
            size={50}
            stroke={1.5}
            className={` ${
              tech.rank === 1
                ? "text-yellow-500"
                : tech.rank === 2
                ? "text-yellow-600/90"
                : tech.rank === 3
                ? "text-yellow-700/80"
                : tech.rank === 4
                ? "text-yellow-800/70"
                : tech.rank === 5
                ? "text-yellow-950/60"
                : ""
            }`}
          />
        </span>
      </Tooltip>
      <Drawer
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "w-auto data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
                <div className="w-full flex justify-start gap-2">
                  <Button
                    className="font-medium text-small text-default-500"
                    size="sm"
                    variant="flat"
                  >
                    <span>
                      {tech.rank === 1
                        ? "習得済み"
                        : tech.rank === 2
                        ? "上級"
                        : tech.rank === 3
                        ? "中級"
                        : tech.rank === 4
                        ? "初級"
                        : tech.rank === 5
                        ? "学習中"
                        : "N/A"}
                    </span>
                  </Button>
                </div>
              </DrawerHeader>
              <DrawerBody className="pt-16">
                <div className="flex flex-col gap-2 py-4">
                  <h1 className="text-2xl font-bold leading-7">
                    {tech.card.title || tech.label}
                  </h1>
                  <p className="mt-1 text-sm text-default-500">
                    {tech.card.subtitle}
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <div className="text-medium text-default-500 flex flex-col gap-2">
                        {tech.card.description}
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </AnimateContentDiv>
  );
}

function HeroAboutMeContent() {
  const t = useTranslations("pages.home.about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: false });

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        delay: 0,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
      transition: {
        duration: 1,
        delay: 0,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 border-y">
      <div className="container max-w-5xl px-5 py-10 flex flex-col justify-center items-center">
        <motion.div
          ref={ref}
          variants={variants}
          initial={false}
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col justify-center items-center text-center"
        >
          <h1 className="font-bold text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl">
            {t("title")}
          </h1>
          <p className="max-w-[80%] mt-5">{t("description")}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:!grid-cols-3 gap-5 mt-10">
          <AnimateContentDiv>
            <FaReact className="text-5xl text-sky-500" />
            <p className="max-w-xs mt-5">{t("items.react")}</p>
          </AnimateContentDiv>
          <AnimateContentDiv>
            <SiTypescript className="text-5xl bg-white text-blue-500 rounded-lg" />
            <p className="max-w-xs mt-5">{t("items.typescript")}</p>
          </AnimateContentDiv>
          <AnimateContentDiv>
            <RiNextjsFill className="text-5xl text-black bg-white rounded-full" />
            <p className="max-w-xs mt-5">{t("items.nextjs")}</p>
          </AnimateContentDiv>
        </div>
        <BorderSocialButtons />
        <motion.div
          ref={ref2}
          variants={variants}
          initial={false}
          animate={isInView2 ? "visible" : "hidden"}
          className="max-w-3xl mt-10 text-center"
        >
          <div>
            <span className="font-bold text-lg sm:!text-xl md:!text-2xl lg:!text-3xl">
              {t("technologies")}
            </span>
            <p className="opacity-70 mt-2">{t("technologies-description")}</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 mt-5">
            {technologies.map((tech, index) => {
              return <TechContentCard key={index} tech={tech} />;
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroAboutMeContent;
