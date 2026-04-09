import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { SiteHeader } from './_components/site-header'

function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
   <div className="[--header-height:calc(--spacing(14))]">
     <SidebarProvider className="flex flex-col">
        <SiteHeader />
        {children}
    </SidebarProvider> 
   </div>

  )
}

export default DashboardLayout