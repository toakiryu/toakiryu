"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { hasPrivilege } from "./server";

interface PrivilegeProviderProps {
  required: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

interface ClerkRolePrivilegeInterface {
  ok: boolean;
  isLoading: boolean;
  retry: () => void;
  required: string[];
}

export const ClerkRolePrivilegeContext =
  createContext<ClerkRolePrivilegeInterface | null>(null);

export function PrivilegeProvider({
  required,
  children,
  fallback = null,
}: PrivilegeProviderProps) {
  const [ok, setOk] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const evaluate = () => {
    setIsLoading(true);
    hasPrivilege(required)
      .then((result) => setOk(result))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    evaluate();
  }, [required]);

  const value: ClerkRolePrivilegeInterface = {
    ok,
    isLoading,
    retry: evaluate,
    required,
  };

  if (isLoading) return null; // loading 表示に差し替えてもよい
  return (
    <ClerkRolePrivilegeContext.Provider value={value}>
      {ok ? children : fallback}
    </ClerkRolePrivilegeContext.Provider>
  );
}

export const ClerkRolePrivilegeProvider = ({
  required,
  children,
  fallback = null,
}: PrivilegeProviderProps) => {
  return (
    <PrivilegeProvider required={required} fallback={fallback}>
      {children}
    </PrivilegeProvider>
  );
};

export function useClerkRolePrivilege() {
  const context = useContext(ClerkRolePrivilegeContext);
  if (!context) {
    throw new Error("useClerkRolePrivilege must be used within a ClerkRolePrivilegeProvider");
  }
  return context;
}
