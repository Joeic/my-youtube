"use client"

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constans";
import { playlists } from "@/db/schema";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { VideoRowCard, VideORowCardSkeleton } from "@/modules/videos/ui/components/video-row-card";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PlaylistGridCard } from "../components/playlist-grid-card";

export const PlaylistsSection = () => {
    return(
        <Suspense fallback={<PlaylistsSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                < PlaylistsSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const PlaylistsSectionSkeleton =() => {
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

const PlaylistsSectionSuspense = () => {
    const  [playlists, query] = trpc.playlists.getMany.useSuspenseInfiniteQuery({
       limit: DEFAULT_LIMIT
    },{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    return(
        <div>
            <div className="flex flex-col gap-4 gap-y-10 ">
                {playlists.pages.flatMap( (page) => page.items).map( (playlist) => (
                    <PlaylistGridCard data={playlist} key={playlist.id}/>
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