import { ResponsiveModal } from "@/components/responsive-dialog";

interface ThumbnailUploadModelProps{
    videoId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ThumbnailUploadModel = ({
    videoId,
    open,
    onOpenChange,
}:ThumbnailUploadModelProps) =>{
    return(
        <ResponsiveModal
            title="Upload a thumbanil"
            open={open}
            onOpenChange={onOpenChange}
        >
            <p>Hello</p>
        </ResponsiveModal>
    )
}