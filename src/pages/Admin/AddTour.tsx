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
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteTourMutation, useGetTourQuery } from "@/redux/features/tour/tour.api";
import { AddTourModal } from "@/components/modules/Admin/Tour/AddTourModal";
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { handleApiError } from "@/utils/apiErrorHandler";

const AddTour = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
    const [limit, setLimit] = useState<number>(Number(searchParams.get('limit')) || 10);
    const [sort, setSort] = useState<string>(searchParams.get('sort') || "-createdAt");
    const [search, setSearch] = useState("");

    const { data: tourData } = useGetTourQuery({ page: currentPage, limit, sort, searchTerm: search });
    const [deleteTour] = useDeleteTourMutation();
    const totalPage = tourData?.meta?.totalPage || 1;

    const handleDeleteTour = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        try {
            const res = await deleteTour(id).unwrap();
            if (res.success) {
                toast.success("Deleted successfully", { id: toastId });
            }
        } catch (error: unknown) {
            handleApiError(error, toastId as string)
        }
    }

    useEffect(() => {
        setSearchParams({ page: currentPage.toString(), limit: limit.toString(), sort })
    }, [currentPage, limit, sort, setSearchParams])

    return (
        <div className="">
            <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-semibold">Total tour: {tourData?.meta?.total}</h1>
                <AddTourModal />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-5 my-3 border-2 rounded-md p-3">
                {/* Search Box */}
                <div className="flex items-center w-full sm:w-auto gap-2">
                    <input
                        type="text"
                        placeholder="Search tours..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-lg font-semibold">Sort-by :</span>
                    <Select
                        value={sort}
                        onValueChange={(value) => {
                            setSort(value);
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="-createdAt">Newest</SelectItem>
                            <SelectItem value="createdAt">Oldest</SelectItem>
                            <SelectItem value="name">Name(A-Z)</SelectItem>
                            <SelectItem value="-name">Name(Z-A)</SelectItem>
                            <SelectItem value="location">Location(A-Z)</SelectItem>
                            <SelectItem value="-location">Location(Z-A)</SelectItem>
                            <SelectItem value="costFrom">Price(Low-High)</SelectItem>
                            <SelectItem value="-costFrom">Price(High-Low)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center w-full sm:w-auto">
                    <Select
                        value={limit.toString()}
                        onValueChange={(val) => {
                            setLimit(Number(val));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select limit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">Showing Limit 5</SelectItem>
                            <SelectItem value="10">Showing Limit 10</SelectItem>
                            <SelectItem value="20">Showing Limit 20</SelectItem>
                            <SelectItem value="50">Showing Limit 50</SelectItem>
                            <SelectItem value="100">Showing Limit 100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center w-full sm:w-auto">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto text-red-500 hover:text-red-500"
                        onClick={() => {
                            setSort("-createdAt");
                            setLimit(10);
                            setSearch("")
                            setCurrentPage(1);
                        }}
                    >
                        Clear All
                    </Button>
                </div>
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
                                <Button className="cursor-pointer bg-chart-2" size={"sm"} asChild><Link to={`/tours/${item?.slug}`}>Details</Link></Button>
                            </TableCell>
                        </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </div>
            {totalPage > 1 && (
                <div className="pt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPage }, ((_, index) => index + 1)).map(page => (<PaginationItem key={page}>
                                <PaginationLink
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>))
                            }
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className={currentPage === totalPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default AddTour;