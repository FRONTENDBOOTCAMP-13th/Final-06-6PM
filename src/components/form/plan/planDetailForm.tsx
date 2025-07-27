"use client";

import { createPlanPost } from "@/data/actions/plan";
import useUserStore from "@/zustand/userStore";
import usePlanStore from "@/zustand/planStore";

export default function PlanDetailForm() {
  // 여행 데이터 가져오기
  const { selectedArea, startDate, endDate } = usePlanStore();
  const accessToken = useUserStore((state) => state.token);

  const handleClick = async () => {
    // 데이터 유효성 검사
    if (!selectedArea || !startDate || !endDate) {
      console.error("여행 정보가 완전하지 않습니다.");
      console.error("누락된 데이터:", {
        selectedArea: selectedArea ? "있음" : "없음",
        startDate: startDate ? "있음" : "없음",
        endDate: endDate ? "없음" : "없음",
      });
      return;
    }

    const formData = new FormData();
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("selectedRegion", selectedArea.name);

    console.log("전송 데이터:", {
      startDate,
      endDate,
      selectedRegion: selectedArea.name,
    });

    try {
      const result = await createPlanPost(formData, accessToken);
      console.log("서버 응답:", result);
    } catch (error) {
      console.error("API 호출 에러:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 p-4">
      <div className="bg-travel-bg100 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <button className="w-full text-16 bg-blue-500 text-white p-4 rounded" onClick={handleClick}>
          여행 계획 저장
        </button>
      </div>
    </div>
  );
}
