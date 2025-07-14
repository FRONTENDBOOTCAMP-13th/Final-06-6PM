import { Plus } from "lucide-react";
import ButtonRounded from "@/components/ui/btnRound";

const ScheduleRegister = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-travel-bg100 rounded-2xl shadow-lg">
      {/* 일정을 등록해주세용 */}
      <div className="px-6 py-4 text-center">
        <h2 className="text-20 text-travel-text200">일정을 등록해주세요.</h2>
      </div>

      {/* 등록 버튼 */}
      <div className="px-6 pb-6 flex justify-center">
        <ButtonRounded
          size="lg"
          variant="fill"
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          일정 등록하기
        </ButtonRounded>
      </div>
    </div>
  );
};

export default ScheduleRegister;
