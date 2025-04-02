import { DEFAULT_LIMIT } from "@/constans"
import { HistoryView } from "@/modules/playlists/ui/views/history-view";
import { trpc } from "@/trpc/server"
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
    void trpc.playlists.getHistory.prefetchInfinite({limit: DEFAULT_LIMIT});

    return(
        <HydrateClient>
            <HistoryView />
        </HydrateClient>
    )
}
export default Page;