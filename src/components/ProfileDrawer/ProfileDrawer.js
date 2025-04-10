"use client";

import Image from "next/image";
import userIcon from "/public/profileDrawer/user.png";
import historyIcon from "/public/profileDrawer/history.png";
import favoriteIcon from "/public/profileDrawer/favorite.png";
import logoutIcon from "/public/profileDrawer/logout.png";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { Success_model } from "@/utils/modalHook";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Camera, Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import showImage from "@/utils/fileHelper";

export default function ProfileDrawer({ openState, setOpenState }) {
  const dispatch = useDispatch();

  const { data: profileData, isLoading } = useGetSingleUserQuery();
  const user = profileData?.data || {};
  const router = useRouter();

  const handleLogout = () => {
    Success_model({ title: "Logout Successful" });
    dispatch(logout());
    router.refresh();
  };

  if (isLoading) return;

  return (
    <div
      className={cn(
        "invisible fixed left-0 top-0 z-[99999] h-screen w-full opacity-0 transition-all duration-300 ease-in-out",
        {
          "opacity-1 visible": openState,
        },
      )}
    >
      <div
        className="backdrop absolute left-0 top-0 -z-10 h-full w-full bg-primary-white opacity-[0.93]"
        onClick={() => setOpenState(false)}
      ></div>

      {/* right side drawer */}
      <div
        className={cn(
          "absolute right-0 top-0 z-[99999] h-full w-[75%] translate-x-[100vw] bg-primary-secondary-2 px-8 py-20 text-primary-white opacity-[0.92] transition-all duration-300 ease-in-out md:w-[50%] lg:w-[24%]",
          { "translate-x-0": openState },
        )}
      >
        <div className="mx-auto max-w-max">
          {user?.image ? (
            <Image
              src={user?.image}
              alt="profile picture"
              width={900}
              height={700}
              className="mx-auto size-32 rounded-full"
            />
          ) : (
            <div className="group relative mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-primary-secondary-1">
              <h3 className="text-3xl font-semibold">
                {user?.fullName?.split(" ")[0][0]}
                {user?.fullName?.split(" ")[1][0]}
              </h3>

              <Link
                href={"/dashboard/user/profile"}
                className="invisible absolute bottom-1 right-1 rounded-full bg-white p-2 text-black opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100"
                title="Change Profile Picture"
                onClick={() => setOpenState(false)}
              >
                <Camera size={16} />
              </Link>
            </div>
          )}
          <h4 className="mt-5 text-center text-3xl font-semibold">
            {user?.fullName}
          </h4>
        </div>

        {/* menu */}
        <div className="mt-16">
          <Link
            href="/dashboard/user/profile"
            className="flex items-center gap-x-6"
            onClick={() => setOpenState(false)}
          >
            <Image src={userIcon} alt="user icon" />
            <h3 className="font-kumbh-sans text-xl">Personal Details</h3>
          </Link>

          <Separator className="my-4 bg-primary-secondary-3" />

          <Link
            href="/dashboard/user/reservations"
            className="flex items-center gap-x-6"
            onClick={() => setOpenState(false)}
          >
            <Image src={historyIcon} alt="booking history icon" />
            <h3 className="font-kumbh-sans text-xl">Booking History</h3>
          </Link>

          <Separator className="my-4 bg-primary-secondary-3" />

          <Link
            href="/dashboard/user/favorite"
            className="flex items-center gap-x-6"
            onClick={() => setOpenState(false)}
          >
            <Image src={favoriteIcon} alt="favorite icon" />
            <h3 className="font-kumbh-sans text-xl">Favorite</h3>
          </Link>

          <Separator className="my-4 bg-primary-secondary-3" />
          <Link
            href="/points"
            className="flex items-center gap-x-6"
            onClick={() => setOpenState(false)}
          >
            <Coins size={28} />
            <h3 className="font-kumbh-sans text-xl">Points</h3>
          </Link>

          <Separator className="my-4 bg-primary-secondary-3" />

          <div
            href={"/login"}
            className="flex items-center gap-x-6"
            role="button"
            onClick={() => {
              handleLogout();
              setOpenState(false);
            }}
          >
            <Image src={logoutIcon} alt="log out icon" />
            <h3 className="font-kumbh-sans text-xl">Logout</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
