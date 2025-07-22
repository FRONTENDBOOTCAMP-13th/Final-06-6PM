"use client";

import PlanCalendar from "@/components/feature/planCalendar";
import Button from "@/components/ui/btn";
import PlanRegion from "@/components/form/plan/planRegion";

export default function PlanDetailForm() {

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const planData = {
      startDate: sessionStorage.getItem('startDate'),
      endDate: sessionStorage.getItem('endDate'),
      location: sessionStorage.getItem('location'),
    };

  };

  return (
    <form onSubmit={formSubmit} className="grid grid-cols-1 gap-2 p-4">
      <PlanCalendar />
      <PlanRegion />
      <div className="bg-travel-bg100 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button className="w-full text-16" type="submit">
          여행 계획 저장
        </Button>
      </div>
    </form>
  );
}