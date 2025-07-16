"use client";

import LocationInfoCard from "@/components/ui/placePlus";
import SearchInput from "@/components/ui/search-input";
import TagItem from "@/components/ui/tagItem";
import { Bookmark, CalendarDays } from "lucide-react";
import { useState } from "react";

export default function TravelRegister2Page() {
  const [searchValueSm, setSearchValueSm] = useState("");

  return (
    <div className="">
      <SearchInput
        size="sm"
        placeholder="가고 싶은 국내 여행지를 검색해보세요."
        value={searchValueSm}
        onChange={(e) => setSearchValueSm(e.target.value)}
        
      />
      <div className="flex items-center gap-1 py-3">
        <TagItem>전체</TagItem>
        <TagItem variant="outline">맛집</TagItem>
        <TagItem variant="outline">행사</TagItem>
        <TagItem variant="outline">관광지</TagItem>
        <TagItem variant="outline">숙박</TagItem>
      </div>
      
      <div>
        <div className="flex items-center gap-2">
          <Bookmark className="w-4.5 h-4.5 -translate-y-0.5"/>
          <h2 className="text-18 font-semibold py-2">나의 북마크</h2>
        </div>
        <LocationInfoCard />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4.5 h-4.5 -translate-y-0.5"/>
          <h2 className="text-18 font-semibold py-2">제주도 모든 장소</h2>
        </div>
        <div className="flex flex-col gap-2">
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
        </div>
      </div>
      
    </div>
  );
}