import { DEFAULT_LIMIT } from "@/constans"
import { HistoryView } from "@/modules/playlists/ui/views/history-view";
import { LikedView } from "@/modules/playlists/ui/views/liked-view";
import { trpc } from "@/trpc/server"
import { HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
    void trpc.playlists.getLiked.prefetchInfinite({limit: DEFAULT_LIMIT});

    return(
        <HydrateClient>
            <LikedView />
        </HydrateClient>
    )
}
export default Page;