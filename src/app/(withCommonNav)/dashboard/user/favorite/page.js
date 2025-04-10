"use client";
import EmptyData from "@/components/ui/Empty.jsx";
import { useGetAllItemsFromFavouriteListQuery } from "@/redux/api/favouriteApi.js";
import FavoriteCard from "./_components/FavoriteCard";

// export const metadata = {
//   title: "Your Favorites | Bookable",
// };

export default function UserFavorites() {
  const { data: Fdata } = useGetAllItemsFromFavouriteListQuery({});
  return (
    <div className="container pt-[160px]">
      <h1>Favorite</h1>

      <div className="mt-10 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-16">
        {Fdata?.data[0]?.menu?.length > 0 ? (
          Fdata.data[0].menu.map((data, idx) => (
            <FavoriteCard key={idx} data={data} />
          ))
        ) : (
          <div className="col-span-full flex w-full items-center justify-center">
            <EmptyData />
          </div>
        )}
      </div>
    </div>
  );
}
