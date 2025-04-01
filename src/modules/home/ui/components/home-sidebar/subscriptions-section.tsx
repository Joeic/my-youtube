"use client";

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu,SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import { FlameIcon, HistoryIcon, HomeIcon, ListVideoIcon, PlaySquareIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constans";
import { subscriptions } from "@/db/schema";
import { UserAvatar } from "@/components/user-avatar";


export const SubscriptionsSection = () => {

    const pathname = usePathname();
    const {data} = trpc.subscriptions.getMany.useInfiniteQuery({
        limit: DEFAULT_LIMIT,
    },{
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
    return(
       <SidebarGroup>
        <SidebarGroupLabel>
            You
        </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {data?.pages.flatMap((page) => page.items).map( (subscription) => (
                        <SidebarMenuItem key={`${subscription.creatorId}-${subscription.viewerId}`}>
                            <SidebarMenuButton
                                tooltip={subscription.user.name}
                                asChild
                                isActive={pathname === `/users/${subscription.user.id}`}
                                
                            >
                                <Link href={`/users/${subscription.user.id}`} className="flex items-center gap-4">
                                   <UserAvatar 
                                    size="xs"
                                    imageUrl={subscription.user.imageUrl} 
                                    name={subscription.user.name}                                    
                                   />
                                    <span className="text-sm">{subscription.user.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
       </SidebarGroup>
        

    )
}