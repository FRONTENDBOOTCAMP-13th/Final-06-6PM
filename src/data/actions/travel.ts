"use server";

import { fetchTravel } from "@/data/functions/fetchTravel";
import { AreaTravelProps, fetchKtoProps } from "@/types/travel";

const API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY!;

// 지역 목록 가져오기 (비즈니스 로직 포함 가능)
export async function fetchAreaList(): Promise<fetchKtoProps> {
  const params = {
    serviceKey: API_KEY,
    numOfRows: "5",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "TestApp",
    _type: "json",
  };

  const res = await fetchTravel("/areaCode2", params);
  console.log(`res`, res);
  return res.response;
}

// ----------------------------------------------------------------

// 선택 지역 관광지 목록 가져오기
export async function fetchTravelList(
  areaCode: number
): Promise<AreaTravelProps[]> {
  const params = {
    serviceKey: API_KEY,
    areaCode: String(areaCode),
    numOfRows: "6",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "TestApp",
    contentTypeId: "12",
    _type: "json",
  };

  const items = await fetchTravel("/areaBasedList2", params);
  return items as AreaTravelProps[];
}
