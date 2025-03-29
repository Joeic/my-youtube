"use client"

import { DEFAULT_LIMIT } from "@/constans";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface HomeVideosSectionProp {
    categoryId?: string;
}

export const HomeVideosSection = (props: HomeVideosSectionProp) => {
    return(
        <Suspense fallback={<HomeVideoSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <HomeVideosSectionSuspense {...props}/>
            </ErrorBoundary>
        </Suspense>
    )
}

const HomeVideoSectionSkeleton =() => {
    return(
        <div>
            Loading
        </div>
    )
}

const HomeVideosSectionSuspense = ({categoryId}: HomeVideosSectionProp) => {
    const  [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery({
        categoryId, limit: DEFAULT_LIMIT
    },{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    return(
        <div>
            {JSON.stringify(videos)}
        </div>
    )

}