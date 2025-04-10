"use client";
import { useGetAllTopRestaurntsQuery } from "@/redux/api/topRestaurantApi";
import { Empty } from "antd";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ExploreRestaurantSliderCard from "./_components/ExploreRestaurantSliderCard";

export default function ExploreRestaurants() {
  const query = {};
  const { data: Rdata, isLoading } = useGetAllTopRestaurntsQuery(query);

  return (
    <section className="container my-[60px]">
      <div className="flex items-center justify-between">
        {/* left */}
        <div className="w-1/2">
          <h1 className="font-bold text-primary-secondary-1">
            Explore{" "}
            <span className="text-primary-secondary-3">Top Restaurants</span>
          </h1>
          <p className="mt-4 font-kumbh-sans text-xl text-primary-secondary-2">
            Browse your nearby Restaurants
          </p>
        </div>

        {/* right */}
        <Link
          href="/top-restaurants"
          className="group flex items-center gap-x-1 hover:text-primary-secondary-3"
        >
          <p className="font-kumbh-sans transition-all duration-300 ease-in-out">
            See All
          </p>
          <ChevronRight
            size={20}
            className="transition-all duration-300 ease-in-out group-hover:translate-x-2"
          />
        </Link>
      </div>

      {/* TODO: Load Card Data from database */}
      {Rdata?.data?.length > 0 ? (
        <div className="mt-10">
          <ExploreRestaurantSliderCard Rdata={Rdata} />
        </div>
      ) : (
        <Empty />
      )}
    </section>
  );
}
