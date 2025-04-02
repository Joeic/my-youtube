"use client"

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

export const CategoriesSection = () =>{
    return(
        <Suspense fallback={<CategoriesSkeleton/>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense  />
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSkeleton = () => {
    return <FilterCarousel isLoading data={[]} onSelect={() => {}}/>
}

const CategoriesSectionSuspense = () => {
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