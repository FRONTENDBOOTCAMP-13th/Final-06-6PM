import React from "react";
import DropdownItem from "@/components/ui/dropdownItem";
import TagItem from "@/components/ui/tagItem";
import SelectMenu3 from "@/components/ui/selectMenu3";
import SelectMenu2 from "@/components/ui/selectMenu2";
import LocationInfoCard from "@/components/ui/placePlus";

// 마이페이지/북마크
export default function MypageBookmarkPage() {
  return (
    <>
      <h2>마이페이지/북마크</h2>
      <div className="flex items-center mt-2">
        <DropdownItem label="전체도시" />
        <div className="flex flex-start items-center gap-2 before:content-['|'] before:ml-2 before:text-travel-gray400 ">
          <TagItem>전체</TagItem>
          <TagItem variant="outline">맛집</TagItem>
          <TagItem variant="outline">행사</TagItem>
          <TagItem variant="outline">축제</TagItem>
        </div>
      </div>
      <h3 className="mt-4">전체 도시</h3>
      <div className="p-4">
        <div className="w-full flex text-center justify-center mt-6">
          <SelectMenu2 />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
          <LocationInfoCard />
        </div>
      </div>
    </>
  );
}
