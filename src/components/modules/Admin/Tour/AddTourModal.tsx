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
import { toast } from "sonner"
import { useAddTourMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { useGetDivisionQuery } from "@/redux/features/division/division.api"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, formatISO } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import MultipleImageUploader from "@/components/MultipleImageUploader"
import type { FileMetadata } from "@/hooks/use-file-upload"

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required"),
    costFrom: z.string().min(1, "Cost is required"),
    startDate: z.date({ message: "Start date is required" }),
    endDate: z.date({ message: "End date is required" }),
    departureLocation: z.string().min(1, "Departure location is required"),
    arrivalLocation: z.string().min(1, "Arrival location is required"),
    // included: z.array(z.string()).nonempty("At least one included item is required"),
    // excluded: z.array(z.object({ value: z.string() })),
    // amenities: z.array(z.object({ value: z.string() })),
    // tourPlan: z.array(z.object({ value: z.string() })),
    maxGuest: z.string().min(1, "Max guest is required"),
    minAge: z.string().min(1, "Minimum age is required"),
    division: z.string().min(1, "Division is required"),
    tourType: z.string().min(1, "Tour type is required"),
})

export function AddTourModal() {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
    const [addTour, { isLoading }] = useAddTourMutation();
    console.log(images);

    const { data: divisionData, isLoading: divisionLoading } = useGetDivisionQuery(undefined);
    const divisionOptions = divisionData?.data?.map((item: { _id: string, name: string }) => ({ value: item._id, label: item.name }))

    const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypesQuery(undefined);
    const tourTypeOptions = tourTypeData?.data?.map((item: { _id: string, name: string }) => ({ value: item._id, label: item.name }))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            costFrom: "",
            startDate: undefined,
            endDate: undefined,
            // included: [],
            // excluded: [],
            // amenities: [],
            // tourPlan: [],
            maxGuest: "",
            minAge: "",
            division: "",
            tourType: "",
            departureLocation: "",
            arrivalLocation: "",
        },
    })

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const tourInfo = {
            ...data,
            costFrom: Number(data.costFrom),
            maxGuest: Number(data.maxGuest),
            minAge: Number(data.minAge),
            startDate: formatISO(data.startDate),
            endDate: formatISO(data.endDate),
        }

        const formData = new FormData();
        formData.append('data', JSON.stringify(tourInfo));
        images.forEach((image) => formData.append('files', image as File));
        console.log(formData.get('files'));

        try {
            const res = await addTour(formData).unwrap();
            if (res.success) {
                toast.success("Tour create successfully")
                setOpen(false);
                form.reset();
                setImages([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Add Tour</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-">Add Tour</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form id='add-tour' onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour Title</FormLabel>
                                    <FormControl>
                                        <Input type="text" required placeholder="Tour Title" {...field} />
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
                                    <FormLabel>Tour Description</FormLabel>
                                    <FormControl>
                                        <Textarea required placeholder="Tour Description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour Location</FormLabel>
                                        <FormControl>
                                            <Input type="text" required placeholder="Location" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="costFrom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour Cost</FormLabel>
                                        <FormControl>
                                            <Input type="number" required placeholder="Cost TK" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value || undefined}
                                                    onSelect={field.onChange}

                                                    disabled={(date) => date < today}
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>End Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value || undefined}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date(new Date().setDate(new Date().getDate() - 1))
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="departureLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Departure Location</FormLabel>
                                        <FormControl>
                                            <Input type="text" required placeholder="Location" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="arrivalLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Arrival Location</FormLabel>
                                        <FormControl>
                                            <Input type="text" required placeholder="Location" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="maxGuest"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Guest</FormLabel>
                                        <FormControl>
                                            <Input type="number" required placeholder="Guest Number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="minAge"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Min Age</FormLabel>
                                        <FormControl>
                                            <Input type="number" required placeholder="Age" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="division"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Division</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={divisionLoading}>
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a division" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {divisionOptions.map((item: { label: string, value: string }) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tourType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Tour Type</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={tourTypeLoading}>
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Tour Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {tourTypeOptions.map((item: { label: string, value: string }) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        </div>
                        <MultipleImageUploader onChange={setImages}/>
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isLoading} variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={isLoading || images.length === 0} form="add-tour" type="submit" className="cursor-pointer">
                        {isLoading ? ("Submitting...") : ("Submit")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}