"use client"
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface UserSectionProps{
    userId: string;
}

export const UserSection = (props:UserSectionProps) => {
    return(
        <Suspense fallback={<p>Loading</p>} > 
            <ErrorBoundary fallback={<p>Error</p>} >
                <UserSectionSuspense {...props} />
            </ErrorBoundary>
        </Suspense>
    )
}

const UserSectionSuspense = ({userId}:UserSectionProps) => {

    const [user] = trpc.users.getOne.useSuspenseQuery({id: userId});
    
    return(
        <div>
           {JSON.stringify(user)}
        </div>
    )
}