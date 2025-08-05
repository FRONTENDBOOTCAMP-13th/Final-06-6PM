"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import DayScheduleCard from "@/components/plan/dayScheduleCard";
import { getPlanDetail } from "@/data/functions/plan";
import { GetPlanDetailProps } from "@/types/plan";
import usePlanStore from "@/zustand/planStore";
import { destinationList } from "@/lib/data/destinationList";

export default function ModifyScheduleContent() {
  const params = useParams();
  const postId = Number(params?.id);

  const [planData, setPlanData] = useState<GetPlanDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Zustand 상태
  const dailyPlans = usePlanStore((state) => state.dailyPlans);
  const { setDailyPlans, setPostId, setSelectedArea, setStartDate, setEndDate } = usePlanStore();

  // 서버 데이터 재조회 함수
  const refreshPlanData = useCallback(async () => {
    try {
      const res = await getPlanDetail(postId);
      if (res.ok && res.item) {
        setPlanData(res.item);
        return res.item;
      }
    } catch (error) {
      console.error("여행일정 재조회 실패:", error);
    }
    return null;
  }, [postId]);

  // 초기 데이터 로드
  useEffect(() => {
    const initializeData = async () => {
      if (isInitialized || !postId) return;

      setIsLoading(true);
      try {
        const res = await getPlanDetail(postId);
        if (res.ok && res.item) {
          setPlanData(res.item);

          // Zustand 초기화
          setPostId(res.item._id);
          setStartDate(res.item.extra.startDate);
          setEndDate(res.item.extra.endDate);

          const foundArea = destinationList.find((dest) => dest.name === res.item.title);
          if (foundArea) {
            setSelectedArea(foundArea);
          }

          // 초기 dailyPlans 설정
          const convertedDailyPlans = res.item.replies.map((reply) => ({
            day: reply.day,
            planDate: reply.planDate,
            replyId: reply._id,
            places: reply.locations.map((location) => ({
              id: parseInt(location.contentId),
              name: location.title,
              category: location.types,
              mapx: location.mapx ? parseFloat(location.mapx.toString()) : undefined,
              mapy: location.mapy ? parseFloat(location.mapy.toString()) : undefined,
            })),
          }));

          setDailyPlans(convertedDailyPlans);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("여행일정 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [postId, isInitialized]);

  // URL 파라미터 변경 감지 (장소 추가 후 돌아왔을 때)
  useEffect(() => {
    const checkForUpdates = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const shouldRefresh = urlParams.get("refresh");

      if (shouldRefresh === "true" && isInitialized) {
        // 서버에서 최신 데이터 다시 가져오기
        const latestData = await refreshPlanData();
        if (latestData) {
          // Zustand 상태 업데이트
          const convertedDailyPlans = latestData.replies.map((reply) => ({
            day: reply.day,
            planDate: reply.planDate,
            replyId: reply._id,
            places: reply.locations.map((location) => ({
              id: parseInt(location.contentId),
              name: location.title,
              category: location.types,
              mapx: location.mapx ? parseFloat(location.mapx.toString()) : undefined,
              mapy: location.mapy ? parseFloat(location.mapy.toString()) : undefined,
            })),
          }));
          setDailyPlans(convertedDailyPlans);
        }

        // URL 파라미터 제거
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    checkForUpdates();
  }, [isInitialized, refreshPlanData, setDailyPlans]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">여행을 수정하는 중...</p>
      </div>
    );
  }

  if (!planData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">여행일정을 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 pb-25">
      <div className="mb-6">
        <h2 className="text-28 text-travel-primary200 font-semibold">{planData.title}</h2>
        <p className="text-16 text-travel-gray700">
          {planData.extra.startDate} ~ {planData.extra.endDate}
        </p>
      </div>

      <div className="flex flex-col justify-between gap-5">
        {dailyPlans.map((plan) => {
          return (
            <div key={`day-${plan.day}`} className="drop-zone">
              <DayScheduleCard
                day={plan.day}
                date={plan.planDate}
                isPreview={false}
                planId={postId}
                replyId={plan.replyId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
