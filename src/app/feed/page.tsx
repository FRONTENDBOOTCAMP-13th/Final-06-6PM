"use client";

import ModalItem from "@/components/Modal";
import DropdownItem from "@/components/ui/dropdownItem";
import SearchInput from "@/components/ui/search-input";
import TagItem from "@/components/ui/tagItem";
import ViewItem, { ViewItemProps } from "@/components/ui/viewItem";
import { useState } from "react";

// 더미데이터
const dummyData: ViewItemProps[] = [
  {
    userName: "주먹밥쿵야",
    userImgURL: "/images/user1.png",
    location: "제주도",
    content: "1번 내용입니다.",
    tags: ["맛집", "자연", "풍경"],
    views: 123,
    likes: 45,
    comments: 12,
    date: "2025-07-15",
  },
  {
    userName: "하츄핑",
    userImgURL: "/images/user2.png",
    location: "부산",
    content: "2번 내용입니다.",
    tags: ["해변", "카페", "바다"],
    views: 456,
    likes: 78,
    comments: 34,
    date: "2025-07-14",
  },
  {
    userName: "숀",
    userImgURL: "/images/user3.png",
    location: "강릉",
    content: "3번 내용입니다.",
    tags: ["카페", "감성", "동해"],
    views: 789,
    likes: 90,
    comments: 56,
    date: "2025-07-13",
  },
];

// 살펴보기 게시판 목록
export default function FeedPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectItem, setSelectItem] = useState(false);

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
      <div className="flex flex-col min-[430px]:flex-row items-start min-[430px]:items-center gap-y-1 mt-2 px-0.5">
        <DropdownItem label="오래된순" />
        <div className="flex flex-wrap flex-start items-center gap-2 before:hidden min-[430px]:before:block  before:content-['|'] before:ml-2 before:text-travel-gray400 ">
          <TagItem>전체</TagItem>
          <TagItem variant="outline">전체리뷰</TagItem>
          <TagItem variant="outline">일별리뷰</TagItem>
          <TagItem variant="outline">장소별리뷰</TagItem>
        </div>
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-6 mt-7">
        {dummyData.map((item, index) => (
          <ViewItem key={index} {...item} onClick={() => setSelectItem(true)} />
        ))}
      </div>

      {/* 모달 */}
      {selectItem && <ModalItem onClose={() => setSelectItem(false)} />}
    </>
  );
}
