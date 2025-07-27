"use client";

import { useState, useEffect } from "react";
import { getTravelList } from "@/data/functions/travel";
import usePlanStore from "@/zustand/planStore";

// 여행 데이터 로딩 (지역/카테고리 기반)
export const useTravelData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedArea, selectedCategory, setFilteredData } = usePlanStore();

  useEffect(() => {
    if (selectedArea) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          let response;

          if (selectedCategory === "all") {
            response = await getTravelList(selectedArea.areaCode);
          } else {
            response = await getTravelList(selectedArea.areaCode, selectedCategory);
          }

          if (response?.header.resultMsg === "OK" && response.body.items?.item) {
            const data = response.body.items.item;
            const dataArray = Array.isArray(data) ? data : [data];
            setFilteredData(dataArray);
          } else {
            console.log("응답 데이터가 없거나 에러:", response?.header);
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
  }, [selectedArea, selectedCategory, setFilteredData]);

  return { isLoading };
};
