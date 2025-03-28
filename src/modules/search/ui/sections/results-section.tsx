"use client"

import { DEFAULT_LIMIT } from "@/constans";
import { trpc } from "@/trpc/client";

interface ResultsSectionProps {
    query: string | undefined;
    categoryId: string | undefined;
}

export const ResultsSection = ({
    query,
    categoryId,
}: ResultsSectionProps) => {

    const [results, resultQuery] = trpc.search.getMany.useSuspenseInfiniteQuery({
        query,
        categoryId,
        limit: DEFAULT_LIMIT,
    },{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
    return(
        <div>
            {JSON.stringify(results)}
        </div>
    )
}