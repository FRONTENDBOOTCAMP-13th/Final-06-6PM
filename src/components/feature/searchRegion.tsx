"use client";

import { useState } from "react";
import SearchInput from "@/components/form/searchInput";
import { Destination } from "@/lib/data/destinationList";
import DestinationCard from "@/components/feature/destinationCard";

interface SearchRegionProps {
  regions: Destination[];
  onRegionClick: (name: string, areaCode: number) => void;
}

export default function SearchRegion({
  regions,
  onRegionClick,
}: SearchRegionProps) {
  const [search, setSearch] = useState("");

  // 지역 목록 필터링
  const filteredRegions = regions.filter((region) => {
    const nameMatch = region.name.includes(search);
    const keywordMatch =
      region.keywords?.some((keyword: string) => keyword.includes(search)) ||
      false;
    return nameMatch || keywordMatch;
  });

  // 사용자가 입력할 때마다 호출
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  // 지역 목록 검색 렌더링
  const renderRegionList = () => (
    <div className="grid grid-cols-2 gap-5 py-5">
      {filteredRegions.map((region) => (
        <DestinationCard
          key={region.areaCode}
          destination={region}
          onClick={() => onRegionClick(region.name, region.areaCode)}
        />
      ))}
    </div>
  );

  return (
    <div className="pt-3">
      <SearchInput
        size="md"
        placeholder="가고 싶은 국내 여행지를 검색해보세요"
        onSearch={handleSearch}
      />
      {renderRegionList()}
      {filteredRegions.length === 0 && search && (
        <div className="pb-4 text-center text-travel-gray500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
