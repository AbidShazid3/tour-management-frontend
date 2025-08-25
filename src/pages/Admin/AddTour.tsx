import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteTourMutation, useGetTourQuery } from "@/redux/features/tour/tour.api";
import { AddTourModal } from "@/components/modules/Admin/Tour/AddTourModal";

const AddTour = () => {
    const { data: tourData } = useGetTourQuery(undefined);
    console.log(tourData);
    const [deleteTour] = useDeleteTourMutation();

    const handleDeleteTour = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        try {
            const res = await deleteTour(id).unwrap();
            if (res.success) {
                toast.success("Deleted successfully", { id: toastId });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="">
            <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-semibold">Total tour: {tourData?.meta?.total}</h1>
                <AddTourModal />
            </div>
            <div className="border border-muted rounded-md">
                <Table>
                    <TableHeader className="bg-accent">
                        <TableRow className="font-bold">
                            <TableHead className="w-[50px]">No.</TableHead>
                            <TableHead>Tour Title</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>CostFrom</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-center w-[120px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tourData?.data?.map((item, idx: number) =>
                        (<TableRow key={item._id}>
                            <TableCell className="font-medium pl-3">{idx + 1}.</TableCell>
                            <TableCell>{item?.title}</TableCell>
                            <TableCell>{item?.location}</TableCell>
                            <TableCell >{item?.costFrom}</TableCell>
                            <TableCell>{new Date(item?.startDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}</TableCell>
                            <TableCell>{new Date(item?.endDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}</TableCell>
                            <TableCell>{new Date(item?.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="flex gap-1.5 text-right">
                                <DeleteConfirmation onConfirm={() => handleDeleteTour(item._id)}>
                                    <Button variant={"outline"} className="hover:text-red-600 cursor-pointer" size={"sm"}>
                                        <Trash2 />
                                    </Button>
                                </DeleteConfirmation>
                                <Button className="cursor-pointer" size={"sm"}><Pencil /></Button>
                                <Button className="cursor-pointer bg-chart-2" size={"sm"}>Details</Button>
                            </TableCell>
                        </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-6">
                <div className="text-muted-foreground flex-1 text-sm">
                    Page {tourData?.meta?.page ?? 1} of {tourData?.meta?.totalPage ?? 1}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        disabled={(tourData?.meta?.page ?? 1) <= 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        disabled={(tourData?.meta?.page ?? 1) >= (tourData?.meta?.totalPage ?? 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTour;