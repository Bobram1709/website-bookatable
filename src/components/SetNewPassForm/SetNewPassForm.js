"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useResetPassMutation } from "@/redux/api/authApi";
import { Loader } from "lucide-react";
import { Success_model } from "@/utils/modalHook";
import { useRouter } from "next/navigation";

export default function SetNewPassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();

  const [resetPass, { isLoading }] = useResetPassMutation();

  const onSubmit = async (data) => {
    try {
      const res = await resetPass(data).unwrap();
      if (res?.success) {
        // remove forgot password token
        sessionStorage.removeItem("forgotPasswordToken");

        Success_model({ title: res.message });

        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto sm:w-[65%] md:w-[55%] lg:w-[45%]"
    >
      <h3 className="mb-12 text-2xl font-bold text-primary-secondary-1">
        Set New Password
      </h3>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="newPassword"
          className="mb-2 block font-semibold text-primary-secondary-1"
        >
          Enter New Password
        </Label>
        <Input
          type="password"
          id="newPassword"
          {...register("newPassword", {
            required: true,
            pattern:
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
          })}
          className="border border-primary-secondary-1 text-primary-black"
        />
        {errors.newPassword && (
          <p className={cn("font-kumbh-sans text-red-500")}>
            {errors.newPassword.type === "required"
              ? "New password is required"
              : "Password must have 1 Uppercase letter, 1 Special Character, 1 Number and no less than 8 letters."}
          </p>
        )}
      </div>

      <div className="mt-8 grid w-full items-center gap-1.5">
        <Label
          htmlFor="confirmPassword"
          className="mb-2 block font-semibold text-primary-secondary-1"
        >
          Confirm Password
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: true,
            validate: (val) => {
              if (watch("newPassword") != val) {
                return "Your passwords do no match";
              }
            },
          })}
          className="border border-primary-secondary-1 text-primary-black"
        />
        {errors.confirmPassword && (
          <p className={cn("font-kumbh-sans text-red-500")}>
            {errors.confirmPassword.type === "validate"
              ? "Your passwords do not match"
              : "Confirm Password is required"}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-8 h-[45px] w-full rounded-md bg-primary-secondary-1 font-kumbh-sans text-primary-white"
      >
        {isLoading ? (
          <>
            <Loader size={20} className="mr-3 inline-block animate-spin" />{" "}
            Please Wait...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
