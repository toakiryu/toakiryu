import { Spinner } from "@heroui/react";

function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <Spinner />
    </div>
  );
}

export default Loading;
