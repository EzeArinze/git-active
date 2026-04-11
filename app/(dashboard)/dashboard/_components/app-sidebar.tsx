"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  TerminalSquareIcon,
  Settings2Icon,
  LayoutDashboard,
} from "lucide-react"
import Logo from "@/components/logo"
import { authSession } from "@/lib/client/use-auth"
import { NavMain } from "./nav-main"
// import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { IconNotification } from "@tabler/icons-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    image: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
      isActive: true,
    },
    {
      title: "Repositories",
      url: "#",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "Repos",
          url: "/dashboard/repositories/repos",
        },
        {
          title: "Import",
          url: "/dashboard/repositories/import-repos",
        },
      ],
    },
    {
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: <IconNotification />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isPending, signOut } = authSession()

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<a href="/dashboard" />}
              className="space-x-1"
            >
              <Logo className="aspect-square size-8 rounded-lg text-sidebar-primary-foreground" />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium tracking-tight">
                  GitActive
                </span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavSecondary items={data.navSecondary} className="mt-auto" />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} signOut={signOut} />
      </SidebarFooter>
    </Sidebar>
  )
}
