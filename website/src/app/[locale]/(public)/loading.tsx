import { IconLoader2 } from "@tabler/icons-react";

function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-dvh animate-pulse">
      <IconLoader2 className="size-[10vw] sm:size-[3vw] animate-spin" />
    </div>
  );
}

export default Loading;
