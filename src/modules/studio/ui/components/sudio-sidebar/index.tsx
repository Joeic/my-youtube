"use client"

import { Sidebar,SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { LogOutIcon, VideoIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"


export const StudioSideBar = () => {
    const pathname = usePathname();
    return(
        <Sidebar className="pt-16 z-40" collapsible="icon">
            <SidebarContent className="bg-background">
                <SidebarMenu>
                    <SidebarGroup>
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive={pathname === "/studio"}tooltip="Exit Studio" asChild>
                                <Link href="/studio">
                                    <VideoIcon className="size-5"/>
                                    <span className="text=sm">Content</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <Separator />
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Exit Studio" asChild>
                                <Link href="/">
                                    <LogOutIcon className="size-5"/>
                                    <span className="text=sm">Exit Studio</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarGroup>
                </SidebarMenu>
            </SidebarContent>

        </Sidebar>
    )
}