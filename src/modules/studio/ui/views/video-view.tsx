interface PageProps {
    videoId: string;
};

export const VideoView = ({videoId} : PageProps) => {
    return(
        <div className=" px-4 pt-2.5 max-w-screen-lg">
            {videoId}
        </div>
    )
} 