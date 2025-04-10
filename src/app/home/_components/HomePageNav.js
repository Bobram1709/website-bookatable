"use client";

import logo from "/public/home/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthBasedButton from "@/components/Navbar/_components/AuthBasedButton";

export default function HomePageNav() {
  return (
    <div className="absolute left-0 top-[30px] z-[9999] w-full">
      <div className="flex max-h-[100px] items-center justify-between pr-2 lg:container lg:pr-0">
        {/* left */}
        <Link href="/" className="h-[90px] w-[130px] md:h-[100px] md:w-[150px]">
          <Image src={logo} alt="logo" className="h-full w-full" />
        </Link>

        {/* right */}
        <div className="flex items-center gap-x-1 lg:max-w-max lg:gap-x-5">
          <div className="flex flex-wrap items-center justify-center space-x-2 text-white md:space-x-5">
            <Button
              className="hover:bg-secondary-1 h-[40px] w-[90px] text-balance rounded-xl border border-primary-secondary-3 bg-transparent text-xs font-semibold hover:bg-primary-secondary-1 hover:text-primary-white lg:h-[40px] lg:w-[140px] lg:px-0 lg:text-base"
              style={{ boxShadow: "0px 3px 0px #8aba51" }}
            >
              <Link href="/event">Event</Link>
            </Button>
          </div>

          <Button
            className="hover:bg-secondary-1 h-[40px] w-[90px] text-balance rounded-xl border border-primary-secondary-3 bg-transparent text-xs font-semibold hover:bg-primary-secondary-1 hover:text-primary-white lg:h-[40px] lg:w-[140px] lg:px-0 lg:text-base"
            style={{ boxShadow: "0px 3px 0px #8aba51" }}
            asChild
          >
            <Link href="/#download-mobile-app">Download App</Link>
          </Button>

          {/* Auth Based Button */}
          <AuthBasedButton
            className="h-[40px] w-[90px] rounded-xl border border-primary-secondary-3 bg-transparent text-xs font-semibold text-primary-white hover:bg-primary-secondary-1 lg:h-[40px] lg:w-[140px] lg:text-base"
            style={{ boxShadow: "0px 3px 0px #8aba51" }}
          />
        </div>
      </div>
    </div>
  );
}
