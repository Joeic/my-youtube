
import Image from "next/image";
import {Button} from "@/components/ui/button"
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { DEFAULT_LIMIT } from "@/constans";
import { TrendingView } from "@/modules/home/ui/views/trending-view";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.videos.getManyTrending.prefetchInfinite({limit:DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <TrendingView />
    </HydrateClient>
  )
}

export default Page;
