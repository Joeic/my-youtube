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
    return(
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
    );

};

const FormSectionSkeleton = () => {
    return(
            <p>
            Loading
            </p>
    );
};