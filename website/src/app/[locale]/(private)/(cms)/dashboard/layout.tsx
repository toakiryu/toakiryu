import React, { ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/components/ui/shadcn/sidebar";
import { AppSidebar } from "../_ui/(sidebar)/app-sidebar";
import { SiteHeader } from "../_ui/(sidebar)/site-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
          "--inset-height": "calc(100dvh - (8px * 4))",
          "--inset-main-height":
            "calc(var(--inset-height) - var(--header-height))",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="flex flex-col">
        <SiteHeader />
        <main className="relative flex flex-col w-full p-3 pt-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
