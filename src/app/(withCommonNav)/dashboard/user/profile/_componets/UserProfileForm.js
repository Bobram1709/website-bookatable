"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UserDetailsForm from "./UserDetailsForm";
import PasswordChangeForm from "./PasswordChangeForm";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Loader, X } from "lucide-react";
import { useState } from "react";
import { useDeleteAccountMutation } from "@/redux/api/authApi";
import { Error_Modal, Success_model } from "@/utils/modalHook";
import { logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function UserProfileForm() {
  const [password, setPassword] = useState(null);
  const [requiredError, setRequiredError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!password) {
      setRequiredError("Password is required");
    } else {
      setRequiredError(null);

      try {
        const res = await deleteAccount({ password: password }).unwrap();

        if (res?.success) {
          Success_model({ title: res.message });

          // log out user
          dispatch(logout());
          router.refresh();
        }
      } catch (error) {
        Error_Modal({ title: error?.data?.message });
      }
    }
  };

  return (
    <>
      <UserDetailsForm />

      {/* passwords */}
      <PasswordChangeForm />

      {/* Delete account modal */}
      <div className="mt-16 grid lg:grid-cols-1">
        <AlertDialog className="relative">
          <AlertDialogTrigger>
            <Button
              variant="outline"
              className="w-full border-primary-danger bg-transparent font-kumbh-sans text-primary-danger hover:bg-primary-danger hover:text-primary-white"
              size="lg"
              type="button"
            >
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="p-10 font-kumbh-sans">
            <AlertDialogHeader>
              <AlertDialogTitle className="px-7 text-center text-3xl">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-lg">
                You won&apos;t be able to recover your previous data
                <Separator
                  orientation="horizontal"
                  className="mb-8 mt-6 w-full"
                />
                <div className="text-left">
                  <Label
                    for="passwordInput"
                    className="mb-3 block text-primary-black"
                  >
                    To confirm, type your password
                  </Label>
                  <Input
                    id="passwordInput"
                    type="password"
                    placeholder="Password"
                    className="block w-full rounded-lg border border-red-600 text-primary-black"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {requiredError && (
                    <p className="mt-1 pl-1 text-sm font-medium text-primary-danger">
                      {requiredError}
                    </p>
                  )}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 w-full">
              <AlertDialogAction
                className="ml-auto block w-full bg-red-600"
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-x-3">
                    <Loader className="animate-spin" size={20} /> Confirm
                  </div>
                ) : (
                  "Confirm"
                )}
              </AlertDialogAction>
              <AlertDialogCancel className="absolute right-0 top-0 border-none">
                <X />
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
