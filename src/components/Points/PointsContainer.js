"use client";
import Image from "next/image";
import cardImage from "@/asset/pointsImages/cardImage.png";
import starImage from "@/asset/pointsImages/ranking.png";
import borderLine from "@/asset/pointsImages/borderLine.png";
import { Button } from "../ui/button";
import PointsHistoryTable from "./PointsHistoryTable";
import {
  useGetPointsQuery,
  useWithDawPointsMutation,
} from "@/redux/api/pointsApi";
import { Error_Modal, Success_model } from "@/utils/modalHook";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import { Separator } from "../ui/separator";
import LoadingButton from "../LoadingButton/LoadingButton";

const PointsContainer = () => {
  const { data: points, isLoading: isPointsLoading } =
    useGetPointsQuery(undefined);

  const [withdrawPoints, { isLoading: isWithdrawLoading }] =
    useWithDawPointsMutation();

  // withdraw points function
  const handleWithdrawPoints = async () => {
    try {
      const res = await withdrawPoints({ coins: points?.data?.coins }).unwrap();
      console.log(res);
      Success_model({ title: res?.message });
    } catch (error) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <>
      {isPointsLoading ? (
        <div>
          <SkeletonLoader></SkeletonLoader>
        </div>
      ) : (
        <div className="pb-6 pt-12">
          <div className="space-y-5 text-center">
            <h1 className="text-7xl font-semibold text-[#FF8333]">
              {points?.data?.coins}
            </h1>
            <h4 className="text-2xl md:text-4xl">Total restaurant cubes</h4>
          </div>
          <Separator className="mx-auto mt-5 h-[2px] max-w-[90%] bg-[#FF8333]/50"></Separator>

          {/* Redeem Point card */}
          <div className="relative mt-16">
            <Image
              src={cardImage}
              alt="cardImage"
              className="z-0 hidden lg:block"
            ></Image>
            <div className="inset-0 z-10 w-full lg:absolute lg:px-20">
              <div className="flex h-full flex-col items-center justify-center gap-y-5 rounded p-4 shadow-lg lg:flex-row lg:p-0 lg:shadow-none">
                <div className="flex h-full flex-col lg:pt-20">
                  <div className="flex items-center">
                    <Image src={starImage}></Image>
                    <p className="text-7xl font-bold text-[#009944]">100</p>
                  </div>
                  <p className="mt-2 text-center text-5xl">Point</p>
                </div>
                <Image
                  src={borderLine}
                  alt="borderLineImage"
                  className="mx-10 my-5 hidden lg:block lg:max-h-[250px] xl:max-h-[300px]"
                ></Image>
                <div className="space-y-5">
                  <h1 className="text-4xl text-[#FF8333] lg:text-6xl">
                    Redeem Point
                  </h1>
                  <p className="text-xl lg:text-3xl">
                    You can withdraw your point when <br></br> it will raised
                    100
                  </p>

                  {isWithdrawLoading ? (
                    <div className="w-fit">
                      <LoadingButton className="bg-[#FF8333] px-7">
                        Processing....
                      </LoadingButton>
                    </div>
                  ) : (
                    <Button
                      disabled={
                        Number(points?.data?.coins) >= 100 ? false : true
                      }
                      className="bg-[#FF8333] px-7"
                      onClick={handleWithdrawPoints}
                    >
                      Redeem
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* call points history table component */}
          <PointsHistoryTable></PointsHistoryTable>
        </div>
      )}
    </>
  );
};

export default PointsContainer;
