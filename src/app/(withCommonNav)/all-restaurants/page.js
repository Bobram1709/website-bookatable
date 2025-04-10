import HeroSearchBar from "@/components/HeroSearchBar/HeroSearchBar";
import AllRestaurants from "./_components/AllRestaurants";

export const metadata = {
  title: {
    absolute: "All restaurants | Bookatable",
  },
};

export default function AllRestaurantsPage() {
  return (
    <div className="container pt-[160px]">
      <div className="flex flex-col items-center justify-between space-y-5 lg:flex-row lg:space-y-0">
        {/* left */}
        <div className="lg:w-1/2">
          <h1 className="font-bold text-primary-secondary-1">
            Explore{" "}
            <span className="text-primary-secondary-3">Restaurants</span>
          </h1>
          <p className="mt-4 font-kumbh-sans text-xl text-primary-secondary-2 lg:w-[40%]">
            Check your city Near by Restaurant
          </p>
        </div>

        {/* right */}
        <div className="lg:w-[40%]">
          <HeroSearchBar />
        </div>
      </div>

      <AllRestaurants />
    </div>
  );
}
