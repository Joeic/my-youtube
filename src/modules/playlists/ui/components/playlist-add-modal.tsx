import { ResponsiveModal } from "@/components/responsive-dialog";
import { DEFAULT_LIMIT } from "@/constans";
import { trpc } from "@/trpc/client";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    const utils = trpc.useUtils();
    const { data: playlists, isLoading}  = trpc.playlists.getManyForVideo.useInfiniteQuery({limit: DEFAULT_LIMIT, videoId},{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !!videoId && open,
    })

    const handleOpenChange = (newOpen: boolean) =>{
        utils.playlists.getManyForVideo.reset({
            videoId,
            limit: DEFAULT_LIMIT,
        });
        onOpenChange(open);
    }

    return(
        <ResponsiveModal
            title="Add to a playlist"
            open={open}
            onOpenChange={handleOpenChange}
        >
          <div className="flex flex-col gap-2">
            {isLoading && (
                <div className="flex justify-center p-4">
                    <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
                </div>
            )}
           {!isLoading && playlists?.pages.flatMap( (page) => page.items).map( (playlist) => (
                           <Button
                                key={playlist.id}
                           >
                            {playlist.name}
                            </Button>
                           ))}
          </div>
        </ResponsiveModal>
    )
}