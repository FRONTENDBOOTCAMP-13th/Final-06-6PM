"use client";
import { useParams } from "next/navigation";
import { usePlanDetail } from "@/hook/usePlanDetail";
import DayScheduleCard from "@/components/plan/dayScheduleCard";
import usePlanStore from "@/zustand/planStore";

export default function ModifyScheduleContent() {
  const params = useParams();
  const postId = Number(params?.id);
  const { planData, isLoading, hasReplies } = usePlanDetail(postId);
  const dailyPlans = usePlanStore((state) => state.dailyPlans);

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
      <div>
        <h2 className="text-28 font-semibold text-travel-primary200 ">{planData.title}</h2>
        <p className="text-16 text-gray-700">
          {planData.extra?.startDate} ~ {planData.extra?.endDate}
        </p>
      </div>
      <div className="flex flex-col justify-between gap-5 pt-7">
        {dailyPlans.map((plan) => (
          <div key={`day-${plan.day}`} className="drop-zone">
            <DayScheduleCard
              day={plan.day}
              date={plan.planDate}
              isPreview={false}
              planId={postId}
              replyId={plan.replyId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
