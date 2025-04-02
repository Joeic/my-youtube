import { db } from "@/db";
import { commentReactions} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, and} from "drizzle-orm";
import { z } from "zod";

export const commentReactionsRouter = createTRPCRouter({
    like: protectedProcedure
        .input(z.object({commentId: z.string().uuid()}))
        .mutation(async ({input, ctx}) =>{
            const {commentId} = input;
            const {id: userId} = ctx.user;

            const [existingCommentReactionsLike] = await db
                .select()
                .from(commentReactions)
                .where(
                    and(
                        eq(commentReactions.commentId, commentId),
                        eq(commentReactions.userId, userId),
                        eq(commentReactions.type, "like"),
                    )
                );
            if(existingCommentReactionsLike){
                const [deleteViewerRection] = await db
                    .delete(commentReactions)
                    .where(
                        and(
                            eq(commentReactions.userId, userId),
                            eq(commentReactions.commentId, commentId)
                        )
                    ).returning();
            return deleteViewerRection;
            }

            const [createdCommentReaction] = await db
                .insert(commentReactions)
                .values({userId,commentId, type:"like"})
                // if user already click dislike, it will update it to be like, 
                // if we do not do conflict update, then it will insert duplicate 
                // key for userId + videoId(even though the inserted type is like)
                .onConflictDoUpdate({
                    target: [commentReactions.userId, commentReactions.commentId],
                    set: {
                        type: "like",
                    },
                })
                .returning();
            return createdCommentReaction;
        }),

    dislike: protectedProcedure
    .input(z.object({commentId: z.string().uuid()}))
    .mutation(async ({input, ctx}) =>{
        const {commentId} = input;
        const {id: userId} = ctx.user;

        const [existingCommentReactionDisLike] = await db
            .select()
            .from(commentReactions)
            .where(
                and(
                    eq(commentReactions.commentId, commentId),
                    eq(commentReactions.userId, userId),
                    eq(commentReactions.type, "dislike"),
                )
            );
        if(existingCommentReactionDisLike){
            const [deleteViewerRection] = await db
                .delete(commentReactions)
                .where(
                    and(
                        eq(commentReactions.userId, userId),
                        eq(commentReactions.commentId, commentId)
                    )
                ).returning();
        return deleteViewerRection;
        }

        const [createdCommentReaction] = await db
            .insert(commentReactions)
            .values({userId, commentId, type:"dislike"})
            // if user already click dislike, it will update it to be like, 
            // if we do not do conflict update, then it will insert duplicate 
            // key for userId + videoId(even though the inserted type is like)
            .onConflictDoUpdate({
                target: [commentReactions.userId, commentReactions.commentId],
                set: {
                    type: "dislike",
                },
            })
            .returning();
        return createdCommentReaction;
    }),
        
})