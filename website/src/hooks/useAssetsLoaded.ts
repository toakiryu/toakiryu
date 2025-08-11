import { useState, useEffect, useContext } from "react";
import { GLOBAL_LOAD_DELAY } from "@/_config/consts.config";
import { IsLoadingScreenCompleteContext } from "@/src/components/loading/loading-screen";

const useAssetsLoaded = (delay: number = GLOBAL_LOAD_DELAY) => {
  const IsLoadingScreenComplete = useContext(IsLoadingScreenCompleteContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = (_delay?: number) => {
      setTimeout(() => setIsLoaded(true), _delay);
    };

    if (document.readyState === "complete") {
      handleLoad(IsLoadingScreenComplete ? 0 : delay);
    } else {
      window.addEventListener("load", () => handleLoad);
    }

    return () => {
      window.removeEventListener("load", () => handleLoad);
    };
  }, [delay]);

  return isLoaded;
};

export default useAssetsLoaded;
