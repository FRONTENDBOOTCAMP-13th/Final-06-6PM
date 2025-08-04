// app/mypage/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import ProfileItem from "@/components/mypage/profileItem";
import BookmarkItem from "@/components/mypage/bookmarkItem";
import Link from "next/link";
import SelectMypage from "@/components/mypage/selectMypage";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";

export default function MypagePage() {
  const { isLoggedIn, token } = useUserStore();
  const router = useRouter();

  // 카운트 상태
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // 카운트 조회 함수
  const fetchCounts = async () => {
    if (!token) return;

    try {
      // 리뷰 3개 전부 호출
      const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all([
        getReviewAllList(token),
        getReviewDailyList(token),
        getReviewPlaceList(token),
      ]);

      const reviewAllData = reviewAllRes?.ok === 1 ? reviewAllRes.item || [] : [];
      const reviewDailyData = reviewDailyRes?.ok === 1 ? reviewDailyRes.item || [] : [];
      const reviewPlaceData = reviewPlaceRes?.ok === 1 ? reviewPlaceRes.item || [] : [];

      const allData = [...reviewAllData, ...reviewDailyData, ...reviewPlaceData];
      // 북마크된 리뷰 개수 계산
      const bookmarkedCount = allData.filter(
        (review) => review.myBookmarkId !== undefined && review.myBookmarkId !== null,
      ).length;

      setBookmarkCount(bookmarkedCount);
    } catch (error) {
      console.error("조회 에러", error);
    }
  };
  useEffect(() => {
    // 비로그인 상태이고 현재 경로가 /mypage일 때만 이동
    if (!isLoggedIn && window.location.pathname === "/mypage") {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    // 카운트 조회 함수
    if (isLoggedIn && token) {
      fetchCounts();
    }
  }, [isLoggedIn, token]);

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
            <BookmarkItem type="bookmark" count={bookmarkCount} />
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
