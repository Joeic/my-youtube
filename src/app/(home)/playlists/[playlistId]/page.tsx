import { DEFAULT_LIMIT } from "@/constans"
import { HistoryView } from "@/modules/playlists/ui/views/history-view";
import { trpc } from "@/trpc/server"
import { HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

interface PageProps{
    params: Promise<{playlistId: string}>;
}

const Page = async ({params}: PageProps) => {
    const {playlistId} = await params;
    void trpc.playlists.getVideos.prefetchInfinite({playlistId, limit: DEFAULT_LIMIT});

    return(
        <HydrateClient>
            <HistoryView />
        </HydrateClient>
    )
}
export default Page;