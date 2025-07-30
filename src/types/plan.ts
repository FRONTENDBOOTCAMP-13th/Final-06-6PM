import { User } from "./user";
import { Destination } from "@/lib/data/destinationList";
import { AreaTravelProps, ContentDataProps, KeywordTravelProps } from "@/types/travel";

// 여행 계획 상세 정보 응답 타입
export interface GetPlanDetailProps {
  _id: number; // 여행 계획 고유 ID
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
  title?: string;
  startDate: string; // 여행 시작일 (ISO 문자열 또는 날짜 문자열)
  endDate: string; // 여행 종료일
}

// 여행 리뷰 정보
export interface PlanReviewInfo {
  title: string;
  startDate: string;
  endDate: string;
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

// 선택한 장소 아이템
export interface SelectedPlace {
  id: number;
  name: string;
  category?: string;
  mapx?: number;
  mapy?: number;
}

// 표시되는 장소 아이템
export interface DayListItem {
  id: number;
  title: string;
  tag: string;
}

// 일차별 계획 아이템
export interface DailyPlan {
  day: number; // 여행 중 몇째 날
  planDate: string; // 실제 일정 날짜
  replyId?: number; // 댓글 id (일차별)
  places: SelectedPlace[]; // 해당 날짜의 장소들
}

export interface SearchNavProps {
  path: string;
  tagData: SelectedPlace[];
  onRemoveTag?: (id: number) => void;
}

// 기타사항
export interface PlanProduct {
  _id: any[];
  name: string[];
  mainImages: string[];
}

// 핵심 상태만 정의 (불필요한 것들 제거)
export interface PlanState {
  // 핵심 여행 데이터 (persist 됨)
  selectedArea: Destination | null;
  startDate: string | null;
  endDate: string | null;
  postId: number | null;
  selectedCategory: string;
  selectedPlaces: SelectedPlace[];
  dailyPlans: DailyPlan[];

  // 검색 관련 임시 상태 (persist 안 됨)
  filteredData: AreaTravelProps[];
  searchList: KeywordTravelProps[];
  contentData: ContentDataProps | undefined;
  selectContentID: string | number;
}

// 액션 정의
export interface PlanActions {
  // 기본 정보 설정
  setSelectedArea: (area: Destination | null) => void;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  setPostId: (id: number | null) => void;
  setSelectedCategory: (category: string) => void;

  // 데이터 설정 (임시 상태)
  setFilteredData: (data: AreaTravelProps[]) => void;
  setSearchList: (list: KeywordTravelProps[]) => void;
  setContentData: (data: ContentDataProps | undefined) => void;
  setSelectContentID: (id: string | number) => void;
  setSelectedPlaces: (places: SelectedPlace[]) => void;
  setDailyPlans: (plans: DailyPlan[]) => void;

  // 복합 액션들
  addSelectedPlace: (place: SelectedPlace) => boolean;
  removeSelectedPlace: (id: number) => void;
  addPlaceToDailyPlan: (day: number, place: SelectedPlace) => void;
  removePlaceFromDailyPlan: (day: number, placeId: number) => void;
  getPlanExtra: () => PlanExtra | null;
  clearSearchData: () => void;
  clearAllData: () => void;
}
