import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import locationIcon from "/public/ExploreRestaurants/location.svg";
import Link from "next/link";
import { CalendarDays, Warehouse } from "lucide-react";
import showImage from "@/utils/fileHelper";
import moment from "moment";

const EventCard = ({ data }) => {
  return (
    <Card className="relative shadow">
      <CardHeader>
        <Image
          width={400}
          height={400}
          src={showImage(data?.images[0]?.url)}
          alt="event image"
          className="mx-auto mb-2 block"
        />

        <p className="absolute left-2 top-2 flex items-center justify-center rounded-lg bg-primary-secondary-3 px-2 text-white">
          Rs {data?.entryFee} <small className="ml-1"> Entry Fee</small>
        </p>

        <div>
          <h3 className="truncate text-3xl font-bold text-primary-secondary-1">
            {data?.title}
          </h3>
        </div>

        <div className="flex items-center gap-x-2 text-base">
          <Warehouse color="#758888" size={24} />
          <p className="text-primary-black/75"> {data?.restaurant?.name}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Image src={locationIcon} alt="location marker icon" />
          <span className="font-kumbh-sans text-base font-medium text-primary-black/75">
            {data?.restaurant?.address}
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-xl">
          <CalendarDays color="#758888" size={24} />
          <p className="text-base text-primary-black/75">
            {" "}
            {moment(data?.startDate).format(" Do MMM YYYY")} -{" "}
            {moment(data?.endDate).format("Do MMM YYYY")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-kumbh-sans text-sm text-primary-secondary-2">
          {data?.description.slice(0, 90)} {/* TODO: Add relevant link */}
          <Link
            href={`/event/${data?._id}`}
            className="mt-1 inline-block font-semibold text-primary-black"
          >
            Read More...
          </Link>
        </p>
      </CardContent>
      <CardFooter>
        {/* TODO: Add relevant link */}
        <Link href={`/event/${data?._id}`} className="w-full rounded-xl">
          <Button
            className="w-full bg-primary-secondary-3 font-kumbh-sans font-bold text-primary-white"
            size="lg"
          >
            Book Event
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
