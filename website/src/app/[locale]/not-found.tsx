"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="fixed w-full h-full flex justify-center items-center">
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
