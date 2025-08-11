"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/shadcn/button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-full h-full min-h-dvh">
      <div>
        <div className="mb-5">
          <div className="flex text-2xl uppercase">
            <span>404</span>
            <span className="mx-2">|</span>
            <span>Page not found</span>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.push("/")}>
          Go back Home
        </Button>
      </div>
    </div>
  );
}
