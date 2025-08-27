import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import { useDeleteDivisionMutation, useGetDivisionQuery } from "@/redux/features/division/division.api";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { handleApiError } from "@/utils/apiErrorHandler";

interface IItem {
    _id: string;
    name: string;
    slug: string,
    description: string,
    thumbnail: string,
    createdAt: string;
    updatedAt: string;
}

const AddDivision = () => {
    const { data } = useGetDivisionQuery(undefined);
    const [deleteDivision] = useDeleteDivisionMutation();
    console.log(data);

    const handleDeleteDivision = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        try {
            const res = await deleteDivision(id).unwrap();
            if (res.success) {
                toast.success("Deleted successfully", { id: toastId });
            }
        } catch (error: unknown) {
            handleApiError(error, toastId as string)
        }
    }

    return (
        <div className="px-5">
            <div className="flex items-center justify-between my-5">
                <h1 className="text-xl font-semibold">Total Division: {data?.meta?.total}</h1>
                <AddDivisionModal />
            </div>
            <div className="border border-muted rounded-md">
                <Table>
                    <TableHeader className="bg-accent">
                        <TableRow className="font-bold">
                            <TableHead className="w-[100px]">Number</TableHead>
                            <TableHead>Division Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Image</TableHead>
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
                            <TableCell>{item?.slug}</TableCell>
                            <TableCell className="truncate" title={item?.description}>{item?.description?.slice(0, 20)}...</TableCell>
                            <TableCell>
                                {item?.thumbnail ? (
                                    <img
                                        src={item?.thumbnail}
                                        alt="thumbnail"
                                        className="size-8 object-cover rounded-md transition-transform duration-300 hover:scale-125"
                                    />
                                ) : (<span className="text-gray-400 italic">No image</span>)}
                            </TableCell>
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
                                <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>
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

export default AddDivision;