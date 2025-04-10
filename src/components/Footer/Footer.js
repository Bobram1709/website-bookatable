import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/footer/Group 2.png";

export default function Footer() {
  return (
    <div className="mt-20 bg-primary-black py-10 text-primary-white">
      <div className="container flex flex-col justify-between gap-x-10 lg:flex-row">
        {/* left */}
        <div className="lg:w-[60%]">
          <Image src={logo} alt="bookatable logo" />

          <h5 className="mb-2 mt-8 text-xl font-semibold">
            Discover Your Next Culinary Experience
          </h5>
          <p className="font-kumbh-sans text-primary-white/90">
            Find and book the perfect table at your favorite restaurants with
            ease. Explore a world of dining options, from cozy local spots to
            top-rated fine dining. Reserve your table today and enjoy
            unforgettable meals, every time.
          </p>
        </div>

        {/* right */}
        <div className="lg:max mt-10 flex flex-col gap-x-16 gap-y-8 lg:mt-0 lg:flex-row lg:gap-y-0">
          <div className="space-y-3">
            <h4 className="font-bold">Follow us</h4>
            <div className="flex items-center gap-x-3">
              <Link
                href="https://www.instagram.com/bookatable.mu"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-white text-primary-black"
              >
                <Instagram size={20} />
              </Link>

              <Link
                href="https://www.facebook.com/bookatable.mu"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-white text-primary-black"
              >
                <Facebook size={20} />
              </Link>

              <Link
                href="https://www.linkedin.com/company/bookatable-mu"
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-white text-primary-black"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold">Support</h4>
            <p className="font-kumbh-sans text-xl">info@bookatable.mu</p>
          </div>
        </div>
      </div>
      <Separator className="container mb-6 mt-12" />

      <div className="container flex flex-col items-center justify-between gap-y-5 lg:flex-row lg:gap-y-0">
        <div className="flex flex-col items-center gap-x-4 gap-y-2 md:flex-row md:gap-y-0">
          {/* <Image src={sparkTech} alt="SparkTech Agency Logo" /> */}
          <p className="flex items-center gap-x-2 text-center font-kumbh-sans text-sm md:text-left md:text-base">
            Copyright &copy; Datamation Ltd
          </p>
        </div>

        <div className="flex items-center gap-x-5">
          {/* TODO: Add relevant links */}
          <Link href={"/about-us"} className="font-kumbh-sans">
            About Us
          </Link>
          <Link href={"/privacy-policy"} className="font-kumbh-sans">
            Privacy Policy
          </Link>
          <Link href={"/terms-of-use"} className="font-kumbh-sans">
            Terms of Use
          </Link>
        </div>
      </div>
    </div>
  );
}
