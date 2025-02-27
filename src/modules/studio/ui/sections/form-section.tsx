"use client"

import { trpc } from "@/trpc/client";
import { VideoIcon } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ForSectionProps {
    videoId: string;
}

export const FormSection = ({videoId}: ForSectionProps) => {
    return(
        <Suspense fallback={<FormSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <FormSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    )
}
const FormSectionSuspense = ({videoId} : ForSectionProps) => {
    const [video] = trpc.studio.getOne.useSuspenseQuery({id: videoId});
    return(
        <div>
            {JSON.stringify(video)}
        </div>
    )

};

const FormSectionSkeleton = () => {
    return(
        <div>
            <p>
            Loading
            </p>
            
        </div>
    );
};