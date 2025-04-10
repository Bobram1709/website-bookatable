"use client";
import StarRatings from "react-star-ratings";

export default function StarRating({ rating, setRating }) {
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <StarRatings
      rating={rating}
      numberOfStars={5}
      starRatedColor="#F8B84E"
      starHoverColor="#F8B84E"
      svgIconViewBox="0 0 64 63"
      svgIconPath="M32.0218 50.9188L14.1807 60.2332C13.5405 60.5675 12.7947 60.0233 12.9176 59.3117L16.3234 39.5925L1.90191 25.6328C1.38123 25.1288 1.6667 24.2465 2.38393 24.143L22.3196 21.2663L31.2408 3.31574C31.5615 2.67042 32.4821 2.67042 32.8028 3.31574L41.7239 21.2663L61.6597 24.143C62.3769 24.2465 62.6624 25.1288 62.1417 25.6328L47.7202 39.5925L51.126 59.3117C51.2489 60.0233 50.5031 60.5675 49.8629 60.2332L32.0218 50.9188Zs"
      starDimension="35px"
      changeRating={handleRatingChange}
    />
  );
}
