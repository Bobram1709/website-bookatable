import AllEvent from "@/components/Event/AllEvent";
import React from "react";

export const metadata = {
  title: "Events",
  description: "Events page",
};

const EventsPage = () => {
  return (
    <div className="container pt-[160px]">
      <div className="flex flex-col items-center justify-between space-y-5 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/2">
          <h1 className="font-bold text-primary-secondary-1">
            Explore <span className="text-primary-secondary-3">Event</span>
          </h1>
          <p className="mt-4 font-kumbh-sans text-xl text-primary-secondary-2 lg:w-[40%]"></p>
        </div>
      </div>
      <AllEvent></AllEvent>
    </div>
  );
};

export default EventsPage;
