"use client";

import { useState } from "react";
import PlaceCard from "@/components/feature/placeCard";
import usePlanStore from "@/zustand/planStore";
import { categories } from "@/lib/data/categoryList";

interface CategoryPlaceListProps {
  keyword: string;
  isSearching: boolean;
  onItemClick: (contentId: string | number) => void;
  onItemAdd: (data: any) => void;
}

export default function CategoryPlaceList({ keyword, isSearching, onItemClick, onItemAdd }: CategoryPlaceListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { filteredData, selectedCategory, searchList } = usePlanStore();

  const selectedCategoryInfo = categories.find((c) => c.id === selectedCategory);

  // 검색 중이거나, 검색 결과가 있거나, 검색어가 있으면 장소 표시x
  if (isSearching || searchList.length > 0 || keyword) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-3">
        {isLoading ? (
          <div className="py-8 text-center text-gray-500">
            <p>로딩 중...</p>
          </div>
        ) : filteredData.length > 0 ? (
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
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>
              등록된 {selectedCategoryInfo?.name === "전체" ? "장소가" : `${selectedCategoryInfo?.name}이`} 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
