import { formatDuration } from "@/lib/utils";
import Image from "next/image";

interface VideoThumbnailProps {
    imageUrl?: string | null;
    title: string;
    previewUrl?: string | null;
    duration: number;
}

export const VideoThumbnail = ({imageUrl,title,previewUrl,duration} : VideoThumbnailProps) => {
    return (
        <div className="relative group">
            {/** Thumbnail wrapper */}
            <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                   <Image 
                        src={imageUrl ?? "/placeholder.png"} 
                        alt={title}
                        fill 
                        className="h-full w-full object-cover group-hover:opacity-0"  
                    />
                    <Image 
                        src={previewUrl ?? "/placeholder.png"} 
                        alt={title}
                        fill 
                        unoptimized={!!previewUrl}
                        className="h-full w-full object-cover opacity-0 group-hover:opacity-100"  
                    />

            </div>
            {/** video duration box */}
           <div className="absolute bottom-2 right-2 px-1 py-0.5 roundd bg-black/80 text-white text-xs font-medium">
              {formatDuration(duration)}
           </div>
        </div>
    )
}