"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useUserStore from "@/zustand/userStore";
import BookmarkItem from "@/components/mypage/bookmarkItem";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";

export default function BookAndReview() {
  const { isLoggedIn, token } = useUserStore();

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
    // 카운트 조회 함수
    if (isLoggedIn && token) {
      fetchCounts();
    }
  }, [isLoggedIn, token]);
  return (
    <div className="flex flex-col w-full gap-4">
      <Link href="/mypage/bookmark">
        <BookmarkItem type="bookmark" count={bookmarkCount} />
      </Link>
      <Link href="/mypage/review">
        <BookmarkItem type="review" count={4} />
      </Link>
    </div>
  );
}
