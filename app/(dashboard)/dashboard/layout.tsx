import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"
import { SiteHeader } from "./_components/site-header"
import { AppSidebar } from "./_components/app-sidebar"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex h-screen flex-1">
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default DashboardLayout
