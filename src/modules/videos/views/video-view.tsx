import { VideoSection } from "../sections/video-section";

interface VideoViewProps{
    videoId: string;
}

export const VideoView = ({videoId} :VideoViewProps ) => {
    return(
        <div className="flex flex-col max-w-[1700px] mx-auto pt-2.5 px-4 mb-10">
            <div className="flex flex-col xl:flex-row gap-6">
                <VideoSection videoId={videoId}/>
            </div>
        </div>
    )
}