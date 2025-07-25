"use server";

import { ApiRes } from "@/types/api";
import { GetReviewDetailProps } from "@/types/review"; // 타입 import 경로는 프로젝트에 맞게 수정

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 여행 리뷰(전체) 게시물 생성 함수
 * @param {FormData} formData - 리뷰 정보가 담긴 폼 데이터
 * @param {string | null} accessToken - 사용자 인증 토큰
 * @returns {Promise<ApiRes<GetReviewDetailProps>>} API 응답 결과
 * @description 사용자가 작성한 리뷰 데이터로 게시물을 생성
 * 네트워크 오류 발생 시 사용자 친화적 에러 메시지를 반환
 */
export async function createReviewAllPost(
  formData: FormData,
  accessToken: string | null
): Promise<ApiRes<GetReviewDetailProps>> {
  let res: Response;
  let data: ApiRes<GetReviewDetailProps>;

  try {
    // 이미지 파일들 처리
    const imgFile: File[] = [];
    let imgIdx = 0;
    while (formData.get(`image_${imgIdx}`)) {
      const file = formData.get(`image_${imgIdx}`) as File;
      if (file) {
        imgFile.push(file);
      }
      imgIdx++;
    }

    // 텍스트 데이터 처리
    const starRate = parseInt(formData.get("starRate") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");

    // URL query에서 받은 값들
    const plan_id = parseInt(formData.get("plan_id") as string);
    const location = formData.get("place") as string;

    const body = {
      type: "reviewAll",
      plan_id,
      title,
      content,
      extra: {
        starRate,
        location,
        tags,
      },
    };

    console.log("Review post body:", body);
    console.log("Image files count:", imgFile.length);

    // 텍스트와 이미지를 함께 전송하기 위한 FormData 생성
    const reviewAllData = new FormData();
    reviewAllData.append("data", JSON.stringify(body));

    // 이미지 파일들 추가
    imgFile.forEach((file) => {
      reviewAllData.append("attach", file);
    });

    res = await fetch(`${API_URL}/posts?type=reviewAll`, {
      method: "POST",
      headers: {
        "Client-Id": CLIENT_ID,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: reviewAllData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    data = await res.json();
  } catch (error) {
    console.error("Review creation error:", error);
    return {
      ok: 0,
      message:
        error instanceof Error
          ? error.message
          : "일시적인 네트워크 문제가 발생했습니다.",
    };
  }

  return data;
}
