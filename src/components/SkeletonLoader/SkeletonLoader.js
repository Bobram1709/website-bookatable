import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function SkeletonLoader() {
  const [randomLength, setRandomLength] = useState(3);

  useEffect(() => {
    setRandomLength(Math.floor(Math.random() * 5) + 2);
  }, []);

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: randomLength }).map((_, idx) => (
        <div
          className="flex w-full flex-col rounded-2xl border p-4 shadow"
          key={idx}
        >
          <Skeleton className="mb-5 block h-[230px] w-full rounded-2xl" />

          <div className="space-y-4">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[270px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>

          <Skeleton className="mt-10 h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
