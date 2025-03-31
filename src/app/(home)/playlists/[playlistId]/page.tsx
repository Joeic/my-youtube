import { DEFAULT_LIMIT } from "@/constans"
import { HistoryView } from "@/modules/playlists/ui/views/history-view";
import { VideosView } from "@/modules/playlists/ui/views/videos-view";
import { trpc } from "@/trpc/server"
import { HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

interface PageProps{
    params: { playlistId: string };
}

const Page = async ({params}: PageProps) => {
    const {playlistId} = params;
    void trpc.playlists.getVideos.prefetchInfinite({playlistId, limit: DEFAULT_LIMIT});

    return(
        <HydrateClient>
            <VideosView  playlistId={playlistId}  />
        </HydrateClient>
    )
}
export default Page;