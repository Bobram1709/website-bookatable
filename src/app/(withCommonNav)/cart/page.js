"use client";
import { Button } from "@/components/ui/button";
import { useGetMenuByReservationIdQuery } from "@/redux/api/cartApi";
import { useLoadPaymentZoneMutation } from "@/redux/api/orderApi";
import { Error_Modal, Success_model } from "@/utils/modalHook";
import { Empty } from "antd";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  rehydrateCartFromLocalStorage,
  setCartItems,
} from "@/redux/features/cartSlice";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CartCard from "./_components/CartCard";

export default function Cart() {
  const searchParams = useSearchParams();
  const booking = searchParams.get("booking");
  const restaurantId = searchParams.get("restaurant");
  const cart = useSelector((state) => state.cart);
  const { data: Cdata } = useGetMenuByReservationIdQuery(booking);
  console.log(Cdata);

  const dispatch = useDispatch();
  const [makePayment] = useLoadPaymentZoneMutation();

  useEffect(() => {
    dispatch(rehydrateCartFromLocalStorage()); // Rehydrate cart from local storage

    // Always update the Redux store with the API data when it is available
    if (Cdata?.data) {
      dispatch(
        setCartItems({
          items: Cdata.data.items,
          totalAmount: Cdata.data.totalAmount,
          bookingId: booking,
        }),
      );
    }
  }, [dispatch, booking, Cdata?.data]); // Run when booking or Cdata changes

  const handlePayment = async () => {
    const data = {
      cart: Cdata?.data?._id,
      order: {
        id_order: uuidv4(),
        currency: "MUR",
        amount: cart?.totalAmount,
        iframe_behavior: {
          height: 400,
          width: 350,
          custom_redirection_url: process.env.NEXT_PUBLIC_REDIRECT_URL,
          language: "EN",
        },
      },
    };
    try {
      const res = await makePayment(data).unwrap();
      window.open(res?.data?.payment_zone_data);
      Success_model("Payment successful.");
    } catch (error) {
      Error_Modal("error");
    }
  };

  return (
    <div className="mx-auto pb-24 pt-[180px] lg:w-[68%]">
      <div className="mb-10 flex items-center justify-between">
        <h1>Cart Details</h1>
        <Link href={`/menu/${restaurantId}?booking=${booking}`}>
          <button className="flex items-center gap-x-2 rounded-lg bg-primary-secondary-3 px-4 py-2 text-lg font-medium text-white transition-all duration-300 ease-in-out hover:bg-black hover:text-primary-secondary-3">
            <Plus />
            Add More
          </button>
        </Link>
      </div>

      {cart?.items?.length ? (
        <>
          <div className="space-y-10">
            {cart?.items?.map((data, idx) => (
              <CartCard
                key={idx}
                data={data}
                bookingId={booking}
                totalAmount={cart?.totalAmount}
              />
            ))}
          </div>

          <div className="mt-20">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-normal text-primary-secondary-3">
                Total Cost
              </h1>
              <h1 className="text-3xl font-bold text-primary-secondary-3">
                Rs {cart?.totalAmount}
              </h1>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <h1 className="text-3xl font-normal text-primary-secondary-3">
                Status
              </h1>
              <h1 className="text-3xl font-bold text-primary-secondary-3">
                {Cdata?.data?.status ?? "unpaid"}
              </h1>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={Cdata?.data?.status === "paid"}
                  className="mt-8 w-full rounded-lg bg-primary-secondary-3 font-medium text-primary-white"
                >
                  Payment
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Do you want to proceed?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please be advised that once payment has been successfully
                    processed, modifications or cancellations of orders are not
                    permitted. Any requests for modifications or cancellations
                    must be directed to the restaurant directly.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={Cdata?.data?.status === "paid"}
                    onClick={handlePayment}
                    className="rounded-lg bg-primary-secondary-3 font-medium text-primary-white"
                  >
                    Payment
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      ) : (
        <div className="my-16 flex h-full w-full items-center justify-center">
          <Empty />
        </div>
      )}
    </div>
  );
}
