import Hero from "@/components/Hero/Hero";
import DownloadApp from "@/components/HomeSections/DownloadApp/DownloadApp";
import ExploreRestaurants from "@/components/HomeSections/ExploreRestaurants/ExploreRestaurants";
import RestaurantsSlider from "@/components/HomeSections/RestaurantsSlider/RestaurantsSlider";
import Services from "@/components/HomeSections/Services/Services";
import HomePageNav from "./_components/HomePageNav";

export const metadata = {
  title: "Home",
  description: "This is the official home page of BookaTable",
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
