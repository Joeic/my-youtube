import { db } from "@/db";
import { comments, commentsInsertSchema, users, videos } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {desc, eq, and, getTableColumns, or, lt, count} from "drizzle-orm";
import { z } from "zod";

export const commentsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                videoId: z.string().uuid(),
                value: z.string(),
            })
        )
        .mutation(async ({input, ctx}) =>{
            const {videoId, value} = input;
            const {id: userId} = ctx.user;
        
            const [createdComments] = await db
                .insert(comments)
                .values({userId, videoId, value})
                .returning();
            return createdComments;
        }),

    remove: protectedProcedure
        .input(
            z.object({
                id: z.string().uuid(),
            })
        )
        .mutation(async ({input, ctx}) =>{
            const {id} = input;
            const {id: userId} = ctx.user;
        
            const [deletedComments] = await db
                .delete(comments)
                .where(and(
                    eq(comments.userId, userId),
                    eq(comments.id, id),
                )).returning();

            if(!deletedComments){
                throw new TRPCError({code: "NOT_FOUND"});
            }
            return deletedComments;
        }),
    

    getMany: baseProcedure
        .input(
            z.object({
                videoId: z.string().uuid(),
                cursor: z.object({
                    id: z.string().uuid(),
                    updatedAt: z.date(),
                }).nullish(),
                limit: z.number().min(1).max(100),
            }),
        )
        .query(async ({input}) => { // query is only trpc operation for fetching
            const {videoId, cursor, limit} = input;

            const [totalData, data] = await Promise.all([
                db
                .select({
                    count: count(),
                })
                .from(comments)
                .where(eq(comments.videoId, videoId)),


                db 
                .select({
                    ...getTableColumns(comments),
                    user: users,
                }
                )
                .from(comments)
                .where(and(
                    eq(comments.videoId, videoId ),
                     cursor
                        ? 
                        or(lt(comments.updatedAt, cursor.updatedAt),
                        and(
                            eq(comments.updatedAt, cursor.updatedAt),
                            lt(comments.id, cursor.id)
                            )
                        )
                        : undefined,
                ))
                .innerJoin(users,eq(comments.userId, users.id))
                .orderBy(desc(comments.updatedAt), desc(comments.id))
                .limit(limit + 1)

            ])
          
                
            
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
            totalCount: totalData[0].count
        };
        })
        
       
})