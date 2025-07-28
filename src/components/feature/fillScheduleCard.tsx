"use client";

import { Plus } from "lucide-react";
import PlanListItem from "@/components/ui/planListItem";
import ButtonRounded from "@/components/ui/btnRound";

export interface DayListItem {
  id: number;
  title: string;
  tag: string;
}

interface FillScheduleCardProps {
  daylist: DayListItem[];
  day: number;
  onAddPlace?: () => void;
}

export default function FillScheduleCard({ daylist, day, onAddPlace }: FillScheduleCardProps) {
  return (
    // 나중에 지도 API 연동 예정
    <div className="w-full space-y-4 overflow-hidden rounded-2xl">
      <div className="w-full bg-travel-gray200 rounded-2xl h-[240px] flex items-center justify-center">
        <div className="text-travel-gray500 text-center">
          <p className="text-14">지도 영역</p>
          <p className="text-12">(추후 구현 예정)</p>
        </div>
      </div>

      {/* planListItem 컴포넌트 사용 */}
      <div className="space-y-2">
        {daylist.map((item, index) => (
          <PlanListItem key={`${day}-${item.id}-${index}`} number={index + 1} place={item.title} tag={item.tag} />
        ))}
      </div>

      {/* onAddPlace가 있을 때만 버튼 렌더링 */}
      {onAddPlace && (
        <ButtonRounded size="md" variant="outline" className="flex items-center gap-1 mx-auto" onClick={onAddPlace}>
          <Plus className="size-4" color="currentColor" />
          <span>일정 추가하기</span>
        </ButtonRounded>
      )}
    </div>
  );
}
