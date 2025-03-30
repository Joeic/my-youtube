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
import { InputOTP } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";

interface PlaylistAddModelProps{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const FormSehema = z.object({
    name: z.string().min(1),
})

export const PlaylistAddModel = ({
    open,
    onOpenChange,
}:PlaylistAddModelProps) =>{
const form = useForm<z.infer<typeof FormSehema>>({
    resolver: zodResolver(FormSehema),
    defaultValues:{
        name: ""
    }
})
    const utils = trpc.useUtils();
    const Add = trpc.playlists.create.useMutation({
        onSuccess: () =>{
            utils.playlists.getMany.invalidate();
            toast.success("Playlist Addd");
            form.reset();
            onOpenChange(false);
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    })

    const onSubmit = (values: z.infer<typeof FormSehema>) => {
       Add.mutate(values)
    }
    return(
        <ResponsiveModal
            title="Add a playlist"
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
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    placeholder="My favorite videos"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        disabled={Add.isPending}
                        type="submit"
                    >
                        Add
                    </Button>
                </div>

                    
                

            </form>
            
           </Form>
        </ResponsiveModal>
    )
}