"use client"

import { CommentForm } from "@/modules/comments/ui/components/comments-form";
import { trpc } from "@/trpc/client"
import { CommandItem } from "cmdk";
import { comment } from "postcss";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CommentItem } from "@/modules/comments/ui/components/comments-item";
import { DEFAULT_LIMIT } from "@/constans";
import { InfiniteScroll } from "@/components/infinite-scroll";
interface CommentsSectionProps{
    videoId: string;
};

export const CommentsSection = ({videoId}:CommentsSectionProps) =>{
    return(
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error </p>} >
                <CommentsSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    );
};

export const CommentsSectionSuspense = ({videoId}:CommentsSectionProps) =>{

    const [comments, query] = trpc.comments.getMany.useSuspenseInfiniteQuery({videoId, limit: DEFAULT_LIMIT},{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
    return(
        <div className="mt-6">
           <div className="flex flex-col gap-6">
                <h1>
                0 comments
                </h1>
                <CommentForm videoId={videoId}/>      
                <div className="flex flex-col gap-4 mt-2">
                    {comments.pages.flatMap( (page) => page.items).map( (comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment} 
                        />
                    ))}
                    <InfiniteScroll 
                    isManual
                    hasNextPage={query.hasNextPage} 
                    isFetchingNextPage={query.isFetchingNextPage} 
                    fetchNextPage={query.fetchNextPage } />
                </div>       
           </div>
          
           

        </div>
    )
}