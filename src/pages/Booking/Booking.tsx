import { Button } from "@/components/ui/button";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";


const Booking = () => {
    const [guestCount, setGuestCount] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const { slug } = useParams();
    const { data: tourData, isLoading, isError } = useGetSingleTourQuery(slug);
    const [createBooking] = useCreateBookingMutation();

    const incrementGuest = () => {
        setGuestCount((prv) => prv + 1);
    };

    const decrementGuest = () => {
        setGuestCount((prv) => prv - 1);
    };

    useEffect(() => {
        if (!isLoading && !isError && tourData?.data) {
            setTotalAmount(guestCount * tourData?.data?.costFrom)
        }
    }, [isLoading, isError, tourData, guestCount])

    const handleBooking = async (id: string) => {
        const bookingInfo = {
            tour: id,
            guestCount: guestCount,
        }
        try {
            const res = await createBooking(bookingInfo).unwrap();
            if (res.success) {
                toast.success("Booking created successfully")
                window.open(res.data.paymentUrl)
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto">
                {!isLoading && isError && (
                    <div>
                        <p>Something Went Wrong!!</p>{" "}
                    </div>
                )}

                {!isLoading && !tourData?.data && (
                    <div>
                        <p>No Data Found</p>{" "}
                    </div>
                )}

                {!isLoading && !isError && tourData?.data && (
                    <>
                        {/* Left Section - Tour Summary */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <img
                                    src={tourData?.data?.images[0]}
                                    alt={tourData?.data?.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold mb-2">{tourData?.data?.title}</h1>
                                <p className="text-gray-600 mb-4">{tourData?.data?.description}</p>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong>Location:</strong> {tourData?.data?.location}
                                    </div>
                                    <div>
                                        <strong>Duration:</strong> {tourData?.data?.startDate} to{" "}
                                        {tourData?.data?.endDate}
                                    </div>
                                    <div>
                                        <strong>Tour Type:</strong> {tourData?.data?.tourType}
                                    </div>
                                    <div>
                                        <strong>Max Guests:</strong> {tourData?.data?.maxGuest}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">What's Included</h3>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {tourData?.data?.included.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">Tour Plan</h3>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {tourData?.data?.tourPlan.map((plan, index) => (
                                        <li key={index}>Day {plan?.day} : {plan?.title}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Section - Booking Details */}
                        <div className="w-full md:w-96">
                            <div className="border border-muted p-6 rounded-lg shadow-md sticky top-6">
                                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Number of Guests
                                        </label>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                type="button"
                                                onClick={decrementGuest}
                                                disabled={guestCount <= 1}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-medium w-8 text-center">
                                                {guestCount}
                                            </span>
                                            <button
                                                onClick={incrementGuest}
                                                disabled={guestCount >= tourData?.data?.maxGuest}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Price per person:</span>
                                            <span>${tourData?.data?.costFrom}</span>
                                        </div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Guests:</span>
                                            <span>{guestCount}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total Amount:</span>
                                            <span>${totalAmount}</span>
                                        </div>
                                    </div>

                                    <Button onClick={() => handleBooking(tourData?.data?._id)} className="w-full cursor-pointer" size="lg">
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Booking;