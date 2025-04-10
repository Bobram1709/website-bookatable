"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function OtpGetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto sm:w-[65%] md:w-[55%] lg:w-[45%]"
    >
      <h3 className="mb-12 text-2xl font-bold text-primary-secondary-1">
        Get OTP in your email
      </h3>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="email"
          className="mb-2 block font-semibold text-primary-secondary-1"
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
          <p className={cn("font-kumbh-sans text-primary-secondary-1")}>
            Email is required
          </p>
        )}
      </div>

      <Button className="mt-8 h-[45px] w-full rounded-md bg-primary-secondary-1 font-kumbh-sans text-primary-white">
        Submit
      </Button>
    </form>
  );
}
