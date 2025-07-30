import BackButton from "@/components/feature/backButton";
import Navbar from "@/components/Navbar";
import PlanDetailContent from "@/components/plan/planDetailContent";

export default function PlanDetailPage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/mypage" />
        <p className="text-center">여행일정 살펴보기</p>
      </div>

      <PlanDetailContent />
      <Navbar />
    </div>
  );
}
