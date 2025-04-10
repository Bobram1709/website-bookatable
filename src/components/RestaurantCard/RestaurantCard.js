import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import showImage from "@/utils/fileHelper.js";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { MapPin } from "lucide-react";
import truncatedText from "@/utils/truncatedText";

export default function RestaurantCard({ data }) {
  return (
    <Card className="flex flex-col justify-between shadow">
      <div>
        <CardHeader>
          <Image
            width={400}
            height={400}
            src={showImage(data?.restaurant?.images[0]?.url)}
            alt="restaurant 1"
            className="mx-auto mb-2 block object-cover object-center"
          />
          <div className="flex justify-between">
            <h3 className="max-w-3/4 text-2xl font-bold text-primary-secondary-1">
              {data?.restaurant?.name}
            </h3>

            <div className="flex w-[20%] items-center justify-end gap-x-1">
              <Star
                fill="#fec60a"
                stroke="#fec60a"
                size={22}
                className="mb-1"
              />
              <h3 className="font-medium">({data?.restaurant?.avgReviews})</h3>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin size={20} className="text-gray-400" />
            <span className="font-kumbh-sans text-base font-medium text-primary-black/75">
              {data?.restaurant?.address}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <p className="font-kumbh-sans text-sm text-primary-secondary-2">
            {data?.restaurant?.description?.length < 200
              ? data?.restaurant?.description
              : truncatedText(data?.restaurant?.description, 200)}

            {data?.restaurant?.description.length > 200 && (
              <Link
                href={`/restaurant/${data?.restaurant?._id}`}
                className="ml-1 mt-1 inline-block font-semibold text-primary-secondary-3"
              >
                read more...
              </Link>
            )}
          </p>
        </CardContent>
      </div>

      <CardFooter>
        <Link
          href={`/restaurant/${data?.restaurant?._id}`}
          className="w-full rounded-xl"
        >
          <Button
            className="w-full bg-primary-secondary-3 font-kumbh-sans font-bold text-primary-white"
            size="lg"
          >
            Book a table
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
