import Image from "next/image";
import foodItemPic from "/public/Menu/foodItem1.png";
import { Star } from "lucide-react";
export default function DynamicFavoriteItem() {
  return (
    <div className="container flex flex-col items-center gap-x-10 pb-24 pt-[180px] lg:flex-row">
      {/* left */}
      <div className="w-full lg:w-[30%]">
        <Image
          src={foodItemPic}
          alt="Picture of the food item"
          className="w-full"
        />
      </div>

      {/* right */}
      <div className="mt-16 w-full lg:mt-0 lg:w-[60%]">
        {/* title */}
        <h1 className="text-primary-black">Chicken Curry Masala</h1>

        {/* rating */}
        <div className="mt-3 flex flex-col items-center gap-x-5 lg:flex-row">
          <div className="flex items-center gap-x-2">
            <Star className="fill-[#FFAD33] stroke-[#FFAD33]" />
            <Star className="fill-[#FFAD33] stroke-[#FFAD33]" />
            <Star className="fill-[#FFAD33] stroke-[#FFAD33]" />
            <Star className="fill-[#FFAD33] stroke-[#FFAD33]" />
            <Star className="fill-primary-secondary-2 stroke-primary-secondary-2" />
          </div>
          <p className="font-kumbh-sans text-lg text-primary-secondary-2">
            (150 Reviews)
          </p>
        </div>

        {/* price */}
        <p className="mb-7 mt-4 text-2xl font-semibold text-primary-black">
          Rs 192.00
        </p>

        {/* desc */}
        <div className="space-y-3 pe-20 font-kumbh-sans">
          <h5 className="text-xl text-primary-black">Description</h5>
          <p className="text-lg text-primary-secondary-2">
            Our classic cheeseburger is made with a fresh, never-frozen beef
            patty that is cooked to perfection and topped with melted American
            cheese, lettuce, tomato, pickles, and onions.
          </p>
        </div>
      </div>
    </div>
  );
}
