"use client";

import { cn } from "@/lib/utils";
import { useGetAllReservationsQuery } from "@/redux/api/reservationApi.js";
import { useState } from "react";
import OrdersTable from "./_components/OrdersTable";
import styles from "./Orders.module.css";

export default function UserOrders() {
  const displayStatus = [
    { label: "Ongoing", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Cancel", value: "canCelled" },
  ];
  const [selectedStatus, setSelectedStatus] = useState(displayStatus[0]?.value);
  const { data: Rdata } = useGetAllReservationsQuery({
    status: selectedStatus,
  });

  return (
    <div className="pt-[160px]">
      {/* header */}
      <div className="h-[70px] bg-primary-secondary-1">
        <div className="mx-auto flex h-full w-1/2 items-stretch justify-center gap-x-12">
          {displayStatus.map((statusName, idx) => (
            <div
              className={cn("flex h-full items-center border-0", {
                [styles.activeLink]: selectedStatus === statusName?.value,
              })}
              key={idx}
              onClick={() => setSelectedStatus(statusName?.value)}
              role="button"
            >
              <p className="font-kumbh-sans text-lg text-primary-white">
                {statusName?.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <OrdersTable status={selectedStatus} data={Rdata} />
      </div>
    </div>
  );
}
