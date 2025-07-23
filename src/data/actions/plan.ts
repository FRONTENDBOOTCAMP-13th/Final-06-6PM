"use server";

import { ApiRes, ApiResPromise } from "@/types/api";
import { GetPlanDetailProps } from "@/types/plan";


const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 여행 계획 게시물 생성 함수
 * @param {FormData} formData - 여행 정보가 담긴 폼 데이터
 * @returns {Promise<ApiRes<GetPlanDetailProps>>} API 응답 결과
 * @description 사용자가 선택한 여행 지역과 날짜로 게시물을 생성
 * 네트워크 오류 발생 시 사용자 친화적 에러 메시지를 반환
 */
export async function createPlanPost(

  formData: FormData
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
      content: `${startDate} ~ ${endDate}`,
    };

    console.log(`travel post body`, body);

    res = await fetch(`${API_URL}/posts?type=plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
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
