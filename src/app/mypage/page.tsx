// app/mypage/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import ProfileItem from "@/components/ui/profileItem";
import BookmarkItem from "@/components/ui/bookmarkItem";
import Link from "next/link";
import SelectMypage from "@/components/feature/selectMypage";

export default function MypagePage() {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // 비로그인 상태이고 현재 경로가 /mypage일 때만 이동
    if (!isLoggedIn && window.location.pathname === "/mypage") {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="h-screen flex justify-center items-center w-full pb-40">
        <div className="w-20 h-20 border-4 border-travel-primary200 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <div className="w-full">
          <ProfileItem />
        </div>
        <div className="w-full flex flex-col gap-5">
          <Link href="/mypage/bookmark">
            <BookmarkItem type="bookmark" count={2} />
          </Link>
          <Link href="/mypage/review">
            <BookmarkItem type="review" count={4} />
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden mt-5">
        <SelectMypage />
      </div>
    </>
  );
}
