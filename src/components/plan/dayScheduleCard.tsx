"use client";

import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import FillScheduleCard from "@/components/plan/fillScheduleCard";
import { DayListItem } from "@/types/plan";
import EmptyScheduleCard from "@/components/plan/emptyScheduleCard";

export interface DayScheduleCardPlusProps {
  day: number;
  date: string;
  daylist?: DayListItem[];
  isPreview?: boolean;
  planId?: number;
  replyId?: number;
}

export default function DayScheduleCard({ day, date, daylist, isPreview = false, planId }: DayScheduleCardPlusProps) {
  const router = useRouter();

  const handleAddPlace = () => {
    // planId가 있으면 수정 모드
    if (planId) {
      router.push(`/plan/edit/search?targetDay=${day}&from=modify&postId=${planId}`);
    } else {
      // 일반 모드
      router.push(`/plan/edit/search?targetDay=${day}`);
    }
  };

  return (
    <div className="border-travel-gray200 w-full rounded-2xl border bg-white p-5 relative">
      <div className="mb-3 flex items-center gap-2">
        <CalendarDays className="h-4.5 w-4.5 -translate-y-0.5" />
        <h2 className="text-18 font-semibold">{day}일차</h2>
        <p className="text-14">({date})</p>
      </div>

      {daylist?.length ? (
        <FillScheduleCard daylist={daylist} day={day} onAddPlace={isPreview ? undefined : handleAddPlace} />
      ) : isPreview ? (
        <div className="text-travel-gray500 text-center py-4">등록된 일정이 없습니다.</div>
      ) : (
        <EmptyScheduleCard onAddPlace={handleAddPlace} />
      )}
    </div>
  );
}
