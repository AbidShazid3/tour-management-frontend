

import { Star } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Hero3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
    rating?: number;
  };
}

const HeroSection = ({
  heading = "Explore the beauty of Bangladesh",
  description = "Explore breathtaking destinations, unique experiences, and unforgettable memories. Find the perfect tour that matches your dream getaway.",
  buttons = {
    primary: {
      text: "Explore Tours",
      url: "/tours",
    },
  },
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
}: Hero3Props) => {
  const { data: divisionData, isLoading: divisionIsLoading } = useGetDivisionQuery(undefined);
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(undefined);
  const divisionOptions = divisionData?.data?.map((item: { _id: string, name: string }) => ({ value: item._id, label: item.name }))

  return (
    <section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left p-4">
          <h1 className="my-6 text-pretty text-3xl md:text-5xl font-bold 2xl:text-7xl">
            {heading}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            {description}
          </p>
          <div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="inline-flex items-center -space-x-4">
              {reviews.avatars.map((avatar, index) => (
                <Avatar key={index} className="size-12 border">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </span>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="mr-1 font-semibold">
                  {reviews.rating?.toFixed(1)}
                </span>
              </div>
              <p className="text-muted-foreground text-left font-medium">
                from {reviews.count}+ reviews
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:justify-start">
            {/* Primary Button */}
            {buttons.primary && (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to={buttons.primary.url}>{buttons.primary.text}</Link>
              </Button>
            )}

            {/* Division Select + Search Button */}
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <Select
                onValueChange={setSelectedDivision}
                value={selectedDivision ? selectedDivision : ""}
                disabled={divisionIsLoading}
              >
                <SelectTrigger className="w-full sm:w-60">
                  <SelectValue placeholder="Search a division" />
                </SelectTrigger>
                <SelectContent>
                  {divisionOptions?.map((item: { value: string; label: string }) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedDivision ? (
                <Button asChild className="w-full sm:w-auto">
                  <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
                </Button>
              ) : (
                <Button disabled className="w-full sm:w-auto">
                  Search
                </Button>
              )}
            </div>
          </div>

        </div>
        <div className="flex">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder hero"
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[600px]"
          />
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
