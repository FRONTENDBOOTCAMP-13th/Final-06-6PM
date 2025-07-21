import { WeatherItem } from "@/types/weather";
import { getTodayYYYYMMDD } from "@/lib/api/getTodayYYYYMMDD";

const api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function fetchWeather(): Promise<WeatherItem[]> {
  const url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
  const params = new URLSearchParams({
    serviceKey: api_key ?? "",
    numOfRows: "10",
    pageNo: "1",
    dataType: "JSON",
    base_date: getTodayYYYYMMDD(),
    base_time: "1100",
    nx: "98",
    ny: "76",
  });

  const response = await fetch(`${url}?${params}`);
  const data = await response.json();

  if (data.response?.header?.resultCode !== "00") {
    throw new Error(data.response?.header?.resultMsg || "API 오류");
  }
  if (!data.response?.body?.items?.item) {
    throw new Error("날씨 데이터가 없습니다.");
  }
  return data.response.body.items.item;
}
