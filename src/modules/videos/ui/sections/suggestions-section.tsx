"use client"

import { DEFAULT_LIMIT } from "@/constans"
import { trpc } from "@/trpc/client"
import { VideoRowCard } from "../components/video-row-card";
import { videos } from "@/db/schema";

interface SuggestionsSectionProps {
    videoId: string;
}
export const SuggestionsSection = ({videoId}: SuggestionsSectionProps) =>{

    const [suggestions] = trpc.suggestions.getMany.useSuspenseInfiniteQuery({
        videoId,
        limit: DEFAULT_LIMIT,
    },{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })


    return(
        <div>
           {suggestions.pages.flatMap( (page) => page.items.map( (video) => (
            <VideoRowCard 
            data={video}
            key={video.id}
            size="default"
            />
           )))}
        </div>
    )
}