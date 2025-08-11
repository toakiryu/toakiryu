"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const forceRedirectUrl = searchParams.get("redirect");
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full min-h-dvh">
      {forceRedirectUrl ? (
        <SignIn oauthFlow="popup" forceRedirectUrl={forceRedirectUrl} />
      ) : (
        <SignIn oauthFlow="popup" />
      )}
    </div>
  );
}
