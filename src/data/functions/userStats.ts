"use server";

import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "./review";
import { GetReviewDetailProps } from "@/types/review";

export interface UserStats {
  postsCount: number;
  totalBookmarks: number;
  totalViews: number;
}

/**
 * 기존 리뷰 API들을 활용해서 특정 회원 정보의 통계를 계산하는 함수
 * @param userId - 회원 ID
 * @param token - 인증 토큰
 * @returns 회원 정보 통계 응답 객체
 */
export async function getUserStats(
  userId: number,
  token: string,
): Promise<{ ok: number; item?: UserStats; message?: string }> {
  try {
    // 모든 리뷰 데이터를 가져와 합치기
    const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all([
      getReviewAllList(token),
      getReviewDailyList(token),
      getReviewPlaceList(token),
    ]);

    const allReviews: GetReviewDetailProps[] = [
      ...(reviewAllRes?.ok === 1 ? reviewAllRes.item || [] : []),
      ...(reviewDailyRes?.ok === 1 ? reviewDailyRes.item || [] : []),
      ...(reviewPlaceRes?.ok === 1 ? reviewPlaceRes.item || [] : []),
    ];

    // 특정 회원 정보의 리뷰만 필터링하기
    const userReviews = allReviews.filter((review) => review.user._id === userId);

    // 통계 계산하기
    const stats: UserStats = {
      postsCount: userReviews.length,
      totalBookmarks: userReviews.reduce((sum, review) => sum + (review.bookmarks || 0), 0),
      totalViews: userReviews.reduce((sum, review) => sum + (review.views || 0), 0),
    };

    return { ok: 1, item: stats };
  } catch (error) {
    console.error("회원 정보 통계 계산 오류:", error);
    return {
      ok: 0,
      message: "회원 정보 통계를 계산하는데 실패했습니다.",
    };
  }
}
