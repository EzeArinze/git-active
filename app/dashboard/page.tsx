import { AppSidebar } from "@/app/dashboard/_components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

// export const iframeHeight = "800px"

export const description = "Dashboard Overview|Repositories|Issues|Pull Requests|Projects|Stars|Followers|Following|Settings"

export default function Page() {
  return (
   <div className="flex flex-1">
       <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
           <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
           </div>
              <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
   </div>
  )
}
