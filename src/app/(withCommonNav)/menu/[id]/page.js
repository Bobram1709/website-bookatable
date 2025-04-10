"use client";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useGetAllMenuQuery } from "@/redux/api/menuApi.js";
import { useGetAllMenuCategoryQuery } from "@/redux/api/menuCategoryApi.js";
import { Empty } from "antd";
import { useSearchParams } from "next/navigation.js";
import { useState } from "react";
import FoodItemCard from "../_components/FoodItemCard";

export default function DynamicMenu({ params }) {
  const searchParams = useSearchParams();
  const booking = searchParams.get("booking");

  const query = {
    restaurant: params?.id,
  };
  const { data: menuCategories } = useGetAllMenuCategoryQuery(query, {
    skip: !params?.id,
  });
  const [selectedCategory, setSelectedCategory] = useState(
    menuCategories?.data[0]?._id,
  );

  const {
    data: Fdata,
    isLoading,
    isFetching,
  } = useGetAllMenuQuery(
    { category: selectedCategory, restaurant: params?.id },
    { skip: !menuCategories?.data[0]?._id },
  );
  return (
    <div className="pt-[160px]">
      {/* menu category carousel */}
      <div className="flex h-[80px] items-center justify-center bg-primary-secondary-3/55 font-kumbh-sans text-primary-secondary-1">
        <Carousel className="w-3/4">
          <CarouselContent className="-ml-10 px-2">
            {menuCategories?.data?.map((category, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  "basis-1/1 ml-8 flex cursor-pointer items-center justify-center text-balance text-center text-xl font-medium lg:basis-[25%] 2xl:basis-[18%]",
                )}
                onClick={() => setSelectedCategory(category?._id)}
              >
                <p
                  className={cn("", {
                    "bg-primary-secondary-1 p-2 text-primary-white transition-all duration-300 ease-in-out":
                      selectedCategory === category?._id,
                  })}
                >
                  {category?.title}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="rounded-lg border-0 bg-primary-secondary-3 text-white shadow" />
          <CarouselNext className="rounded-lg border-0 bg-primary-secondary-3 text-white shadow" />
        </Carousel>
      </div>

      {/* category items */}
      {isLoading || isFetching ? (
        <div className="container">
          <SkeletonLoader />
        </div>
      ) : Fdata?.data?.length > 0 ? (
        <div className="mx-auto my-16 grid grid-cols-1 gap-8 px-5 md:grid-cols-2 lg:w-[90%] lg:grid-cols-3 lg:px-0 2xl:w-[85%] 2xl:grid-cols-4">
          {Fdata?.data?.map((data, idx) => (
            <FoodItemCard cardData={data} key={idx} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="my-16 flex h-full w-full items-center justify-center">
          <Empty />
        </div>
      )}
    </div>
  );
}
