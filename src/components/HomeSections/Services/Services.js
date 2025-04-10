import menuPic from "/public/services/menuPic-min.jpg";
import onlineOrderIcon from "/public/services/online order.png";
import timeIcon from "/public/services/24-7.png";
import reservationIcon from "/public/services/Calender.png";
import diningSpaceIcon from "/public/services/Beach Dinner.png";
import chefIcon from "/public/services/Chef.png";
import kitchenIcon from "/public/services/Kitchen.png";
import Image from "next/image";

export default function Services() {
  return (
    <section className="container my-[120px] flex flex-col gap-y-16 lg:flex-row lg:items-stretch lg:justify-center lg:gap-x-20 lg:gap-y-0">
      {/* left */}
      <div className="lg:w-[40%]">
        <Image
          src={menuPic}
          alt="people at restaurant table"
          className="mx-auto block h-full w-full rounded-lg"
        />
      </div>

      {/* right */}
      <div className="space-y-10 md:mx-auto md:w-3/4 lg:w-[60%]">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-primary-black lg:leading-snug">
            Your Ultimate Dining Experience, Just a Click{" "}
            <span className="text-primary-secondary-3">Away</span>
          </h1>
          <p className="font-kumbh-sans text-primary-secondary-2">
            Discover the perfect place to dine with ease. Our platform connects
            you to restaurants that serve a wide variety Of cuisines, from
            gourmet dishes to light snacks and baked goods. The word
            &ldquo;restaurant&rdquo; comes from the French term meaning
            &ldquo;to restore,&rdquo; and we&apos;re here to help you restore
            your hunger with a seamless booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:gap-x-16">
          {/* Online order */}
          <div className="flex items-start gap-x-3">
            <Image
              src={onlineOrderIcon}
              alt="online order icon"
              className="pt-1"
            />
            <div>
              <p className="mb-1 text-lg font-semibold">Online Ordering</p>
              <p className="text-sm text-primary-secondary-2">
                Place your meal orders online, and enjoy your favorite dishes at
                your convenience.
              </p>
            </div>
          </div>

          {/* 24/7 availability */}
          <div className="flex items-start gap-x-3">
            <Image src={timeIcon} alt="clock icon" />
            <div>
              <p className="mb-1 text-lg font-semibold">24/7 Availability</p>
              <p className="text-sm text-primary-secondary-2">
                Book a table or order food anytime, day or night.
              </p>
            </div>
          </div>

          {/* Advance reservation */}
          <div className="flex items-start gap-x-3">
            <Image src={reservationIcon} alt="calendar icon" />
            <div>
              <p className="mb-1 text-lg font-semibold">
                Advanced Reservations
              </p>
              <p className="text-sm text-primary-secondary-2">
                Secure your spot at the best restaurants with easy online
                reservations.
              </p>
            </div>
          </div>

          {/* Curated dining spaces */}
          <div className="flex items-start gap-x-3">
            <Image src={diningSpaceIcon} alt="dining space icon" />

            <div>
              <p className="mb-1 text-lg font-semibold">
                Curated Dining Spaces
              </p>
              <p className="text-sm text-primary-secondary-2">
                Find and book organized, well-managed dining venues.
              </p>
            </div>
          </div>

          {/* Top chefs */}
          <div className="flex items-start gap-x-3">
            <Image src={chefIcon} alt="chef icon" />

            <div>
              <p className="mb-1 text-lg font-semibold">Top Chefs</p>
              <p className="text-sm text-primary-secondary-2">
                Experience meals crafted by expert chefs dedicated to culinary
                excellence.
              </p>
            </div>
          </div>

          {/* Immaculate kitchens */}
          <div className="flex items-start gap-x-3">
            <Image src={kitchenIcon} alt="kitchen icon" />

            <div>
              <p className="mb-1 text-lg font-semibold">Immaculate Kitchens</p>
              <p className="text-sm text-primary-secondary-2">
                Dine with confidence, knowing your food is prepared in clean,
                hygienic environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
