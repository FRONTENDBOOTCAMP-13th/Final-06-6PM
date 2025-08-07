"use client";

import { useState } from "react";
import { getKeywordData } from "@/data/functions/travel";
import { AreaTravelProps, KeywordTravelProps } from "@/types/travel";
import { SelectedPlace } from "@/types/plan";
import { categories } from "@/lib/data/categoryList";
import { toast } from "react-toastify";
import usePlanStore from "@/zustand/planStore";

// 검색, 카테고리 변경, 장소 추가/제거 등 검색 페이지의 모든 사용자 액션 처리
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
    dailyPlans,
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
    const placeId = Number(item.contentid);

    // URL에서 목표 날짜 가져오기
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const targetDay = searchParams ? parseInt(searchParams.get("targetDay") || "1") : 1;

    // 해당 날짜에 이미 있는지 체크
    const targetPlan = dailyPlans.find((plan) => plan.day === targetDay);
    const isAlreadyInDay = targetPlan?.places.some((p) => p.id === placeId);

    if (isAlreadyInDay) {
      toast.warning(`${targetDay}일차에 이미 추가된 장소입니다.`);
      return;
    }

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
