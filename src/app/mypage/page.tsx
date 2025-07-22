"use client";
import ProfileItem from "@/components/ui/profileItem";
import BookmarkItem from "@/components/ui/bookmarkItem";
import Link from "next/link";
import SelectMypage from "@/components/feature/selectMypage";
import useUserStore from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MypagePage() {
  const { user } = useUserStore(); //로그인 여부 확인
  const router = useRouter();

  const [checkUser, setCheckUser] = useState(true); // 로딩 중 상태

  useEffect(() => {
    // user === null 로그아웃 상태 => 로그인 페이지 이동
    if (user === null) {
      router.replace("/login");
    } else {
      // user !== null 로그인 상태
      setCheckUser(false);
    }
  }, [user, router]);

  if (checkUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-travel-primary200 border-t-transparent rounded-full animate-spin" />
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
