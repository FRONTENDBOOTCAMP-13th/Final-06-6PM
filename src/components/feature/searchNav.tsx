"use client";

import { useState } from "react";
import Button from "@/components/ui/btn";
import TagItem from "@/components/feature/tagItem";
import { useRouter } from "next/navigation";
import { SearchNavProps } from "@/types/plan";
import usePlanStore from "@/zustand/planStore";
import { updateReply } from "@/data/actions/plan";
import useUserStore from "@/zustand/userStore";

export default function SearchNav({ path, tagData, onRemoveTag }: SearchNavProps) {
  const { addPlaceToDailyPlan, setSelectedPlaces, postId, dailyPlans } = usePlanStore();
  const accessToken = useUserStore((state) => state.token);
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRemove = (id: number) => {
    onRemoveTag?.(id);
  };

  const goNextPage = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const targetDay = parseInt(searchParams.get("targetDay") || "1");
    const fromParam = searchParams.get("from");
    const postIdParam = searchParams.get("postId");

    if (fromParam === "modify" && postIdParam) {
      setIsUpdating(true);

      try {
        // 해당 날짜의 계획 찾기
        const targetPlan = dailyPlans.find((plan) => plan.day === targetDay);

        if (targetPlan?.replyId && accessToken) {
          // Zustand 상태 업데이트
          tagData.forEach((place) => {
            addPlaceToDailyPlan(targetDay, place);
          });

          // 서버에 업데이트
          const formData = new FormData();
          const updatedPlaces = [...targetPlan.places, ...tagData];

          formData.append("content", `${targetPlan.day}일차`);
          formData.append("postId", postIdParam);
          formData.append("replyId", targetPlan.replyId.toString());
          formData.append("accessToken", accessToken);
          formData.append("day", targetPlan.day.toString());
          formData.append("planDate", targetPlan.planDate);
          formData.append(
            "locations",
            JSON.stringify(
              updatedPlaces.map((place) => ({
                title: place.name,
                types: place.category || "관광지",
                contentId: place.id.toString(),
                mapx: place.mapx || "",
                mapy: place.mapy || "",
              })),
            ),
          );

          const result = await updateReply(null, formData);

          if (!result.ok) {
            alert("서버 업데이트에 실패했습니다. 페이지를 새로고침합니다.");
            window.location.reload();
            return;
          }
        }

        // 성공하면 수정 페이지로 이동
        setSelectedPlaces([]);
        router.push(`/plan/${postIdParam}/modify`);
      } catch (error) {
        console.error("업데이트 중 오류:", error);
        alert("오류가 발생했습니다.");
      } finally {
        setIsUpdating(false);
      }
    } else {
      // 일반 모드
      tagData.forEach((place) => {
        addPlaceToDailyPlan(targetDay, place);
      });
      setSelectedPlaces([]);
      router.push(path);
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 bg-white p-4 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
      <div className="flex flex-wrap gap-2 pb-3">
        {tagData.map((place) => (
          <TagItem key={place.id} variant="outline" size="md" closeIcon onRemove={() => handleRemove(place.id)}>
            {place.name}
          </TagItem>
        ))}
      </div>

      <Button onClick={goNextPage} className="text-16 w-full" disabled={isUpdating}>
        {isUpdating ? "수정 중..." : "일정 선택 완료"}
      </Button>
    </div>
  );
}
