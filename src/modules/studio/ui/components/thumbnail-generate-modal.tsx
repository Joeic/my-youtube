import { ResponsiveModal } from "@/components/responsive-dialog";
import { trpc } from "@/trpc/client";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from "@/components/ui/form";
 import {useForm} from "react-hook-form";
 import { Textarea } from "@/components/ui/textarea";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { toast } from "sonner";
 import { Button } from "@/components/ui/button";

interface ThumbnailGenerateModelProps{
    videoId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const FormSehema = z.object({
    prompt: z.string().min(10),
})

export const ThumbnailGenerateModel = ({
    videoId,
    open,
    onOpenChange,
}:ThumbnailGenerateModelProps) =>{
const form = useForm<z.infer<typeof FormSehema>>({
    resolver: zodResolver(FormSehema),
    defaultValues:{
        prompt: ""
    }
})



    const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
        onSuccess: () =>{
            toast.success("process task of generating thumbanail started", {description: "This may take long time"});
            form.reset();
            onOpenChange(false);
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    })

    const onSubmit = (values: z.infer<typeof FormSehema>) => {
       generateThumbnail.mutate({
        prompt:values.prompt,
        id: videoId,
       })
    }
    return(
        <ResponsiveModal
            title="Upload a thumbanil"
            open={open}
            onOpenChange={onOpenChange}
        >
           <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Prompt
                            </FormLabel>
                            <FormControl>
                                <Textarea 
                                    {...field}
                                    className="rezie-none"
                                    cols={30}
                                    rows={5}
                                    placeholder="A description of wanted thumbnail"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                    >
                        Generate
                    </Button>
                </div>

                    
                

            </form>
            
           </Form>
        </ResponsiveModal>
    )
}