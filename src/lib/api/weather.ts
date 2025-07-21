import axios from "axios";

export async function fetchWeather() {
  const url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
  const params = {
    serviceKey:
      "67phAfy03byS4215u35OXmm%2FVG0q6%2FvncZ3rkqehm8M%2BEPVAF6E3xjHjon1lQ7YLMg3ENE6ytogzeOympE0pDQ%3D%3D",
    numOfRows: 10,
    pageNo: 1,
    dataType: "JSON",
    base_date: "20250720",
    base_time: "0500",
    nx: 98,
    ny: 76,
  };
  const { data } = await axios.get(url, { params });

  console.log("[날씨 원본 응답]", data);
  if (data.response?.header?.resultCode !== "00") {
    console.error(
      "[날씨 API 오류] resultCode:",
      data.response?.header?.resultCode,
      "resultMsg:",
      data.response?.header?.resultMsg
    );
    throw new Error(data.response?.header?.resultMsg || "API 오류");
  }
  if (!data.response?.body?.items?.item) {
    throw new Error("날씨 데이터가 없습니다.");
  }
  return data.response.body.items.item;
}
