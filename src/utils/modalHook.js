"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import Swal from "sweetalert2";

export const Success_model = (message) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message.title || "Successfully!!!",
    text: message.text || "",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const Error_Modal = (message) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: message?.title || "Failed!!!",
    text: message?.text || "",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const LoginPrompt_Modal = ({ loginModalOpen, setLoginModalOpen }) => {
  return (
    <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
      <DialogContent className="space-y-6">
        <DialogHeader className="top-0 space-y-3">
          <DialogTitle className="text-3xl text-primary-secondary-3">
            Oops!
          </DialogTitle>
          <DialogDescription className="font-kumbh-sans text-base text-primary-secondary-1">
            Seems like you are not logged in yet. Please login to go ahead.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="font-kumbh-sans text-primary-secondary-2"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            className="bg-primary-secondary-3 font-kumbh-sans text-primary-white"
            asChild
          >
            <Link href={`/login`}>Sign In</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
