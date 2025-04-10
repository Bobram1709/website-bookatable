import { Button } from "@/components/ui/button";
import showImage from "@/utils/fileHelper.js";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import truncatedText from "@/utils/truncatedText";
import { MapPin } from "lucide-react";

// get dynamic card data
export default function SliderCard({ data }) {
  return (
    <div className="flex min-h-[250px] flex-col justify-between gap-y-6 rounded-3xl border p-5 lg:flex-row lg:items-center lg:gap-x-8 lg:gap-y-0 lg:p-6">
      {/* left */}
      <div className="flex h-[160px] w-full items-center justify-center overflow-hidden bg-slate-50 lg:w-[50%]">
        <Image
          width={2400}
          height={2400}
          src={showImage(data?.images[0]?.url)}
          alt="restaurant picture"
          className="h-auto w-auto"
        />
      </div>

      {/* right */}
      <div className="lg:w-[70%]">
        {/* card title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-primary-secondary-1">{data?.name}</h1>

          <div className="flex items-center gap-x-1">
            <Star fill="#fec60a" stroke="#fec60a" size={22} className="mb-1" />
            <h3 className="font-medium">({data?.avgReviews})</h3>
          </div>
        </div>

        {/* card content */}
        <div className="mb-3 mt-2">
          <p className="font-kumbh-sans text-sm text-primary-secondary-2">
            {truncatedText(data?.description, 60)}

            {data?.description?.length > 60 && (
              <Link
                href={`/restaurant/${data?._id}`}
                className="ml-1 mt-1 inline-block text-sm font-semibold text-primary-secondary-3"
              >
                read more...
              </Link>
            )}
          </p>
        </div>

        <div className="mb-6 mt-3 flex items-center gap-x-2">
          <MapPin size={20} className="text-gray-400" />

          <span className="font-kumbh-sans text-base font-medium text-primary-black/75">
            {data?.address}
          </span>
        </div>

        {/* card footer */}
        {/* TODO: Add relevant link */}
        <Link href={`/restaurant/${data?._id}`} className="w-full rounded-xl">
          <Button className="w-full bg-primary-secondary-3 font-kumbh-sans font-bold text-primary-white">
            Book a table
          </Button>
        </Link>
      </div>
    </div>
  );
}
