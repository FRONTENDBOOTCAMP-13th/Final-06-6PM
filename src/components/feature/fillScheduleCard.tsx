"use client";

import { Plus } from "lucide-react";
import PlanListItem from "@/components/ui/planListItem";
import ButtonRounded from "@/components/ui/btnRound";
import { DayListItem } from "@/types/plan";
import NaverMap from "@/components/plan/naverMap";

interface FillScheduleCardProps {
  daylist: DayListItem[];
  day: number;
  onAddPlace?: () => void;
}

export default function FillScheduleCard({ daylist, day, onAddPlace }: FillScheduleCardProps) {
  return (
    <div className="w-full space-y-4 overflow-hidden rounded-2xl">
      {/* 네이버 지도 하드코딩 */}
      <div className="w-full rounded-2xl overflow-hidden">
        <NaverMap height="240px" center={{ lat: 37.5665, lng: 126.978 }} zoom={15} />
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
