"use client";

import useUserStore from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginStatusConfirm() {
  const router = useRouter();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const userInfo = useUserStore((state) => state.userInfo);

  // 로그인 체크
  useEffect(() => {
    if (!isLoggedIn || !userInfo?._id) {
      router.replace("/login");
      return;
    }
  }, [isLoggedIn, userInfo?._id]);

  return <p className="sr-only">로그인 상태 확인</p>;
}
