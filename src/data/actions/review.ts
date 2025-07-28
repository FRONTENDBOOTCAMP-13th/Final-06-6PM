"use server";

import { revalidatePath } from "next/cache";
import { ActionResult } from "next/dist/server/app-render/types";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 사용자의 '여행 전체 후기(reviewAll)'를 생성하는 Server Action 함수.
 *
 * 클라이언트로부터 전달된 FormData를 검증하고, 서버 API에 POST 요청을 보낸 뒤
 * 성공 시 관련 경로를 revalidate하고 `/review/success`로 리디렉션한다.
 *
 * @param {any} prevState - 이전 상태 (useActionState 사용 시 전달됨, 사용하지 않음)
 * @param {FormData} formData - 클라이언트에서 전송된 후기 데이터 (제목, 내용, 별점 등 포함)
 * @returns {Promise<ActionResult>} - 성공 여부와 메시지 또는 에러 필드 포함
 *
 * @example
 * const result = await createReviewAllPost(null, formData);
 * if (result.ok === 0) {
 *   // 오류 처리
 * }
 */
export async function createReviewAllPost(prevState: any, formData: FormData): Promise<ActionResult> {
  try {
    // FormData에서 데이터 추출
    const starRate = parseInt(formData.get("starRate") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const token = formData.get("token") as string;
    const planId = parseInt(formData.get("plan_id") as string);
    const place = formData.get("place") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    // 이미지 경로들 수집
    const imagePaths: string[] = [];
    let imgIdx = 0;
    while (true) {
      const imagePath = formData.get(`imagePath_${imgIdx}`) as string;
      if (!imagePath) break;
      imagePaths.push(imagePath);
      imgIdx++;
    }

    // console.log("Server Action received:", {
    //   starRate,
    //   title,
    //   content,
    //   tags,
    //   token: !!token,
    //   planId,
    //   place,
    //   images: imagePaths.length,
    // });

    // 입력값 검증
    const errors: Record<string, { msg: string }> = {};

    if (!title?.trim()) {
      errors.title = { msg: "제목을 입력해주세요." };
    }

    if (!content?.trim()) {
      errors.content = { msg: "내용을 입력해주세요." };
    }

    // 검증 오류가 있으면 반환
    if (Object.keys(errors).length > 0) {
      return {
        ok: 0,
        errors,
        message: "입력값을 확인해주세요.",
      };
    }

    // API 요청 body 구성
    const body = {
      type: "reviewAll",
      title: title,
      content: content,
      extra: {
        startDate: startDate,
        endDate: endDate,
        plan_id: planId,
        starRate: starRate,
        location: place,
        tags: tags,
        images: imagePaths,
      },
    };

    // API 호출
    const ApiPostURL = `${API_URL}/posts?type=reviewAll`;
    const res = await fetch(ApiPostURL, {
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
      console.error("API 요청 실패:", {
        status: res.status,
        statusText: res.statusText,
        data,
      });

      return {
        ok: 0,
        message: data.message || `서버 오류가 발생했습니다. (${res.status})`,
      };
    }

    console.log("리뷰 생성 성공! ID:", data.item?._id);

    // 관련 페이지 캐시 무효화
    revalidatePath("/review");
    revalidatePath(`/plan/${planId}`);

    // redirect로 페이지 이동
    redirect("/review/success");
  } catch (error) {
    console.error("리뷰 작성 오류:", error);

    // 네트워크 오류인지 URL 오류인지 구분
    if (error instanceof TypeError && error.message.includes("Invalid URL")) {
      console.error("URL 구성 오류 - 환경변수를 확인하세요!");
      return {
        ok: 0,
        message: "API 서버 연결 설정에 문제가 있습니다. 관리자에게 문의하세요.",
      };
    }

    return {
      ok: 0,
      message: "일시적인 네트워크 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
