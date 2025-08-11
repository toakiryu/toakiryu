"use client";

import { ReactNode, createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";

interface AuthProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ClerkAuthInterface {
  user: UserResource | null;
  isLoaded: boolean;
  isLoading: boolean;
}

export const ClerkUserContext = createContext<ClerkAuthInterface | null>(null);

export function AuthProvider({ children, fallback = null }: AuthProviderProps) {
  const { user, isLoaded, isSignedIn } = useUser();

  const value: ClerkAuthInterface = {
    user: typeof user === "undefined" ? null : user,
    isLoaded,
    isLoading: !isLoaded,
  };

  if (!isLoaded) return null;

  return (
    <ClerkUserContext.Provider value={value}>
      {isSignedIn ? children : fallback}
    </ClerkUserContext.Provider>
  );
}

export const ClerkAuthProvider = ({
  children,
  fallback = null,
}: AuthProviderProps) => {
  return <AuthProvider fallback={fallback}>{children}</AuthProvider>;
};

export const useClerkUser = () => {
  const context = useContext(ClerkUserContext);
  if (!context)
    throw new Error("useClerkUser must be used within ClerkUserProvider");
  return context;
};
