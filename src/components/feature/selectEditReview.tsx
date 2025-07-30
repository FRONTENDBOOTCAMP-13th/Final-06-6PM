"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Button from "@/components/ui/btn";
import ReviewFormAll from "@/components/form/reviewFormAll";
import { ReviewDayItem } from "@/components/form/reviewSelect";
import ReviewDetailForm from "@/components/form/reviewDetailForm";
import { getReviewDetail } from "@/data/functions/review";
import { GetReviewDetailProps } from "@/types/review";
import { CalendarDays, LayoutList, Link, MapPin } from "lucide-react";
import { PlanReply, PlanReviewInfo } from "@/types/plan";

export default function SelectEditReview() {
  const [tab, setTab] = useState(0);
  const params = useParams();
  const reviewId = Number(params?.id);
  const searchParams = useSearchParams();
  const reviewType = searchParams.get("reviewType");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planReply, setPlanReply] = useState<PlanReply[]>([]);
  const [reviewData, setReviewData] = useState<GetReviewDetailProps | null>(null);
  const [selectItem, setSelectItem] = useState<ReviewDayItem | null>(null);
  const [planReviewInfo, setPlanReviewInfo] = useState<PlanReviewInfo>({
    plan_id: 0,
    title: "",
    startDate: "",
    endDate: "",
  });

  // reviewDaily
  const reviewDaily: ReviewDayItem[] = useMemo(() => {
    return planReply.map((day) => ({
      days: day.planDate,
      place: day.locations.map((location) => ({
        title: location.title,
        contentId: location.contentId,
      })),
    }));
  }, [planReply]);

  // reviewPlace
  const reviewPlace: ReviewDayItem[] = useMemo(() => {
    const places: ReviewDayItem[] = [];
    planReply.forEach((day) => {
      day.locations.forEach((location) => {
        places.push({
          days: day.planDate,
          place: {
            title: location.title,
            contentId: location.contentId,
          },
        });
      });
    });
    return places;
  }, [planReply]);

  // 탭구분
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

  // reviewType과 reviewData에 따른 초기 설정
  useEffect(() => {
    console.log("reviewType:", reviewType);
    console.log("reviewData:", reviewData);

    // reviewType이 있으면 해당 타입으로 탭 설정
    if (reviewType) {
      if (reviewType === "reviewAll") setTab(0);
      else if (reviewType === "reviewDaily") setTab(1);
      else if (reviewType === "reviewPlace") setTab(2);
    }
    // reviewData가 있으면 리뷰 타입으로 탭 설정
    else if (reviewData) {
      if (reviewData.type === "reviewAll") setTab(0);
      else if (reviewData.type === "reviewDaily") setTab(1);
      else if (reviewData.type === "reviewPlace") setTab(2);
    }
  }, [reviewType, reviewData]);

  // 선택 아이템 설정
  useEffect(() => {
    if (tab === 0) {
      setSelectItem(null);
      return;
    }

    const targetList = tab === 1 ? reviewDaily : reviewPlace;
    console.log("targetList:", targetList);

    if (targetList.length > 0) {
      if (reviewData) {
        let matchingItem = null;

        if (tab === 1 && reviewData.type === "reviewDaily") {
          matchingItem = targetList.find((item) => item.days === reviewData.extra?.visitDate);
        } else if (tab === 2 && reviewData.type === "reviewPlace") {
          matchingItem = targetList.find((item) => {
            if (typeof item.place === "object" && "contentId" in item.place) {
              const location = reviewData.extra?.location;
              if (location && "contentId" in location) {
                return location.contentId === item.place.contentId;
              }
            }
            return false;
          });
        }

        const selectedItem = matchingItem || targetList[0];
        console.log("선택된 아이템:", selectedItem);
        setSelectItem(selectedItem);
      } else {
        console.log("기본값 설정:", targetList[0]);
        setSelectItem(targetList[0]);
      }
    } else {
      // planReply가 없을 때 더미 데이터로 폼을 표시할 수 있도록 설정
      console.log("targetList가 비어있음 - 더미 데이터 생성");
      if (reviewData) {
        if (tab === 1) {
          setSelectItem({
            days: reviewData.extra?.visitDate || "선택된 날짜",
            place: Array.isArray(reviewData.extra?.location)
              ? reviewData.extra.location
              : reviewData.extra?.location
              ? [reviewData.extra.location]
              : [],
          });
        } else if (tab === 2) {
          setSelectItem({
            days: reviewData.extra?.visitDate || "선택된 날짜",
            place: reviewData.extra?.location || { title: "선택된 장소", contentId: "" },
          });
        }
      }
    }
  }, [tab, reviewDaily, reviewPlace, reviewData]);

  // 리뷰 데이터 가져오기
  useEffect(() => {
    const fetchReviewData = async () => {
      if (!reviewId) {
        setError("리뷰 ID가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const reviewRes = await getReviewDetail(String(reviewId));
        if (reviewRes.ok !== 1 || !reviewRes.item) {
          setError("리뷰 데이터를 불러올 수 없습니다.");
          setLoading(false);
          return;
        }

        const reviewItem = reviewRes.item;
        setReviewData(reviewItem);
        setPlanReviewInfo({
          plan_id: reviewItem?.extra.plan_id,
          title: reviewItem?.extra.place,
          startDate: reviewItem?.extra.startDate,
          endDate: reviewItem?.extra.endDate,
        });
      } catch (error) {
        console.error("리뷰 데이터 로드 실패:", error);
        setError("리뷰 데이터 로드 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  console.log("reviewData", reviewData);
  console.log("planReviewInfo", planReviewInfo);

  // 로딩중
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

  // 에러
  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
        <Link href="/feed">
          <Button variant="info" size="md">
            돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="p-4 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-600">리뷰 데이터를 찾을 수 없습니다.</p>
        </div>
        <Link href="/feed">
          <Button variant="info" size="md">
            돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 divide-x divide-travel-gray100">
        {data.map((item) => {
          const isActive = tab === item.id;
          return (
            <div
              key={item.id}
              className={`text-14 flex flex-col items-center p-1.5 gap-1.5 ${
                isActive
                  ? "text-white bg-travel-secondary100 border-b border-b-travel-secondary200"
                  : "text-travel-gray300 bg-white border-b border-b-travel-gray200 opacity-50 pointer-events-none"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>

      {/* 디버깅 정보 (개발 중에만 사용) */}
      {process.env.NODE_ENV === "development" && (
        <div className="p-2 bg-gray-100 text-xs">
          <p>Tab: {tab}</p>
          <p>ReviewType: {reviewType}</p>
          <p>PlanReply Length: {planReply.length}</p>
          <p>ReviewDaily Length: {reviewDaily.length}</p>
          <p>ReviewPlace Length: {reviewPlace.length}</p>
          <p>SelectItem: {selectItem ? "OK" : "NULL"}</p>
          {selectItem && <p>SelectItem Days: {selectItem.days}</p>}
        </div>
      )}

      {tab === 0 && <ReviewFormAll planReviewInfo={planReviewInfo} initialData={reviewData} />}

      {tab === 1 && selectItem && (
        <ReviewDetailForm
          list={reviewDaily}
          selected={selectItem}
          onChange={setSelectItem}
          reviewType="reviewDaily"
          initialData={reviewData}
        />
      )}

      {tab === 2 && selectItem && (
        <ReviewDetailForm
          list={reviewPlace}
          selected={selectItem}
          onChange={setSelectItem}
          reviewType="reviewPlace"
          initialData={reviewData}
        />
      )}

      {/* 데이터 없음 메시지 */}
      {(tab === 1 || tab === 2) && !selectItem && (
        <div className="p-4 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-600">선택된 항목이 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
