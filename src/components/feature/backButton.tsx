"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  path?: string;
  onPrev?: () => void;
}

export default function BackButton({ path, onPrev }: BackButtonProps) {
  const router = useRouter();

  const goBackPage = () => {
    if (onPrev) return onPrev();
    if (path) return router.push(path);
  };

  return (
    <button className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={goBackPage}>
      <ChevronLeft />
    </button>
  );
}