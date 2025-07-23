"use client";

import Button from "@/components/ui/btn";
import { useRouter } from "next/navigation";

interface PlanDayFormProps {
  path?: string;
  onNext?: (stepData?: any) => void;
}

export default function NextButton({ path, onNext }: PlanDayFormProps) {
  const router = useRouter();

  const goNextPage = () => {
    if (onNext) return onNext();
    if (path) return router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 bg-white shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
      <Button 
        onClick={goNextPage}
        className="w-full text-16"
      >
        일정 선택 완료
      </Button>
    </div>
  );
}