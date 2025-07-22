// app/mypage/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import ProfileItem from "@/components/ui/profileItem";
import BookmarkItem from "@/components/ui/bookmarkItem";
import Link from "next/link";
import SelectMypage from "@/components/feature/selectMypage";

export default function MypagePage() {
  const { user } = useUserStore();
  const router = useRouter();
  const [userCheck, setUserCheck] = useState(true); // 로딩 상태

  useEffect(() => {
    // 로그인 상태 최종 확인
    if (user === null) {
      router.replace("/login");
    } else {
      setUserCheck(false); // 로그인되어 있으면 로딩 종료
    }
  }, [user, router]);

  if (userCheck) {
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
          <ProfileItem userName="여행덕후" />
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
