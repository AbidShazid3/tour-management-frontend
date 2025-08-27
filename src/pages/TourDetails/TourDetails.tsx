import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetSingleTourQuery, useGetSingleTourTypesQuery } from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";


const TourDetails = () => {
    const { slug } = useParams();
    const { data: tourData, isLoading } = useGetSingleTourQuery(slug);
    const { data: userInfo } = useUserInfoQuery(undefined);
    const { data: divisionData } = useGetDivisionQuery({_id: tourData?.data?.division, fields: "name"}, { skip: !tourData })
    const { data: tourTypeData } = useGetSingleTourTypesQuery(tourData?.data?.tourType, { skip: !tourData })
    const navigate = useNavigate();

    const handleBookingPage = () => {
        if (!userInfo?.data?.phone || !userInfo?.data?.address) {
            toast.error("Please update your profile first to booking a tour");
            return;
        }
        navigate(`/booking/${tourData?.data?.slug}`);
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <div >
                <div className="flex justify-between items-center  mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{tourData?.data?.title}</h1>
                    <Button onClick={handleBookingPage} className="cursor-pointer">
                        Book Now
                    </Button>
                </div>
                <div className="flex flex-col gap-2 text-gray-600 mb-5 
                md:flex-row md:gap-6 md:items-center 
                lg:gap-8">
                    <span>📍 {tourData?.data?.location}</span>
                    <span>💰 From ${tourData?.data?.costFrom}</span>
                    <span>👥 Max {tourData?.data?.maxGuest} guests</span>
                </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {tourData?.data?.images?.map((image: string, index: number) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${tourData?.data?.title} ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                ))}
            </div>

            {/* Tour Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
                    <div className="space-y-2">
                        <p>
                            <strong>Dates:</strong>{" "}
                            {format(new Date(tourData?.data?.startDate ? tourData?.data?.startDate : new Date()),"PP")}{" "}-{" "}
                            {format(new Date(tourData?.data?.endDate ? tourData?.data?.endDate : new Date()),"PP")}
                        </p>
                        <p>
                            <strong>Departure:</strong> {tourData?.data?.departureLocation}
                        </p>
                        <p>
                            <strong>Arrival:</strong> {tourData?.data?.arrivalLocation}
                        </p>
                        <p>
                            <strong>Division:</strong> {divisionData?.data[0]?.name}
                        </p>
                        <p>
                            <strong>Tour Type:</strong> {tourTypeData?.data?.name}
                        </p>
                        <p>
                            <strong>Min Age:</strong> {tourData?.data?.minAge} years
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-muted-foreground">{tourData?.data?.description}</p>
                </div>
            </div>

            {/* Amenities & Inclusions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <ul className="space-y-1">
                        {tourData?.data?.amenities?.map((amenity: string, index: number) => (
                            <li key={index} className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                {amenity}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Included</h3>
                    <ul className="space-y-1">
                        {tourData?.data?.included?.map((item: string, index: number) => (
                            <li key={index} className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Excluded</h3>
                    <ul className="space-y-1">
                        {tourData?.data?.excluded?.map((item: string, index: number) => (
                            <li key={index} className="flex items-center">
                                <span className="text-red-500 mr-2">✗</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Tour Plan */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Tour Plan</h3>
                <ol className="space-y-2">
                    {tourData?.data?.tourPlan?.map((plan: { day: number, title: string }, index: number) => (
                        <li key={index} className="flex">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                                {plan.day}
                            </span>
                            {plan.title}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default TourDetails;