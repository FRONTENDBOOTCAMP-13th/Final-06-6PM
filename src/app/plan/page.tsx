import BackButton from "@/components/feature/backButton";
import PlanRegion from "@/components/form/plan/planRegion";

// 여행계획
export default function PlanPage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/home" />
        <h1 className="text-center">여행일정만들기</h1>
      </div>
      <div className="relative w-full px-4 pb-25">
        <h2 className="text-28 text-travel-primary200 font-semibold">어디로 여행을 떠나시나요?</h2>
        <PlanRegion />
      </div>
    </div>
  );
}
