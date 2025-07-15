import { Plus } from "lucide-react";
import ButtonRounded from "@/components/ui/btnRound";

export default function ScheduleRegister() {
  return (
    <div className="w-full rounded-2xl border border-travel-gray200 bg-white py-8">
      <div className="flex flex-col items-center">
        {/* 일정을 등록해주세용 */}
        <h2 className="text-16 mb-4 text-travel-text200">
          일정을 등록해주세요.
        </h2>
        {/* 등록 버튼 */}
        <ButtonRounded
          size="md"
          variant="fill"
          className="flex items-center gap-1"
        >
          <Plus className="text-white w-4 h-4 " />
          일정 등록하기
        </ButtonRounded>
      </div>
    </div>
  );
}
