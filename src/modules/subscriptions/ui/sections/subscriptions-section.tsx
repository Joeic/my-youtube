"use client"

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constans";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { VideoRowCard, VideORowCardSkeleton } from "@/modules/videos/ui/components/video-row-card";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

export const SubscriptionsSection = () => {
    return(
        <Suspense fallback={<SubscriptionsSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                < SubscriptionsSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const SubscriptionsSectionSkeleton =() => {
    return(
        <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
                {Array.from({length: 18}).map( (_,index) => (
                <VideoGridCardSkeleton key={index} />
                ))}
            </div>
            <div className="hidden flex-col gap-4 md:flex">
                {Array.from({length: 18}).map( (_,index) => (
                <VideORowCardSkeleton key={index} size="compact"/>
                ))}
            </div>
        </div>
       
    )
}

const SubscriptionsSectionSuspense = () => {
    const utils = trpc.useUtils();
    const  [subscriptions, query] = trpc.subscriptions.getMany.useSuspenseInfiniteQuery({
       limit: DEFAULT_LIMIT
    },{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    const unsubscribe = trpc.subscriptions.remove.useMutation({
            onSuccess: (data) =>{
                toast.success("Unsubscribed");
                utils.videos.getManySubscribed.invalidate();
                utils.subscriptions.getMany.invalidate();
                utils.videos.getOne.invalidate({id: data.creatorId});
                
            },
    
            onError: (error) => {
                toast.error("Something went wrong");
               
            },
        });

    return(
        <div>
            <div className="flex flex-col gap-4 gap-y-10">
                {subscriptions.pages.flatMap( (page) => page.items).map( (subscription) => (
                    <Link
                        key = {subscription.creatorId} 
                        href={`/users/${subscription.user.id}`}
                    >
                        {JSON.stringify(subscription)}
                    </Link>
                ))}
            </div>
           
            <InfiniteScroll 
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </div>
        
    )

}