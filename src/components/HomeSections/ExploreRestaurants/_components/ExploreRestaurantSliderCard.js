"use client";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllTopRestaurntsQuery } from "@/redux/api/topRestaurantApi.js";
import Autoplay from "embla-carousel-autoplay";

export default function ExploreRestaurantSliderCard({Rdata}) {


  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3500,
        }),
      ]}
    >
      <CarouselContent className="-ml-8">
        {Rdata?.data?.map((data, idx) => (
          <CarouselItem key={idx} className="pl-8 md:basis-1/3">
            <RestaurantCard data={data} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div>
        <CarouselPrevious className="-left-6 bg-primary-secondary-3 text-primary-white lg:-left-12" />
        <CarouselNext className="-right-6 bg-primary-secondary-3 text-primary-white lg:-right-12" />
      </div>
    </Carousel>
  );
}
