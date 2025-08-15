"use client";

import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return <main className="relative w-full h-full">{children}</main>;
}
