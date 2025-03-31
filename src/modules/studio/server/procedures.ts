import { db } from "@/db";
import { comments, users, videoReactions, videos, videoViews } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {z} from "zod";
import {eq, and, or,lt,desc, getTableColumns} from "drizzle-orm";
import { comment, Input } from "postcss";
import { TRPCError } from "@trpc/server";
import { Users } from "lucide-react";

export const studioRouter = createTRPCRouter({

    getOne: protectedProcedure.input(
        z.object({
            id: z.string().uuid()
        })
    ).query(async ({ctx, input}) => {
        const {id : UserId} = ctx.user;
        const { id } = input;

        const [video] = await db    
                            .select()
                            .from(videos)
                            .where(and(eq(videos.id, id),
                                        eq(videos.userId, UserId)
                                ));
        if(!video){
            throw new TRPCError({code: "NOT_FOUND"});
        }

        return video;
    }),
      
    getMany: protectedProcedure.input(
        z.object({
            cursor: z.object({
                id: z.string().uuid(),
                updatedAt: z.date(),
            })
            .nullish(),
            limit: z.number().min(1).max(100),
        }),
    ).query(async ({ctx, input}) => {
        const {cursor, limit} = input;
        const {id: userId} = ctx.user;
        const data = await db
        .select({
            ...getTableColumns(videos),
            Users: users,
            viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
            commentCount: db.$count(comments,eq(comments.videoId, videos.id)),
            likeCount: db.$count(videoReactions, and(
                eq(videoReactions.videoId, videos.id),
                eq(videoReactions.type, "like"),
            )),
        }
        )
        .from(videos)
        .innerJoin(users, eq(videos.userId, users.id))
        .where(
            and(
                eq(videos.userId, userId), 
                cursor
                ? or(lt(videos.updatedAt, cursor.updatedAt),
                 and(
                    eq(videos.updatedAt, cursor.updatedAt),
                    lt(videos.id, cursor.id)
                    )
                )
             : undefined,
            )).orderBy(desc(videos.updatedAt), desc(videos.id)).limit(limit + 1);//add 1 limit to check if there more data

        const hasMore = data.length > limit;
        //remove the last item if there is more data
        const items = hasMore ? data.slice(0,-1) : data;
        //set the next cursor to the last item if there is more data
        const lastItem = items[items.length - 1];
        const nextCursor = hasMore ? {
            id: lastItem.id,
            updatedAt: lastItem.updatedAt,
        }
        : null;
        return {
            items,
            nextCursor,
        };
    }),
});