import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";


const TourFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedDivision = searchParams.get('division') || undefined;
    const selectedTourType = searchParams.get('tourType') || undefined;

    const { data: divisionData, isLoading: divisionIsLoading } = useGetDivisionQuery({limit: 1000,fields: '_id,name'});
    const divisionOptions = divisionData?.data?.map((item: { _id: string, name: string }) => ({ value: item._id, label: item.name }))

    const { data: tourTypeData, isLoading: tourTypeIsLoading } = useGetTourTypesQuery({limit: 1000, fields: '_id,name'});
    const tourTypeOptions = tourTypeData?.data?.map((item: { _id: string, name: string }) => ({ value: item._id, label: item.name }))

    const handleDivisionChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('division', value);
        setSearchParams(params);
    }
    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('tourType', value);
        setSearchParams(params);
    }

    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('division');
        params.delete('tourType');
        setSearchParams(params);
    }

    return (
        <div className="md:col-span-3 2xl:col-span-2 w-full h-full border border-muted rounded-md p-5 space-y-4">
            <div className="flex justify-between items-center">
                <h1>Filters</h1>
                <Button size="sm" variant="outline" onClick={handleClearFilter}>
                    Clear Filter
                </Button>
            </div>
            <div>
                <Label className="mb-2">Division to visit</Label>
                <Select
                    onValueChange={handleDivisionChange}
                    value={selectedDivision ? selectedDivision : ""}
                    disabled={divisionIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a division"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {divisionOptions?.map((item: { value: string; label: string }) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="mb-2">Tour Type</Label>
                <Select
                    onValueChange={handleTourTypeChange}
                    value={selectedTourType? selectedTourType : ""}
                    disabled={tourTypeIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Tour Type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {tourTypeOptions?.map(
                                (item: { value: string; label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                )
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default TourFilters;