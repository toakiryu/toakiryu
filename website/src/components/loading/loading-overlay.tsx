"use client";

import useAssetsLoaded from "@/src/hooks/useAssetsLoaded";
import LoadingScreen from "./loading-screen";

const LoadingOverlay = ({
  children,
  forceLoading,
}: {
  children?: React.ReactNode;
  forceLoading?: boolean;
}) => {
  const isLoaded = useAssetsLoaded();

  return (
    <LoadingScreen useLoading={!isLoaded || forceLoading}>
      {children}
    </LoadingScreen>
  );
};

export default LoadingOverlay;
