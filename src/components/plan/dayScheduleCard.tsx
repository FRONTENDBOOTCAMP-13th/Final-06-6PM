"use client";

import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import FillScheduleCard from "@/components/plan/fillScheduleCard";
import EmptyScheduleCard from "@/components/plan/emptyScheduleCard";
import usePlanStore from "@/zustand/planStore";

export interface DayScheduleCardPlusProps {
  day: number;
  date: string;
  isPreview?: boolean;
  planId?: number;
  replyId?: number;
}

export default function DayScheduleCard({ day, date, isPreview = false, planId }: DayScheduleCardPlusProps) {
  const router = useRouter();
  const { dailyPlans } = usePlanStore();

  const handleAddPlace = () => {
    if (planId) {
      router.push(`/plan/edit/search?targetDay=${day}&from=modify&postId=${planId}`);
    } else {
      router.push(`/plan/edit/search?targetDay=${day}`);
    }
  };

  // 해당 일차에 일정이 있는지 확인
  const currentDayPlan = dailyPlans.find((plan) => plan.day === day);
  const hasPlaces = currentDayPlan?.places?.length;

  return (
    <div className="border-travel-gray200 w-full rounded-2xl border bg-white p-5 relative">
      <div className="mb-3 flex items-center gap-2">
        <CalendarDays className="h-4.5 w-4.5 -translate-y-0.5" />
        <h2 className="text-18 font-semibold">{day}일차</h2>
        <p className="text-14">({date})</p>
      </div>
      {hasPlaces ? (
        <FillScheduleCard day={day} onAddPlace={isPreview ? undefined : handleAddPlace} isPreview={isPreview} />
      ) : isPreview ? (
        <div className="text-travel-gray500 text-center py-4">등록된 일정이 없습니다.</div>
      ) : (
        <EmptyScheduleCard onAddPlace={handleAddPlace} />
      )}
    </div>
  );
}
