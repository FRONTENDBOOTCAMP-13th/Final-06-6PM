"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import DrawerBtn from "@/components/feature/drawerBtn";
import DayScheduleCard from "@/components/ui/dayScheduleCard";
import { getPlanDetail } from "@/data/functions/plan";
import { GetPlanDetailProps } from "@/types/plan";

export default function PlanDetailContent() {
  const params = useParams();
  const planId = Number(params?.id);

  const [planData, setPlanData] = useState<GetPlanDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      fetchPlanData();
    }
  }, [planId]);

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
        <DrawerBtn reviewId={planId} />
      </div>

      <div className="flex flex-col justify-between pt-7 gap-5">
        {planData.replies.map((reply) => (
          <DayScheduleCard
            key={reply.day}
            day={reply.day}
            date={reply.planDate}
            daylist={reply.locations.map((location) => ({
              id: parseInt(location.contentId),
              title: location.title,
              tag: location.types,
            }))}
            isPreview={true}
          />
        ))}
      </div>
    </div>
  );
}
