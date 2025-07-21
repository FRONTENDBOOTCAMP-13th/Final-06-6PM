import { PlanResponse, PlanItem } from "../types/plan";

const api_url =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const client_id = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

export const fetchPlanDetail = async (): Promise<PlanItem | null> => {
  try {
    const response = await fetch(`${api_url}/posts/2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "client-id": client_id,
      },
    });

    const data: PlanResponse = await response.json();
    console.log("data", data);
    if (data.ok) {
      console.log("일정 데이터:", data.item);
      return data.item;
    }
    return null;
  } catch (error) {
    console.error("일정 조회 실패:", error);
    return null;
  }
};
