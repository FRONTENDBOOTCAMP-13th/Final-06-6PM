"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  path?: string;
}

export default function BackButton({ path }: BackButtonProps) {
  const router = useRouter();

  const goBackPage = () => {
    if (path) return router.push(path);

    // 기본 동작 브라우저 뒤로가기
    router.back();
  };

  return (
    <button
      className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
      onClick={goBackPage}
      aria-label="이전페이지로 이동"
    >
      <ChevronLeft />
    </button>
  );
}
