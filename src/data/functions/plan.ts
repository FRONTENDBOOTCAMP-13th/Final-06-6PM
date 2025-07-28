"use server";

import { ApiResPromise } from "@/types/api";
import { GetPlanDetailProps } from "@/types/plan";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 여행 계획 상세 정보를 조회하는 함수
 *
 * @param {number} _id - 조회할 일정의 고유 ID
 * @returns {Promise<ApiRes<Post>>} 게시글 상세 정보를 담은 응답 객체
 */
export async function getPlanDetail(_id: number): ApiResPromise<GetPlanDetailProps> {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
      cache: "force-cache",
    });

    return res.json();
  } catch (err) {
    console.error("일정 조회 실패:", err);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }
}

/**
 * 여행 계획(type=plan) 전체 목록을 조회하는 함수
 *
 * @returns {Promise<ApiRes<Post>>} 여행 계획 리스트 응답 객체
 */
export async function getPlanList(): ApiResPromise<GetPlanDetailProps[]> {
  try {
    const res = await fetch(`${API_URL}/posts/?type=plan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
      cache: "force-cache",
    });

    return res.json();
  } catch (err) {
    console.error("일정 조회 실패:", err);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }
}
