"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMinutes,
  parse,
  addMonths,
  startOfMonth,
  getDay,
  getDaysInMonth,
} from "date-fns";
import { cn } from "@/lib/utils";

export default function BookingWidget({
  selectedDate,
  setSelectedDate,
  time,
  setTime,
  guests,
  setGuests,
}) {
  const [currentDate, setCurrentDate] = useState(new Date()); // February 2025

  // Get days in current month
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getDay(startOfMonth(currentDate)); // Get day of week for first day
  const padding = Array.from({ length: startDay }, (_, i) => null);

  // direction : "prev" | "next"
  const handleMonthChange = (direction) => {
    setCurrentDate((prev) =>
      direction === "next" ? addMonths(prev, 1) : addMonths(prev, -1),
    );
  };

  // direction: "up" | "down"
  const handleTimeChange = (direction) => {
    const currentTime = parse(time, "HH:mm", new Date());
    const newTime =
      direction === "up"
        ? addMinutes(currentTime, 15)
        : addMinutes(currentTime, -15);
    setTime(format(newTime, "HH:mm"));
  };

  // direction: "up" | "down"
  const handleGuestChange = (direction) => {
    setGuests((prev) => {
      if (direction === "up") return prev + 1;
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="w-full rounded-lg border bg-white p-6 pb-2 text-gray-900 shadow-sm">
      {/* Calendar Header */}
      <div className="mb-8 flex items-center justify-between">
        <ChevronLeft
          className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => handleMonthChange("prev")}
        />
        <h2 className="text-xl font-normal">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <ChevronRight
          className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => handleMonthChange("next")}
        />
      </div>

      {/* Calendar Grid */}
      <div className="mb-6 grid grid-cols-7 gap-1">
        {/* Day headers */}
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} className="py-1.5 text-center text-xs text-gray-500">
            {day}
          </div>
        ))}

        {/* Days */}
        {[
          ...padding,
          ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ].map((day, index) => (
          <div
            key={index}
            onClick={() => day && handleDateSelect(day)}
            className={cn(
              "flex aspect-square items-center justify-center text-sm transition-colors duration-200",
              day && "cursor-pointer",
              day &&
                day !== selectedDate &&
                day !== currentDate &&
                "hover:bg-gray-200",
              day === currentDate ? "bg-gray-900 text-white" : "",
              day === selectedDate ? "bg-primary-secondary-1 text-white" : "",
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Guests Selector */}
      <div className="border-t border-gray-200 py-4">
        <div className="flex items-center justify-between">
          <ChevronLeft
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => handleGuestChange("down")}
          />
          <div className="text-center">
            <div className="text-xl">{guests}</div>
            <div className="text-sm text-gray-500">Guests</div>
          </div>
          <ChevronRight
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => handleGuestChange("up")}
          />
        </div>
      </div>

      {/* Time Selector */}
      <div className="border-t border-gray-200 py-4">
        <div className="flex items-center justify-between">
          <ChevronLeft
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => handleTimeChange("down")}
          />
          <div className="text-center">
            <div className="text-xl">{time}</div>
            <div className="text-sm text-gray-500">Time</div>
          </div>
          <ChevronRight
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => handleTimeChange("up")}
          />
        </div>
      </div>
    </div>
  );
}
