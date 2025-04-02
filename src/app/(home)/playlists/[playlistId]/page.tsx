import { DEFAULT_LIMIT } from "@/constans"
import { VideosView } from "@/modules/playlists/ui/views/videos-view";
import { trpc } from "@/trpc/server"
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PageProps{
    params: Promise<{ playlistId: string }>;
}


const Page = async ({params}: PageProps) => {
    const {playlistId} = await params;

    void trpc.playlists.getOne.prefetch({id:playlistId})
    void trpc.playlists.getVideos.prefetchInfinite({playlistId, limit: DEFAULT_LIMIT});

    return(
        <HydrateClient>
            <VideosView  playlistId={playlistId}  />
        </HydrateClient>
    )
}
export default Page;