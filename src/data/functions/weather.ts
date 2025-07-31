"use server";

import { WeatherItem } from "@/types/weather";
import { todayDate } from "@/lib/todayDate";
import { baseTime } from "@/lib/baseTime";

const API_URL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

/**
 * 기상청 단기예보 날씨 데이터를 가져오는 함수
 *
 * @param nx 격자 X 좌표 (예: "60")
 * @param ny 격자 Y 좌표 (예: "127")
 * @returns 날씨 정보 배열 (WeatherItem[])
 * @throws API 호출 실패 또는 데이터 없음 시 오류 발생
 */
export async function fetchWeather(nx: string, ny: string): Promise<WeatherItem[]> {
  const params = new URLSearchParams({
    serviceKey: API_KEY ?? "",
    numOfRows: "10",
    pageNo: "1",
    dataType: "JSON",
    base_date: todayDate(),
    base_time: baseTime(),
    nx,
    ny,
  });

  const res = await fetch(`${API_URL}?${params}`);
  const data = await res.json();

  const header = data.response?.header;
  const items = data.response?.body?.items?.item;

  if (header?.resultCode !== "00") {
    throw new Error(header?.resultMsg || "날씨 API 오류");
  }

  if (!items) {
    throw new Error("날씨 데이터가 존재하지 않습니다.");
  }

  return items as WeatherItem[];
}

/**
 * 서버에서 호출하는 get 함수
 * 내부적으로 fetchWeather를 호출함
 * 향후 데이터 가공, 캐싱, 에러 처리 등 추가 가능
 *
 * @param nx 격자 X 좌표
 * @param ny 격자 Y 좌표
 * @returns 기상청 단기예보 날씨 데이터 배열
 */
export async function getWeatherData(nx: string, ny: string) {
  return await fetchWeather(nx, ny);
}
