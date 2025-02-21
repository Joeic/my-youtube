
import Image from "next/image";
import {Button} from "@/components/ui/button"
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HomeView } from "@/modules/home/ui/views/home-view";

export const dynamic = "force-dynamic";

interface PageProps{
  searchParams: Promise<{
    categoryId?: string;
  }>
};
const Page = async ({searchParams} : PageProps) => {
  const {categoryId} = await searchParams;
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <HomeView categoryId={categoryId}/>
    </HydrateClient>
  )
}

export default Page;
