"use client";

import DropdownItem from "@/components/ui/dropdownItem";
import SearchInput from "@/components/ui/search-input";
import TagItem from "@/components/ui/tagItem";
import { useState } from "react";

// 살펴보기 게시판 목록
export default function FeedPage() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <SearchInput
        size="md"
        placeholder="가고 싶은 국내 여행지의 리뷰를 살펴보세요"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="flex items-center">
        <DropdownItem label="오래된순" />
        <div className="flex items-center gap-1 ">
          <TagItem>전체</TagItem>
          <TagItem variant="outline">관광지</TagItem>
        </div>
      </div>
      <div>sdfsdf</div>
      <div className="flex flex-col gap-8"></div>
    </>
  );
}
