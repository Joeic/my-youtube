"use client"

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { icons, MoreVerticalIcon, TrashIcon, VideoIcon } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
import { useForm} from "react-hook-form";
import {zodResolver } from "@hookform/resolvers/zod"
import { Input  } from "@/components/ui/input";
import { Textarea} from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import {z} from "zod";
import { videoUpdateSchema } from "@/db/schema";

interface ForSectionProps {
    videoId: string;
}

export const FormSection = ({videoId}: ForSectionProps) => {
    return(
        <Suspense fallback={<FormSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <FormSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    )
}
const FormSectionSuspense = ({videoId} : ForSectionProps) => {
    const [video] = trpc.studio.getOne.useSuspenseQuery({id: videoId});
    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const form = useForm<z.infer<typeof videoUpdateSchema>>({
        resolver: zodResolver(videoUpdateSchema),
        defaultValues: video,
    });

    const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
        console.log(data);
    }

    return(
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between mb-6">
                <div>
                        <h1 className="text-2xl font-bold">
                            Video Details
                        </h1>
                        <p className="text-xs text-muted-foreground ">Manage your video detauls</p>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <Button type="submit" disabled={false}>
                            Save
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVerticalIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" side="left">
                                <DropdownMenuItem>
                                    <TrashIcon className="size-4 mr-2"/>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="space-y-8 lg:col-span-3">
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Add a title to your video"
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value ?? ""}
                                            rows={10}
                                            className="resize-none pr-10"
                                            placeholder="Add a description to your video"
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/** add thumbnail here */}
                        <FormField 
                            control={form.control}
                            name="categoryId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Category
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />

                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                  <SelectItem key={category.id} value={category.id}>
                                                  {category.name}
                                              </SelectItem>
                                            ))}
                                          
                                        </SelectContent>
                                    </Select>
                                   
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                </div>
            </form>
        </Form>
    );

};

const FormSectionSkeleton = () => {
    return(
            <p>
            Loading
            </p>
    );
};