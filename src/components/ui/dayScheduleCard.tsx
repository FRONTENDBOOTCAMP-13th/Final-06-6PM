"use client";

import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import EmptyScheduleCard from "@/components/feature/emptyScheduleCard";
import FillScheduleCard from "@/components/feature/fillScheduleCard";

export interface DayListItem {
  id: number;
  title: string;
  tag: string;
}

export interface DayScheduleCardPlusProps {
  day: number;
  date: string;
  daylist?: DayListItem[];
}

export default function DayScheduleCard({ day, date, daylist }: DayScheduleCardPlusProps) {
  const router = useRouter();

  const handleAddPlace = () => {
    // 검색 페이지로 이동하면서 어느 날짜에 추가할지 전달
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
        <FillScheduleCard daylist={daylist} day={day} onAddPlace={handleAddPlace} />
      ) : (
        <EmptyScheduleCard onAddPlace={handleAddPlace} />
      )}
    </div>
  );
}
