"use client";

import { useState, useEffect } from "react";
import CategorySelect from "@/components/plan/categorySelect";
import SearchSection from "@/components/plan/searchSection";
import SearchResult from "@/components/plan/searchResult";
import ContentDetail from "@/components/plan/contentDetail";
import CategoryPlaceList from "@/components/plan/categoryList";
import { categories } from "@/lib/data/categoryList";
import usePlanStore from "@/zustand/planStore";
import { ContentDataProps } from "@/types/travel";

import { usePlanInitializer } from "@/hook/usePlanInitializer";
import { useTravelData } from "@/hook/useTravelData";
import { useContentDetail } from "@/hook/useContentDetail";
import { useSearchHandlers } from "@/hook/useSearchHandler";
import { useSearchReset } from "@/hook/useSearchReset";
import SearchNav from "@/components/plan/searchNav";

export default function SearchAll() {
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    selectedArea,
    startDate,
    endDate,
    searchList,
    contentData,
    selectedCategory,
    selectedPlaces,
    setSelectedCategory,
    setContentData,
  } = usePlanStore();
  const targetDay = useSearchReset(setKeyword, setIsSearching);

  usePlanInitializer();
  useTravelData();
  const { isModalOpen, handleModalClose } = useContentDetail();

  // 페이지 진입 시 검색 상태, 카테고리, 컨텐츠 데이터 초기화
  useEffect(() => {
    setKeyword("");
    setIsSearching(false);
    setSelectedCategory("all");
    setContentData({} as ContentDataProps);
  }, [targetDay, setSelectedCategory, setContentData]);

  const { searchSubmit, handleCategoryChange, handleAddPlace, handleRemovePlace, setSelectContentID, getCategoryName } =
    useSearchHandlers();

  // 카테고리 변경 시 검색 상태 초기화
  const handleCategoryChangeWithReset = (categoryId: string) => {
    setKeyword("");
    handleCategoryChange(categoryId);
  };

  const handleSearch = async (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      return;
    }

    setKeyword(searchKeyword);
    setIsSearching(true);

    try {
      await searchSubmit(searchKeyword);
    } catch (error) {
      console.error("검색 오류:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddPlaceTarget = (data: any) => {
    handleAddPlace(data);
  };

  if (!selectedArea) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">지역을 선택해주세요.</p>
      </div>
    );
  }

  const selectedCategoryInfo = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="pb-25">
      {/* 지역, 날짜 정보 */}
      <div className="relative w-full px-4 mb-2">
        <h2 className="text-28 text-travel-primary200 font-semibold">{selectedArea.name}</h2>
        <p className="text-16 text-travel-gray700">
          여행일정 : {startDate} ~ {endDate}
        </p>
      </div>

      {/* 여행 검색 영역 */}
      <div className="space-y-4 px-4">
        <div className="flex flex-col gap-2">
          {/* 검색 입력 + 검색 중 상태 */}
          <SearchSection
            selectedArea={selectedArea}
            keyword={keyword}
            isSearching={isSearching}
            onSearch={handleSearch}
          />

          {/* 카테고리 선택 */}
          <CategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChangeWithReset}
          />

          {/* 검색 결과 표시 */}
          <SearchResult
            searchList={searchList}
            selectedCategoryInfo={selectedCategoryInfo}
            keyword={keyword}
            isSearching={isSearching}
            onItemClick={(contentId) => setSelectContentID(contentId)}
            onItemAdd={handleAddPlaceTarget}
          />
        </div>

        {/* 검색하지 않을 때의 카테고리 장소목록 */}
        <CategoryPlaceList
          keyword={keyword}
          isSearching={isSearching}
          onItemClick={setSelectContentID}
          onItemAdd={handleAddPlaceTarget}
        />
      </div>

      {/* 선택된 콘텐츠 상세 정보 모달 */}
      <ContentDetail contentData={contentData} isOpen={isModalOpen} onClose={handleModalClose} />

      <SearchNav path="/plan/edit/schedule" tagData={selectedPlaces} onRemoveTag={handleRemovePlace} />
    </div>
  );
}
