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
 import { zodResolver } from "@hookform/resolvers/zod";
 import { toast } from "sonner";
 import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PlaylistCreateModelProps{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const FormSehema = z.object({
    name: z.string().min(1),
})

export const PlaylistCreateModel = ({
    open,
    onOpenChange,
}:PlaylistCreateModelProps) =>{
const form = useForm<z.infer<typeof FormSehema>>({
    resolver: zodResolver(FormSehema),
    defaultValues:{
        name: ""
    }
})
    const utils = trpc.useUtils();
    const create = trpc.playlists.create.useMutation({
        onSuccess: () =>{
            utils.playlists.getMany.invalidate();
            toast.success("Playlist created");
            form.reset();
            onOpenChange(false);
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    })

    const onSubmit = (values: z.infer<typeof FormSehema>) => {
       create.mutate(values)
    }
    return(
        <ResponsiveModal
            title="Create a playlist"
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
                        disabled={create.isPending}
                        type="submit"
                    >
                        Create
                    </Button>
                </div>

                    
                

            </form>
            
           </Form>
        </ResponsiveModal>
    )
}