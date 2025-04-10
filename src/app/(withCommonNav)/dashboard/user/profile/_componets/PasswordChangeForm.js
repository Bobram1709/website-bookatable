import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useResetPassMutation } from "@/redux/api/authApi";
import { useChangePasswordMutation } from "@/redux/api/userApi";
import { Error_Modal, Success_model } from "@/utils/modalHook";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function PasswordChangeForm() {
  // const [resetPass, { isLoading }] = useResetPassMutation();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onPasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      Error_Modal("Password do not match!");
      return;
    }

    const passwords = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    try {
      const res = await changePassword(passwords).unwrap();

      if (res?.success) {
        Success_model({ title: "New password has been set successfully" });
        reset();
      }
    } catch (error) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onPasswordSubmit)}>
      <div className="flex flex-col items-center gap-y-8 lg:flex-row lg:gap-x-6 lg:gap-y-0">
        <div className="grid w-full items-center gap-1.5 font-kumbh-sans lg:w-[50%]">
          <Label htmlFor="oldPassword" className="mb-1">
            Old Password*
          </Label>
          <Input
            type="password"
            id="oldPassword"
            placeholder="Old password"
            {...register("oldPassword", { required: true })}
            className="border border-primary-secondary-3 bg-primary-white-light text-primary-black"
          />
        </div>

        <div className="grid w-full items-center gap-1.5 font-kumbh-sans lg:w-[50%]">
          <Label htmlFor="newPassword" className="mb-1">
            A New Password*
          </Label>
          <Input
            type="password"
            id="newPassword"
            placeholder="New password"
            {...register("newPassword", {
              required: true,
              pattern:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
            })}
            className="border border-primary-secondary-3 bg-primary-white-light text-primary-black"
          />
          {errors.newPassword && (
            <p className={cn("font-kumbh-sans text-primary-danger")}>
              {errors.newPassword.type === "pattern"
                ? "Password must have 1 Uppercase letter, 1 Special Character, 1 Number and no less than 8 letters."
                : "New Password is required"}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5 font-kumbh-sans lg:w-[50%]">
          <Label htmlFor="confirmPassword" className="mb-1">
            Confirm Password*
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: true,
              pattern:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
            })}
            className="border border-primary-secondary-3 bg-primary-white-light text-primary-black"
          />
          {errors.confirmPassword && (
            <p className={cn("font-kumbh-sans text-primary-danger")}>
              {errors.confirmPassword.type === "pattern"
                ? "Password must have 1 Uppercase letter, 1 Special Character, 1 Number and no less than 8 letters."
                : "New Password is required"}
            </p>
          )}
        </div>
      </div>

      <Button
        className="mt-8 block w-full bg-primary-secondary-3 font-kumbh-sans text-primary-white lg:w-1/2"
        size="lg"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-x-3">
            <Loader size={20} className="animate-spin" /> Saving Changes...
          </span>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}
