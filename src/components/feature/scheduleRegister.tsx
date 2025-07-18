"use client";

import { Plus } from "lucide-react";
import ButtonRounded from "@/components/ui/btnRound";

export default function ScheduleRegister() {
  const plusPlan = () => {
    console.log("일정 등록하기");
  };
  return (
    <div className="w-full py-8 bg-white border rounded-2xl border-travel-gray200">
      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-travel-text100">일정을 등록해주세요.</h2>

        {/* 등록 버튼 */}
        <ButtonRounded
          size="md"
          variant="fill"
          className="flex items-center gap-1 mx-auto"
          onClick={() => {
            plusPlan();
          }}
        >
          <Plus className="size-4" color="currentColor" />
          <span>일정 등록하기</span>
        </ButtonRounded>
      </div>
    </div>
  );
}
