import { Plus } from "lucide-react";
import ButtonRounded from "@/components/ui/btnRound";

export default function ScheduleRegister() {
  return (
    <div className="w-full bg-travel-bg100 rounded-2xl shadow-lg py-4">
      {/* 일정을 등록해주세용 */}
      <div className=" text-center">
        <h2 className="text-20 mb-4 text-travel-text200">
          일정을 등록해주세요.
        </h2>
      </div>

      {/* 등록 버튼 */}
      <div className=" flex justify-center">
        <ButtonRounded
          size="lg"
          variant="fill"
          className="flex items-center gap-1"
        >
          <Plus className="text-white w-4 h-4" />
          일정 등록하기
        </ButtonRounded>
      </div>
    </div>
  );
}
