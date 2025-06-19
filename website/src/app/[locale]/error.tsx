"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: any; reset: any }) {
  console.log(error);

  return (
    <div className="fixed w-full h-full flex justify-center items-center">
      <div>
        <div className="mb-5">
          <div className="flex text-2xl uppercase">
            <span>500</span>
            <span className="mx-2">|</span>
            <span>Server error</span>
          </div>
        </div>
        <Button variant="outline" onClick={reset}>
          Go back Home
        </Button>
      </div>
    </div>
  );
}
