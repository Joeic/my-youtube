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
        <div>
            thumbail
        </div>
    )
}