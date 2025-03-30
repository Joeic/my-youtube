import { ResponsiveModal } from "@/components/responsive-dialog";
import { DEFAULT_LIMIT } from "@/constans";
import { trpc } from "@/trpc/client";
import {z} from "zod";

interface PlaylistAddModelProps{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    videoId: string;
}

const FormSehema = z.object({
    name: z.string().min(1),
})

export const PlaylistAddModel = ({
    open,
    onOpenChange,
    videoId,
}:PlaylistAddModelProps) =>{
    const { data}  = trpc.playlists.getManyForVideo.useInfiniteQuery({limit: DEFAULT_LIMIT, videoId},{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !!videoId && open,
    })

    return(
        <ResponsiveModal
            title="Add to a playlist"
            open={open}
            onOpenChange={onOpenChange}
        >
          <div className="flex flex-col gap-2">
            {JSON.stringify(data)}
          </div>
        </ResponsiveModal>
    )
}