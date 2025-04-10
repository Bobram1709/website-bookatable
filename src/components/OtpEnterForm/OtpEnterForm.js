"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import { REGEXP_ONLY_DIGITS } from "input-otp"; // change regex to allow only chars or digits
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingButton from "../LoadingButton/LoadingButton";
import { Error_Modal, Success_model } from "@/utils/modalHook";

export default function OtpEnterForm() {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const router = useRouter();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await verifyOtp({ otp: otp }).unwrap();

      if (res?.success) {
        // remove sign up token from session storage
        sessionStorage.removeItem("token");

        Success_model({ title: "OTP verification successful" });

        if (sessionStorage.getItem("forgotPasswordToken")) {
          router.push("/set-new-password");
        } else {
          router.push("/login");
        }
      }
    } catch (error) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <form className="container mx-auto sm:w-[65%] md:w-[55%] lg:w-[45%]">
      <div>
        <h3 className="text-2xl font-bold text-primary-secondary-1">
          Enter OTP here
        </h3>
        <p className="mt-2 font-medium text-primary-secondary-2">
          Check your phone number and enter the code here. <br /> OTP expires in
          5 minutes
        </p>
      </div>

      <div className="mx-auto my-10 w-max">
        <InputOTP
          maxLength={5}
          pattern={REGEXP_ONLY_DIGITS}
          id="otp"
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className="mr-4 h-14 w-14 border border-primary-secondary-1 font-kumbh-sans text-2xl font-bold"
              style={{ borderRadius: "3px" }}
            />
            <InputOTPSlot
              index={1}
              className="mr-4 h-14 w-14 border border-primary-secondary-1 font-kumbh-sans text-xl font-bold"
              style={{ borderRadius: "3px" }}
            />
            <InputOTPSlot
              index={2}
              className="mr-4 h-14 w-14 border border-primary-secondary-1 font-kumbh-sans text-xl font-bold"
              style={{ borderRadius: "3px" }}
            />
            <InputOTPSlot
              index={3}
              className="mr-4 h-14 w-14 border border-primary-secondary-1 font-kumbh-sans text-xl font-bold"
              style={{ borderRadius: "3px" }}
            />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {!isLoading ? (
        <Button
          disabled={otp?.length < 4}
          className="h-[45px] w-full rounded-md bg-primary-secondary-1 font-kumbh-sans text-primary-white"
          onClick={handleVerifyOtp}
        >
          Submit
        </Button>
      ) : (
        <Button
          disabled={true}
          className="h-[45px] w-full rounded-md bg-primary-secondary-1 font-kumbh-sans text-primary-white"
        >
          <LoadingButton>Please wait ...</LoadingButton>
        </Button>
      )}
    </form>
  );
}
