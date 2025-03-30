"use client"

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constans";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const HistoryVideosSection = () => {
    return(
        <Suspense fallback={<HistoryVideosSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                < HistoryVideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const HistoryVideosSectionSkeleton =() => {
    return(
        <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-6">
            {Array.from({length: 18}).map( (_,index) => (
            <VideoGridCardSkeleton key={index} />
            ))}
        </div>
    )
}

const HistoryVideosSectionSuspense = () => {
    const  [videos, query] = trpc.playlists.getHistory.useSuspenseInfiniteQuery({
       limit: DEFAULT_LIMIT
    },{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    return(
        <div>
            <div className="flex flex-col gap-4 gy10">
                {videos.pages.flatMap( (page) => page.items).map( (video) => (
                <VideoGridCard key={video.id} data={video}  />
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