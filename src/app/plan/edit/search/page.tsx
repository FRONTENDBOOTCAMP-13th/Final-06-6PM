import BackButton from "@/components/feature/backButton";
import PlaceCard from "@/components/feature/placeCard";
import CategorySelect from "@/components/plan/categorySelect";
import SearchSection from "@/components/plan/searchSection";
import SearchResult from "@/components/plan/searchResult";
import ContentDetail from "@/components/plan/contentDetail";
import { categories } from "@/lib/data/categoryList";
import SearchNav from "@/components/feature/searchNav";
import usePlanStore from "@/zustand/planStore";

import { usePlanInitializer } from "@/hook/usePlanInitializer";
import { useTravelData } from "@/hook/useTravelData";
import { useContentDetail } from "@/hook/useContentDetail";
import { useSearchHandlers } from "@/hook/useSearchHandler";

export default function SearchPage() {
  // Zustand 스토어에서 상태들만 가져오기
  const {
    selectedArea,
    startDate,
    endDate,
    filteredData,
    keyword,
    searchList,
    contentData,
    selectedCategory,
    isSearching,
    isLoading,
    selectedPlaces,
  } = usePlanStore();

  // 커스텀 훅들
  usePlanInitializer(); // 초기 데이터 로딩
  useTravelData(); // 여행 데이터 로딩
  useContentDetail(); // 콘텐츠 상세 정보 로딩

  // 검색 관련 핸들러
  const {
    searchSubmit,
    handleCategoryChange,
    handleAddPlace,
    handleRemovePlace,
    setSelectContentID,
  } = useSearchHandlers();

  // 선택된 지역이 없으면 로딩 또는 에러 상태
  if (!selectedArea) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">지역을 선택해주세요.</p>
      </div>
    );
  }

  const selectedCategoryInfo = categories.find(
    (c) => c.id === selectedCategory,
  );

  return (
    <div>
      {/* 헤더 */}
      <div className="relative w-full px-4 py-5">
        <BackButton path="/plan/edit/schedule" />
        <p className="text-center">여행일정만들기</p>
      </div>

      {/* 지역, 날짜 정보 */}
      <div className="relative w-full px-4">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">
            {selectedArea.name}
          </h2>
          <p className="text-16 text-travel-gray700">
            여행일정 : {startDate} ~ {endDate}
          </p>
        </div>
      </div>

      {/* 여행 검색 */}
      <div className="mb-20 space-y-4 px-4">
        <div className="flex flex-col gap-2">
          <SearchSection
            selectedArea={selectedArea}
            keyword={keyword}
            isSearching={isSearching}
            onSearch={searchSubmit}
          />

          {/* 카테고리 버튼 */}
          <div className="">
            <CategorySelect
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
          </div>

          <SearchResult
            searchList={searchList}
            selectedCategoryInfo={selectedCategoryInfo}
            keyword={keyword}
            isSearching={isSearching}
            onItemClick={(contentId) => setSelectContentID(contentId)}
            onItemAdd={handleAddPlace}
          />
        </div>

        {/* 검색 중이 아닐때 카테고리 장소목록 출력 */}
        {!isSearching && searchList.length === 0 && !keyword && (
          <div className="flex flex-col gap-2">
            <div className="space-y-3">
              {isLoading ? (
                <div className="py-8 text-center text-gray-500">
                  <p>로딩 중...</p>
                </div>
              ) : filteredData.length > 0 ? (
                filteredData.map((data) => {
                  return (
                    <PlaceCard
                      key={data.contentid}
                      item={data}
                      onClick={() => setSelectContentID(data.contentid)}
                      onAdd={() => handleAddPlace(data)}
                    />
                  );
                })
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>
                    등록된{" "}
                    {selectedCategoryInfo?.name === "전체"
                      ? "장소가"
                      : `${selectedCategoryInfo?.name}이`}{" "}
                    없습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 선택된 콘텐츠 상세 정보 */}
        {contentData && <ContentDetail contentData={contentData} />}
      </div>

      {/* 버튼 레이아웃 */}
      <SearchNav
        path="/plan/edit/schedule"
        tagData={selectedPlaces}
        onRemoveTag={handleRemovePlace}
      />
    </div>
  );
}
