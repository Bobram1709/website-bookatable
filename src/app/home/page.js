import Hero from "@/components/Hero/Hero";
import DownloadApp from "@/components/HomeSections/DownloadApp/DownloadApp";
import ExploreRestaurants from "@/components/HomeSections/ExploreRestaurants/ExploreRestaurants";
import RestaurantsSlider from "@/components/HomeSections/RestaurantsSlider/RestaurantsSlider";
import Services from "@/components/HomeSections/Services/Services";
import HomePageNav from "./_components/HomePageNav";

export const metadata = {
  title: "BookaTable | Effortless Restaurant Reservations for Sushi, Pizza, and More",
  description: "BookaTable lets you easily discover and reserve your favorite restaurants, from sushi spots to pizza joints and beyond. Quick, hassle-free bookings anytime, anywhere, for any craving!",
};

export default function HomePage() {
  return (
    <>
      <HomePageNav />
      <Hero />
      <ExploreRestaurants />
      <Services />
      <RestaurantsSlider />
      <DownloadApp />
    </>
  );
}
