import Image from "next/image";
import Link from "next/link";
import "./DownloadApp.css";
import appStore from "/public/DownloadApp/Mobile app store badge (1).png";
import playStore from "/public/DownloadApp/Mobile app store badge.png";

export default function DownloadApp() {
  return (
    <section
      id="download-mobile-app"
      className="container relative mt-[160px] flex flex-col-reverse items-center gap-x-8 gap-y-12 lg:flex-row lg:gap-y-0"
    >
      {/* left */}
      <div className="lg:w-1/2">
        <h1 className="text-5xl font-bold text-primary-secondary-1 lg:leading-snug">
          Booking Made Easier with Our{" "}
          <span className="text-primary-secondary-3">Mobile App</span>
        </h1>
        <p className="mb-10 mt-7 font-kumbh-sans text-lg text-primary-secondary-2 lg:w-[75%]">
          Simply download one of the restaurant booking app. and you&apos;ll be
          ready to book your table and order your meal in just a few taps.
        </p>

        <div className="flex items-center gap-x-4">
          <Link
            href={"https://apps.apple.com/us/app/bookatable-mu/id6443644221"}
            target="_blank"
          >
            <Image src={appStore} alt="app store icon" />
          </Link>

          <Link
            href="https://play.google.com/store/apps/details?id=com.bookatable.app.mu"
            target="_blank"
          >
            <Image src={playStore} alt="play store icon" />
          </Link>
        </div>
      </div>

      {/* right */}
      <div className="lg:w-1/2">
        <video
          autoPlay
          loop
          muted={true}
          className="w-[100%] rounded-3xl object-fill"
        >
          <source src="/videos/Mobile App Section Video Optimized.mp4" />
        </video>
      </div>
    </section>
  );
}
