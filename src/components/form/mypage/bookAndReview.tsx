"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import useUserStore from "@/zustand/userStore";
import BookmarkItem from "@/components/mypage/bookmarkItem";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";
import { getReviewAllUser, getReviewDailyUser, getReviewPlaceUser } from "@/lib/api/review";
import { getUser } from "@/data/functions/user";

interface ReviewItem {
  myBookmarkId?: number | null;
}

interface ReviewResponse {
  ok: number;
  item?: ReviewItem[];
}

export default function BookAndReview() {
  const { token, userInfo } = useUserStore();

  // 데이터 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 나의 북마크/리뷰
  const [counts, setCounts] = useState({
    bookmarkPlace: 0,
    bookmarkReview: 0,
    review: 0,
  });

  // 북마크 장소 데이터 함수
  const fetchBookmarkPlace = useCallback(async () => {
    if (!userInfo?._id || !token) return 0;

    try {
      const res = await getUser(userInfo._id);
      if (res?.ok === 1 && res.item?.extra?.bookmarkPlace) {
        return res.item.extra.bookmarkPlace.length;
      }
      return 0;
    } catch (error) {
      console.error("북마크 장소 조회 에러:", error);
      return 0;
    }
  }, [userInfo?._id, token]);

  // 리뷰 데이터 가져오는 공통 함수
  const fetchReviewData = useCallback(async (reviewFunctions: (() => Promise<ReviewResponse>)[]) => {
    try {
      const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all(
        reviewFunctions.map((reviewFn) => reviewFn()),
      );

      // 응답 데이터 파싱
      const reviewAllData = reviewAllRes?.ok === 1 ? reviewAllRes.item || [] : [];
      const reviewDailyData = reviewDailyRes?.ok === 1 ? reviewDailyRes.item || [] : [];
      const reviewPlaceData = reviewPlaceRes?.ok === 1 ? reviewPlaceRes.item || [] : [];

      return {
        allData: [...reviewAllData, ...reviewDailyData, ...reviewPlaceData],
        totalCount: reviewAllData.length + reviewDailyData.length + reviewPlaceData.length,
      };
    } catch (error) {
      console.error("리뷰 데이터 조회 에러:", error);
      return { allData: [], totalCount: 0 };
    }
  }, []);

  // 모든 카운트 데이터 조회
  const fetchAllCounts = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);

    try {
      // 병렬로 모든 데이터 가져오기
      const [bookmarkPlaceCount, bookmarkReviewData, reviewData] = await Promise.all([
        // 북마크 장소 개수
        fetchBookmarkPlace(),
        // 북마크된 리뷰 데이터 (전체 리뷰에서 북마크된 것들)
        fetchReviewData([
          () => getReviewAllList(token),
          () => getReviewDailyList(token),
          () => getReviewPlaceList(token),
        ]),
        // 내 리뷰 데이터
        fetchReviewData([
          () => getReviewAllUser(token),
          () => getReviewDailyUser(token),
          () => getReviewPlaceUser(token),
        ]),
      ]);

      // 북마크된 리뷰 개수 계산
      const bookmarkReviewCount = bookmarkReviewData.allData.filter(
        (review) => review.myBookmarkId !== undefined && review.myBookmarkId !== null,
      ).length;

      setCounts({
        bookmarkPlace: bookmarkPlaceCount,
        bookmarkReview: bookmarkReviewCount,
        review: reviewData.totalCount,
      });
    } catch (error) {
      console.error("카운트 조회 에러:", error);
      setCounts({
        bookmarkPlace: 0,
        bookmarkReview: 0,
        review: 0,
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchReviewData, fetchBookmarkPlace]);

  useEffect(() => {
    if (token && userInfo?._id) {
      fetchAllCounts();
    } else {
      setCounts({
        bookmarkPlace: 0,
        bookmarkReview: 0,
        review: 0,
      });
    }
  }, [token, userInfo?._id, fetchAllCounts]);

  return (
    <div className="flex flex-col w-full gap-4">
      <Link href="/mypage/bookmark">
        <BookmarkItem type="bookmarkPlace" count={counts.bookmarkPlace} isLoading={isLoading} />
      </Link>
      <Link href="/mypage/bookmarkPost">
        <BookmarkItem type="bookmarkPost" count={counts.bookmarkReview} isLoading={isLoading} />
      </Link>
      <Link href="/mypage/review">
        <BookmarkItem type="review" count={counts.review} isLoading={isLoading} />
      </Link>
    </div>
  );
}
