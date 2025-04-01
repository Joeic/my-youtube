import { UserAvatar } from "@/components/user-avatar";
import { UserGetOneOutput } from "../../types";
import { useClerk } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { UseSubscription } from "@/modules/subscriptions/hooks/use-subscriptions";
import { cn } from "@/lib/utils";

interface UserPageInfoProps{
    user: UserGetOneOutput;
}

export const UserPageInfo = ({user}:UserPageInfoProps) =>{
    const clerk = useClerk();
    const {userId, isLoaded} = useAuth();

      const {isPending, onClick} = UseSubscription({
            userId: user.id,
            isSubscribed: user.viwerSubscribed,
        })

    return(
        <div className="py-6">
            <div className=" flex flex-col md:hidden">
                <div className=" flex items-center gap-3">
                    <UserAvatar 
                        size="lg"
                        imageUrl={user.imageUrl}
                        name={user.name}
                        className="h-[60px] w-[60px]"
                        onClick={() => {
                            if(user.clerkId === userId){
                                clerk.openUserProfile();
                            }
                        }}
                    />
                    <div className="flex-1 min-w-0">
                        <h1 className=" text-xl font-bold ">{user.name}</h1>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span>
                                    {user.subscriberCount} subscribers
                                </span>
                                <span> &bull;</span>
                                <span>
                                    {user.videoCount} subscribers
                                </span>
                            </div>
                    </div>
                </div>
                {userId === user.clerkId ? (
                    <Button
                       variant="secondary"
                       asChild
                       className=" w-full mt-3 rounded-full"
                    >
                         <Link
                            href="/studio"
                        >
                            Go to studio
                        </Link>
                    </Button>
                ): (
                    <SubscriptionButton 
                    onClick={onClick}
                    disaled={isPending || !isLoaded}
                    isSubscribed={user.viwerSubscribed}
                    className=" w-full mt-3"
                />
                )}
            </div>
            <div className=" hidden items-start gap-4 md:flex">
                <UserAvatar 
                        size="lg"
                        imageUrl={user.imageUrl}
                        name={user.name}
                        className={cn(userId === user.clerkId && "cursor-pointer hover:opacity-80 transition-opacity duration-300")}
                        onClick={() => {
                            if(user.clerkId === userId){
                                clerk.openUserProfile();
                            }
                        }}
                />
                <div className="flex-1 min-w-0">
                        <h1 className=" text-4xl font-bold ">{user.name}</h1>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <span>
                                {user.subscriberCount} subscribers
                            </span>
                            <span> &bull;</span>
                            <span>
                                {user.videoCount} subscribers
                            </span>
                        </div>  
                        {userId === user.clerkId ? (
                            <Button
                                variant="secondary"
                                asChild
                                className="mt-3 rounded-full"
                            >
                                <Link
                                    href="/studio"
                                >
                                    Go to studio
                                </Link>
                            </Button>
                        ): (
                            <SubscriptionButton 
                                onClick={onClick}
                                disaled={isPending || !isLoaded}
                                isSubscribed={user.viwerSubscribed}
                                className="mt-3"
                            />
                        )} 
                </div>
            </div>
        </div>
    )
}