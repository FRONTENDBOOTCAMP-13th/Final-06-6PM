"use client";

import { useState } from "react";
import { getKeywordData } from "@/data/functions/travel";
import { AreaTravelProps, KeywordTravelProps } from "@/types/travel";
import { SelectedPlace } from "@/types/plan";
import { categories } from "@/lib/data/categoryList"; // 추가
import { toast } from "react-toastify";
import usePlanStore from "@/zustand/planStore";

// 검색 관련 핸들러들
export const useSearchHandlers = () => {
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    selectedArea,
    selectedCategory,
    setSearchList,
    setSelectedCategory,
    setSelectContentID,
    addSelectedPlace,
    removeSelectedPlace,
  } = usePlanStore();

  // 카테고리 ID를 이름으로 변환하는 함수
  const getCategoryName = (categoryId: string | number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "관광지";
  };

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
        res = await getKeywordData(trimKeyword);
      } else {
        res = await getKeywordData(trimKeyword, selectedCategory);
      }

      if (res?.header?.resultMsg === "OK" && res.body?.items?.item) {
        const keywordData = res.body.items.item;
        const keywordList = Array.isArray(keywordData) ? keywordData : [keywordData];

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
  };

  // 장소 추가
  const handleAddPlace = (item: AreaTravelProps | KeywordTravelProps) => {
    const newPlace: SelectedPlace = {
      id: Number(item.contentid),
      name: item.title,
      category: getCategoryName(item.contenttypeid),
      mapx: item.mapx ? Number(item.mapx) : undefined,
      mapy: item.mapy ? Number(item.mapy) : undefined,
    };

    const success = addSelectedPlace(newPlace);
    if (!success) {
      toast.warning("이미 선택된 장소입니다.");
    }
  };

  // 장소 제거
  const handleRemovePlace = (id: number) => {
    removeSelectedPlace(id);
  };

  return {
    keyword,
    isSearching,
    searchSubmit,
    handleCategoryChange,
    handleAddPlace,
    handleRemovePlace,
    setSelectContentID,
    getCategoryName,
  };
};
