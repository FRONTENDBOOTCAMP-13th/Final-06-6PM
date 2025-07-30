"use client";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Button from "@/components/ui/btn";
import ReviewFormAll from "@/components/form/reviewFormAll";
import { ReviewDayItem } from "@/components/form/reviewSelect";
import ReviewDetailForm from "@/components/form/reviewDetailForm";
import { getReviewDetail } from "@/data/functions/review";
import { GetReviewDetailProps } from "@/types/review";
import { CalendarDays, LayoutList, Link, MapPin } from "lucide-react";
import { PlanReply } from "@/types/plan";

export default function SelectEditReview() {
  const [tab, setTab] = useState(0);
  const params = useParams();
  const reviewId = Number(params?.id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planReply, setPlanReply] = useState<PlanReply[]>([]);
  const [reviewData, setReviewData] = useState<GetReviewDetailProps | null>(null);
  const [selectItem, setSelectItem] = useState<ReviewDayItem | null>(null);

  // 디버깅용 로그
  // console.log("SelectEditReview 렌더링:", {
  //   reviewId,
  //   reviewData: reviewData ? "로드됨" : "로딩중",
  //   tab,
  //   loading,
  // });

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

  // 탭 선택에 따른 데이터 출력
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
          matchingItem = targetList.find((item) => item.days === reviewData.extra?.visitDate);
        } else if (tab === 2 && reviewData.type === "reviewPlace") {
          matchingItem = targetList.find((item) => item.place === reviewData.extra?.location);
        }

        setSelectItem(matchingItem || targetList[0]);
      } else {
        setSelectItem(targetList[0]);
      }
    }
  }, [tab, reviewDaily, reviewPlace, reviewData]);

  // 리뷰 데이터 조회
  useEffect(() => {
    const fetchReviewData = async () => {
      if (!reviewId) {
        setError("리뷰 ID가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const res = await getReviewDetail(String(reviewId));
        if (res.ok === 1 && res.item) {
          setReviewData(res.item);

          if (res.item.type === "reviewAll") setTab(0);
          else if (res.item.type === "reviewDaily") setTab(1);
          else if (res.item.type === "reviewPlace") setTab(2);
        } else {
          setError("리뷰 데이터를 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("리뷰 데이터 로드 실패:", error);
        setError("리뷰 데이터 로드 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [reviewId]);

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
      {tab === 0 && <ReviewFormAll key={`review-all-${reviewData._id || reviewData._id}`} initialData={reviewData} />}

      {tab === 1 && selectItem && reviewDaily.length > 0 && (
        <ReviewDetailForm
          key={`reviewdaily-${reviewData._id}`}
          list={reviewDaily}
          selected={selectItem}
          onChange={setSelectItem}
          reviewType="reviewDaily"
          initialData={reviewData}
        />
      )}

      {tab === 2 && selectItem && reviewPlace.length > 0 && (
        <ReviewDetailForm
          key={`reviewplace-${reviewData._id}`}
          list={reviewPlace}
          selected={selectItem}
          onChange={setSelectItem}
          reviewType="reviewPlace"
          initialData={reviewData}
        />
      )}
    </div>
  );
}
