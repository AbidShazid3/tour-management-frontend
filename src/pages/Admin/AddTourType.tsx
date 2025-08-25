import { useDeleteTourTypeMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface IItem {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}


const AddTourType = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState("-createdAt");
    const { data } = useGetTourTypesQuery({ page: currentPage, limit, sort });
    const [deleteTourType] = useDeleteTourTypeMutation();
    const totalPage = data?.meta?.totalPage || 1;

    const handleDeleteTourType = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        try {
            const res = await deleteTourType(id).unwrap();
            if (res.success) {
                toast.success("Deleted successfully", { id: toastId });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Total Types: {data?.meta?.total}</h1>
                <AddTourTypeModal />
            </div>
            <div className="flex items-center gap-2 md:gap-5 my-3">
                <div className="flex items-center">
                    <Select
                        value={sort}
                        onValueChange={(value) => {
                            setSort(value);
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-30">
                            <SelectValue placeholder="Select sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="-createdAt">Newest</SelectItem>
                            <SelectItem value="createdAt">Oldest</SelectItem>
                            <SelectItem value="name">Name(A-Z)</SelectItem>
                            <SelectItem value="-name">Name(Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center">
                    <Select
                        value={limit.toString()}
                        onValueChange={(val) => {
                            setLimit(Number(val));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select limit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">Showing Limit 5</SelectItem>
                            <SelectItem value="10">Showing Limit 10</SelectItem>
                            <SelectItem value="20">Showing Limit 20</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
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
            {totalPage > 1 &&
                <div className="pt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={() => setCurrentPage(prev => prev - 1)} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                            </PaginationItem>
                            {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) =>
                                <PaginationItem
                                    key={page}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                        className="cursor-pointer">{page}</PaginationLink>
                                </PaginationItem>)}
                            <PaginationItem>
                                <PaginationNext onClick={() => setCurrentPage(prev => prev + 1)} className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            }
        </div>
    );
};

export default AddTourType;