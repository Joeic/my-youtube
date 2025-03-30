import { cn } from "@/lib/utils";

interface PlaylistThumbnailProps{
    title: string;
    videoCount: number;
    className?: string;
    imageUrl?: string | null;
}

export const PlaylistThumbnail =({
    title,
    videoCount,
    className,
    imageUrl,
}:PlaylistThumbnailProps) => {
    return(
        <div className={cn("relative pt-3 group", className)}>
            <div className="relative">
                <div className=" absolute -top-3 left-1/2 -translate-x-1/2 w-[97%] overflow-hidden rounded-xl bg-black/20 aspect-video"/>
            </div>
        </div>
    )
}