import { ResponsiveModal } from "@/components/responsive-dialog";
import { DEFAULT_LIMIT } from "@/constans";
import { trpc } from "@/trpc/client";
import { Loader2Icon, SquareCheckIcon, SquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {z} from "zod";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { toast } from "sonner";

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
    const { data: playlists, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage}  = trpc.playlists.getManyForVideo.useInfiniteQuery({limit: DEFAULT_LIMIT, videoId},{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !!videoId && open,
    })

    const handleOpenChange = (newOpen: boolean) =>{
        utils.playlists.getManyForVideo.reset({
            videoId,
            limit: DEFAULT_LIMIT,
        });
        onOpenChange(newOpen);
    }
    const addVideo = trpc.playlists.addVideo.useMutation({
        onSuccess: () => {
            toast.success("Video added to playlist!");
            utils.playlists.getMany.invalidate();
            utils.playlists.getManyForVideo.invalidate({videoId});
            //TODO: invalidate playlist getOne
        },
        onError:() => {
            toast.error("Something went wrong");
        }
    })

    const removeVideo = trpc.playlists.removeVideo.useMutation({
        onSuccess: () => {
            toast.success("Video deleted from the playlist!");
            utils.playlists.getMany.invalidate();
            utils.playlists.getManyForVideo.invalidate({videoId});
            //TODO: invalidate playlist getOne
        },
        onError:() => {
            toast.error("Something went wrong");
        }
    })
 
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
                                variant="ghost"
                                className=" w-full justify-center px-2 [&_svg]:size-5"
                                size="lg"
                                onClick={() => {
                                    if(playlist.containsVideo){
                                        removeVideo.mutate({playlistId: playlist.id, videoId})
                                    }else{
                                        addVideo.mutate({playlistId: playlist.id, videoId})
                                    }
                                }}
                                disabled={removeVideo.isPending || addVideo.isPending}
                           >
                            {playlist.containsVideo ? (
                                <SquareCheckIcon className="mr-2"/>
                            ) : <SquareIcon className="mr-2"/>}
                            {playlist.name}
                            </Button>
                           ))}
            {!isLoading && (
                <InfiniteScroll 
                                hasNextPage={hasNextPage}
                                isFetchingNextPage={isFetchingNextPage}
                                fetchNextPage={fetchNextPage}
                                isManual
                            />
            )}
          </div>
        </ResponsiveModal>
    )
}