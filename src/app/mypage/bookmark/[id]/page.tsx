import React from "react";
import DropdownItem from "@/components/ui/dropdownItem";
import TagItem from "@/components/ui/tagItem";
import SelectMenu2 from "@/components/feature/selectMenu2";
import ViewItem from "@/components/feature/viewItem";

// 마이페이지/북마크
export default function MypageBookmarkPage() {
  return (
    <>
      {/* 셀렉트창 및 필터 */}
      <div className="flex flex-col-reverse xs:flex-row items-start xs:items-center gap-y-1 mt-2 px-0.5">
        <DropdownItem label="전체도시" />
        <div className="flex flex-wrap flex-start items-center gap-2 before:hidden xs:before:block before:content-['|'] before:ml-2 before:text-travel-gray400 ">
          <TagItem>전체</TagItem>
          <TagItem variant="outline">맛집</TagItem>
          <TagItem variant="outline">행사</TagItem>
          <TagItem variant="outline">축제</TagItem>
        </div>
      </div>

      <h3 className="my-4 font-semibold">전체 도시</h3>
      <div className=" bg-white shadow-xl rounded-2xl overflow-hidden">
        <SelectMenu2 />

        <div className="m-4 grid grid-cols-1 gap-2 shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-2xl">
          <ViewItem
            userName={"닉네임"}
            userImgURL={"/gwak.png"}
            location={"제주도"}
            content={
              "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 "
            }
            tags={["맛집", "#좋아요", "몰라"]}
            views={200}
            likes={100}
            comments={100}
            date={"2025-07-15"}
          />
        </div>
      </div>
    </>
  );
}
