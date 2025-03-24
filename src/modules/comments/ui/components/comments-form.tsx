import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { useUser, useClerk } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {TypeOf, z} from "zod";
import {trpc} from "@/trpc/client";
import { commentsInsertSchema } from "@/db/schema";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import { toast } from "sonner";
import { error } from "console";

interface CommentFormProps{
    videoId: string;
    onSuccess?: () => void;
}

export const CommentForm = ({
   videoId,
   onSuccess, 
}: CommentFormProps) => {
    const { user } = useUser(); 
    const clerk = useClerk();
    const utils = trpc.useUtils();
    const schema = commentsInsertSchema.omit({ userId: true });
    const create = trpc.comments.create.useMutation({
        onSuccess: () => {
            utils.comments.getMany.invalidate({videoId});
            form.reset();
            toast.success("Comment added");
            onSuccess?.();
        },
        onError: (error) => {
            toast.error("Something went wrong");
            if(error.data?.code === "UNAUTHORIZED"){
                clerk.openSignIn();
            }
        }
    });
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        videoId,
        value: "",
      },
    });

    const handleSubmit = (values: z.infer<typeof schema>) => {
        create.mutate(values);
      };


    return(
        <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-4 group">
            <UserAvatar
                size="lg"
                imageUrl={user?.imageUrl || "/user-placeholder.png"}
                name={user?.username || "User"} 
            />
            <div className="flex-1">
                <FormField
                    name="value"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                            <Textarea
                                {...field}
                                placeholder="Add a comment..."
                                className="resize-none bg-transparent overflow-hidden min-h-0"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        
                    )}
                />
               
            
                <div className="justify-end gap-2 mt-2 flex">
                    <Button
                        disabled={create.isPending}
                        type="submit"
                        size='sm'
                    >
                        Comment
                    </Button>
                </div>
            </div>
        </form>
      </Form>

        
    );

};