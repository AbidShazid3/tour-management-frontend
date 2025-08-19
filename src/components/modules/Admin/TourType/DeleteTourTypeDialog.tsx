import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDeleteTourTypeMutation } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react"
import { toast } from "sonner";

type DeleteTourTypeDialogProps = {
  id: string;
};

export function DeleteTourTypeDialog({id}: DeleteTourTypeDialogProps) {
    const [deleteTourType] = useDeleteTourTypeMutation();

    const handleDelete = async() => {
        try {
            await deleteTourType(id).unwrap();
            toast.success("Deleted successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"} className="hover:text-red-600 cursor-pointer" size={"sm"}><Trash2 /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete it and remove your data from tour type.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="cursor-pointer">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
