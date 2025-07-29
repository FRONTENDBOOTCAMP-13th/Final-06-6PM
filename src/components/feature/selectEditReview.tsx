// 1. SelectEditReview 컴포넌트에서 데이터 로딩 상태 확인 및 개선

"use client";

import ReviewDetailForm from "@/components/form/reviewDetailForm";
import ReviewFormAll from "@/components/form/reviewFormAll";
import { DayItem } from "@/components/form/reviewSelect";
import { getPlanDetail } from "@/data/functions/plan";
import { getReviewDetail } from "@/data/functions/review";
import { PlanReply } from "@/types/plan";
import { GetReviewDetailProps } from "@/types/review";
import { CalendarDays, LayoutList, MapPin } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function SelectEditReview() {
  const [tab, setTab] = useState(0);
  const [planReply, setPlanReply] = useState<PlanReply[]>([]);
  const [reviewData, setReviewData] = useState<GetReviewDetailProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const searchParams = useSearchParams();
  const reviewId = Number(params?.id);
  const [selectItem, setSelectItem] = useState<DayItem | null>(null);

  // ⭐ 디버깅용 로그
  console.log("SelectEditReview 렌더링:", {
    reviewId,
    reviewData: reviewData ? "로드됨" : "로딩중",
    tab,
    loading,
  });

  // reviewDaily 계산
  const reviewDaily: DayItem[] = useMemo(() => {
    if (!planReply || !Array.isArray(planReply)) {
      return [];
    }
    return planReply.map((day) => ({
      days: day.planDate,
      place: day.locations?.map((location) => location.title) || [],
    }));
  }, [planReply]);

  // reviewPlace 계산
  const reviewPlace: DayItem[] = useMemo(() => {
    if (!planReply || !Array.isArray(planReply)) {
      return [];
    }
    const places: DayItem[] = [];
    planReply.forEach((day) => {
      if (day.locations && Array.isArray(day.locations)) {
        day.locations.forEach((location) => {
          places.push({
            days: day.planDate,
            place: location.title,
          });
        });
      }
    });
    return places;
  }, [planReply]);

  const data = [
    {
      id: 0,
      title: "일정전체",
      icon: <LayoutList className="w-[1.25rem] h-[1.25rem]" />,
    },
    {
      id: 1,
      title: "일자별",
      icon: <CalendarDays className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewDaily,
    },
    {
      id: 2,
      title: "장소별",
      icon: <MapPin className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewPlace,
    },
  ];

  // ⭐ 리뷰 데이터 로드 (가장 먼저 실행)
  useEffect(() => {
    const fetchReviewData = async () => {
      if (!reviewId) {
        setError("리뷰 ID가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        console.log("리뷰 데이터 로딩 시작:", reviewId);
        const res = await getReviewDetail(String(reviewId));

        console.log("리뷰 API 응답:", res);

        if (res.ok === 1 && res.item) {
          setReviewData(res.item);
          console.log("리뷰 데이터 설정 완료:", res.item);

          // 리뷰 타입에 따라 적절한 탭 설정
          if (res.item.type === "reviewAll") {
            setTab(0);
          } else if (res.item.type === "reviewDaily") {
            setTab(1);
          } else if (res.item.type === "reviewPlace") {
            setTab(2);
          }
        } else {
          // setError(res.message || "리뷰 데이터를 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("리뷰 데이터 로드 실패:", error);
        setError("리뷰 데이터 로드 중 오류가 발생했습니다.");
      }
    };

    fetchReviewData();
  }, [reviewId]);

  // ⭐ Plan 데이터 로드
  useEffect(() => {
    const fetchPlanData = async () => {
      if (!reviewId) {
        setLoading(false);
        return;
      }

      try {
        console.log("Plan 데이터 로딩 시작:", reviewId);
        const res = await getPlanDetail(reviewId);

        console.log("Plan API 응답:", res);

        if (res.ok === 1 && res.item?.replies) {
          setPlanReply(res.item.replies);
          console.log("Plan 데이터 설정 완료:", res.item.replies);
        } else {
          console.error("Plan 데이터 로드 실패:", res);
        }
      } catch (error) {
        console.error("Plan 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
  }, [reviewId]);

  // ⭐ selectItem 설정 (reviewData와 planReply가 모두 로드된 후)
  useEffect(() => {
    if (tab === 0) {
      setSelectItem(null);
      return;
    }

    const targetList = tab === 1 ? reviewDaily : reviewPlace;
    if (targetList.length > 0) {
      if (reviewData) {
        let matchingItem = null;

        if (tab === 1 && reviewData.type === "reviewDaily") {
          // 일자별 매칭
          matchingItem = targetList.find((item) => item.days === reviewData.extra?.visitDate);
        } else if (tab === 2 && reviewData.type === "reviewPlace") {
          // 장소별 매칭
          matchingItem = targetList.find((item) => item.place === reviewData.extra?.location);
        }

        setSelectItem(matchingItem || targetList[0]);
        console.log("SelectItem 설정:", matchingItem || targetList[0]);
      } else {
        setSelectItem(targetList[0]);
      }
    }
  }, [tab, reviewDaily, reviewPlace, reviewData]);

  // ⭐ 로딩 상태
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-secondary100 mx-auto mb-4"></div>
          <p className="text-travel-gray400">리뷰 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // ⭐ 에러 상태
  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-travel-secondary100 text-white rounded hover:bg-travel-secondary200"
        >
          돌아가기
        </button>
      </div>
    );
  }

  // ⭐ 데이터 없음 상태
  if (!reviewData) {
    return (
      <div className="p-4 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-600">리뷰 데이터를 찾을 수 없습니다.</p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-travel-secondary100 text-white rounded hover:bg-travel-secondary200"
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* ⭐ 디버깅 정보 (개발 환경에서만) */}
      {process.env.NODE_ENV === "development" && (
        <div className="p-2 bg-gray-100 text-xs border-b">
          <p>
            <strong>Review ID:</strong> {reviewId}
          </p>
          <p>
            <strong>Review Type:</strong> {reviewData?.type}
          </p>
          <p>
            <strong>Current Tab:</strong> {tab}
          </p>
          <p>
            <strong>Review Title:</strong> {reviewData?.title}
          </p>
          <p>
            <strong>Review Content Length:</strong> {reviewData?.content?.length || 0}
          </p>
          <p>
            <strong>Has Initial Data:</strong> {!!reviewData ? "✅" : "❌"}
          </p>
        </div>
      )}

      {/* 탭 네비게이션 */}
      <div className="grid grid-cols-3 divide-x divide-travel-gray100">
        {data.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100 border-b border-b-travel-secondary200"
                : "text-travel-gray400 bg-white border-b border-b-travel-gray200"
            }`}
            onClick={() => setTab(item.id)}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      {/* 컨텐츠 영역 */}
      {tab === 0 && (
        <ReviewFormAll
          key={`review-all-${reviewData._id || reviewData._id}`} // ⭐ key 추가
          initialData={reviewData}
        />
      )}

      {tab === 1 && selectItem && reviewDaily.length > 0 && (
        <ReviewDetailForm
          key={`review-daily-${reviewData._id || reviewData._id}-${selectItem.days}`} // ⭐ key 추가
          list={reviewDaily}
          selected={selectItem}
          onChange={setSelectItem}
          reviewType="reviewDaily"
          initialData={reviewData}
        />
      )}

      {tab === 2 && selectItem && reviewPlace.length > 0 && (
        <ReviewDetailForm
          key={`review-place-${reviewData._id || reviewData._id}-${selectItem.place}`} // ⭐ key 추가
          list={reviewPlace}
          selected={selectItem}
          onChange={setSelectItem}
          reviewType="reviewPlace"
          initialData={reviewData}
        />
      )}

      {/* 빈 데이터 상태 */}
      {tab === 1 && reviewDaily.length === 0 && (
        <div className="p-4 text-center text-travel-gray400">일자별 데이터가 없습니다.</div>
      )}

      {tab === 2 && reviewPlace.length === 0 && (
        <div className="p-4 text-center text-travel-gray400">장소별 데이터가 없습니다.</div>
      )}
    </div>
  );
}
