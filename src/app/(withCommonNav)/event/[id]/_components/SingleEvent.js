"use client";

import Image from "next/image";
import locationIcon from "/public/ExploreRestaurants/location.svg";
import { AlignJustify, BookmarkX, CalendarDays, Warehouse } from "lucide-react";
import { useGetSingleEventQuery } from "@/redux/api/eventApi";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import showImage from "@/utils/fileHelper";
import RestaurantImageSlider from "@/app/(withCommonNav)/restaurant/[id]/_components/RestaurantImageSlider/RestaurantImageSlider";
import moment from "moment";

const SingleEvent = ({ paramsId }) => {
  const { data: event, isLoading } = useGetSingleEventQuery(paramsId);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader></SkeletonLoader>
      ) : (
        <div className="relative space-y-7">
          <RestaurantImageSlider images={event?.data?.images} />

          <p className="absolute -top-6 left-1 flex items-center justify-center rounded-lg bg-primary-secondary-3 px-2 text-white">
            Rs {event?.data?.entryFee}{" "}
            <small className="ml-1"> Entry Fee</small>
          </p>

          <h1 className="text-3xl">
            <span className="text-[#8ABA51]">Restaurant </span> Event
          </h1>
          <hr></hr>
          {/* event details */}
          <div className="flex flex-col items-center justify-between gap-y-5 lg:flex-row">
            <div className="flex-1 space-y-5">
              {/* location */}
              <div className="flex items-center gap-x-2">
                <Image src={locationIcon} alt="location marker icon" />
                <span className="max-w-md text-base font-medium text-primary-black/75">
                  {event?.data?.restaurant?.address}
                </span>
              </div>

              {/* close info */}
              <div className="flex items-center gap-x-2">
                <CalendarDays color="#334A55" />
                <span className="max-w-md text-base font-medium text-primary-black/75">
                  {moment(event?.data?.startDate).format(" Do MMM YYYY")} -{" "}
                  {moment(event?.data?.endDate).format("Do MMM YYYY")}
                </span>
              </div>

              {/* Restaurant Name */}
              <div className="flex items-center gap-x-2">
                <Warehouse color="#334A55" />
                <span className="max-w-md text-base font-medium text-primary-black/75">
                  {event?.data?.restaurant?.name}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex gap-x-2">
                <AlignJustify size={28} />
                <p className="max-w-xl">{event?.data?.description}</p>
              </div>
            </div>
          </div>

          {/* book button */}

          <Link
            href={`/restaurant/${event?.data?.restaurant?._id}?eventId=${event?.data?._id}`}
          >
            <Button className="mt-5 w-full bg-primary-secondary-3">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default SingleEvent;
