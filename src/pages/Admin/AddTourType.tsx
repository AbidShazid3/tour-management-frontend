import { useDeleteTourTypeMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";


interface IItem {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}


const AddTourType = () => {
    const { data } = useGetTourTypesQuery(undefined);
    const [deleteTourType] = useDeleteTourTypeMutation();

    const handleDeleteTourType = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        try {
            const res = await deleteTourType(id).unwrap();
            if (res.success) {
                toast.success("Deleted successfully", {id: toastId});
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="px-5">
            <div className="flex items-center justify-between my-5">
                <h1 className="text-xl font-semibold">Total Tour Types: {data?.meta?.total}</h1>
                <AddTourTypeModal />
            </div>
            <div className="border border-muted rounded-md">
                <Table>
                    <TableHeader className="bg-accent">
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px]">Number</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead className="text-center w-[120px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((item: IItem, idx: number) =>
                        (<TableRow key={item._id}>
                            <TableCell className="font-medium pl-5">{idx + 1}</TableCell>
                            <TableCell>{item?.name}</TableCell>
                            <TableCell>{new Date(item?.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}</TableCell>
                            <TableCell>{new Date(item?.updatedAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}</TableCell>
                            <TableCell className="flex gap-3 text-right">
                                <DeleteConfirmation onConfirm={() => handleDeleteTourType(item._id)}>
                                    <Button variant={"outline"} className="hover:text-red-600 cursor-pointer" size={"sm"}>
                                        <Trash2 />
                                    </Button>
                                </DeleteConfirmation>
                                <Button className="cursor-pointer" size={"sm"}><Pencil /></Button>
                            </TableCell>
                        </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-6">
                <div className="text-muted-foreground flex-1 text-sm">
                    Page {data?.meta.page} of {data?.meta.totalPage}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTourType;