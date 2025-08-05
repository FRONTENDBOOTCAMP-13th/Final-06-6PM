"use client";

import { useState, useEffect } from "react";
import usePlanStore from "@/zustand/planStore";
import { categories } from "@/lib/data/categoryList";
import PlaceCard from "@/components/plan/placeCard";
import PlaceCardSkeleton from "@/components/mypage/placeCardSkeleton";

interface CategoryPlaceListProps {
  keyword: string;
  isSearching: boolean;
  onItemClick: (contentId: string | number) => void;
  onItemAdd: (data: any) => void;
}

export default function CategoryPlaceList({ keyword, isSearching, onItemClick, onItemAdd }: CategoryPlaceListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { filteredData, selectedCategory, searchList } = usePlanStore();

  // filteredData가 변경되면 로딩 완료
  useEffect(() => {
    if (filteredData) {
      setIsLoading(false);
    }
  }, [filteredData]);

  // 카테고리 변경시 잠시 로딩
  useEffect(() => {
    setIsLoading(true);
    // 짧은 시간 후 로딩 완료
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const selectedCategoryInfo = categories.find((c) => c.id === selectedCategory);

  // 검색 중이거나, 검색 결과가 있거나, 검색어가 있으면 장소 표시x
  if (isSearching || searchList.length > 0 || keyword) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-3">
        {isLoading ? (
          <>
            <PlaceCardSkeleton />
            <PlaceCardSkeleton />
            <PlaceCardSkeleton />
            <PlaceCardSkeleton />
            <PlaceCardSkeleton />
          </>
        ) : (
          filteredData.map((data) => {
            return (
              <PlaceCard
                key={data.contentid}
                item={data}
                onClick={() => onItemClick(data.contentid)}
                onAdd={() => onItemAdd(data)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
