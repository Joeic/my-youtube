import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs"
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";

interface InputType {
    userId: string;
    videoId: string;
    prompt: string;
}

export const { POST } = serve(
  async (context) => {
    const input = context.requestPayload as InputType;
    const {videoId, userId, prompt} = input;
    const utapi = new UTApi();
    console.log("get request generating thumbnail from workflow");
    const video = await context.run("get-video", async() => {
        const [existingVideo] = await db
                        .select()
                        .from(videos)
                        .where(and(
                            eq(videos.id, videoId),
                            eq(videos.userId, userId)
                        ));
        if(!existingVideo){
            throw new Error("Not found");
        }
        return existingVideo;
    })


    console.log({video: video});

    const {body} = await context.call<{data: Array<{url: string}>}>("generate-thumbnail", {
        url: "https://api.openai.com/v1/images/generations",
        method: "POST",
        body: {
            prompt,
            n:1,
            model: "dall-e-3",
            size:"1792x1024",
        },
        headers:{
            authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
    })
     
    const tempThumbnailUrl = body.data[0].url;
    if(!tempThumbnailUrl){
       throw new Error("Bad request");
    }   


    await context.run("cleanup-thumbnail", async () =>{
        if(video.thumbnailKey){
            const deleteResponse =  await utapi.deleteFiles(video.thumbnailKey);
            await db
                .update(videos)
                .set({thumbnailKey: null, thumbnailUrl: null})
                .where(and(
                    eq(videos.id, videoId),
                    eq(videos.userId, userId)
                ));
            console.log("Delete Response:", deleteResponse);
        }
    });

    const uploadedThumbnail = await context.run("upload-thumbnail", async() => {
       
        const {data} = await utapi.uploadFilesFromUrl(tempThumbnailUrl);
        if(!data){
            throw new Error("Bad request");
        }
        return data;
    });

    await context.run("update-video", async () => {
        
        await db
            .update(videos)
            .set({
                thumbnailKey: uploadedThumbnail.key,
                thumbnailUrl: uploadedThumbnail.url,
            })
            .where(and(
                eq(videos.id, videoId),
                eq(videos.userId, userId)
            ))
            .returning();
    })

  }
)