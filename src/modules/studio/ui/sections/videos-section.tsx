"use client"

import { DEFAULT_LIMIT } from "@/constans";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const VideoSection = () => {
    return(
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <VideoSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const VideoSectionSuspense = () => {
    const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT, 
},{
    getNextPageParam: (lastPage) => lastPage.nextCursor,
});
    return(
        <div>
            {JSON.stringify(data)}
        </div>
    );
};