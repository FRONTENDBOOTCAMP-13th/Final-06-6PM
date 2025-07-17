"use client";

import { Plus } from "lucide-react";
import PlanListItem, { PlanListItemProps } from "../ui/planListItem";
import ButtonRounded from "../ui/btnRound";

export default function PlanList() {
  const planListDataArray: PlanListItemProps[] = [
    { id: 1, place: "성산일출봉", tag: "관광지" },
    { id: 2, place: "성산일출봉", tag: "관광지" },
  ];

  const plusPlan = () => {
    console.log("일정 등록하기");
  };

  return (
    // 나중에 지도 API 연동 예정
    <div className="w-full space-y-4 overflow-hidden rounded-2xl">
      {/* 지도 */}
      <div className="w-full bg-travel-gray200 rounded-2xl h-[240px]"></div>

      {/* planListItem 컴포넌트 사용 */}
      <div className="space-y-2">
        {planListDataArray.map((item, index) => (
          <PlanListItem
            key={item.id}
            number={index + 1}
            place={item.place}
            tag={item.tag}
          />
        ))}
      </div>

      {/* 등록 버튼 */}
      <ButtonRounded
        size="md"
        variant="outline"
        className="flex items-center gap-1 mx-auto"
        onClick={() => {
          plusPlan();
        }}
      >
        <Plus className="size-4" color="currentColor" />
        <span>일정 등록하기</span>
      </ButtonRounded>
    </div>
  );
}
