"use client";

import Button from "@/components/ui/btn";
import { ChevronDown } from "lucide-react";

export default function DrawerSelectImg() {
  const closeDrawer = () => {
    console.log("창 닫힘");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[430px] rounded-t-2xl bg-white shadow p-6 gap-4">
      <button onClick={closeDrawer} className="cursor-pointer">
        <ChevronDown className="w-6 h-6 text-travel-text100 mb-2" />
      </button>
      <div className="w-full text-base font-medium text-travel-text100 mb-2">
        선택한 지역명
      </div>
      <Button size="lg" variant="primary" className="w-full">
        사진 선택하기
      </Button>
    </div>
  );
}
