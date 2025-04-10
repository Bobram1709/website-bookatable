"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.userId) {
      router.push(`/login`);
    }

    return () => {};
  }, [router, user?.userId]);

  if (user?.userId) {
    return children;
  }
}
