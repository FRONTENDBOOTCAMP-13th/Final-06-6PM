import { ApiResPromise } from "@/types/api";
import { GetPlanDetailProps } from "@/types/plan";

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 사용자가 작성한 여행 계획(type=plan) 게시물 목록을 조회
 *
 * @returns {Promise<ApiRes<GetPlanDetailProps[]>>} 여행 계획 게시물 배열을 포함한 응답 객체
 */
export async function getPlanListUser(
  token: string | null
): ApiResPromise<GetPlanDetailProps[]> {
  console.log(token);

  try {
    const res = await fetch(`${API_URL}/posts/users?type=plan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    });

    return res.json();
  } catch (err) {
    console.error("사용자 여행 계획 조회 실패:", err);
    return {
      ok: 0,
      message: "사용자의 여행 계획 목록을 불러오는 데 실패했습니다.",
    };
  }
}
