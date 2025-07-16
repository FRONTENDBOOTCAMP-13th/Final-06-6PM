import { CalendarDays, Plus } from "lucide-react";
import ScheduleRegister from "@/components/ui/scheduleRegister";


interface ScheduleRegisterPlusProps {
  day: number;
  date: string;
}

export default function ScheduleRegisterPlus({day, date}: ScheduleRegisterPlusProps) {
  return (
    <div className="w-full rounded-2xl border border-travel-gray200 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="text-xl w-4.5 h-4.5 -translate-y-0.5" />
        <h2 className="text-18 font-semibold">{day}일차</h2>
        <p className="text-14">({date})</p>
      </div>
      <ScheduleRegister />

    </div>
  );
}