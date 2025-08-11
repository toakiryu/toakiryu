"use client";

import React from "react";

export default function NoteLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-sidebar w-full h-full mx-auto overflow-x-clip">
      {children}
    </div>
  );
}
