"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/btn";
import { createReply } from "@/data/actions/plan";
import useUserStore from "@/zustand/userStore";
import usePlanStore from "@/zustand/planStore";

export default function PlanReplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // URL 경로로 수정 모드 판단
  const isModifyMode = pathname.includes("/modify");

  const { postId, dailyPlans, clearAllData } = usePlanStore();
  const accessToken = useUserStore((state) => state.token);

  const handleSubmit = async () => {
    // 단순히 완료처리
    if (isModifyMode) {
      router.push(`/plan/${postId}`);
      return;
    }

    if (!postId) {
      alert("게시물 정보가 없습니다.");
      return;
    }

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (dailyPlans.length === 0) {
      alert("등록할 일정이 없습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 일차별 계획 등록 (새 일정만)
      for (const plan of dailyPlans) {
        const formData = new FormData();

        formData.append("content", `${plan.day}일차`);
        formData.append("postId", postId.toString());
        formData.append("accessToken", accessToken);
        formData.append("day", plan.day.toString());
        formData.append("planDate", plan.planDate);
        formData.append(
          "locations",
          JSON.stringify(
            plan.places.map((place) => ({
              title: place.name,
              types: place.category || "관광지",
              contentId: place.id.toString(),
              mapx: place.mapx || "",
              mapy: place.mapy || "",
            })),
          ),
        );

        const result = await createReply(null, formData);

        if (!result.ok) {
          alert(`${plan.day}일차 일정 등록에 실패했습니다: ${result.message}`);
          setIsSubmitting(false);
          return;
        }
      }

      // 성공 페이지로 이동
      router.push(`/plan/success?postId=${postId}`);

      // clearAllData();
    } catch (error) {
      console.error("일정 처리 에러:", error);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 bg-white shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || (!isModifyMode && (!postId || dailyPlans.length === 0))}
        className="w-full text-16"
      >
        {isSubmitting ? "저장 중..." : isModifyMode ? "수정 완료" : "일정 선택 완료"}
      </Button>
    </div>
  );
}
