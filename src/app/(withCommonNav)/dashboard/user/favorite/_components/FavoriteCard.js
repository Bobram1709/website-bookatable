"use client";

import { Button } from "@/components/ui/button";
import { useInsertItemIntoFavoriteListMutation } from "@/redux/api/favouriteApi.js";
import showImage from "@/utils/fileHelper.js";
import { Error_Modal, Success_model } from "@/utils/modalHook.js";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import StarRatings from "react-star-ratings";

export default function FavoriteCard({ data }) {
  const [favourite] = useInsertItemIntoFavoriteListMutation();

  const handleFavourite = async () => {
    try {
      await favourite({ id: data?._id }).unwrap();
      Success_model({ title: "Menu successfully removed from favorite list" });
    } catch (error) {
      Error_Modal({ title: error?.data?.message });
    }
  };
  return (
    <div className="rounded-3xl border p-5">
      <div className="relative">
        <Image
          src={showImage(data?.image)}
          alt="food pic"
          width={400}
          height={400}
          className="rounded"
        />
        <button
          className="absolute right-2 top-2 flex items-center justify-center rounded-lg bg-primary-secondary-3 p-2 text-white hover:bg-black"
          title="Remove from favorite"
          onClick={handleFavourite}
        >
          <Trash size={16} />
        </button>
      </div>
      <h3 className="mb-3 mt-4 text-3xl font-semibold text-primary-secondary-1">
        {data?.name}
      </h3>
      <p className="mb-4 font-kumbh-sans text-primary-secondary-2">
        {data?.description}
      </p>

      <div className="flex items-center gap-x-4">
        <StarRatings
          rating={4.5}
          starRatedColor="#F5BE32"
          starDimension="22px"
          starSpacing="6px"
        />
        <div className="flex items-center gap-2 pt-2 font-kumbh-sans text-lg font-bold">
          <h4 className="text-[#F5BE32]">4.5</h4>
          <span className="text-primary-secondary-1">(10)</span>
        </div>
      </div>

      {/* <div className="flex items-center justify-between gap-x-4">
        <Button
          className="mt-4 flex-grow rounded-3xl bg-primary-secondary-2 font-kumbh-sans text-primary-white"
          onClick={handleFavourite}
        >
          <span className="me-4">Remove From Here</span>
          <Heart className="stroke-primary-white" />
        </Button>
      </div> */}
    </div>
  );
}
