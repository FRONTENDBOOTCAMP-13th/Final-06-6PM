"use client";

import { useState } from "react";
import CategorySelect from "@/components/plan/categorySelect";
import SearchSection from "@/components/plan/searchSection";
import SearchResult from "@/components/plan/searchResult";
import ContentDetail from "@/components/plan/contentDetail";
import CategoryPlaceList from "@/components/plan/categoryList";
import { categories } from "@/lib/data/categoryList";
import SearchNav from "@/components/feature/searchNav";
import usePlanStore from "@/zustand/planStore";

import { usePlanInitializer } from "@/hook/usePlanInitializer";
import { useTravelData } from "@/hook/useTravelData";
import { useContentDetail } from "@/hook/useContentDetail";
import { useSearchHandlers } from "@/hook/useSearchHandler";

export default function SearchAll() {
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { selectedArea, startDate, endDate, searchList, contentData, selectedCategory, selectedPlaces } =
    usePlanStore();

  usePlanInitializer();
  useTravelData();
  useContentDetail();

  // 검색 관련 핸들러들
  const { searchSubmit, handleCategoryChange, handleAddPlace, handleRemovePlace, setSelectContentID } =
    useSearchHandlers();

  // 선택된 지역이 없으면 로딩
  if (!selectedArea) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">지역을 선택해주세요.</p>
      </div>
    );
  }

  const selectedCategoryInfo = categories.find((c) => c.id === selectedCategory);

  return (
    <>
      {/* 지역, 날짜 정보 */}
      <div className="relative w-full px-4">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">{selectedArea.name}</h2>
          <p className="text-16 text-travel-gray700">
            여행일정 : {startDate} ~ {endDate}
          </p>
        </div>
      </div>

      {/* 여행 검색 영역 */}
      <div className="mb-20 space-y-4 px-4">
        <div className="flex flex-col gap-2">
          {/* 검색 입력 + 검색 중 상태 */}
          <SearchSection
            selectedArea={selectedArea}
            keyword={keyword}
            isSearching={isSearching}
            onSearch={searchSubmit}
          />

          {/* 카테고리 선택 */}
          <CategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />

          {/* 검색 결과 표시 */}
          <SearchResult
            searchList={searchList}
            selectedCategoryInfo={selectedCategoryInfo}
            keyword={keyword}
            isSearching={isSearching}
            onItemClick={(contentId) => setSelectContentID(contentId)}
            onItemAdd={handleAddPlace}
          />
        </div>

        {/* 검색하지 않을 때의 카테고리 장소목록 */}
        <CategoryPlaceList
          keyword={keyword}
          isSearching={isSearching}
          onItemClick={setSelectContentID}
          onItemAdd={handleAddPlace}
        />

        {/* 선택된 콘텐츠 상세 정보 */}
        {contentData && <ContentDetail contentData={contentData} />}
      </div>

      <SearchNav path="/plan/edit/schedule" tagData={selectedPlaces} onRemoveTag={handleRemovePlace} />
    </>
  );
}
