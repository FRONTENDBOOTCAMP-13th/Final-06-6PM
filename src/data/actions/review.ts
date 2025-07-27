// @/data/actions/review.ts
"use server";

import { revalidatePath } from "next/cache";

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

// 간단한 에러 타입 정의
interface SimpleError {
  msg: string;
}

interface ActionResult {
  ok: 0 | 1;
  message?: string;
  data?: any;
  errors?: Record<string, SimpleError>;
}
/**
 * 여행 리뷰(전체) 게시물 생성 Server Action
 * @param {any} prevState - 이전 상태 (useActionState에서 사용)
 * @param {FormData} formData - 리뷰 정보가 담긴 폼 데이터
 * @returns {Promise<ActionResult>} API 응답 결과
 */
export async function createReviewAllPost(
  formData: FormData
): Promise<ActionResult> {
  try {
    // FormData에서 데이터 추출
    const starRate = parseInt(formData.get("starRate") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const token = formData.get("token") as string;
    const planId = formData.get("plan_id") as string;
    const place = formData.get("place") as string;

    // 입력값 검증
    const errors: Record<string, SimpleError> = {};

    if (!title?.trim()) {
      errors.title = { msg: "제목을 입력해주세요." };
    }

    if (!content?.trim()) {
      errors.content = { msg: "내용을 입력해주세요." };
    }

    if (isNaN(starRate) || starRate < 1 || starRate > 5) {
      errors.starRate = { msg: "별점을 올바르게 선택해주세요." };
    }

    if (!token) {
      errors.token = { msg: "인증이 필요합니다." };
    }

    if (!planId) {
      errors.planId = { msg: "여행 계획 정보가 필요합니다." };
    }

    if (!place) {
      errors.place = { msg: "장소 정보가 필요합니다." };
    }

    // 검증 오류가 있으면 반환
    if (Object.keys(errors).length > 0) {
      return {
        ok: 0,
        errors,
        message: "입력값을 확인해주세요.",
      };
    }

    // 이미지 파일들 처리
    const imgFile: File[] = [];
    let imgIdx = 0;

    while (true) {
      const file = formData.get(`image_${imgIdx}`) as File;
      if (!file || file.size === 0) break;
      imgFile.push(file);
      imgIdx++;
    }

    // API 요청 body 구성
    const body = {
      type: "reviewAll",
      plan_id: planId,
      title,
      content,
      extra: {
        starRate,
        location: place,
        tags,
      },
    };

    // 텍스트와 이미지를 함께 전송하기 위한 FormData 생성
    const reviewAllData = new FormData();
    reviewAllData.append("data", JSON.stringify(body));

    // 이미지 파일들 추가
    imgFile.forEach((file) => {
      reviewAllData.append("attach", file);
    });

    // API 호출
    const res = await fetch(`${API_URL}/posts?type=reviewAll`, {
      method: "POST",
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: reviewAllData,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: 0,
        message: data.message || "리뷰 작성에 실패했습니다.",
      };
    }

    // 성공 시 관련 페이지 재검증
    revalidatePath("/review");
    revalidatePath(`/plan/${planId}`);

    return {
      ok: 1,
      data,
      message: "리뷰가 성공적으로 작성되었습니다.",
    };
  } catch (error) {
    console.error("리뷰 작성 오류:", error);
    return {
      ok: 0,
      message: "일시적인 네트워크 문제가 발생했습니다.",
    };
  }
}
