"use client";
import { useState } from "react";
import DropdownItem from "@/components/feature/dropdownItem";
import TagItem from "@/components/feature/tagItem";
import SelectBookmark from "@/components/mypage/selectBookmark";

type SortType = "latest" | "oldest";

export default function BookmarkContent() {
  const [sortType, setSortType] = useState<SortType>("latest");

  const handleSortChange = (type: SortType) => {
    setSortType(type);
  };

  return (
    <>
      {/* 셀렉트창 및 필터 */}
      <div className="flex flex-col-reverse xs:flex-row items-start xs:items-center gap-y-1 mt-2 px-0.5">
        <DropdownItem currentSort={sortType} onSortChange={handleSortChange} />
        <div className="flex flex-wrap flex-start items-center gap-2 before:hidden xs:before:block before:content-['|'] before:ml-2 before:text-travel-gray400 ">
          <TagItem>전체</TagItem>
          <TagItem variant="outline">맛집</TagItem>
          <TagItem variant="outline">행사</TagItem>
          <TagItem variant="outline">축제</TagItem>
        </div>
      </div>
      <h3 className="my-4 font-semibold">전체 도시</h3>
      <div className="overflow-hidden bg-white rounded-2xl">
        <SelectBookmark sortType={sortType} />
      </div>
    </>
  );
}
