"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForgotPassMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [forgotPass, { isLoading }] = useForgotPassMutation();

  const onSubmit = async (data) => {
    try {
      const res = await forgotPass(data).unwrap();

      if (res?.success) {
        toast.success(res.message);

        // set sign up token to session-storage
        sessionStorage.setItem("forgotPasswordToken", res?.data?.token);

        router.push("/verify-otp");
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
      <div className="mb-10 space-y-2">
        <h3 className="text-2xl font-bold text-primary-secondary-1">
          Forgot Password ?
        </h3>
        <p className="font-kumbh-sans text-muted-foreground">
          Enter your details below to request an OTP for account password reset.
        </p>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="email"
          className="mb-1 block font-semibold text-primary-secondary-1"
        >
          Email
        </Label>
        <Input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="border border-primary-secondary-1 text-primary-black"
        />
        {errors.email && (
          <p className={cn("font-kumbh-sans text-red-500")}>
            Email is required
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-8 h-[45px] w-full rounded-md bg-primary-secondary-1 font-kumbh-sans text-primary-white"
      >
        Submit
      </Button>
    </form>
  );
}
