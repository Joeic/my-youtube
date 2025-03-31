import { HistoryVideosSection } from "../sections/history-videos-section"
import { PlaylistHeaderSection } from "../sections/playlist-header-section";

interface VideosViewProps {
    playlistId: string;
}

export const VideosView = ({playlistId}: VideosViewProps) => {
    return (
        <div className="max-w-[2400px mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
           <PlaylistHeaderSection playlistId={playlistId} />
           <HistoryVideosSection />
        </div>
    )
}