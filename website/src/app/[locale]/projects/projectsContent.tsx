"use client";

import React, {
  JSX,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import {
  CloseIcon,
} from "@/components/ui/expandableCard";
import cards from "./projectCards";

function ExpandableCardGridMapDiv({
  id,
  card,
  children,
  onClick,
}: {
  id: string;
  card: projectExpandableCardGridType;
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <motion.li
      layoutId={`card-${card.title}-${id}`}
      key={card.title}
      onClick={onClick}
      className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
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
    >
      {children}
    </motion.li>
  );
}

export type projectExpandableCardGridType = {
  title: string;
  times: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  description: () => JSX.Element | string;
  content: () => JSX.Element;
};

export function ExpandableCardGrid({
  cards,
  classNames,
}: {
  cards: projectExpandableCardGridType[];
  classNames?: {
    ul?: string;
  };
}) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-x-hidden overflow-y-auto"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={500}
                  height={500}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.times}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.times}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="relative h-auto pt-4 px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-auto md:h-fit pb-10 flex flex-col items-start gap-4 overflow-y-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <div className="text-neutral-700 dark:text-neutral-300">
                      {typeof active.description === "function"
                        ? active.description()
                        : active.description}
                    </div>
                    <hr className="w-full" />
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul
        className={cn(
          "max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4",
          classNames?.ul
        )}
      >
        {cards.map((card, index) => (
          <ExpandableCardGridMapDiv
            key={index}
            id={id}
            card={card}
            onClick={() => setActive(card)}
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.span
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.span>
                <motion.p
                  layoutId={`description-${card.times}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.times}
                </motion.p>
              </div>
            </div>
          </ExpandableCardGridMapDiv>
        ))}
      </ul>
    </>
  );
}

export default function ProjectsContent() {
  return (
    <ExpandableCardGrid
      cards={cards}
      classNames={{
        ul: "container max-w-5xl lg:!grid-cols-3",
      }}
    />
  );
}
