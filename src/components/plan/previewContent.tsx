"use client";
import DayScheduleCard from "@/components/plan/dayScheduleCard";
import { usePlanSchedule } from "@/hook/usePlanSchedule";

export default function PreviewContent() {
  const { selectedArea, startDate, endDate, dailyPlans, isLoading } = usePlanSchedule();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">여행 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 pb-25">
      <div>
        <h2 className="text-28 text-travel-primary200 font-semibold">{selectedArea?.name}</h2>
        <p className="text-16 text-travel-gray700">
          {startDate} ~ {endDate}
        </p>
      </div>

      <div className="flex flex-col justify-between pt-7 gap-5">
        g
        {dailyPlans.map((plan) => (
          <DayScheduleCard key={plan.day} day={plan.day} date={plan.planDate} isPreview={true} />
        ))}
      </div>
    </div>
  );
}
