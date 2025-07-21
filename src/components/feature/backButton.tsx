"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const goBackPage = () => {
    router.back();
  };

  return (
    <button className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={goBackPage}>
      <ChevronLeft />
    </button>
  );
}