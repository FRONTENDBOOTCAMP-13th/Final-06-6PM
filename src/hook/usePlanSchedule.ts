"use client";
import { useEffect } from "react";
import usePlanStore from "@/zustand/planStore";

// 여행 기간에 맞는 일정표를 생성하고 SelectedPlace를 DayListItem으로 변환해서 반환
export function usePlanSchedule() {
  const { selectedArea, startDate, endDate, dailyPlans, setDailyPlans, selectedPlaces, setSelectedPlaces } =
    usePlanStore();

  // 날짜 기간으로 일정 초기화
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      if (dailyPlans.length !== daysDiff) {
        const initialPlans = Array.from({ length: daysDiff }, (_, index) => {
          const currentDate = new Date(start);
          currentDate.setDate(start.getDate() + index);

          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const day = String(currentDate.getDate()).padStart(2, "0");
          const planDate = `${year}.${month}.${day}`;

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

  // 장소 선택 초기화
  useEffect(() => {
    if (selectedPlaces.length > 0) {
      setSelectedPlaces([]);
    }
  }, []);

  // 변환된 데이터 반환
  const scheduleData = dailyPlans.map((plan) => ({
    ...plan,
    daylist: plan.places.map((place) => ({
      id: place.id,
      title: place.name,
      tag: place.category || "관광지",
    })),
  }));

  return {
    selectedArea,
    startDate,
    endDate,
    dailyPlans: scheduleData,
    isLoading: !selectedArea || !startDate || !endDate,
  };
}
