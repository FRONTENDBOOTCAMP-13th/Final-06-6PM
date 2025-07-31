import { User } from "@/types/user";

// 리뷰 전체 일정 정보 응답 타입
export interface GetReviewDetailProps {
  _id: number; // 리뷰 고유 ID
  type: string; // 리뷰 타입(예: "reviewAll", "reviewDaily", "reviewPlace")
  user: User; // 작성자 정보
  title: string; // 리뷰 제목
  content: string; // 리뷰 본문 내용
  createdAt: string; // 리뷰 작성일
  updatedAt: string; // 리뷰 수정일
  extra: {
    plan_id: number; // 참조용 계획 ID (해당 리뷰가 어떤 여행 계획과 연결되는지)
    startDate: string; // 여행 시작일
    endDate: string; // 여행 종료일
    visitDate?: string; // 방문일
    images?: string[]; // 이미지 URL 배열
    starRate: number; // 사용자 별점
    place: string; // 방문한 지역
    location?: ReviewLocation[]; // 방문한 장소 목록
    tags?: string[]; // 태그 목록
  };
  views: number; // 조회수
  bookmarks: number; // 북마크(찜) 수
  myBookmarkId?: number; // 사용자의 북마크 아이디
  repliesCount: number; // 댓글 수
  replies?: ReviewReply[]; // 댓글
}

// 리뷰 댓글
export interface ReviewReply {
  _id: number;
  content: string;
  createdAt: string;
  user: {
    _id: number;
    name: string;
    image?: string;
  };
}

export interface ReviewLocation {
  title: string;
  contentId?: string;
  areaCode?: string;
}
