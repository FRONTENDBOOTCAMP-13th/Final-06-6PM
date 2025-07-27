"use client";
import DayScheduleCard from "@/components/ui/dayScheduleCard";
import BackButton from "@/components/feature/backButton";
import NextButton from "@/components/feature/nextButton";
import { usePlanSchedule } from "@/hook/usePlanSchedule";

export default function PreviewPage() {
  const { selectedArea, startDate, endDate, dailyPlans, isLoading } = usePlanSchedule();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">여행 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/edit/search" />
        <p className="text-center">여행일정만들기</p>
      </div>

      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">{selectedArea?.name}</h2>
          <p className="text-16 text-travel-gray700">
            {startDate} ~ {endDate}
          </p>
        </div>

        <div className="flex flex-col justify-between pt-7 gap-5">
          {dailyPlans.map((plan) => (
            <DayScheduleCard
              key={plan.day}
              day={plan.day}
              date={plan.planDate}
              daylist={plan.daylist}
              isPreview={true}
            />
          ))}
        </div>
      </div>

      <NextButton path="/plan/success" />
    </div>
  );
}
