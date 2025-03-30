import { Button } from "@/components/ui/button";
import{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { APP_URL } from "@/constans";
import { PlaylistAddModel } from "@/modules/playlists/ui/components/playlist-add-modal";
import { ListPlusIcon, MoreVertical, MoreVerticalIcon, ShareIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface VideoMenuProps{
    videoId: string;
    variant?: "ghost" | "secondary";
    onRemove?: () => void;
}

export const VideoMenu = ({
    videoId,
    variant = "ghost",
    onRemove,
}: VideoMenuProps) => {
    const [isopenPlaylistAddModal, setIsOpenPlaylistAddModal] = useState(false);
    const onShare = () => {
        const fullUrl = `${APP_URL}/videos/${videoId}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success("Link copied to the clipboard");
    }

    return(
        <>
            <PlaylistAddModel 
                videoId={videoId}
                open={isopenPlaylistAddModal}
                onOpenChange={setIsOpenPlaylistAddModal}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant={variant} size="icon" className="rounded-full">
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={onShare}>
                        <ShareIcon className="mr-2 size-4"/>
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsOpenPlaylistAddModal(true)}>
                        <ListPlusIcon className="mr-2 size-4"/>
                        Add to playlist
                    </DropdownMenuItem>
                    {onRemove && (
                        <DropdownMenuItem onClick={() => {}}>
                            <Trash2Icon className="mr-2 size-4"/>
                            Remove
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
        
    )
}