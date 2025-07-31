"use server";

import { ApiResPromise } from "@/types/api";
import { GetReviewDetailProps } from "@/types/review";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 전체 리뷰(type=reviewAll) 목록을 조회하는 함수
 *
 * @returns {Promise<ApiRes<any>>} 전체 리뷰 리스트 응답 객체
 */
export async function getReviewAllList(token: string): ApiResPromise<GetReviewDetailProps[]> {
  try {
    const res = await fetch(`${API_URL}/posts?type=reviewAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
      // cache: "force-cache",
    });
    return res.json();
  } catch (err) {
    console.error("전체 리뷰 조회 실패:", err);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }
}

/**
 * 일별 리뷰(type=reviewDaily) 목록을 조회하는 함수
 *
 * @returns {Promise<ApiRes<any>>} 일별 리뷰 리스트 응답 객체
 */
export async function getReviewDailyList(token: string): ApiResPromise<GetReviewDetailProps[]> {
  try {
    const res = await fetch(`${API_URL}/posts?type=reviewDaily`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
      // cache: "force-cache",
    });
    return res.json();
  } catch (err) {
    console.error("일별 리뷰 조회 실패:", err);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }
}

/**
 * 장소별 리뷰(type=reviewPlace) 목록을 조회하는 함수
 *
 * @returns {Promise<ApiRes<any>>} 장소별 리뷰 리스트 응답 객체
 */
export async function getReviewPlaceList(token: string): ApiResPromise<GetReviewDetailProps[]> {
  try {
    const res = await fetch(`${API_URL}/posts?type=reviewPlace`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
      // cache: "force-cache",
    });
    return res.json();
  } catch (err) {
    console.error("장소별 리뷰 조회 실패:", err);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }
}

// 선택한 리뷰의 상세 정보(댓글 포함) 조회하는 함수
export async function getReviewDetail(id: string): ApiResPromise<GetReviewDetailProps> {
  try {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
    });
    return res.json();
  } catch (err) {
    console.error("리뷰 상세 조회 실패:", err);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }
}
