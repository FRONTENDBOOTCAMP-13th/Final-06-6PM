import DayItem from "@/components/ui/dayItem";
import { getPlanDetail } from "@/data/functions/plan";
import { PlanReviewInfo } from "@/types/plan";
import { Map } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FeedPlanItemProps {
  planId: string;
}

export default function FeedPlanItem({ planId }: FeedPlanItemProps) {
  const [planReviewInfo, setPlanReviewInfo] = useState<PlanReviewInfo>({
    plan_id: 0,
    title: "",
    startDate: "",
    endDate: "",
  });

  // getPlanDetail
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const res = await getPlanDetail(Number(planId));
        console.log("res 데이터: ", res);
        if (res.ok) {
          setPlanReviewInfo({
            plan_id: Number(planId),
            title: res.item.title,
            startDate: res.item.extra.startDate,
            endDate: res.item.extra.endDate,
          });
        }
      } catch (error) {
        console.error("Plan 데이터 로드 실패:", error);
      }
    };

    if (planId) {
      fetchPlanData();
    }
  }, [planId]);

  return (
    <div className="py-4 space-y-4">
      <hr className="text-travel-gray300" />
      <h3 className="flex items-center gap-2 text-travel-text100">
        <Map className="size-5" />
        <span className="font-semibold">관련된 여행 일정 바로가기</span>
      </h3>
      <Link href={`/plan/${planId}`} title="여행 일정 상세보기" aria-label="여행 일정 상세보기">
        <DayItem place={planReviewInfo.title} period={`${planReviewInfo.startDate} ~ ${planReviewInfo.endDate}`} />
      </Link>
    </div>
  );
}
