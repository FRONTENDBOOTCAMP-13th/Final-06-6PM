"use client";

import Button from "@/components/ui/btn";
import TagItem from "@/components/feature/tagItem";
import { useRouter } from "next/navigation";
import { SearchNavProps } from "@/types/plan";
import usePlanStore from "@/zustand/planStore";

export default function SearchNav({ path, tagData, onRemoveTag }: SearchNavProps) {
  const { addPlaceToDailyPlan, setSelectedPlaces } = usePlanStore();
  const router = useRouter();

  const handleRemove = (id: number) => {
    onRemoveTag?.(id);
  };

  const goNextPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const targetDay = parseInt(searchParams.get("targetDay") || "1");

    // selectedPlaces를 해당 날짜의 dailyPlans에 추가
    tagData.forEach((place) => {
      addPlaceToDailyPlan(targetDay, place);
    });

    // selectedPlaces 초기화 (태그 제거)
    setSelectedPlaces([]);

    router.push(path);
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

      <Button onClick={goNextPage} className="text-16 w-full">
        일정 선택 완료
      </Button>
    </div>
  );
}
