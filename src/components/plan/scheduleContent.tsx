"use client";
import DayScheduleCard from "@/components/plan/dayScheduleCard";
import PlanDetailContentSkeleton from "@/components/plan/planDetailContentSkeleton";
import { usePlanSchedule } from "@/hook/usePlanSchedule";

export default function ScheduleContent() {
  const { selectedArea, startDate, endDate, dailyPlans, isLoading } = usePlanSchedule();

  if (isLoading) {
    return (
      <div className="h-screen w-full items-center justify-center px-4 py-1">
        <PlanDetailContentSkeleton />
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
        {dailyPlans.map((plan) => (
          <div key={plan.day} className="drop-zone">
            <DayScheduleCard day={plan.day} date={plan.planDate} />
          </div>
        ))}
      </div>
    </div>
  );
}
