"use client";

import { dynamicClient } from "@/components/ui/client/dynamicClient";

// Use the project's thin dynamicClient helper for consistent client-only dynamic imports.
const GradualBlurClient = dynamicClient(
  () => import("./GradualBlur"),
  <div role="status" aria-busy="true" />
);

export default function GradualBlurWrapper(props: any) {
  return <GradualBlurClient {...props} />;
}
