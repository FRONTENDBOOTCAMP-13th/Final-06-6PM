// data/functions/fetchKto.ts

const API_SERVER = "http://apis.data.go.kr/B551011/KorService2";

export async function fetchTravel(
  endpoint: string,
  params: Record<string, string>
) {
  const baseURL = API_SERVER;
  const queryString = new URLSearchParams(params).toString();
  const url = `${baseURL}${endpoint}?${queryString}`;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "force-cache",
    });

    return res.json();
  } catch (err) {
    console.error("일정 조회 실패:", err);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }
}
