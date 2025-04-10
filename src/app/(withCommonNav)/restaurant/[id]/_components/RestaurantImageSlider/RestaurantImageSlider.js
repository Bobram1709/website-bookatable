import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import showImage from "@/utils/fileHelper.js";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function RestaurantImageSlider({ images, width, height }) {
  return (
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
      <CarouselContent>
        {images ? (
          images?.map((image) => (
            <CarouselItem
              key={image.id}
              className="flex h-[400px] items-center justify-center bg-slate-50"
            >
              <Image
                height={2400}
                width={2400}
                src={showImage(image?.url)}
                alt="picture of the restaurant"
                className="mx-auto block h-auto w-auto"
              />
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <div className="h-[400px] w-[800px] animate-pulse bg-gray-400/30"></div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="bg-primary-secondary-3 text-primary-white-light" />
      <CarouselNext className="bg-primary-secondary-3 text-primary-white-light" />
    </Carousel>
  );
}
