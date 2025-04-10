"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { Error_Modal, Success_model } from "@/utils/modalHook";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../LoadingButton/LoadingButton";
import { Button } from "../ui/button";
import eyeIcon from "/public/signUp/eyeIcon.svg";
import eyeOffIcon from "/public/signUp/eyeOffIcon.svg";
import EyeIconInverse from "../EyeIconInverse/EyeIconInverse";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  // const { user } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res?.data?.accessToken) {
        const user = jwtDecode(res?.data?.accessToken)?.role === "user";

        if (user) {
          Success_model({ title: "Login Successful" });
          dispatch(
            setUser({
              user: jwtDecode(res?.data?.accessToken),
              token: res?.data?.accessToken,
            }),
          );

          router.push("/");
          router.refresh();
        } else {
          Error_Modal({ title: "You are not authorized" });
        }
      }
    } catch (error) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
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
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className="border border-primary-secondary-1 text-primary-black"
        />
        {errors.email && (
          <p className={cn("font-kumbh-sans text-red-500")}>
            Username or Email is required
          </p>
        )}
      </div>

      <div className="relative mt-6 grid w-full items-center gap-1.5">
        <div className="mb-1 flex items-center justify-between">
          <Label
            htmlFor="password"
            className="font-semibold text-primary-secondary-1"
          >
            Password
          </Label>

          <Link
            href="/forgot-password"
            className="text-primary-secondary-1 opacity-[90%]"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <Input
            type={showPass ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="border-primary-secondary-1 text-primary-black"
          />

          <EyeIconInverse
            showPassword={showPass}
            setShowPassword={setShowPass}
          />
        </div>

        {errors.password && (
          <p className={cn("font-kumbh-sans text-red-500")}>
            Password is required
          </p>
        )}
      </div>

      {!isLoading ? (
        <Button className="mt-10 h-[45px] w-full rounded-md bg-primary-secondary-1 font-kumbh-sans text-primary-white">
          SIGN IN
        </Button>
      ) : (
        <Button
          disabled={true}
          className="mt-10 h-[45px] w-full rounded-md bg-primary-secondary-1 font-kumbh-sans text-primary-white"
        >
          <LoadingButton>SIGNING IN...</LoadingButton>
        </Button>
      )}

      <div className="mt-10 flex items-center justify-center gap-4">
        <p className="font-kumbh-sans text-primary-secondary-1">New here?</p>
        {/* TODO: Add relevant Link */}
        <Link
          href="/sign-up"
          className="border-b border-b-primary-secondary-3 font-kumbh-sans text-primary-secondary-3"
        >
          Create your account
        </Link>
      </div>
    </form>
  );
}
