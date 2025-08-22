

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import SingleImageUploader from "@/components/SingleImageUploader"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
})

export function AddDivisionModal() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [addDivision, { isLoading }] = useAddDivisionMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('file', image as File);

        try {
            const res = await addDivision(formData).unwrap();
            if (res.success) {
                toast.success("Tour Division create successfully")
                setOpen(false);
                form.reset();
                setImage(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Add Division</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-">Add Division</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form id='add-division' onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division Name</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="Division Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division Description</FormLabel>
                                    <FormControl>
                                        <Textarea required placeholder="Division Description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <SingleImageUploader onChange={setImage} />
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isLoading} variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={isLoading || !image} form="add-division" type="submit" className="cursor-pointer">
                        {isLoading ? ("Submitting...") : ("Submit")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}