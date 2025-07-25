"use client";
import { useEffect, useState } from "react";
import {
  AreaTravelProps,
  ContentDataProps,
  KeywordTravelProps,
} from "@/types/travel";
import Image from "next/image";

import {
  getContentData,
  getKeywordData,
  getTravelList,
} from "@/data/functions/travel";
import BackButton from "@/components/feature/backButton";
import NextButton from "@/components/feature/nextButton";
import RemoveTag from "@/components/ui/removeTag";

import { destinationList, Destination } from "@/lib/data/destinationList";
import PlaceCard from "@/components/feature/placeCard";
import CategorySelect from "@/components/plan/categorySelect";
import SearchSection from "@/components/plan/searchSection";
import SearchResult from "@/components/plan/searchResult";
import ContentDetail from "@/components/plan/contentDetail";

// 카테고리 정의
const categories = [
  { id: "12", name: "관광지" },
  { id: "39", name: "맛집" },
  { id: "14", name: "문화시설" },
  { id: "15", name: "축제" },
  { id: "28", name: "레포츠" },
  { id: "32", name: "숙박" },
  { id: "38", name: "쇼핑" },
];

const tourData = [
  { id: 1, name: "가나디" },
  { id: 2, name: "성산일출봉" },
  { id: 3, name: "한라산" }
];

export default function SearchPage() {
  const [selectedArea, setSelectedArea] = useState<Destination | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [travelData, setTravelData] = useState<AreaTravelProps[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState<KeywordTravelProps[]>([]);
  const [selectContentID, setSelectContentID] = useState<string | number>("");
  const [contentData, setContentData] = useState<ContentDataProps>();
  const [selectedCategory, setSelectedCategory] = useState<string>("12");
  const [isSearching, setIsSearching] = useState(false);

  // 세션에서 선택된 지역 정보 가져오기
  useEffect(() => {
    const savedAreaCode = sessionStorage.getItem('selectedAreaCode');
    
    if (savedAreaCode) {
      const areaCode = parseInt(savedAreaCode);
      const foundArea = destinationList.find(area => area.areaCode === areaCode);
      const savedStartDate = sessionStorage.getItem('startDate');
      const savedEndDate = sessionStorage.getItem('endDate');

    if (savedStartDate) setStartDate(savedStartDate);
    if (savedEndDate) setEndDate(savedEndDate);
      
      if (foundArea) {
        setSelectedArea(foundArea);
      }
    }
  }, []);

  // 선택된 지역과 카테고리 기반으로 데이터 조회
  useEffect(() => {
    if (selectedArea && selectedCategory) {
      const fetchCategoryData = async () => {
        try {
          const res = await getTravelList(selectedArea.areaCode, selectedCategory);
          
          if (res?.header.resultMsg === "OK") {
            const data = res.body.items.item;
            const dataArray = Array.isArray(data) ? data : [data];
            setTravelData(dataArray || []);
          } else {
            console.log("카테고리 데이터 조회 실패:", res);
            setTravelData([]);
          }
        } catch (error) {
          console.error("카테고리 데이터 조회 에러:", error);
          setTravelData([]);
        }
      };
      fetchCategoryData();
    }
  }, [selectedCategory, selectedArea]);

  // 카테고리별 키워드 검색 - 지역코드로 필터링
  const searchSubmit = async (searchKeyword: string) => {
    const trimKeyword = searchKeyword.trim();
    if (!selectedArea) {
      return;
    }

    setKeyword(trimKeyword);
    setIsSearching(true);

    try {
      const res = await getKeywordData(trimKeyword, selectedCategory);
      
      if (res?.header?.resultMsg === "OK" && res.body?.items?.item) {
        const keywordData = res.body.items.item;
        const keywordList = Array.isArray(keywordData) ? keywordData : [keywordData];
        
        // 선택된 지역코드와 일치하는 결과만 필터링
        const filteredResults = keywordList.filter(item => {
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

  // 선택된 지역이 없으면 로딩 또는 에러 상태
  if (!selectedArea) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">지역을 선택해주세요.</p>
      </div>
    );
  }

  const selectedCategoryInfo = categories.find(c => c.id === selectedCategory);

  return (
    <div>
      {/* 헤더 */}
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/edit/schedule"/>
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
      <div className="px-4 space-y-4 mb-32">
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
            onItemAdd={(item) => console.log("아이템 추가", item.title)}
          />
        </div>

        {/* 검색 중이 아닐때 카테고리 장소목록 출력 */}
        {!isSearching && searchList.length === 0 && !keyword && (
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-16">
              {selectedArea.name} {selectedCategoryInfo?.name}
            </h3>
            
            {/* 장소 리스트 */}
            <div className="space-y-3">
              {travelData.length > 0 ? (
                travelData.map((data) => (
                  <PlaceCard
                    key={data.contentid}
                    item={data}
                    categoryName={selectedCategoryInfo?.name}
                    onClick={() => setSelectContentID(data.contentid)}
                    onAdd={() => console.log("아이템 추가", data.title)}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>등록된 {selectedCategoryInfo?.name}이 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 선택된 콘텐츠 상세 정보 */}
        {contentData && <ContentDetail contentData={contentData} />}
      </div>

    

      {/* 버튼 레이아웃 */}
      <div className="fixed bottom-15 bg-white w-full py-3">
        <div className="flex gap-2 pb-2">
            <RemoveTag tagData={tourData} />
        </div>
      </div>
      <NextButton path="/plan/edit/schedule" />
    </div>
  );
}