"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { setLocation, setSearchTerm } from "@/redux/features/searchSlice.js";
import { Error_Modal } from "@/utils/modalHook.js";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { MapPin } from "lucide-react";

export default function HeroSearchBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState();
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const pathName = usePathname();
  const searchBtnRef = useRef();

  // search bar value
  const { searchTerm } = useSelector((state) => state.search);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setLocation({
              Iat: position.coords.latitude,
              lng: position.coords.longitude,
            }),

            router.push(`/all-restaurants`),
          );
        },
        (error) => {
          Error_Modal(error?.data?.message);
        },
      );
    } else {
      Error_Modal("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-stretch gap-x-1 rounded-full border-2 p-1",
        pathName === "/home"
          ? "border-primary-white text-primary-white"
          : "border-primary-black text-primary-black",
      )}
    >
      {/* Set location button */}
      <button
        onClick={() => setIsLocationFocused(!isLocationFocused)}
        onBlur={() => setIsLocationFocused(!isLocationFocused)}
        className="flex w-[75%] items-center justify-between text-ellipsis rounded-l-3xl bg-primary-secondary-3 px-2 text-center font-kumbh-sans text-primary-white md:w-[28%] lg:w-[40%] xl:w-[35%]"
      >
        <div className="flex items-center gap-x-1">
          <MapPin size={18} />
          <p>Location</p>
        </div>

        <ChevronDown size={18} />
      </button>

      {/* Search Input box */}
      <Input
        placeholder="Search by restaurant name"
        id="heroSearch"
        className="h-12 flex-grow border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        defaultValue={
          pathName === "/all-restaurants" && searchTerm ? searchTerm : ""
        }
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            searchBtnRef.current.click();
          }
        }}
      />

      {/* Search button */}
      <button
        className="flex w-28 items-center justify-center rounded-full bg-primary-secondary-3 text-white md:w-24"
        ref={searchBtnRef}
        onClick={() => {
          dispatch(setSearchTerm(search));
          router.push("/all-restaurants");
        }}
      >
        <Search size={30} className="m-0 p-0" />
      </button>

      {/* Set nearby location dropdown */}
      <div
        className={cn(
          "invisible absolute top-14 ml-2 mt-1 w-max rounded-xl bg-primary-secondary-3 px-2 py-2 font-kumbh-sans text-primary-white opacity-0 transition-all duration-300 ease-in-out",
          { "opacity-1 visible block": isLocationFocused },
        )}
      >
        <div
          className="flex cursor-pointer items-center gap-x-2 rounded-3xl border border-transparent px-3 py-1 transition-all duration-200 ease-in hover:text-primary-secondary-1"
          role="button"
          onClick={getLocation}
        >
          <p className="flex items-center gap-x-[2px] text-base">
            Set Nearby Location{" "}
            <ArrowUpRight height={17} width={17} className="block pb-1" />
          </p>
        </div>
      </div>
    </div>
  );
}
