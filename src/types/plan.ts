import { User } from "./user";

// 여행 계획(Plan) 기본 아이템 정보 타입
export interface PlanItem {
  _id: number; // 계획 고유 ID
  type: string; // 계획 타입 (예: 개인, 그룹 등)
  views: number; // 조회수
  user: User; // 작성자 정보 (User 타입)
  title: string; // 계획 제목
  createdAt: string; // 생성일 (ISO 문자열)
  updatedAt: string; // 수정일 (ISO 문자열)
  extra: PlanExtra; // 추가 정보 (시작일, 종료일 등)
  replies: PlanReply[]; // 댓글 또는 일정 내역 배열
}

// 여행 계획에 포함된 추가 정보 (기간)
export interface PlanExtra {
  startDate: string; // 여행 시작일 (ISO 문자열 또는 날짜 문자열)
  endDate: string; // 여행 종료일
}

// 여행 계획의 댓글 또는 일정 상세 정보 타입
export interface PlanReply {
  _id: number; // 댓글/일정 고유 ID
  content: string; // 댓글 내용 또는 일정 설명
  day: number; // 여행 중 몇째 날인지 (1, 2, 3 ...)
  planDate: string; // 실제 일정 날짜 (ISO 문자열 또는 날짜 문자열)
  locations: Location[]; // 해당 일정의 장소 배열
}

// 여행 일정 내 특정 장소 정보 타입
export interface Location {
  title: string; // 장소 이름
  types: string; // 장소 유형 (ex: 관광지, 숙박 등)
  contentId: string; // 관광지 등 콘텐츠 ID
  mapx: string; // 경도 (string으로 된 좌표값)
  mapy: string; // 위도 (string으로 된 좌표값)
}
