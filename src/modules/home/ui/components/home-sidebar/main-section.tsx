"use client";

import { SidebarGroup, SidebarGroupContent, SidebarMenu,SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";
import { SignedIn, useAuth, useClerk } from "@clerk/nextjs";

const items =[
    {
        title: "Home",
        url: "/",
        icon: HomeIcon,
    },
    {
        title: "Subscriptions",
        url: "/feed/subscribed",
        icon: PlaySquareIcon,
        auth: true,
    },
    {
        title: "Trending",
        url: "/feed/trending",
        icon: FlameIcon,
    },
];

export const MainSection = () => {
    const clerk = useClerk();
    const {isSignedIn} = useAuth();
    return(
       <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={false}
                                onClick={ (e) => {
                                    console.log("is signed in " + isSignedIn);
                                    console.log("item is " + item);
                                    console.log("the item's auth is " + item.auth);
                                    if(!isSignedIn && item.auth){
                                        e.preventDefault();
                                        return clerk.openSignIn();
                                    }
                                } }
                            >
                                <Link href={item.url} className="flex items-center gap-4">
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
       </SidebarGroup>
        

    )
}