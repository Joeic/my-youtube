import { db } from "@/db";
import { videoReactions} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, and} from "drizzle-orm";
import { abort } from "process";
import { z } from "zod";

export const videoReactionsRouter = createTRPCRouter({
    like: protectedProcedure
        .input(z.object({videoId: z.string().uuid()}))
        .mutation(async ({input, ctx}) =>{
            const {videoId} = input;
            const {id: userId} = ctx.user;
            const [existingVideReactionLike] = await db
                .select()
                .from(videoReactions)
                .where(
                    and(
                        eq(videoReactions.videoId, videoId),
                        eq(videoReactions.userId, userId),
                        eq(videoReactions.type, "like"),
                    )
                );
            if(existingVideReactionLike){
                const [deleteVideoRection] = await db
                    .delete(videoReactions)
                    .where(
                        and(
                            eq(videoReactions.userId, userId),
                            eq(videoReactions.videoId, videoId)
                        )
                    ).returning();
            return deleteVideoRection;
            }

            const [createdVideoReaction] = await db
                .insert(videoReactions)
                .values({userId,videoId, type:"like"})
                // if user already click dislike, it will update it to be like, 
                // if we do not do conflict update, then it will insert duplicate 
                // key for userId + videoId(even though the inserted type is like)
                .onConflictDoUpdate({
                    target: [videoReactions.userId, videoReactions.videoId],
                    set: {
                        type: "like",
                    },
                })
                .returning();
            return createdVideoReaction;
        }),

    dislike: protectedProcedure
    .input(z.object({videoId: z.string().uuid()}))
    .mutation(async ({input, ctx}) =>{
        const {videoId} = input;
        const {id: userId} = ctx.user;
        const [existingVideoReactionDisLike] = await db
            .select()
            .from(videoReactions)
            .where(
                and(
                    eq(videoReactions.videoId, videoId),
                    eq(videoReactions.userId, userId),
                    eq(videoReactions.type, "dislike"),
                )
            );
        if(existingVideoReactionDisLike){
            const [deleteVideoRection] = await db
                .delete(videoReactions)
                .where(
                    and(
                        eq(videoReactions.userId, userId),
                        eq(videoReactions.videoId, videoId)
                    )
                ).returning();
        return deleteVideoRection;
        }

        const [createdVideoReaction] = await db
            .insert(videoReactions)
            .values({userId,videoId, type:"dislike"})
            // if user already click dislike, it will update it to be like, 
            // if we do not do conflict update, then it will insert duplicate 
            // key for userId + videoId(even though the inserted type is like)
            .onConflictDoUpdate({
                target: [videoReactions.userId, videoReactions.videoId],
                set: {
                    type: "dislike",
                },
            })
            .returning();
        return createdVideoReaction;
    }),
        
})