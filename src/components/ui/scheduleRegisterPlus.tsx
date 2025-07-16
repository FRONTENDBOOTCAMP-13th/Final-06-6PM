import { CalendarDays, Plus } from "lucide-react";
import ScheduleRegister from "@/components/ui/scheduleRegister";

export default function ScheduleRegisterPlus() {
  return (
    <div className="w-full rounded-2xl border border-travel-gray200 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="text-xl w-4.5 h-4.5 -translate-y-0.5" />
        <h2 className="text-18 font-semibold">1일차</h2>
        <p className="text-14">(2025.05.08)</p>
      </div>
      <ScheduleRegister />

    </div>
  );
}