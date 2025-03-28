import { DEFAULT_LIMIT } from "@/constans";
import { VideoView } from "@/modules/videos/ui/views/video-view";
import { trpc } from "@/trpc/server";

export const dynamic = 'force-dynamic';
interface PageProps{
    params: Promise<{
        videoId: string;
    }>;
}


const Page = async ({ params }:PageProps) => {
    const {videoId} = await params;

    void trpc.videos.getOne.prefetch({id: videoId});
    void trpc.comments.getMany.prefetchInfinite({videoId, limit: DEFAULT_LIMIT});
    void trpc.suggestions.getMany.prefetchInfinite({videoId, limit: DEFAULT_LIMIT});
    return (
        <div>
            <VideoView videoId={videoId}/>
        </div>
    );
};

export default Page;