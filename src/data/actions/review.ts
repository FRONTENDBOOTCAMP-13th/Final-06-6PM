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
  let reviewId = 0;

  try {
    // FormData에서 데이터 추출
    const token = formData.get("token") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const plan_id = parseInt(formData.get("plan_id") as string);
    const starRate = parseInt(formData.get("starRate") as string);
    const place = formData.get("place") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");

    // 이미지 경로들 수집
    const imagePaths: string[] = [];
    let imgIdx = 0;
    while (true) {
      const imagePath = formData.get(`imagePath_${imgIdx}`) as string;
      if (!imagePath) break;
      imagePaths.push(imagePath);
      imgIdx++;
    }

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
        plan_id: plan_id,
        startDate: startDate,
        endDate: endDate,
        images: imagePaths,
        starRate: starRate,
        place: place,
        tags: tags,
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
    console.log("reviewAll 생성 확인:", { status: res.status, data });

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

    console.log("reviewAll 생성 성공! ID:", data.item?._id);

    reviewId = data.item?._id;

    // 관련 페이지 캐시 무효화
    revalidatePath("/review");
    revalidatePath(`/plan/${plan_id}`);
  } catch (error) {
    console.error("reviewAll  작성 오류:", error);

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

  // redirect로 페이지 이동
  redirect(`/review/success?reviewId=${reviewId}`);
}

/**
 * 사용자의 '일자별/장소별 후기(reviewDetail)'를 생성하는 Server Action 함수.
 *
 * 클라이언트로부터 전달된 FormData를 검증하고, 서버 API에 POST 요청을 보낸 뒤
 * 성공 시 관련 경로를 revalidate하고 `/review/success`로 리디렉션한다.
 *
 * @param {any} prevState - 이전 상태 (useActionState 사용 시 전달됨, 사용하지 않음)
 * @param {FormData} formData - 클라이언트에서 전송된 후기 데이터 (제목, 내용, 별점, 선택된 일자/장소 등 포함)
 * @returns {Promise<ActionResult>} - 성공 여부와 메시지 또는 에러 필드 포함
 *
 * @example
 * const result = await createReviewDetailPost(null, formData);
 * if (result.ok === 0) {
 *   // 오류 처리
 * }
 */
export async function createReviewDetailPost(prevState: any, formData: FormData): Promise<ActionResult> {
  let reviewId = 0;

  try {
    // FormData에서 데이터 추출
    const token = formData.get("token") as string;
    const reviewType = formData.get("review_type") as string;
    const plan_id = parseInt(formData.get("plan_id") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const starRate = parseInt(formData.get("starRate") as string);
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const place = formData.get("place") as string;
    const selectedDays = formData.get("selected_days") as string;
    const selectedPlace = formData.get("selected_place") as string;

    // 이미지 경로들 수집
    const imagePaths: string[] = [];
    let imgIdx = 0;
    while (true) {
      const imagePath = formData.get(`imagePath_${imgIdx}`) as string;
      if (!imagePath) break;
      imagePaths.push(imagePath);
      imgIdx++;
    }

    // 입력값 검증
    const errors: Record<string, { msg: string }> = {};

    if (!title?.trim()) {
      errors.title = { msg: "제목을 입력해주세요." };
    }

    if (!content?.trim()) {
      errors.content = { msg: "내용을 입력해주세요." };
    }

    if (!selectedDays?.trim()) {
      errors.selectedDays = { msg: "날짜를 선택해주세요." };
    }

    if (!selectedPlace?.trim()) {
      errors.selectedPlace = { msg: "장소를 선택해주세요." };
    }

    // 검증 오류가 있으면 반환
    if (Object.keys(errors).length > 0) {
      return {
        ok: 0,
        errors,
        message: "입력값을 확인해주세요.",
      };
    }

    // selectedPlace가 JSON 문자열 '[{"title":"title1","contentId":"id1"},{"title":"title2","contentId":"id2"}]'
    const locationArray = (() => {
      try {
        return JSON.parse(selectedPlace);
      } catch {
        return selectedPlace ? selectedPlace.split(",").map((title) => ({ title: title.trim() })) : [];
      }
    })();

    // API 요청 body 구성
    const body = {
      type: reviewType,
      title: title,
      content: content,
      extra: {
        plan_id: plan_id,
        starRate: starRate,
        visitDate: selectedDays,
        location: locationArray,
        place: place,
        tags: tags,
        images: imagePaths,
      },
    };

    // API 호출
    const ApiPostURL = `${API_URL}/posts?type=${reviewType}`;
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
    console.log("리뷰생성 확인:", { status: res.status, data });

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

    console.log("일자별/장소별 리뷰 생성 성공! ID:", data.item?._id);

    reviewId = data.item?._id;

    // 관련 페이지 캐시 무효화
    revalidatePath("/review");
    revalidatePath(`/plan/${plan_id}`);
  } catch (error) {
    console.error("일자별/장소별 리뷰 작성 오류:", error);

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

  redirect(`/review/success?reviewId=${reviewId}`);
}

/**
 * 사용자의 리뷰를 삭제하는 Server Action 함수.
 *
 * @param {any} prevState - 이전 상태 (useActionState 사용 시 전달됨, 사용하지 않음)
 * @param {FormData} formData - 삭제할 리뷰 정보 (리뷰 ID와 토큰 포함)
 * @returns {Promise<ActionResult>} - 성공 여부와 메시지
 */
export async function deleteReviewPost(prevState: any, formData: FormData): Promise<ActionResult> {
  try {
    const token = formData.get("token") as string;
    const reviewId = formData.get("reviewId") as string;

    if (!reviewId || !token) {
      return {
        ok: 0,
        message: "삭제할 리뷰 ID 또는 인증 정보가 없습니다.",
      };
    }

    // API URL
    const ApiDeleteURL = `${API_URL}/posts/${reviewId}`;

    const res = await fetch(ApiDeleteURL, {
      method: "DELETE",
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        ok: 0,
        message: data.message || `삭제 실패 (${res.status})`,
      };
    }

    // 관련 캐시 무효화
    revalidatePath("/review");
    revalidatePath("/feed");

    // 성공 응답 반환
    return {
      ok: 1,
      message: "리뷰가 성공적으로 삭제되었습니다.",
    };
  } catch (error) {
    console.error("리뷰 삭제 중 오류:", error);

    return {
      ok: 0,
      message: "리뷰 삭제 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

/**
 * 사용자의 리뷰를 수정하는 Server Action 함수.
 *
 * @param {any} prevState - 이전 상태 (useActionState 사용 시 전달됨, 사용하지 않음)
 * @param {FormData} formData - 수정할 리뷰 정보 (리뷰 ID와 토큰 포함)
 * @returns {Promise<ActionResult>} - 성공 여부와 메시지
 */
export async function updateReviewPost(prevState: any, formData: FormData): Promise<ActionResult> {
  try {
    const token = formData.get("token") as string;
    const reviewId = formData.get("reviewId") as string;
    const plan_id = parseInt(formData.get("plan_id") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const starRate = parseInt(formData.get("starRate") as string);
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const place = formData.get("place") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const visitDate = formData.get("selected_days") as string;
    const selectedPlace = formData.get("selected_place") as string;

    const imagePaths: string[] = [];
    let imgIdx = 0;
    while (true) {
      const imagePath = formData.get(`imagePath_${imgIdx}`) as string;
      if (!imagePath) break;
      imagePaths.push(imagePath);
      imgIdx++;
    }

    if (!reviewId || !token) {
      return {
        ok: 0,
        message: "수정할 리뷰 ID 또는 인증 정보가 없습니다.",
      };
    }

    // 입력값 검증
    const errors: Record<string, { msg: string }> = {};
    if (!title?.trim()) errors.title = { msg: "제목을 입력해주세요." };
    if (!content?.trim()) errors.content = { msg: "내용을 입력해주세요." };

    if (Object.keys(errors).length > 0) {
      return {
        ok: 0,
        errors,
        message: "입력값을 확인해주세요.",
      };
    }

    // selectedPlace가 JSON 문자열 '[{"title":"title1","contentId":"id1"},{"title":"title2","contentId":"id2"}]'
    const locationArray = (() => {
      try {
        return JSON.parse(selectedPlace);
      } catch {
        return selectedPlace ? selectedPlace.split(",").map((title) => ({ title: title.trim() })) : [];
      }
    })();

    // 기존 리뷰 데이터 불러오기
    const originalRes = await fetch(`${API_URL}/posts/${reviewId}`, {
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!originalRes.ok) {
      return {
        ok: 0,
        message: "기존 리뷰 데이터를 불러오지 못했습니다.",
      };
    }

    const originalData = await originalRes.json();
    const { type, extra } = originalData;

    const body = {
      type,
      title,
      content,
      extra: {
        ...extra,
        plan_id,
        starRate,
        tags,
        images: imagePaths,
        place,
        location: locationArray,
        startDate,
        endDate,
        visitDate,
      },
    };

    const patchRes = await fetch(`${API_URL}/posts/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await patchRes.json();
    console.log("리뷰 수정 응답:", { status: patchRes.status, data });

    if (!patchRes.ok) {
      return {
        ok: 0,
        message: data.message || `수정 실패 (${patchRes.status})`,
      };
    }

    revalidatePath("/review");
    revalidatePath(`/plan/${reviewId}`);

    return {
      ok: 1,
      message: "리뷰가 성공적으로 수정되었습니다.",
    };
  } catch (error) {
    console.error("리뷰 수정 중 오류:", error);
    return {
      ok: 0,
      message: "리뷰 수정 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
