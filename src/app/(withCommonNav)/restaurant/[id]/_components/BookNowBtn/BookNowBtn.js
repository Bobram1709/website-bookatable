"use client";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
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
import { Separator } from "@/components/ui/separator";
import {
  useGetSingleReservationForEventQuery,
  useGetSingleReservationQuery,
  useSubmitEventReservationMutation,
  useSubmitReservationMutation,
} from "@/redux/api/reservationApi.js";
import { Error_Modal, LoginPrompt_Modal } from "@/utils/modalHook";
import { Calendar, CircleX, DollarSign, Table2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import foodMenuIcon from "/public/DynamicRestaurant/menu.png";
import successfulIcon from "/public/DynamicRestaurant/succesful.png";
import { v4 as uuidv4 } from "uuid";
import { useEventBookingPaymentMutation } from "@/redux/api/paymentApi";

export default function BookNowBtn({
  reservation,
  setShowRequiredError,
  eventId,
  guest,
}) {
  const [booking, { data: submitData, isLoading: submitLoading }] =
    useSubmitReservationMutation();

  const [
    eventBookings,
    { data: eventBookingsData, isLoading: eventBookingsLoading },
  ] = useSubmitEventReservationMutation();

  const { data: reservationData } = useGetSingleReservationQuery(
    submitData?.data?._id,
    { skip: !submitData?.data?._id },
  );

  const { data: eventReservation, isLoading: isEventReservationDataLoading } =
    useGetSingleReservationForEventQuery(eventBookingsData?.data?._id, {
      skip: !eventBookingsData?.data?._id,
    });

  const totalEntryFee =
    Number(eventReservation?.data?.event?.entryFee) * Number(guest);

  const { date, time, table } =
    reservationData?.data[0] ?? eventReservation?.data ?? {};

  const [modalOpen, setModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // get event booking id for event booking payment
  const eventBookingId = sessionStorage.getItem("eventBookingId");

  // event booking payment api
  const [bookEventPayment, { isLoading: isEventPaymentLoading }] =
    useEventBookingPaymentMutation();

  // show overlay loader for async operation
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  // show modal if user exists else send to login
  const handleReservation = async (e) => {
    e.preventDefault();
    setShowRequiredError(false);
    if (!reservation.time || !reservation.date || !reservation.seats) {
      setShowRequiredError(true);
      return;
    }

    if (!user?.userId) {
      setLoginModalOpen((prev) => !prev);
      return;
    }

    if (eventId) {
      try {
        setIsLoaderActive(true);
        const res = await eventBookings(reservation).unwrap();

        setModalOpen(true);
        sessionStorage.setItem("eventBookingId", res?.data?._id);

        setIsLoaderActive(false);
      } catch (error) {
        Error_Modal({ title: error?.data?.message });
        setIsLoaderActive(false);
      }
      return;
    }

    try {
      setIsLoaderActive(true);
      const res = await booking(reservation).unwrap();
      setModalOpen(true);
      setIsLoaderActive(false);
    } catch (error) {
      Error_Modal({ title: error?.data?.message });
      setIsLoaderActive(false);
    }
  };

  // event booking payment
  const handleMakePayment = async () => {
    const eventBookingData = {
      unpaidBooking: eventBookingId,
      order: {
        id_order: uuidv4(),
        currency: "MUR",
        amount: totalEntryFee,
      },
      iframe_behavior: {
        height: 400,
        width: 350,
        custom_redirection_url: "https://bookatable.mu",
        language: "EN",
      },
    };

    try {
      const res = await bookEventPayment(eventBookingData).unwrap();
      sessionStorage.removeItem("eventBookingId");
      window.open(res?.data?.payment_zone_data);
    } catch (error) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <AlertDialog
      className="relative"
      open={modalOpen}
      onOpenChange={setModalOpen}
    >
      <AlertDialogTrigger
        className={`absolute -bottom-2 left-1/2 w-[96%] -translate-x-1/2 -translate-y-1/2 rounded ${isLoaderActive ? "bg-gray-400" : "bg-primary-secondary-3"} py-2 text-primary-white`}
        onClick={handleReservation}
        disabled={isLoaderActive}
      >
        {isLoaderActive ? (
          <LoadingButton>Processing...</LoadingButton>
        ) : (
          "Book Now"
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Image
              src={successfulIcon}
              alt="booking successful marker"
              className="mx-auto block"
            />
            <h4 className="my-3 text-center text-2xl text-primary-secondary-1">
              {eventId
                ? "Event Booked Successfully"
                : "Table Booked Successfully"}
            </h4>
          </AlertDialogTitle>
          <Separator className="bg-primary-secondary-1" />
          <AlertDialogDescription>
            <div className="mx-auto my-5 w-3/4 space-y-3">
              <div className="flex items-center gap-x-4 font-kumbh-sans">
                <Calendar className="text-primary-black/75" />
                <p className="text-xl">
                  {date} | {time}
                </p>
              </div>
              <div className="flex items-center gap-x-4 font-kumbh-sans">
                <Table2 className="text-primary-black/75" />
                <p className="text-xl">Table No: {table?.tableNo}</p>
              </div>
              <div className="flex items-center gap-x-4 font-kumbh-sans">
                <Users className="text-primary-black/75" />
                <p className="text-xl">{table?.seats} Guests</p>
              </div>
              {eventId && (
                <div className="flex items-center gap-x-4 font-kumbh-sans">
                  <DollarSign className="text-primary-black/75" />
                  <p className="text-xl">Total Entry Fee: Rs {totalEntryFee}</p>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto w-max">
          {eventId ? (
            <AlertDialogAction
              className="flex items-center gap-x-3 bg-primary-secondary-3 px-5 py-6 text-lg font-bold text-primary-white"
              onClick={handleMakePayment}
              disabled={isEventReservationDataLoading}
            >
              <Image src={foodMenuIcon} alt="food menu icon" />
              <span>Make Payment</span>
            </AlertDialogAction>
          ) : (
            <Link
              href={`/menu/${reservation?.restaurant}?booking=${submitData?.data?._id}`}
            >
              <AlertDialogAction className="flex items-center gap-x-3 bg-primary-secondary-3 px-5 py-6 text-lg font-bold text-primary-white">
                <Image src={foodMenuIcon} alt="food menu icon" />
                <span>Show Menu</span>
              </AlertDialogAction>
            </Link>
          )}
          <AlertDialogCancel className="absolute right-0 top-0 border-0">
            <CircleX />
          </AlertDialogCancel>
        </AlertDialogFooter>
        <Separator className="bg-primary-secondary-1" />

        <p className="text-justify font-kumbh-sans text-primary-white-dark">
          {eventId
            ? "You have successfully booked an event with Dine in Florida. Please make payment to complete your reservation."
            : " Your table is reserved! Since you reserved your table with Dine in Florida, your will automatically receive 2% off your bill when you pay"}
        </p>
      </AlertDialogContent>

      <>
        <LoginPrompt_Modal
          loginModalOpen={loginModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      </>
    </AlertDialog>
  );
}
