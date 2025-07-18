import { CalendarDays } from "lucide-react";
import PlanList from "@/components/ui/planList";

export interface DayListItem {
  id: number;
  title: string;
  tag: string;
 }

export interface ScheduleRegisterPlusProps {
  day: number;
  date: string;
  daylist?: DayListItem[];
}

export default function ScheduleView({
  day,
  date,
  daylist,
}: ScheduleRegisterPlusProps) {
  return (
    <div className="w-full rounded-2xl border border-travel-gray200 bg-white p-5">
      <div className="flex items-center gap-2">
        <CalendarDays className="w-4.5 h-4.5 -translate-y-0.5" />
        <h2 className="text-18 font-semibold">{day}일차</h2>
        <p className="text-14">({date})</p>
      </div>

      {daylist?.length && <PlanList />}
    </div>
  );
}
