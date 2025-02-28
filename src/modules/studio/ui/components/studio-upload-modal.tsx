"use client"

import { Loader2Icon, PlusIcon } from "lucide-react"
import {Button} from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ResponsiveModal } from "@/components/responsive-dialog";
import { StudioUploader } from "./studio-uploader";
import { useReducer } from "react";
import { useRouter } from "next/navigation";

export const StudioUploadModal = () => {
    const utils = trpc.useUtils();
    const router = useRouter();
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("Video created");
            utils.studio.getMany.invalidate();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSuccess =() => {
        if(!create.data?.video.id) return;
       
        create.reset();
        router.push(`/studio/videos/${create.data.video.id}`);

    }
    return (
        <>
            <ResponsiveModal title="Upload a video" open={!!create.data?.url}onOpenChange={ () => {create.reset()}}>
                {create.data?.url 
                    ? <StudioUploader endpoint={create.data?.url} onSuccess={onSuccess} /> 
                    : <Loader2Icon />
                }
            </ResponsiveModal>
            <Button variant="secondary"  disabled={create.isPending} onClick={ () => create.mutate()} >
            {create.isPending ? <Loader2Icon className="animate-spin"/>: <PlusIcon />}
                Create
            </Button>
        </>
    );
};