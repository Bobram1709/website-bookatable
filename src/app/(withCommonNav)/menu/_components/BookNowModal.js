"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

export default function BookNowModal({ open, setOpen, restaurantId }) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogContent className="space-y-6">
        <DialogHeader className="top-0 space-y-3">
          <DialogTitle className="text-3xl text-primary-secondary-3">
            Oops!
          </DialogTitle>
          <DialogDescription className="font-kumbh-sans text-base text-primary-secondary-1">
            Seems like you have not booked a table yet. Please book a table
            first to order.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="font-kumbh-sans text-primary-secondary-2"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            className="bg-primary-secondary-3 font-kumbh-sans text-primary-white"
            asChild
          >
            <Link href={`/restaurant/${restaurantId}`}>Book Now</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
