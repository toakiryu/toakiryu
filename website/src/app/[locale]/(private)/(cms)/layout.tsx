import React, { ReactNode } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ServerUserProvider } from "@/src/provider/clerk/user/server-user-provider";
import RoleBasedComponent from "@/src/components/custom/clerk/RoleBased";
import { ROLES } from "@/src/lib/clerk/role/client";
import ContentAccessDenied from "./access-denied";
import DashboardLoadingContent from "./dashboard/(routes)/loading";

export default function DashboardLayoutRoot({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <ServerUserProvider>
          <RoleBasedComponent
            requiredRoles={[ROLES.ADMIN, ROLES.MODERATOR, ROLES.EDITOR]}
            fallback={<ContentAccessDenied />}
            loading={<DashboardLoadingContent className="h-dvh" />}
          >
            {children}
          </RoleBasedComponent>
        </ServerUserProvider>
      </SignedIn>
      <SignedOut>
        <ContentAccessDenied />
      </SignedOut>
    </>
  );
}
