"use server";

import { revalidatePath } from "next/cache";
import { ActionResult } from "next/dist/server/app-render/types";
import { redirect } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

export async function createReviewAllPost(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    // 🔥 디버그 로그 - API URL 확인
    console.log("API_URL:", API_URL);
    console.log("CLIENT_ID:", CLIENT_ID);

    // FormData에서 데이터 추출
    const starRate = parseInt(formData.get("starRate") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const token = formData.get("token") as string;
    const planId = formData.get("plan_id") as string;
    const place = formData.get("place") as string;

    // 이미지 경로들 수집
    const imagePaths: string[] = [];
    let imgIdx = 0;
    while (true) {
      const imagePath = formData.get(`imagePath_${imgIdx}`) as string;
      if (!imagePath) break;
      imagePaths.push(imagePath);
      imgIdx++;
    }

    console.log("Server Action received:", {
      starRate,
      title,
      content,
      tags,
      token: !!token,
      planId,
      place,
      images: imagePaths.length,
    });

    // 입력값 검증
    const errors: Record<string, { msg: string }> = {};

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

    // 요청 본문 구성
    const body = {
      type: "reviewAll",
      title: title,
      content: content,
      extra: {
        plan_id: planId,
        starRate: starRate,
        location: place,
        tags: tags,
        images: imagePaths,
      },
    };

    console.log("Request body:", JSON.stringify(body, null, 2));

    // 최종 URL 구성 및 로그
    const fullUrl = `${API_URL}/posts?type=reviewAll`;
    console.log("Full API URL:", fullUrl);

    // API 호출
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("API Response:", { status: res.status, data });

    if (!res.ok) {
      console.error("❌ API 요청 실패:", {
        status: res.status,
        statusText: res.statusText,
        data,
      });

      return {
        ok: 0,
        message: data.message || `서버 오류가 발생했습니다. (${res.status})`,
      };
    }

    console.log("✅ 리뷰 생성 성공! ID:", data.item?._id);

    // 성공 시 관련 페이지 재검증
    revalidatePath("/review");
    revalidatePath(`/plan/${planId}`);

    // redirect로 페이지 이동
    redirect("/review/success");
  } catch (error) {
    console.error("리뷰 작성 오류:", error);

    // 네트워크 오류인지 URL 오류인지 구분
    if (error instanceof TypeError && error.message.includes("Invalid URL")) {
      console.error("❌ URL 구성 오류 - 환경변수를 확인하세요!");
      return {
        ok: 0,
        message: "API 서버 연결 설정에 문제가 있습니다. 관리자에게 문의하세요.",
      };
    }

    return {
      ok: 0,
      message:
        "일시적인 네트워크 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
