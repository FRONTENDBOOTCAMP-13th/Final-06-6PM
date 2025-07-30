"use server";
import { revalidatePath } from "next/cache";
import { ReviewReply } from "@/types/review";
import { ApiReplyRes, ApiReplyResPromise } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 리뷰 댓글을 생성하는 함수
 * @param {ApiReplyRes<ReviewReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiReplyRes<ReviewReply>>} - 생성 결과 응답 객체
 * @description
 * 댓글을 생성하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function createReviewReply(
  state: ApiReplyRes<ReviewReply> | null,
  formData: FormData,
): ApiReplyResPromise<ReviewReply> {
  const body = {
    content: formData.get("content"),
  };
  const _id = formData.get("_id");
  const accessToken = formData.get("accessToken");
  let res: Response;
  let data: ApiReplyRes<ReviewReply>;

  try {
    res = await fetch(`${API_URL}/posts/${_id}/replies`, {
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
    return { ok: 0, message: "일시적인 네트워크 문제로 등록에 실패했습니다." };
  }

  if (data.ok) {
    revalidatePath("/feed");
    revalidatePath("/mypage");
  }

  return data;
}

/**
 * 리뷰 댓글을 삭제하는 함수
 * @param {ApiRes<ReviewReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<ReviewReply>>} - 삭제 결과 응답 객체
 */
export async function deleteReviewReply(
  state: ApiReplyRes<ReviewReply> | null,
  formData: FormData,
): ApiReplyResPromise<ReviewReply> {
  const _id = formData.get("_id");
  const replyId = formData.get("replyId");
  const accessToken = formData.get("accessToken");

  if (!_id || !replyId || !accessToken) {
    return { ok: 0, message: "필수 정보가 누락되었습니다." };
  }

  let res: Response;
  let data: ApiReplyRes<ReviewReply>;

  try {
    res = await fetch(`${API_URL}/posts/${_id}/replies/${replyId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    data = await res.json();
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    return { ok: 0, message: "일시적인 네트워크 문제로 삭제에 실패했습니다." };
  }

  if (data.ok) {
    revalidatePath("/feed");
    revalidatePath("/mypage");
  }

  return data;
}
