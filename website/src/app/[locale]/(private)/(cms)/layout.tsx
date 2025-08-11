import React, { ReactNode } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ServerUserProvider } from "@/src/provider/clerk/user/server-user-provider";
import ContentAccessDenied from "./access-denied";

export default function DashboardLayoutRoot({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <ServerUserProvider>
          {/* <ClerkRolePrivilegeProvider
        required={["editor"]}
        fallback={<p>権限がありません</p>}
        >
        </ClerkRolePrivilegeProvider> */}
          {children}
        </ServerUserProvider>
      </SignedIn>
      <SignedOut>
        <ContentAccessDenied />
      </SignedOut>
    </>
  );
}
