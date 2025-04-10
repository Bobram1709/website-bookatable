import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import circle from "/public/home/circle.png";
import flowers from "/public/home/flowers.png";

export default function WithNavLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* background effects */}
      <div className="relative">
        <Image
          src={circle}
          alt="bg-effect circle"
          className="absolute -left-[50%] top-0 -z-10 lg:-left-[2%]"
        />
        <Image
          src={flowers}
          alt="bg-effect flowers"
          className="absolute right-0 top-0 -z-10 w-[70%] lg:w-[40%]"
        />
      </div>

      <div>{children}</div>
    </>
  );
}
