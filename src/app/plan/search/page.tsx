"use client";

import Button from "@/components/ui/btn";
import LocationInfoCard from "@/components/ui/placePlus";
import SearchInput from "@/components/ui/searchInput";
import TagItem from "@/components/ui/tagItem";
import { Bookmark, CalendarDays, Search } from "lucide-react";
import { useState } from "react";

export default function TravelRegister2Page() {
  const [searchValueSm, setSearchValueSm] = useState("");

  return (
    <div className="">
      <SearchInput
        size="md"
        placeholder="가고 싶은 국내 여행지를 검색해보세요."
        value={searchValueSm}
        onChange={(e) => setSearchValueSm(e.target.value)}
        className="my-2"
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
          <Bookmark className="w-4.5 h-4.5 -translate-y-0.5" />
          <h2 className="text-18 font-semibold py-2">나의 북마크</h2>
        </div>
        <p className="text-16 text-travel-text100">저장된 북마크가 없습니다.</p>
        <LocationInfoCard />
        <Button variant="outline" className="text-14 my-2">
          북마크 더보기
        </Button>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4.5 h-4.5 -translate-y-0.5" />
          <h2 className="text-18 font-semibold py-2">제주도 모든 장소</h2>
        </div>
        <div className="flex flex-col gap-2">
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
        </div>

        <div className="flex flex-col items-center justify-center mt-3 gap-1">
          <Search className="w-6 h-6" />
          <h3 className="text-18 font-semibold text-gray-700">
            검색 결과가 없습니다.
          </h3>
          <p className="text-14 text-travel-text100 ">
            내가 찾는 장소가 없나요? 직접 등록해보세요.
          </p>
          <Button variant="outline">주소로 등록하기</Button>
        </div>
      </div>
    </div>
  );
}
