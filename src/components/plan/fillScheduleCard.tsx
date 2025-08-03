"use client";

import { Plus } from "lucide-react";
import PlanListItem from "@/components/plan/planListItem";
import ButtonRounded from "@/components/ui/btnRound";
import NaverMap from "@/components/plan/naverMap";
import usePlanStore from "@/zustand/planStore";

interface FillScheduleCardProps {
  day: number;
  onAddPlace?: () => void;
}

export default function FillScheduleCard({ day, onAddPlace }: FillScheduleCardProps) {
  // 해당 일차의 데이터 가져오기
  const { dailyPlans } = usePlanStore();

  // 현재 일차의 계획 찾기
  const currentDayPlan = dailyPlans.find((plan) => plan.day === day);
  const daylist = currentDayPlan?.places || [];

  // 지도용 장소 데이터 변환
  const mapPlaces = daylist
    .map((place) => {
      // 유효한 좌표가 있는 경우만 반환
      if (place.mapy && place.mapx) {
        return {
          id: place.id,
          title: place.name,
          lat: place.mapy,
          lng: place.mapx,
          tag: place.category,
        };
      }
      return null;
    })
    .filter((place): place is NonNullable<typeof place> => place !== null);

  return (
    <div className="w-full space-y-4 overflow-hidden rounded-2xl">
      {/* 네이버 지도 */}
      <div className="w-full rounded-2xl overflow-hidden">
        <NaverMap height="240px" places={mapPlaces} zoom={daylist.length > 1 ? 10 : 14} />
      </div>

      {/* planListItem 컴포넌트 사용 */}
      <div className="space-y-2">
        {daylist.map((place, index) => (
          <PlanListItem
            key={`${day}-${place.id}-${index}`}
            number={index + 1}
            place={place.name}
            tag={place.category}
          />
        ))}
      </div>

      {/* onAddPlace가 있을 때만 버튼보임 */}
      {onAddPlace && (
        <ButtonRounded size="md" variant="outline" className="flex items-center gap-1 mx-auto" onClick={onAddPlace}>
          <Plus className="size-4" color="currentColor" />
          <span>일정 추가하기</span>
        </ButtonRounded>
      )}
    </div>
  );
}
