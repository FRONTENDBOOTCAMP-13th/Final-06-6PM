import React from "react";

interface DayItemProps {
  name?: string;
  period?: string;
  dday?: string;
  empty?: boolean;
}

export default function DayItem({
  name,
  period,
  dday,
  empty = false,
}: DayItemProps) {
  return (
    <div className="flex items-center justify-between w-full rounded-lg bg-white shadow p-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex flex-col min-w-0">
          <div className="text-16 text-travel-text100 font-medium truncate">
            {empty ? "예정된 여행이 없어요." : name}
          </div>
          <div className="text-12 text-travel-text100 mt-1 truncate">
            {empty ? "일정을 만들어보세요!" : period}
          </div>
        </div>
      </div>
      {!empty && dday && (
        <div className="px-4 py-1 rounded-full bg-travel-secondary200 text-white text-12 whitespace-nowrap">
          {dday}
        </div>
      )}
    </div>
  );
}
