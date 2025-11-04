"use client";

import dynamic from "next/dynamic";
import React from "react";

/**
 * dynamicClient: thin wrapper around next/dynamic for client-only components
 * - ssr: false (client-only)
 * - accepts a ReactNode as loading placeholder
 */
export function dynamicClient<TProps extends Record<string, any>>(
  importer: () => Promise<{ default: React.ComponentType<TProps> }>,
  Loading: React.ReactNode = null,
) {
  return dynamic(importer, {
    ssr: false,
    loading: () => Loading,
  }) as unknown as React.ComponentType<TProps>;
}
