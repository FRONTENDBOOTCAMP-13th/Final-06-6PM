"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  path?: string;
}

export default function BackButton({ path }: BackButtonProps) {
  const router = useRouter();

  const goBackPage = () => {
    if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  return (
    <button className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={goBackPage}>
      <ChevronLeft />
    </button>
  );
}