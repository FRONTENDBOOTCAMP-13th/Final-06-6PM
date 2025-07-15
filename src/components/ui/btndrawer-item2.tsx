import { ChevronDown } from "lucide-react";

export default function BtnDrawerItem2() {
  return (
    <div className="flex flex-col items-center w-full max-w-[428px] rounded-xl bg-white shadow p-4 gap-4">
      <ChevronDown className="w-6 h-6 text-travel-text100 mb-2" />

      <div className="w-full text-base font-bold text-travel-text100 mb-2">
        선택한 지역명
      </div>

      <button
        className="w-full rounded-md py-3 font-medium text-white bg-travel-primary100 hover:bg-travel-primary200 transition"
        type="button"
      >
        사진 선택하기
      </button>
    </div>
  );
}
