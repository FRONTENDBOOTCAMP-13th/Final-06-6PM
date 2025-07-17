"use client";

import Button from "@/components/ui/Btn";
import { ChevronDown } from "lucide-react";

export default function drawerBtn() {
  const closeDrawer = () => {
    console.log("창 닫힘");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[430px] rounded-t-2xl bg-white shadow p-6 gap-4">
      <button onClick={() => closeDrawer()} className="cursor-pointer">
        <ChevronDown className="w-6 h-6 text-travel-text100 mb-2" />
      </button>

      <Button size="lg" variant="primary" className="w-full">
        게시글 수정하기
      </Button>
      <Button size="lg" variant="outline" className="w-full">
        게시글 삭제하기
      </Button>
    </div>
  );
}
