"use client";

import useUserStore from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginStatusConfirm() {
  const router = useRouter();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const userInfo = useUserStore((state) => state.userInfo);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 로그인 체크
    if (isLoggedIn === undefined) return;

    if (!isLoggedIn || !userInfo?._id) {
      router.replace("/login");
    } else {
      setIsChecking(false);
    }
  }, [isLoggedIn, userInfo?._id]);

  if (isChecking) {
    return (
      <div className="fixed h-screen top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-100 flex items-center justify-center bg-travel-bg100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
          <p className="text-gray-600">로그인 상태 확인 중...</p>
        </div>
      </div>
    );
  }

  return null;
}
