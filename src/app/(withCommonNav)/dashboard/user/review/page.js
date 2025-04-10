"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useInsertReviewMutation } from "@/redux/api/restaurantApi.js";
import { Error_Modal, Success_model } from "@/utils/modalHook.js";
import { useRouter, useSearchParams } from "next/navigation.js";
import { useState } from "react";
import StarRating from "./_components/StarRating";

// export const metadata = {
//   title: "Your Review | Bookatable",
// };

export default function UserReview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const booking = searchParams.get("booking");
  const restaurant = searchParams.get("restaurant");
  const [addReview] = useInsertReviewMutation();
  const handleReview = async () => {
    const data = {
      restaurant,
      booking,
      comment: review,
      rating,
    };

    try {
      const res = await addReview(data).unwrap();
      Success_model({ text: res?.message });
      router.push("/");
    } catch (error) {
      Error_Modal({ title: error?.data?.message });
    }
  };
  return (
    <div className="container pb-24 pt-[190px]">
      <StarRating rating={rating} setRating={setRating} />

      <p className="mb-8 mt-6 font-kumbh-sans text-lg text-primary-secondary-2">
        Please share your opinion about the restaurant
      </p>

      <Textarea
        onChange={(e) => setReview(e.target.value)}
        placeholder="Your review"
        className="h-[150px] bg-primary-white-light px-5 py-3 text-base"
      />

      <Button
        onClick={handleReview}
        size="lg"
        className="mt-10 w-full rounded-lg bg-primary-secondary-3 font-medium text-primary-white"
      >
        SEND REVIEW
      </Button>
    </div>
  );
}
