"use client";
import { useParams } from "next/navigation";
import { usePlanDetail } from "@/hook/usePlanDetail";
import DayScheduleCard from "@/components/plan/dayScheduleCard";
import ScheduleCreateButton from "@/components/plan/scheduleCreateButton";
import DrawerPlanBtn from "@/components/plan/drawerPlanBtn";
import usePlanStore from "@/zustand/planStore";
import ShareBtn from "@/components/feature/shareBtn";

export default function PlanDetailContent() {
  const params = useParams();
  const postId = Number(params?.id);
  const { planData, isLoading, hasReplies } = usePlanDetail(postId);
  const dailyPlans = usePlanStore((state) => state.dailyPlans);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">여행 정보를 불러오는 중...</p>
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">{planData.title}</h2>
          <p className="text-16 text-travel-gray700">
            {planData.extra?.startDate} ~ {planData.extra?.endDate}
          </p>
        </div>
        <div className="flex items-cnenter gap-2 -mt-3">
          <ShareBtn />
          <DrawerPlanBtn reviewId={postId} />
        </div>
      </div>

      {!hasReplies ? (
        <div className="pt-7">
          <ScheduleCreateButton planData={planData} />
        </div>
      ) : (
        <div className="flex flex-col justify-between pt-7 gap-5">
          {dailyPlans.map((plan) => (
            <div key={`day-${plan.day}`}>
              <DayScheduleCard
                day={plan.day}
                date={plan.planDate}
                isPreview={true}
                planId={postId}
                replyId={plan.replyId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
