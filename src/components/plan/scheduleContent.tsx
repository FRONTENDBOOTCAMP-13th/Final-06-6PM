"use client";
import { useEffect } from "react";
import DayScheduleCard from "@/components/ui/dayScheduleCard";
import usePlanStore from "@/zustand/planStore";

export default function ScheduleContent() {
  const { selectedArea, startDate, endDate, dailyPlans, setDailyPlans, addPlaceToDailyPlan, removeSelectedPlace } =
    usePlanStore();

  // 날짜 기간으로 일정 초기화 (날짜 변경 시 기존 장소 보존)
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // 여행 총 일수 게산
      const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      // 날짜 변경하면 재생성
      if (dailyPlans.length !== daysDiff) {
        const initialPlans = Array.from({ length: daysDiff }, (_, index) => {
          const currentDate = new Date(start);
          currentDate.setDate(start.getDate() + index);

          // 로컬 날짜 문자열 생성
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const day = String(currentDate.getDate()).padStart(2, "0");
          const planDate = `${year}-${month}-${day}`;

          // 장소 정보 보존
          const existingPlan = dailyPlans[index];

          return {
            day: index + 1,
            planDate: planDate,
            places: existingPlan?.places || [],
          };
        });

        setDailyPlans(initialPlans);
      }
    }
  }, [startDate, endDate, dailyPlans, setDailyPlans]);

  // 로딩 상태
  if (!selectedArea || !startDate || !endDate) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">여행 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 pb-25">
      <div>
        <h2 className="text-28 text-travel-primary200 font-semibold">{selectedArea.name}</h2>
        <p className="text-16 text-travel-gray700">
          {startDate} ~ {endDate}
        </p>
      </div>

      <div className="flex flex-col justify-between pt-7 gap-5">
        {dailyPlans.map((plan) => {
          // SelectedPlace를 DayListItem 형태로 변환
          const daylist = plan.places.map((place) => ({
            id: place.id,
            title: place.name,
            tag: "관광지",
          }));

          // console.log(`${plan.day}일차 장소들:`, plan.places);

          return (
            <div key={plan.day} className="drop-zone">
              <DayScheduleCard day={plan.day} date={plan.planDate} daylist={daylist} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
