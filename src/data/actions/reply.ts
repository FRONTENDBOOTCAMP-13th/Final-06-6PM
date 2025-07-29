"use server";

import { revalidatePath } from "next/cache";
import { ReviewReply } from "@/types/review";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

interface ApiRes<T> {
  ok: number;
  message?: string;
  item?: T;
  errors?: any;
}

type ApiResPromise<T> = Promise<ApiRes<T>>;

/**
 * 리뷰 댓글을 생성하는 함수
 * @param {ApiRes<ReviewReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<ReviewReply>>} - 생성 결과 응답 객체
 * @description
 * 댓글을 생성하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function createReviewReply(
  state: ApiRes<ReviewReply> | null,
  formData: FormData,
): ApiResPromise<ReviewReply> {
  const body = {
    content: formData.get("content"),
  };

  const _id = formData.get("_id");
  const accessToken = formData.get("accessToken");

  let res: Response;
  let data: ApiRes<ReviewReply>;

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
