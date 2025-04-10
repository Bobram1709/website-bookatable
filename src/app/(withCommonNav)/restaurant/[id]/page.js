import React from "react";
import DynamicRestaurantContainer from "./_components/DynamicRestaurantContainer/DynamicRestaurantContainer";

// export const metadata = {
//   title: {
//     absolute: "Book Restaurant | Bookatable",
//   },
//   description: "Book restaurant page",
// };

export async function generateMetadata({ params }) {
  const restaurantRes = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASEURL + `/restaurants/${params.id}`,
  ).then((res) => res.json());
  const restaurant = restaurantRes.data || {};

  return {
    title: {
      absolute: `${restaurant?.name || "Book Restaurant"} | Bookatable`,
    },
    description: `${restaurant?.description || "Book restaurant page"}`,
  };
}

export default function DynamicRestaurant({ params, searchParams }) {
  return (
    <DynamicRestaurantContainer
      params={params}
      eventId={searchParams?.eventId}
    />
  );
}
