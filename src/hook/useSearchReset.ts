"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import usePlanStore from "@/zustand/planStore";

// 날짜 변경 시 검색 상태 초기화 훅
export const useSearchReset = (
  setKeyword: (keyword: string) => void,
  setIsSearching: (isSearching: boolean) => void,
) => {
  const searchParams = useSearchParams();
  const targetDay = searchParams.get("targetDay") ? parseInt(searchParams.get("targetDay")!) : 1;
  const { clearSearchData } = usePlanStore();

  useEffect(() => {
    clearSearchData();
    setKeyword("");
    setIsSearching(false);
  }, [targetDay, clearSearchData, setKeyword, setIsSearching]);

  return targetDay;
};
