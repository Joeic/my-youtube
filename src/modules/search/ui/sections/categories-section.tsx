"use client"

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useReducer } from "react";
import { FilterCarousel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

interface CategoriesSectionProps{
    categoryId?: string;
}

export const CategoriesSection = ({categoryId}:CategoriesSectionProps ) =>{
    return(
        <Suspense fallback={<CategoriesSkeleton/>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSkeleton = () => {
    return <FilterCarousel isLoading data={[]} onSelect={() => {}}/>
}

const CategoriesSectionSuspense = ({categoryId}:CategoriesSectionProps) => {
    const router = useRouter();
    const [categories] = trpc.categories.getMany.useSuspenseQuery();
    const data = categories.map((category) =>({
        value: category.id,
        label: category.name,
    })
    );

    const onSelect = (value: string | null) => {
        const url = new URL(window.location.href);
        if(value){
            url.searchParams.set("categoryId", value);
        }else{
            url.searchParams.delete("categoryId");
        }
        router.push(url.toString());
    }
    return (
       <FilterCarousel onSelect={(onSelect)} value="categoryId" data={data}/>
    )
}