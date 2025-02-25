import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {z} from "zod";
import {eq, and, or,lt,desc} from "drizzle-orm";
import { useId } from "react";
import { TRPCError } from "@trpc/server";

export const videosRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ctx}) => {
        const {id: userId} = ctx.user;
        console.log("user id" , userId);
        const [video] = await db.insert(videos).values({
            userId, title: "Untitled",        
        }).returning();
        console.log("video", video)
        return { video: video}
    })
});