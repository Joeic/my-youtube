import { cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils";
import{
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { VideoGetManyOutput } from "../../types";
import { VideoThumbnail } from "./video-thumbnail";
import Link from "next/link";

const videoRowCardVariant = cva("group flex min-w-o",{
    variants:{
        size:{
            default: "gap-4",
            compact: "gap-2"
        },
    },
    defaultVariants: {
        size: "default",
    },
});

const thumbnailVariants = cva("relative flex-none",{
    variants:{
        size:{
            default: "w-[38%]",
            compact: "w-[168px]",
        },
    },
    defaultVariants:{
        size: "default"
    },
});

interface VideoRowCardProps extends VariantProps<typeof videoRowCardVariant>{
    data: VideoGetManyOutput["items"][number];
    onRemove?: () => void;
}

export const VideORowCardSkeleton = () => {
    return(
        <div>
            Skelton
        </div>
    )

}

export const VideoRowCard = ({
    data,
    size,
    onRemove,
}: VideoRowCardProps) => {
    return(
        <div className={videoRowCardVariant({size})}>
            <Link href={`/videos/${data.id}`} className={thumbnailVariants({size})}>
                <VideoThumbnail
                    imageUrl={data.thumbnailUrl}
                    previewUrl={data.previewUrl}
                    title={data.title}
                    duration={data.duration} 
                />
            
            </Link>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between gap-x-2">
                <Link href={`/videos/${data.id}`} className="flex-1 min-w-0">
                    <h3 className={cn(
                        "font-medium line-clamp-2",
                        size === "compact" ? "text-sm" : "text-base"
                    )}>
                        {data.title}
                    </h3>
                </Link>

            </div>

        </div>
        </div>
    )
}