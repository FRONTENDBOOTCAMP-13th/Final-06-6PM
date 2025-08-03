"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import DayScheduleCard from "@/components/plan/dayScheduleCard";
import { getPlanDetail } from "@/data/functions/plan";
import { GetPlanDetailProps } from "@/types/plan";
import DrawerPlanBtn from "@/components/plan/drawerPlanBtn";
import usePlanStore from "@/zustand/planStore";

export default function PlanDetailContent() {
  const params = useParams();
  const planId = Number(params?.id);

  const [planData, setPlanData] = useState<GetPlanDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setDailyPlans, clearAllData } = usePlanStore();

  // API 데이터 로드
  useEffect(() => {
    const fetchPlanData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getPlanDetail(planId);
        console.log(res);
        if (res.ok && res.item) {
          setPlanData(res.item);

          const dailyPlansData =
            res.item.replies?.map((reply) => ({
              day: reply.day,
              planDate: reply.planDate,
              places: reply.locations.map((location) => ({
                id: parseInt(location.contentId),
                name: location.title,
                category: location.types,
                mapx: location.mapx ? Number(location.mapx) : undefined,
                mapy: location.mapy ? Number(location.mapy) : undefined,
              })),
            })) || [];

          setDailyPlans(dailyPlansData);
        } else {
          const errorMessage = "message" in res ? res.message : "여행일정을 불러올 수 없습니다.";
          setError(errorMessage);
        }
      } catch (error) {
        console.error("Plan 데이터 로드 실패:", error);
        setError("네트워크 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (planId) {
      clearAllData();
      fetchPlanData();
    }

    return () => {
      clearAllData();
    };
  }, [planId, setDailyPlans, clearAllData]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">여행 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !planData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">{error || "여행일정을 불러올 수 없습니다."}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 pb-25">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">{planData.title}</h2>
          <p className="text-16 text-travel-gray700">
            {planData.extra.startDate} ~ {planData.extra.endDate}
          </p>
        </div>
        <DrawerPlanBtn reviewId={planId} />
      </div>

      <div className="flex flex-col justify-between pt-7 gap-5">
        {planData.replies?.map((reply) => (
          <DayScheduleCard key={reply.day} day={reply.day} date={reply.planDate} isPreview={true} planId={planId} />
        ))}
      </div>
    </div>
  );
}
