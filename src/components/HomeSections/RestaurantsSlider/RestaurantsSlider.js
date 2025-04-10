"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllRestaurantsQuery } from "@/redux/api/restaurantApi.js";
import Link from "next/link";
import SliderCard from "./SliderCard/SliderCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export default function RestaurantsSlider() {
  const { data: Rdata, isFetching } = useGetAllRestaurantsQuery();

  return (
    <section className="container">
      <div className="mb-16 flex items-center justify-between">
        {/* left */}
        <div className="w-1/2">
          <h1 className="font-bold text-primary-secondary-1">
            Explore{" "}
            <span className="text-primary-secondary-3">Restaurants</span>
          </h1>
          <p className="mt-4 font-kumbh-sans text-xl text-primary-secondary-2">
            Browse your nearby Restaurants
          </p>
        </div>

        {/* right */}
        <Link
          href="/all-restaurants"
          className="group flex items-center gap-x-2 hover:text-primary-secondary-3"
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
      {isFetching ? (
        <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-0">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[240px] w-full rounded-2xl border border-gray-200"
            >
              <Skeleton className="m-5 h-24 w-[85%]" />
              <Skeleton className="m-5 h-4 w-[75%]" />
              <Skeleton className="m-5 h-4 w-[65%]" />
              <Skeleton className="m-5 h-4 w-[55%]" />
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            loop: true,
            duration: 45,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 4500,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent className="-ml-8">
            {Rdata?.success &&
              Rdata?.data?.map((item, index) => (
                <CarouselItem key={index} className="pl-8 md:basis-1/2">
                  <SliderCard data={item} />
                </CarouselItem>
              ))}
          </CarouselContent>
          <div>
            <CarouselPrevious className="-left-6 bg-primary-secondary-3 text-primary-white lg:-left-12" />
            <CarouselNext className="-right-6 bg-primary-secondary-3 text-primary-white lg:-right-12" />
          </div>
        </Carousel>
      )}
    </section>
  );
}
