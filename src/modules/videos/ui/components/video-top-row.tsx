import { retryLink } from "@trpc/client";
import { VideoGetOneOutput } from "../../types";


interface VideoSectionProps{
    video: VideoGetOneOutput;
};

export const VideoTopRow = ({video}
    : VideoSectionProps
) =>{
    return(
        <div className="flex flex-col gap-4 mt-4">
            <h1>{video.title}</h1>
        </div>  
    )
}