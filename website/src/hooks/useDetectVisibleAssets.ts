"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, UseInViewOptions } from "motion/react";
import useAssetsLoaded from "./useAssetsLoaded";
import {
  GLOBAL_LOAD_DELAY,
  GLOBAL_LOADED_DELAY,
} from "@/_config/consts.config";

export function useDetectVisibleAssets<T extends HTMLElement = HTMLElement>({
  delay = GLOBAL_LOADED_DELAY,
  delayPlus = 0,
  inViewOptions,
}: {
  delay?: number;
  delayPlus?: number;
  inViewOptions?: UseInViewOptions;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);
  const rootRef = useRef<Element | null>(null);

  const isInViewCurrent = useInView(ref, {
    root: rootRef,
    ...inViewOptions,
    once: false,
  });

  const isInView = useInView(ref, {
    root: rootRef,
    ...inViewOptions,
  });

  const assetsLoaded = useAssetsLoaded(GLOBAL_LOAD_DELAY + delay + delayPlus);

  useEffect(() => {
    if (assetsLoaded && isInView) {
      setIsVisible(true);
    }
  }, [assetsLoaded, isInView]);

  return { ref, isVisible, rootRef, isInViewCurrent };
}
