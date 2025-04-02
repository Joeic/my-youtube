import { DEFAULT_LIMIT } from "@/constans"
import { LikedView } from "@/modules/playlists/ui/views/liked-view";
import { trpc } from "@/trpc/server"
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
    void trpc.playlists.getLiked.prefetchInfinite({limit: DEFAULT_LIMIT});

    return(
        <HydrateClient>
            <LikedView />
        </HydrateClient>
    )
}
export default Page;