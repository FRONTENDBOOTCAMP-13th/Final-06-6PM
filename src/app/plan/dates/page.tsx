import PlanCalendar from "@/components/plan/planCalendar";

// 여행날짜
export default function TravelPage() {
  return (
    <div className="flex flex-col justify-between">
      <div className="bg-gray-100 rounded-xl flex items-center justify-center mt-4">
        <PlanCalendar />
      </div>
    </div>
  );
}
