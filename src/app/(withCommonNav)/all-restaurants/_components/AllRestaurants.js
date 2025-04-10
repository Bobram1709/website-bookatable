"use client";

import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import { useGetAllRestaurantsQuery } from "@/redux/api/restaurantApi";
import { Empty } from "antd";
import { useSelector } from "react-redux";

export default function AllRestaurants() {
  const search = useSelector((state) => state.search);
  const { data: Rdata, isFetching: isRestaurantDataLoading } =
    useGetAllRestaurantsQuery(search);

  return (
    <>
      {isRestaurantDataLoading ? (
        <SkeletonLoader />
      ) : Rdata?.data?.length > 0 ? (
        <div className="mt-16 flex items-center justify-center">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {Rdata.data.map((data, idx) => (
              <RestaurantCard key={idx} data={{ restaurant: data }} />
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
}
