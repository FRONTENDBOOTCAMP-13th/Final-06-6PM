import { User } from "./user";

// 여행 계획 상세 정보 응답 타입
export interface GetPlanDetailProps {
  _id: number; // 여행 계획 고유 ID
  plan_id: number; // 참조용 계획 ID (별도 필드로 존재)
  type: string; // 계획 유형 (예: "plan")
  views: number; // 조회수
  user: User; // 작성자 정보
  title: string; // 여행 제목
  createdAt: string; // 생성일 (예: "2025.06.22 01:18:02")
  updatedAt: string; // 수정일
  extra: PlanExtra; // 여행 시작일 및 종료일 정보
  replies: PlanReply[]; // 여행 일정 목록 (날짜별)
  product: PlanProduct; // 연동된 상품 정보
  bookmarks: number; // 북마크 수
}

// 여행 추가 정보 (기간 관련)
export interface PlanExtra {
  startDate: string; // 여행 시작일 (ISO 문자열 또는 날짜 문자열)
  endDate: string; // 여행 종료일
}

// 여행 일정 단위 정보
export interface PlanReply {
  _id: number; // /일정 고유 ID
  content: string; // 일정 설명
  day: number; // 여행 중 몇째 날인지 (1, 2, 3 ...)
  planDate: string; // 실제 일정 날짜 (ISO 문자열 또는 날짜 문자열)
  locations: Location[]; // 해당 일정의 장소 배열
}

// 여행 일정에 포함된 장소 정보
export interface Location {
  title: string; // 장소 이름
  types: string; // 장소 유형(ex: 관광지, 숙박 등)
  contentId: string; // 콘텐츠 ID
  mapx: string; // 경도 (string으로 된 좌표값)
  mapy: string; // 위도 (string으로 된 좌표값)
}

// 기타사항
export interface PlanProduct {
  _id: any[];
  name: string[];
  mainImages: string[];
}
