import { useState } from "react";
const RestaurantMarker = ({ lat, lng, text, address }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
      }}
    >
      <img
        src="https://i.ibb.co/V9QYmtw/marker.png"
        alt="Restaurant Icon"
        style={{ width: "50px", height: "50px" }}
      />
      {hover && (
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "-60px",
            width: "120px",
            backgroundColor: "white",
            border: "1px solid black",
            padding: "5px",
            borderRadius: "5px",
            textAlign: "center",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          {address}
        </div>
      )}
    </div>
  );
};

export default RestaurantMarker;
