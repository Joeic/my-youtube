import { DEFAULT_LIMIT } from "@/constans";
import { SubscriptionsView } from "@/modules/subscriptions/ui/views/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = 'force-dynamic';

const Page = async () => {
    void trpc.subscriptions.getMany.prefetchInfinite({
        limit: DEFAULT_LIMIT,
    })
    
    return (
        <HydrateClient>
           <SubscriptionsView />
        </HydrateClient>
    );
};

export default Page;