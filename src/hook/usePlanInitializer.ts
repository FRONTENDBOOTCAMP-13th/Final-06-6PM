import { useEffect } from "react";
import { destinationList } from "@/lib/data/destinationList";
import usePlanStore from "@/zustand/planStore";

// 초기 데이터 로딩 (세션스토리지에서)
export const usePlanInitializer = () => {
  const { selectedArea, startDate, endDate, setSelectedArea, setStartDate, setEndDate } = usePlanStore();

  useEffect(() => {
    // 이미 스토어에 데이터가 있다면 세션스토리지에서 가져올 필요 없음
    if (selectedArea && startDate && endDate) return;

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
};