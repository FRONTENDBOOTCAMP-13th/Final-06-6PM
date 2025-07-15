"use client";

import DropdownItem from "@/components/ui/dropdownItem";
import SearchInput from "@/components/ui/search-input";
import TagItem from "@/components/ui/tagItem";
import ViewItem from "@/components/ui/viewItem";
import { useState } from "react";

// 살펴보기 게시판 목록
export default function FeedPage() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      {/* 검색바 */}
      <SearchInput
        size="sm"
        placeholder="가고 싶은 국내 여행지의 리뷰를 살펴보세요"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* 셀렉트창 및 필터 */}
      <div className="flex items-center mt-2">
        <DropdownItem label="오래된순" />
        <div className="flex flex-start items-center gap-2 before:content-['|'] before:ml-2 before:text-travel-gray400 ">
          <TagItem>전체</TagItem>
          <TagItem variant="outline">전체리뷰</TagItem>
          <TagItem variant="outline">일별리뷰</TagItem>
          <TagItem variant="outline">장소별리뷰</TagItem>
        </div>
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-8 mt-7">
        <ViewItem
          userName={"닉네임"}
          imgURL={"/gwak.png"}
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
        <ViewItem
          userName={"닉네임"}
          imgURL={"/gwak.png"}
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
        <ViewItem
          userName={"닉네임"}
          imgURL={"/gwak.png"}
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
    </>
  );
}
