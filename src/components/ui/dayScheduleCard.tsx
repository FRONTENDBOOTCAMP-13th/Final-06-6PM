"use client";

import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import EmptyScheduleCard from "@/components/feature/emptyScheduleCard";
import FillScheduleCard from "@/components/feature/fillScheduleCard";
import { DayListItem } from "@/types/plan";

export interface DayScheduleCardPlusProps {
  day: number;
  date: string;
  daylist?: DayListItem[];
  isPreview?: boolean;
}

export default function DayScheduleCard({ day, date, daylist, isPreview = false }: DayScheduleCardPlusProps) {
  const router = useRouter();

  const handleAddPlace = () => {
    router.push(`/plan/edit/search?targetDay=${day}`);
  };

  return (
    <div className="border-travel-gray200 w-full rounded-2xl border bg-white p-5">
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
