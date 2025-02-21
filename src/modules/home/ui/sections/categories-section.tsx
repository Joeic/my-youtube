"use client"

import { trpc } from "@/trpc/client";

interface CategoriesSectionProps{
    categoryId?: string;
};

export const CategoriesSection = ({categoryId}:CategoriesSectionProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery();
    return (
        <div>
            {JSON.stringify(categories)}
        </div>
    )
}