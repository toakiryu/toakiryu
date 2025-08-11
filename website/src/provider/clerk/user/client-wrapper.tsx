"use client";

import { createContext, useContext } from "react";
import { User } from "@clerk/nextjs/server";

export const ServerUserContext = createContext<User | null>(null);

export const ClerkServerUserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  return (
    <ServerUserContext.Provider value={user}>
      {children}
    </ServerUserContext.Provider>
  );
};

export const useServerUser = () => {
  const user = useContext(ServerUserContext);
  if (user === null) {
    throw new Error(
      "useServerUser must be used within ClerkServerUserProvider"
    );
  }
  return { user };
};
