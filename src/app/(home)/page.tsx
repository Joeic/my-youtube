
import Image from "next/image";
import {Button} from "@/components/ui/button"
import { trpc } from "@/trpc/server";
import { PageClient } from "./client";

export default async function Home() {
 void trpc.hello.prefetch({text: "JoeJoe"});
  return (
    <div>
     <PageClient />
    </div>
  )
}
