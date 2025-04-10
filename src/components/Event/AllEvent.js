"use client";
import React from "react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import EventCard from "./EventCard";
import { Empty } from "antd";
import { useGetEventsQuery } from "@/redux/api/eventApi";

const AllEvent = () => {
  const { data: allEvent, isFetching: isEventDataLoading } =
    useGetEventsQuery(undefined);
  return (
    <>
      {isEventDataLoading ? (
        <SkeletonLoader />
      ) : allEvent?.data?.length > 0 ? (
        <div className="mt-16 flex items-center justify-center">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {allEvent?.data?.map((data, idx) => (
              <EventCard key={idx} data={data} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-[62vh] w-full items-center justify-center">
          <Empty />
        </div>
      )}
    </>
  );
};

export default AllEvent;
