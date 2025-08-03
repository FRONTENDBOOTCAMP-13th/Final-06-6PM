// app/mypage/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import ProfileItem from "@/components/mypage/profileItem";
import BookmarkItem from "@/components/mypage/bookmarkItem";
import Link from "next/link";
import SelectMypage from "@/components/mypage/selectMypage";

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
      <div className="flex items-center justify-center w-full h-screen pb-40">
        <div className="w-20 h-20 border-4 rounded-full border-travel-primary200 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <ProfileItem />
        <div className="flex flex-col w-full gap-4">
          <Link href="/mypage/bookmark">
            <BookmarkItem type="bookmark" count={2} />
          </Link>
          <Link href="/mypage/review">
            <BookmarkItem type="review" count={4} />
          </Link>
        </div>
        <div className="w-full overflow-hidden bg-white shadow-xl rounded-2xl ">
          <SelectMypage />
        </div>
      </div>
    </>
  );
}
