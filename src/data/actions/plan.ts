"use server";

import { ApiRes, ApiResPromise } from "@/types/api";
import { GetPlanDetailProps, PlanReply } from "@/types/plan";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 여행 계획 게시물 생성 함수
 * @param {FormData} formData - 여행 정보가 담긴 폼 데이터
 * @returns {Promise<ApiRes<GetPlanDetailProps>>} API 응답 결과
 * @description 사용자가 선택한 여행 지역과 날짜로 게시물을 생성
 * 네트워크 오류 발생 시 사용자 친화적 에러 메시지를 반환
 */

export async function createPlanPost(
  formData: FormData,
  accessToken: string | null,
): Promise<ApiRes<GetPlanDetailProps>> {
  let res: Response;
  let data: ApiRes<GetPlanDetailProps>;

  try {
    const selectedRegion = formData.get("selectedRegion") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    const body = {
      type: "plan",
      title: `${selectedRegion}`,
      content: `여행 일정: ${startDate} ~ ${endDate}`,
      extra: {
        startDate,
        endDate,
      },
    };

    console.log(`travel post body`, body);

    res = await fetch(`${API_URL}/posts?type=plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }

  return data;
}

/**
 * 여행 계획 댓글(일차별 일정) 등록 함수
 * @param {ApiRes<PostReply> | null} state - 이전 상태 (Server Action용)
 * @param {FormData} formData - 댓글 정보가 담긴 폼 데이터
 * @returns {Promise<ApiRes<PostReply>>} API 응답 결과
 * @description 여행 계획 게시물에 일차별 일정을 댓글로 등록
 * 작성자만 자신의 게시물에 댓글을 달 수 있음
 */
export async function createReply(state: ApiRes<PlanReply> | null, formData: FormData): Promise<ApiRes<PlanReply>> {
  let res: Response;
  let data: ApiRes<PlanReply>;

  try {
    const content = formData.get("content") as string;
    const postId = formData.get("postId") as string;
    const accessToken = formData.get("accessToken") as string;
    const day = formData.get("day") as string;
    const planDate = formData.get("planDate") as string;
    const locations = formData.get("locations") as string;

    const body = {
      content: content,
      day: day ? parseInt(day) : undefined,
      planDate: planDate || undefined,
      locations: locations ? JSON.parse(locations) : undefined,
    };

    console.log(`reply body`, body);

    res = await fetch(`${API_URL}/posts/${postId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }

  return data;
}

/**
 * 여행 계획 댓글(일차별 일정) 수정 함수
 * @param {ApiRes<PlanReply> | null} state - 이전 상태 (Server Action용)
 * @param {FormData} formData - 수정할 댓글 정보가 담긴 폼 데이터
 * @returns {Promise<ApiRes<PlanReply>>} API 응답 결과
 * @description 여행 계획 게시물의 특정 일차별 일정을 수정
 * 작성자만 자신의 댓글을 수정할 수 있음
 */
export async function updateReply(state: ApiRes<PlanReply> | null, formData: FormData): Promise<ApiRes<PlanReply>> {
  let res: Response;
  let data: ApiRes<PlanReply>;

  try {
    const content = formData.get("content") as string;
    const postId = formData.get("postId") as string;
    const replyId = formData.get("replyId") as string; // ← 댓글 ID 추가
    const accessToken = formData.get("accessToken") as string;
    const day = formData.get("day") as string;
    const planDate = formData.get("planDate") as string;
    const locations = formData.get("locations") as string;

    const body = {
      content: content,
      day: day ? parseInt(day) : undefined,
      planDate: planDate || undefined,
      locations: locations ? JSON.parse(locations) : undefined,
    };

    console.log(`update reply body:`, body);
    console.log(`postId: ${postId}, replyId: ${replyId}`);

    res = await fetch(`${API_URL}/posts/${postId}/replies/${replyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error("일차별 일정 수정 중 에러:", error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }

  return data;
}
