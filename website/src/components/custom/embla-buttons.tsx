"use client";

import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/src/lib/utils";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      className={cn(
        "absolute md:left-[3vw] lg:left-[2vw] xl:left-[1.5vw] top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background text-foreground p-2 rounded-full drop-shadow-lg transition",
        className
      )}
      type="button"
      {...restProps}
    >
      <IconChevronLeft
        size={72}
        className="md:size-[5vw] lg:size-[4vw] xl:size-[3vw]"
      />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      className={cn(
        "absolute md:right-[3vw] lg:right-[2vw] xl:right-[1.5vw] top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background text-foreground p-2 rounded-full drop-shadow-lg transition",
        className
      )}
      type="button"
      {...restProps}
    >
      <IconChevronRight
        size={72}
        className="md:size-[5vw] lg:size-[4vw] xl:size-[3vw]"
      />
      {children}
    </button>
  );
};
