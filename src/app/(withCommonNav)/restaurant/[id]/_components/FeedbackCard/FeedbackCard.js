"use client";

import Image from "next/image";
import man from "/public/DynamicRestaurant/Ellipse 12.png";
import StarRatings from "react-star-ratings";

export default function FeedbackCard({ data }) {
  // TODO: use dynamic data
  return (
    <div>
      <div className="flex items-center gap-x-4">
        {/* left */}
        <Image
          src={data?.user?.image || "/nonUser.png"}
          alt="user's profile picture"
          width={70}
          height={70}
          className="size-16 rounded-full"
        />

        {/* right */}
        <div>
          <div className="flex items-center gap-x-5 font-kumbh-sans">
            <h5 className="text-lg text-primary-secondary-1">
              {data?.user?.name}
            </h5>

            <p className="text-primary-secondary-2">Just Now</p>
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            <StarRatings
              rating={Number(data?.rating)}
              starRatedColor="#F5BE32"
              starDimension="22px"
              starSpacing="3px"
              svgIconPath="M14.5077 20.3387L19.7487 23.6663C20.4247 24.0927 21.2566 23.4584 21.059 22.6784L19.5408 16.7094C19.4997 16.544 19.5062 16.3703 19.5596 16.2084C19.613 16.0465 19.711 15.903 19.8423 15.7943L24.5427 11.8739C25.1562 11.3644 24.8442 10.3349 24.0435 10.2829L17.9081 9.88771C17.7407 9.87797 17.5798 9.81968 17.445 9.71995C17.3102 9.62023 17.2073 9.48339 17.149 9.32617L14.8612 3.56514C14.8007 3.39866 14.6904 3.25484 14.5452 3.15321C14.4001 3.05158 14.2273 2.99707 14.0501 2.99707C13.873 2.99707 13.7001 3.05158 13.555 3.15321C13.4099 3.25484 13.2996 3.39866 13.239 3.56514L10.9512 9.32617C10.8929 9.48339 10.7901 9.62023 10.6553 9.71995C10.5204 9.81968 10.3595 9.87797 10.1921 9.88771L4.0567 10.2829C3.25598 10.3349 2.94401 11.3644 3.55755 11.8739L8.25789 15.7943C8.38926 15.903 8.48727 16.0465 8.54063 16.2084C8.59398 16.3703 8.60051 16.544 8.55946 16.7094L7.1556 22.2417C6.91642 23.1776 7.91472 23.9367 8.71544 23.4272L13.5926 20.3387C13.7293 20.2517 13.888 20.2055 14.0501 20.2055C14.2122 20.2055 14.3709 20.2517 14.5077 20.3387Z"
              svgIconViewBox="0 0 28 28"
            />
            <p className="font-kumbh-sans text-primary-secondary-2">
              ({Number(data?.rating)}/5)
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 px-2">
        <p className="font-kumbh-sans text-primary-black">{data.comment}</p>
      </div>
    </div>
  );
}
