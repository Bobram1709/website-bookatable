"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import showImage from "@/utils/fileHelper.js";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookNowModal from "./BookNowModal";
import { useGetMenuByReservationIdQuery } from "@/redux/api/cartApi";

export default function FoodItemCard({ cardData, booking }) {
  const { _id, name, price, description } = cardData;
  const params = useSearchParams().get("state");
  const reservationId = useSearchParams().get("booking");
  const restaurantId = usePathname().replace("/menu/", "");
  const router = useRouter();
  const [bookNowModalOpen, setBookNowModalOpen] = useState(false);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [alreadyInCartItems, setAlreadyInCartItems] = useState([]);

  useEffect(() => {
    if (cart?.bookingId === reservationId) {
      setAlreadyInCartItems(cart.items.map((item) => item.menu));
    }
  }, [cart?.bookingId]);

  // show book table prompt if params has state
  const handleOrderNowBtn = () => {
    if (params === "only-menu") {
      setBookNowModalOpen(true);
    } else {
      router.push(`/menu/item/${_id}?booking=${booking}`);
    }
  };

  return (
    <>
      <Card className="flex flex-col justify-between rounded-3xl border bg-transparent text-primary-secondary-1 shadow-none">
        <div>
          <CardHeader>
            <CardTitle className="bg-slate-50">
              <Image
                width={1200}
                height={1200}
                src={showImage(cardData?.image)}
                alt={`${name}`}
                className="mx-auto mb-3 block h-[200px] w-auto rounded"
              />
            </CardTitle>

            <p className="!pt-2 text-2xl font-bold">{name}</p>

            <CardDescription className="font-kumbh-sans">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-medium">
              Rs. {parseFloat(price).toFixed(2)}
            </p>

            {/* <div className="flex items-center gap-x-4">
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
          </div> */}
          </CardContent>
        </div>

        <CardFooter>
          <Button
            className="w-full rounded-3xl bg-primary-secondary-1 font-kumbh-sans text-primary-white"
            onClick={handleOrderNowBtn}
            disabled={Boolean(alreadyInCartItems?.includes(_id)) === true}
          >
            {Boolean(alreadyInCartItems?.includes(_id)) === true
              ? "Already Added"
              : "Order Now"}
          </Button>
        </CardFooter>
      </Card>

      <BookNowModal
        open={bookNowModalOpen}
        setOpen={setBookNowModalOpen}
        restaurantId={restaurantId}
      />
    </>
  );
}
