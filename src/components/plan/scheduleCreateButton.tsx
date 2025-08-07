"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/btn";
import { SquarePen } from "lucide-react";

interface ScheduleCreateButtonProps {
  planData: any;
  className?: string;
}

export default function ScheduleCreateButton({ planData, className = "" }: ScheduleCreateButtonProps) {
  const router = useRouter();

  const handleGoToSchedulePage = () => {
    if (!planData) {
      alert("데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    router.push("/plan/edit/schedule");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-15 bg-white rounded-lg">
      <div className="text-center mb-5">
        <p className="text-18 font-semibold text-travel-gray700 mb-2">아직 여행 일정이 없습니다.</p>
        <p className="text-14 text-travel-gray500">일정을 만들어 여행을 계획해보세요!</p>
      </div>
      <Button onClick={handleGoToSchedulePage} variant="primary" className="flex items-center gap-2 px-10">
        <SquarePen />
        일정 만들기
      </Button>
    </div>
  );
}
