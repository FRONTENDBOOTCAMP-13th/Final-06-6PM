import axios from "axios";

const api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function fetchWeather() {
  const url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
  const params = {
    serviceKey: api_key,
    numOfRows: 10,
    pageNo: 1,
    dataType: "JSON",
    base_date: "20250721",
    base_time: "1100",
    nx: 98,
    ny: 76,
  };
  const { data } = await axios.get(url, { params });

  console.log("[날씨 원본 응답]", data);
  console.log("[날씨 원본 응답]", data.response.body.items);
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
