"use server";

import {
  GetAreaProps,
  GetAreaTravelProps,
  GetKeywordProps,
} from "@/types/travel";

const API_URL = "http://apis.data.go.kr/B551011/KorService2";
const API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY!;

/**
 * 관광 API 호출 함수
 *
 * @param endpoint - 호출할 API 경로 (예: "/areaCode2")
 * @param params - 요청에 사용될 쿼리 파라미터 객체
 * @returns API 응답 JSON 또는 실패 시 에러 메시지를 포함한 객체
 *
 * @example
 * const data = await fetchTravel("/areaCode2", {
 *   serviceKey: "API_KEY",
 *   numOfRows: "5",
 *   pageNo: "1",
 *   MobileOS: "ETC",
 *   MobileApp: "TravelDiary",
 *   _type: "json",
 * });
 */
export async function fetchTravel(
  endpoint: string,
  params: Record<string, string>
) {
  const baseURL = API_URL;
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
    console.error("데이터 조회 실패:", err);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }
}

/**
 * 지역 목록을 가져오는 함수
 *
 * @returns {Promise<GetAreaProps>} 지역 목록 응답 객체
 * @description
 * 대한민국 관광 API를 통해 지역 목록 데이터 조회
 * 지역 코드는 이후 관광지 목록 조회 시 사용
 */
export async function getAreaList(): Promise<GetAreaProps> {
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

/**
 * 특정 지역의 관광지 목록을 가져오는 함수
 *
 * @param {number} areaCode - 지역 코드
 * @returns {Promise<GetAreaTravelProps>} 관광지 목록 응답 객체
 * @description
 * 지정된 지역 코드(areaCode)를 기반으로 관광지 목록을 조회
 */
export async function getTravelList(
  areaCode: number,
  contentTypeId: string = "12"
): Promise<GetAreaTravelProps> {
  const params = {
    serviceKey: API_KEY,
    areaCode: String(areaCode),
    numOfRows: "10",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "TravelDiary",
    contentTypeId,
    _type: "json",
  };

  const res = await fetchTravel("/areaBasedList2", params);
  console.log(`Travel res`, res);
  return res.response;
}

/**
 * 키워드 기반 관광 정보 검색 함수
 *
 * @param {string} keyword - 검색할 키워드 (예: 지역명, 장소명 등)
 * @returns {Promise<GetKeywordProps>} 키워드 검색 응답 객체
 * @description
 * 키워드를 이용해 관련된 관광 정보를 검색
 */
export async function getKeywordData(
  keyword: string,
  contentTypeId: string = "12"
): Promise<GetKeywordProps> {
  console.log("API 호출 시작:", { keyword, contentTypeId }); // 추가
  
  const params = {
    serviceKey: API_KEY,
    keyword,
    MobileOS: "ETC",
    MobileApp: "TravelDiary",
    pageNo: "1",
    numOfRows: "10",
    contentTypeId,
    _type: "json",
  };
  
  const res = await fetchTravel("/searchKeyword2", params);
  
  return res.response;
}

/**
 * 콘텐츠 ID 기반 상세 관광 정보 조회 함수
 *
 * @param {string} contentId - 콘텐츠 ID
 * @returns {Promise<any>} 콘텐츠 상세 정보 응답 객체
 * @description
 * 특정 관광지의 상세 정보를 콘텐츠 ID를 기반으로 조회
 */
export async function getContentData(contentId: string) {
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
