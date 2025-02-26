import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {z} from "zod";
import {eq, and, or,lt,desc} from "drizzle-orm";
import { useId } from "react";
import { TRPCError } from "@trpc/server";
import { mux } from "@/lib/mux";

export const videosRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ctx}) => {
        const {id: userId} = ctx.user;
        
        const upload = await mux.video.uploads.create({
            new_asset_settings:{
                passthrough: userId,
                playback_policy: ["public"],
               
            },
            cors_origin: "*", // TODO: in production,set URL
        });

        console.log("user id" , userId);
        const [video] = await db.insert(videos).values({
            userId, title: "Untitled",        
        }).returning();
        console.log("video", video)
        return { 
            video: video,
            url: upload.url,
        }
    })
});