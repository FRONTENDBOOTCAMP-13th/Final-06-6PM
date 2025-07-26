"use client";
import { useEffect, useState } from "react";
import { AreaTravelProps, ContentDataProps, KeywordTravelProps } from "@/types/travel";

import { getContentData, getKeywordData, getTravelList } from "@/data/functions/travel";
import BackButton from "@/components/feature/backButton";

import { destinationList, Destination } from "@/lib/data/destinationList";
import PlaceCard from "@/components/feature/placeCard";
import CategorySelect from "@/components/plan/categorySelect";
import SearchSection from "@/components/plan/searchSection";
import SearchResult from "@/components/plan/searchResult";
import ContentDetail from "@/components/plan/contentDetail";
import { categories } from "@/lib/data/categoryList";
import SearchNav from "@/components/feature/searchNav";
import { SelectedPlace } from "@/types/plan";
import { toast } from "react-toastify";

export default function SearchPage() {
  const [selectedArea, setSelectedArea] = useState<Destination | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<AreaTravelProps[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState<KeywordTravelProps[]>([]);
  const [selectContentID, setSelectContentID] = useState<string | number>("");
  const [contentData, setContentData] = useState<ContentDataProps>();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState<SelectedPlace[]>([]);

  // 세션에서 선택된 지역 정보 가져오기
  useEffect(() => {
    const savedAreaCode = sessionStorage.getItem("selectedAreaCode");

    if (savedAreaCode) {
      const areaCode = parseInt(savedAreaCode);
      const foundArea = destinationList.find((area) => area.areaCode === areaCode);
      const savedStartDate = sessionStorage.getItem("startDate");
      const savedEndDate = sessionStorage.getItem("endDate");

      if (savedStartDate) setStartDate(savedStartDate);
      if (savedEndDate) setEndDate(savedEndDate);
      if (foundArea) {
        setSelectedArea(foundArea);
      }
    }
  }, []);

  // 선택된 지역과 카테고리 기반으로 데이터 조회
  useEffect(() => {
    if (selectedArea) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          let response;

          if (selectedCategory === "all") {
            // 전체 선택 - 카테고리 없이 호출
            response = await getTravelList(selectedArea.areaCode);
          } else {
            // 특정 카테고리 선택
            response = await getTravelList(selectedArea.areaCode, selectedCategory);
          }

          if (response?.header.resultMsg === "OK" && response.body.items?.item) {
            const data = response.body.items.item;
            const dataArray = Array.isArray(data) ? data : [data];
            setFilteredData(dataArray);
          } else {
            setFilteredData([]);
          }
        } catch (error) {
          console.error("데이터 조회 에러:", error);
          setFilteredData([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [selectedArea, selectedCategory]);

  // 키워드 검색
  const searchSubmit = async (searchKeyword: string) => {
    const trimKeyword = searchKeyword.trim();
    if (!selectedArea) {
      return;
    }

    setKeyword(trimKeyword);
    setIsSearching(true);

    try {
      let res;

      if (selectedCategory === "all") {
        // 전체 선택 - contentTypeId 없이 모든 카테고리에서 검색
        res = await getKeywordData(trimKeyword);
      } else {
        // 특정 카테고리 선택
        res = await getKeywordData(trimKeyword, selectedCategory);
      }

      if (res?.header?.resultMsg === "OK" && res.body?.items?.item) {
        const keywordData = res.body.items.item;
        const keywordList = Array.isArray(keywordData) ? keywordData : [keywordData];

        // 선택된 지역코드와 일치하는 결과만 필터링
        const filteredResults = keywordList.filter((item) => {
          return item.areacode === selectedArea.areaCode.toString();
        });

        setSearchList(filteredResults);
      } else {
        setSearchList([]);
      }
    } catch (error) {
      console.error("검색 중 에러 발생:", error);
      setSearchList([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 카테고리 변경
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchList([]);
    setKeyword("");
  };

  // 선택된 콘텐츠 상세 정보 조회
  useEffect(() => {
    if (selectContentID) {
      const ContentListData = async () => {
        try {
          const res = await getContentData(selectContentID.toString());
          if (res?.header.resultMsg === "OK") {
            const data = res.body.items.item;
            setContentData(data[0]);
          }
        } catch (error) {
          console.error("콘텐츠 상세 정보 조회 에러:", error);
        }
      };
      ContentListData();
    }
  }, [selectContentID]);

  // 장소 추가 함수
  const handleAddPlace = (item: AreaTravelProps | KeywordTravelProps) => {
    const newPlace: SelectedPlace = {
      id: Number(item.contentid),
      name: item.title,
    };

    // 중복 값 방지
    if (selectedPlaces.some((place) => place.id === newPlace.id)) {
      toast.warning("이미 선택된 장소입니다.");
      return;
    }

    setSelectedPlaces([...selectedPlaces, newPlace]);
  };

  // 장소 제거 함수
  const handleRemovePlace = (id: number) => {
    setSelectedPlaces(selectedPlaces.filter((place) => place.id !== id));
  };

  // 선택된 지역이 없으면 로딩 또는 에러 상태
  if (!selectedArea) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">지역을 선택해주세요.</p>
      </div>
    );
  }

  const selectedCategoryInfo = categories.find((c) => c.id === selectedCategory);

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
          <h2 className="text-28 text-travel-primary200 font-semibold">{selectedArea.name}</h2>
          <p className="text-16 text-travel-gray700">
            여행일정 : {startDate} ~ {endDate}
          </p>
        </div>
      </div>

      {/* 여행 검색 */}
      <div className="mb-20 space-y-4 px-4">
        <div className="flex flex-col gap-2">
          <SearchSection selectedArea={selectedArea} keyword={keyword} isSearching={isSearching} onSearch={searchSubmit} />

          {/* 카테고리 버튼 */}
          <div className="">
            <CategorySelect categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />
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
              {filteredData.length > 0 ? (
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
                  <p>등록된 {selectedCategoryInfo?.name === "전체" ? "장소가" : `${selectedCategoryInfo?.name}이`} 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 선택된 콘텐츠 상세 정보 */}
        {contentData && <ContentDetail contentData={contentData} />}
      </div>

      {/* 버튼 레이아웃 */}
      <SearchNav path="/plan/edit/schedule" tagData={selectedPlaces} onRemoveTag={handleRemovePlace} />
    </div>
  );
}
