import { ResponsiveModal } from "@/components/responsive-dialog";
import { UploadDropzone } from "../../../../lib/uploadthing";
import { trpc } from "@/trpc/client";

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
    const utils = trpc.useUtils();

    const onUploadComplete = () => {
        utils.studio.getOne.invalidate({ id: videoId});
        utils.studio.getMany.invalidate();
        onOpenChange(false);
    }
    return(
        <ResponsiveModal
            title="Upload a thumbanil"
            open={open}
            onOpenChange={onOpenChange}
        >
           <UploadDropzone
                endpoint="thumbnailUploader"
                input={{videoId}}
                onClientUploadComplete={onUploadComplete}
            />
        </ResponsiveModal>
    )
}