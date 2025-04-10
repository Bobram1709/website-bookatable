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
import { Button } from "@/components/ui/button";
import EmptyData from "@/components/ui/Empty.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMenuByReservationIdQuery } from "@/redux/api/cartApi.js";
import { useLoadPaymentZoneMutation } from "@/redux/api/orderApi";
import { Error_Modal } from "@/utils/modalHook";
import { EyeIcon, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import OrderCard from "./OrderCard";
import OrderSkeleton from "./OrderSkeleton.js";
export default function OrdersTable({ status, data }) {
  const [makePayment] = useLoadPaymentZoneMutation();
  const [reservationId, setReservationId] = useState();
  const { data: Cdata, isLoading } = useGetMenuByReservationIdQuery(
    reservationId,
    {
      skip: !reservationId,
    },
  );

  const handlePayment = async () => {
    const data = {
      cart: Cdata?.data?._id,
      order: {
        id_order: uuidv4(),
        currency: "MUR",
        amount: Cdata?.data?.totalAmount,
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
      Success_model("Payment successfull.");
    } catch (error) {
      Error_Modal("error");
    }
  };
  return (
    <div className="container mt-12">
      <Table className="border">
        <TableCaption>
          A list of your {status?.toLowerCase()} orders.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-kumbh-sans text-xl text-primary-secondary-1">
              Restaurant Name
            </TableHead>
            <TableHead className="font-kumbh-sans text-xl text-primary-secondary-1">
              Reservation ID
            </TableHead>
            <TableHead className="font-kumbh-sans text-xl text-primary-secondary-1">
              Guest
            </TableHead>
            <TableHead className="font-kumbh-sans text-xl text-primary-secondary-1">
              Table No
            </TableHead>
            <TableHead className="font-kumbh-sans text-xl text-primary-secondary-1">
              Time & Date
            </TableHead>
            <TableHead className="font-kumbh-sans text-xl text-primary-secondary-1">
              Event
            </TableHead>
            <TableHead className="font-kumbh-sans text-xl text-primary-secondary-1">
              Order History
            </TableHead>

            {status === "Completed" && (
              <TableHead className="font-kumbh-sans text-xl text-primary-secondary-1">
                Review
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((data, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.restaurant?.name}
              </TableCell>
              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.id}
              </TableCell>
              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.table?.seats} Person
              </TableCell>
              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.table?.tableNo}
              </TableCell>

              <TableCell className="font-kumbh-sans text-primary-black">
                {new Date(data?.date).toDateString()}, ({data?.time})
              </TableCell>

              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.event?.title ? data?.event?.title : "N/A"}
              </TableCell>

              {!data?.event && (
                <TableCell className="font-kumbh-sans text-primary-black">
                  {/* Show Order History Modal on Eye button click */}
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <EyeIcon
                        role="button"
                        onClick={() => setReservationId(data?._id)}
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex justify-between font-kumbh-sans text-2xl">
                          Order History
                          {Cdata?.data?.status !== "paid" && (
                            <Link
                              href={`/cart?booking=${data?._id}&restaurant=${data?.restaurant?._id}`}
                            >
                              <Button className="bg-primary-secondary-3">
                                Add More
                              </Button>
                            </Link>
                          )}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {/* Use Dynamic data for the cards */}
                          <div className="mt-4 max-h-[50vh] space-y-4 overflow-auto">
                            {isLoading ? (
                              <OrderSkeleton />
                            ) : Cdata?.data?.items?.length > 0 ? (
                              Cdata.data.items.map((data, index) => (
                                <OrderCard key={index} data={data} />
                              ))
                            ) : (
                              <EmptyData />
                            )}
                          </div>
                          {/* 
                        {Cdata?.data?.status !== "unpaid" && (
                          <div className="mt-10 flex items-center justify-between font-kumbh-sans text-xl font-medium text-primary-secondary-3">
                            <h4>Transaction Id</h4>
                            <h4>#30400e0349540340</h4>
                          </div>
                        )} */}
                          <div className="mb-2 mt-10 flex items-center justify-between font-kumbh-sans text-xl font-medium text-primary-secondary-3">
                            <h4>Total Cost</h4>
                            <h4>
                              Rs.
                              {Cdata?.data?.totalAmount}
                            </h4>
                          </div>
                          <div className="mb-2 mt-4 flex items-center justify-between font-kumbh-sans text-xl font-medium capitalize text-primary-secondary-3">
                            <h4>Status</h4>
                            <h4>
                              {Cdata?.data?.status === "paid"
                                ? "paid"
                                : "unpaid"}
                            </h4>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter className="flex">
                        {Cdata?.data?.status !== "paid" ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                disabled={
                                  Cdata?.data?.totalAmount ? false : true
                                }
                                className="bg-primary-secondary-3"
                              >
                                Pay
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Do you want to proceed?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Please be advised that once payment has been
                                  successfully processed, modifications or
                                  cancellations of orders are not permitted. Any
                                  requests for modifications or cancellations
                                  must be directed to the restaurant directly.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  disabled={
                                    Cdata?.data?.totalAmount ? false : true
                                  }
                                  className="bg-primary-secondary-3"
                                  onClick={handlePayment}
                                >
                                  Payment
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : null}
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              )}

              {!data?.isReviewed && status === "completed" && (
                <TableCell className="font-kumbh-sans text-primary-black">
                  <Button variant="outline" asChild>
                    <Link
                      href={`/dashboard/user/review?booking=${data?._id}&restaurant=${data?.restaurant?._id}`}
                    >
                      <MessageSquareText className="mr-2 h-4 w-4" /> Share
                      Review
                    </Link>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// cart?booking=674c21f28a0778485fa70580&restaurant=672dc3df40099d93f58cbede
