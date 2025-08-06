import BackButton from "@/components/feature/backButton";
import Navbar from "@/components/Navbar";
import PlanDetailContent from "@/components/plan/planDetailContent";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;

  return {
    title: "친구가 공유한 여행 일정 보기",
    description: "친구가 공유한 여행 일정을 확인해보세요. 여행지, 기간, 장소까지 한눈에!",
    openGraph: {
      title: "친구가 공유한 여행 일정 보기",
      description: "친구가 공유한 여행 일정을 확인해보세요. 여행지, 기간, 장소까지 한눈에!",
      url: `https://final-6-6-pm.vercel.app/plan/${id}`,
    },
  };
}

export default function PlanDetailPage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/mypage" />
        <h1 className="text-center">여행일정 살펴보기</h1>
      </div>
      <PlanDetailContent />
      <Navbar />
    </div>
  );
}
