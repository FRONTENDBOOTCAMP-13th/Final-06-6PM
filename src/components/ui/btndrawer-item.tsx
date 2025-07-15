import { ChevronDown } from "lucide-react";

export default function BtnDrawerItem() {
  return (
    <div className="flex flex-col items-center w-full max-w-[428px] rounded-xl bg-white shadow p-4 gap-4">
      <ChevronDown className="w-6 h-6 text-travel-text100 mb-2" />

      <button
        className="w-full border border-travel-primary100 text-travel-primary100 rounded-md py-3 font-medium bg-white hover:bg-gray-50 transition"
        type="button"
      >
        게시글 수정하기
      </button>
      <button
        className="w-full rounded-md py-3 font-medium text-white bg-travel-primary100 hover:bg-travel-primary200 transition"
        type="button"
      >
        게시글 삭제하기
      </button>
    </div>
  );
}
