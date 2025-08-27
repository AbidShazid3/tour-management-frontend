import TourFilters from "@/components/modules/Tours/TourFilters";
import { Button } from "@/components/ui/button";
import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import { Link, useSearchParams } from "react-router";


const Tours = () => {
  const [searchParams] = useSearchParams();

  const division = searchParams.get('division') || undefined;
  const tourType = searchParams.get('tourType') || undefined;
  const { data, isLoading, isError } = useGetTourQuery({ division, tourType });

  if (isLoading) return <p>Loading ...</p>

  return (
    <div className="mt-5 grid grid-cols-12 gap-5 p-4 lg:p-5">
      <TourFilters></TourFilters>
      {!isLoading && isError && (
        <div>
          <p>Something Went Wrong!!</p>{" "}
        </div>
      )}

      {!isLoading && !data?.data && (
        <div>
          <p>No Data Found</p>{" "}
        </div>
      )}
      {!isLoading && !isError && data?.data && (
        <div className="md:col-span-9 2xl:col-span-10 grid md:grid-cols-1 2xl:grid-cols-2 w-full gap-5">
          {data?.data?.map((item) => (
            <div
              key={item?.slug}
              className="border border-muted rounded-lg shadow-md overflow-hidden flex"
            >
              <div className="w-2/5 bg-red-500 flex-shrink-0">
                <img
                  src={item?.images[0]}
                  alt={item?.title}
                  className="object-cover w-full h-full "
                />
              </div>
              <div className="p-4 flex-1">
                <h3 className="text-xl font-semibold mb-2">{item?.title}</h3>
                <p className="text-muted-foreground mb-3">{item?.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-primary">
                    From ৳{item?.costFrom?.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Max {item?.maxGuest} guests
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium">From:</span>{" "}
                    {item?.departureLocation}
                  </div>
                  <div>
                    <span className="font-medium">To:</span>{" "}
                    {item?.arrivalLocation}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{" "}
                    {item?.tourPlan.length} days
                  </div>
                  <div>
                    <span className="font-medium">Min Age:</span> {item?.minAge}+
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item?.amenities?.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {item?.amenities.length > 5 && (
                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                      +{item?.amenities.length - 5} more
                    </span>
                  )}
                </div>

                <Button asChild className="w-full">
                  <Link to={`/tours/${item?.slug}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tours;