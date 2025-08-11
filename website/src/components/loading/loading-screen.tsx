"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { motion, AnimatePresence } from "motion/react";

export const IsLoadingScreenCompleteContext = createContext(false);

const LoadingScreen = ({
  children,
  useLoading,
}: {
  children?: React.ReactNode;
  useLoading?: boolean;
}) => {
  const exit_duration = 0.8;
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!useLoading && leftRef.current && rightRef.current) {
      animate(leftRef.current, {
        delay: exit_duration * 1000,
        translateX: "-110%",
        duration: 2000,
        easing: "outQuad",
        onComplete: () => {
          setComplete(true);
        },
      });
      animate(rightRef.current, {
        delay: exit_duration * 1000,
        translateX: "110%",
        duration: 2000,
        easing: "outQuad",
        onComplete: () => {
          setComplete(true);
        },
      });
    }
  }, [useLoading]);

  return (
    <IsLoadingScreenCompleteContext.Provider value={complete}>
      {children}
      {complete === false && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            ref={leftRef}
            className="absolute top-0 left-0 w-1/2 h-full bg-accent z-999999999998"
          />
          <div
            ref={rightRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-accent z-999999999998"
          />
        </div>
      )}
      <AnimatePresence>
        {useLoading && (
          <motion.div
            id="loading-screen"
            className="fixed inset-0 top-0 left-0 flex items-center justify-center bg-background z-999999999999"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: exit_duration, ease: "easeOut" },
            }}
          >
            <div className="fixed flex justify-center items-center w-full h-full">
              <div className="container max-w-5xl mx-auto relative overflow-hidden">
                <div className="items-center text-center">
                  <h1 className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl mb-5">
                    桐生トア｜公式WEBサイト
                  </h1>
                  <motion.div
                    className="bg-black h-[2px]"
                    initial={{ width: 0, opacity: 1 }}
                    animate={{ width: "100%", opacity: [1, 1, 0] }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </IsLoadingScreenCompleteContext.Provider>
  );
};

export default LoadingScreen;
