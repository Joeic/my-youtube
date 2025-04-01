import { ResponsiveModal } from "@/components/responsive-dialog";
import { UploadDropzone } from "../../../../lib/uploadthing";
import { trpc } from "@/trpc/client";

interface BannerUploadModelProps{
    UserId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const BannerUploadModel = ({
    UserId,
    open,
    onOpenChange,
}:BannerUploadModelProps) =>{
    const utils = trpc.useUtils();

    const onUploadComplete = () => {
        utils.users.getOne.invalidate({ id:UserId});
        onOpenChange(false);
    }
    return(
        <ResponsiveModal
            title="Upload a banner"
            open={open}
            onOpenChange={onOpenChange}
        >
           <UploadDropzone
                endpoint="bannerUploader"
                onClientUploadComplete={onUploadComplete}
            />
        </ResponsiveModal>
    )
}