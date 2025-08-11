"use server";

import { currentUser } from "@clerk/nextjs/server";
import { ClerkServerUserProvider } from "./client-wrapper";

export const ServerUserProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await currentUser();
  const safeUser = user ? JSON.parse(JSON.stringify(user)) : null;

  return (
    <ClerkServerUserProvider user={safeUser}>
      {children}
    </ClerkServerUserProvider>
  );
};
