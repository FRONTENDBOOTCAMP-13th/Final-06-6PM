import { ApiResPromise } from "@/types/api";
import { GetReviewDetailProps } from "@/types/review";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 사용자가 작성한 리뷰(type=reviewAll) 게시물 목록을 조회
 *
 * @returns {Promise<ApiRes<GetReviewDetailProps[]>>} 여행 계획 게시물 배열을 포함한 응답 객체
 */
export async function getReviewAllUser(token: string | null): ApiResPromise<GetReviewDetailProps[]> {
  // console.log(token);
  try {
    const res = await fetch(`${API_URL}/posts/users?type=reviewAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.error("사용자 여행 전체리뷰 조회 실패:", err);
    return {
      ok: 0,
      message: "사용자의 여행 전체리뷰 목록을 불러오는 데 실패했습니다.",
    };
  }
}

/**
 * 사용자가 작성한 리뷰(type=reviewDaily) 게시물 목록을 조회
 *
 * @returns {Promise<ApiRes<GetReviewDetailProps[]>>} 여행 계획 게시물 배열을 포함한 응답 객체
 */
export async function getReviewDailyUser(token: string | null): ApiResPromise<GetReviewDetailProps[]> {
  // console.log(token);
  try {
    const res = await fetch(`${API_URL}/posts/users?type=reviewDaily`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.error("사용자 여행 일별리뷰 조회 실패:", err);
    return {
      ok: 0,
      message: "사용자의 여행 일별리뷰 목록을 불러오는 데 실패했습니다.",
    };
  }
}

/**
 * 사용자가 작성한 리뷰(type=reviewPlace) 게시물 목록을 조회
 *
 * @returns {Promise<ApiRes<GetReviewDetailProps[]>>} 여행 계획 게시물 배열을 포함한 응답 객체
 */
export async function getReviewPlaceUser(token: string | null): ApiResPromise<GetReviewDetailProps[]> {
  // console.log(token);
  try {
    const res = await fetch(`${API_URL}/posts/users?type=reviewPlace`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.error("사용자 여행 장소별 리뷰 조회 실패:", err);
    return {
      ok: 0,
      message: "사용자의 여행 장소별 리뷰 목록을 불러오는 데 실패했습니다.",
    };
  }
}
