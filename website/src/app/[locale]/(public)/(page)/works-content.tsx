"use client";

import { works } from "@/_config/works";

import React from "react";
import { RoughNotation } from "react-rough-notation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "motion/react";
import { IconCube } from "@tabler/icons-react";
import { cn } from "@/src/lib/utils";
import { useDetectVisibleAssets } from "@/src/hooks/useDetectVisibleAssets";
import { useAutoplay } from "@/src/hooks/useAutoplay";
import { BookCard } from "@/src/components/custom/book";

function WorkBookCard({ item }: { item: any }) {
  return (
    <BookCard
      classNames={{
        container: "select-none",
        book: {
          tag: "top-[5%] right-[-40%]",
        },
      }}
      book={{
        layout: "use-bg-2",
        children: {
          tag: item.tag,
          cover: (
            <div className="relative flex flex-col justify-between items-center text-center w-full h-full pl-5 pr-2 py-5">
              <div className="w-full h-full pt-5 md:pt-10">
                <h1 className="font-bold text-2xl text-nowrap truncate mb-2">
                  {item.title}
                </h1>
                <p className="text-sm text-wrap line-clamp-3 truncate">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-col justify-end w-full mt-auto">
                <IconCube
                  className="size-[50%] max-w-[50%] mx-auto my-4 md:my-8"
                  stroke={1}
                />
                <span className="text-xs">
                  {item.date.start}~{item.date.end}
                </span>
              </div>
            </div>
          ),
        },
      }}
    />
  );
}

function WorksListRender({ isAnimateArea }: { isAnimateArea?: boolean }) {
  const { ref, isVisible, isInViewCurrent } =
    useDetectVisibleAssets<HTMLUListElement>({
      delayPlus: -500,
      inViewOptions: { once: true, margin: "0px 0px -100px 0px" },
    });
  const [selected, setSelected] = React.useState<any | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true }, [
    Autoplay({
      playOnInit: false,
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const { setAutoplay } = useAutoplay(emblaApi);

  React.useEffect(() => {
    const isPlay = isAnimateArea && isInViewCurrent && !selected;
    setAutoplay(isPlay);
  }, [isAnimateArea, isInViewCurrent, selected]);

  return (
    <>
      <div className="relative mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <motion.ul
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
              hidden: {},
            }}
            className="flex gap-5 p-5"
          >
            {works?.map((item, index) => (
              <motion.li
                key={index}
                className="relative group cursor-pointer w-full h-full min-w-[calc(103px*2.5)] max-w-[calc(103px*3)] md:min-w-[calc(103px*3)] max-h-[calc(182px*3)]"
                layoutId={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ ease: "easeOut" }}
                onClick={() => setSelected(item)}
              >
                <WorkBookCard item={item} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed z-40 top-0 left-0 w-full h-full bg-background/90 backdrop-blur-xs"
            />
            <motion.div
              layoutId={selected.id}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap bg-card w-[90%] sm:w-[600px] rounded-[5px]"
            >
              <WorkBookCard item={selected} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

interface PageHomeWorksContentProps extends React.HTMLProps<HTMLDivElement> {
  isAnimateArea?: boolean;
}

export default function PageHomeWorksContent({
  isAnimateArea,
  className,
  ...props
}: PageHomeWorksContentProps) {
  const { ref, isVisible } = useDetectVisibleAssets<HTMLDivElement>({
    delayPlus: -500,
    inViewOptions: { once: true, margin: "0px 0px -100px 0px" },
  });

  return (
    <div
      ref={ref}
      className={cn("bg-background px-5 py-10", className)}
      {...props}
    >
      <div className="w-full max-w-5xl mx-auto mb-10 px-5">
        <div className="w-fit mx-auto">
          <RoughNotation
            type="underline"
            show={isVisible}
            animationDuration={1500}
            color="color-mix(in oklab, var(--accent) 80%, transparent)"
            strokeWidth={5}
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-shadow-md/10 text-center uppercase">
              Works
            </h1>
          </RoughNotation>
        </div>
      </div>
      <WorksListRender isAnimateArea={isAnimateArea} />
    </div>
  );
}
