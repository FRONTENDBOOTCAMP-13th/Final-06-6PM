"use client";

import { Plus } from "lucide-react";
import PlanListItem, { PlanListItemProps } from "../ui/planListItem";
import ButtonRounded from "../ui/btnRound";

// Props 타입 정의
export interface DayListItem {
  id: number;
  title: string;
  tag: string;
}

interface FillScheduleCardProps {
  daylist: DayListItem[];
  day: number;
  onAddPlace: () => void;
}

export default function FillScheduleCard({ 
  daylist, 
  day, 
  onAddPlace 
}: FillScheduleCardProps) {

  return (
    // 나중에 지도 API 연동 예정
    <div className="w-full space-y-4 overflow-hidden rounded-2xl">
      {/* 지도 */}
      <div className="w-full bg-travel-gray200 rounded-2xl h-[240px] flex items-center justify-center">
        <div className="text-travel-gray500 text-center">
          <p className="text-sm">지도 영역</p>
          <p className="text-xs">(추후 구현 예정)</p>
        </div>
      </div>

      {/* planListItem 컴포넌트 사용 */}
      <div className="space-y-2">
        {daylist.map((item, index) => (
          <PlanListItem
            key={item.id}
            number={index + 1}
            place={item.title}  // title -> place 매핑
            tag={item.tag}
          />
        ))}
      </div>

      {/* 등록 버튼 */}
      <ButtonRounded
        size="md"
        variant="outline"
        className="flex items-center gap-1 mx-auto"
        onClick={onAddPlace}
      >
        <Plus className="size-4" color="currentColor" />
        <span>일정 추가하기</span>
      </ButtonRounded>
    </div>
  );
}