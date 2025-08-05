"use client";

import { Plus } from "lucide-react";
import PlanListItem from "@/components/plan/planListItem";
import ButtonRounded from "@/components/ui/btnRound";
import NaverMap from "@/components/plan/naverMap";
import usePlanStore from "@/zustand/planStore";
import useUserStore from "@/zustand/userStore";
import { updateReply } from "@/data/actions/plan";
import { useState } from "react";

interface FillScheduleCardProps {
  day: number;
  onAddPlace?: () => void;
  isPreview?: boolean;
}

export default function FillScheduleCard({ day, onAddPlace, isPreview = false }: FillScheduleCardProps) {
  // 해당 일차의 데이터 가져오기
  const { dailyPlans, removePlaceFromDailyPlan, postId } = usePlanStore();
  const accessToken = useUserStore((state) => state.token);
  const [isUpdating, setIsUpdating] = useState(false);

  // 현재 일차의 계획 찾기
  const currentDayPlan = dailyPlans.find((plan) => plan.day === day);
  const daylist = currentDayPlan?.places || [];

  // 장소 제거 함수
  const handleRemovePlace = async (placeId: number) => {
    if (isUpdating) return;

    // 수정 페이지 서버 업데이트
    if (!isPreview && currentDayPlan?.replyId && postId && accessToken) {
      setIsUpdating(true);

      try {
        removePlaceFromDailyPlan(day, placeId);
        const updatedPlaces = daylist.filter((place) => place.id !== placeId);

        // 서버에 업데이트
        const formData = new FormData();
        formData.append("content", `${day}일차`);
        formData.append("postId", postId.toString());
        formData.append("replyId", currentDayPlan.replyId.toString());
        formData.append("accessToken", accessToken);
        formData.append("day", day.toString());
        formData.append("planDate", currentDayPlan.planDate);
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
          alert("장소 삭제에 실패했습니다.");
          window.location.reload();
        }
      } catch (error) {
        console.error("장소 삭제 중 오류:", error);
        alert("오류가 발생했습니다.");
        window.location.reload();
      } finally {
        setIsUpdating(false);
      }
    } else {
      removePlaceFromDailyPlan(day, placeId);
    }
  };

  // 지도용 장소 데이터 변환
  const mapPlaces = daylist
    .map((place) => {
      // 유효한 좌표가 있는 경우만 반환
      if (place.mapy && place.mapx) {
        return {
          id: place.id,
          title: place.name,
          lat: place.mapy,
          lng: place.mapx,
          tag: place.category,
        };
      }
      return null;
    })
    .filter((place): place is NonNullable<typeof place> => place !== null);

  return (
    <div className="w-full space-y-4 overflow-hidden rounded-2xl">
      {/* 네이버 지도 */}
      <div className="w-full rounded-2xl overflow-hidden">
        <NaverMap height="240px" places={mapPlaces} />
      </div>

      {/* planListItem 컴포넌트 사용 - 미리보기가 아닐 때만 X 버튼 표시 */}
      <div className="space-y-2">
        {daylist.map((place, index) => (
          <PlanListItem
            key={`${day}-${place.id}-${index}`}
            number={index + 1}
            place={place.name}
            tag={place.category}
            showDeleteButton={!isPreview}
            onDelete={!isPreview ? () => handleRemovePlace(place.id) : undefined}
          />
        ))}
      </div>

      {/* onAddPlace가 있을 때만 버튼보임 */}
      {onAddPlace && (
        <ButtonRounded size="md" variant="outline" className="flex items-center gap-1 mx-auto" onClick={onAddPlace}>
          <Plus className="size-4" color="currentColor" />
          <span>일정 추가하기</span>
        </ButtonRounded>
      )}
    </div>
  );
}
