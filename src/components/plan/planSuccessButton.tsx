"use client";
import ButtonRounded from "@/components/ui/btnRound";
import Link from "next/link";
import usePlanStore from "@/zustand/planStore";
import { useSearchParams } from "next/navigation";

export default function PlanSuccessButtons() {
  const postId = usePlanStore((state) => state.postId);
  const searchParams = useSearchParams();
  const urlPostId = searchParams.get("postId");
  const finalPostId = urlPostId || postId;

  return (
    <div className="flex flex-col gap-3 items-center w-full max-w-xs px-4">
      {/* finalPostId가 있으면 해당 일정 상세 페이지로, 없으면 마이페이지로 */}
      <Link href={finalPostId ? `/plan/${finalPostId}` : "/mypage"} className="w-full">
        <ButtonRounded variant="primary" size="lg" className="w-full">
          등록한 여행 일정 보러가기
        </ButtonRounded>
      </Link>

      <Link href="/" className="w-full">
        <ButtonRounded variant="outline" size="lg" className="w-full">
          홈으로 돌아가기
        </ButtonRounded>
      </Link>
    </div>
  );
}
