import { Loader } from "lucide-react";

export default function LoadingButton({ children }) {
  return (
    <p className="flex items-center justify-center gap-x-3 bg-transparent">
      <Loader className="animate-spin" size={20} /> {children}
    </p>
  );
}
