"use server";

import { fetchTravel } from "@/data/functions/fetchTravel";
import {
  FetchAreaProps,
  FetchAreaTravelProps,
  FetchKeywordProps,
} from "@/types/travel";

const API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY!;

// 지역 목록 가져오기 (비즈니스 로직 포함 가능)
export async function fetchAreaList(): Promise<FetchAreaProps> {
  const params = {
    serviceKey: API_KEY,
    numOfRows: "5",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "TravelDiary",
    _type: "json",
  };

  const res = await fetchTravel("/areaCode2", params);
  // console.log(`Area res`, res);
  return res.response;
}

// 선택 지역 관광지 목록 가져오기
export async function fetchTravelList(
  areaCode: number
): Promise<FetchAreaTravelProps> {
  const params = {
    serviceKey: API_KEY,
    areaCode: String(areaCode),
    numOfRows: "6",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "TravelDiary",
    contentTypeId: "12",
    _type: "json",
  };

  const res = await fetchTravel("/areaBasedList2", params);
  console.log(`Travel res`, res);
  return res.response;
}

// 키워드 기반 데이터 가져오기
export async function fetchKeywordData(
  keyword: string
): Promise<FetchKeywordProps> {
  const params = {
    serviceKey: API_KEY,
    keyword,
    MobileOS: "ETC",
    MobileApp: "TravelDiary",
    pageNo: "1",
    numOfRows: "10",
    _type: "json",
  };

  const res = await fetchTravel("/searchKeyword2", params);
  return res.response;
}

// 콘텐츠 ID 기반 데이터 가져오기
export async function fetchContentData(contentId: string) {
  const params = {
    serviceKey: API_KEY,
    MobileOS: "ETC",
    MobileApp: "TravelDiary",
    contentId: String(contentId),
    pageNo: "1",
    numOfRows: "10",
    _type: "json",
  };
  const res = await fetchTravel("/detailCommon2", params);
  return res.response;
}
