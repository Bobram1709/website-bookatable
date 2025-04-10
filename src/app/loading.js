import { Loader } from "lucide-react";

export default function loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="h-[30px] w-[30px] animate-spin" color="#8bb951" />
    </div>
  );
}
