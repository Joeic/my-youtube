import { SearchView } from "@/modules/search/ui/views/search-view";
import { trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PageProps {
    searchParams: Promise<{
        query: string | undefined;
        categoryId: string | undefined;
    }>
}

const Page = async ({searchParams}: PageProps) => {
    const {query, categoryId} = await searchParams;

    void trpc.categories.getMany.prefetch();

    return(
        <div>
            <SearchView query={query} categoryId={categoryId} />
        </div>
    )
}

export default Page;