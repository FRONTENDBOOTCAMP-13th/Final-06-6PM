"use client";

import SearchRegion from "@/components/plan/searchRegion";
import { destinationList } from "@/lib/data/destinationList";
import { useRouter } from "next/navigation";
import usePlanStore from "@/zustand/planStore";
import LoginStatusConfirm from "@/components/feature/loginStatusConfirm";

export default function PlanRegion() {
  const router = useRouter();
  const { setSelectedArea, clearAllData } = usePlanStore();

  const regionClick = (region: string, areaCode: number) => {
    // destinationList에서 선택된 지역 정보 찾기
    const selectedDestination = destinationList.find((dest) => dest.areaCode === areaCode);

    if (selectedDestination) {
      clearAllData();
      setSelectedArea(selectedDestination);
    }

    router.push("/plan/dates");
  };

  return (
    <div className="pt-3">
      <SearchRegion regions={destinationList} onRegionClick={regionClick} />
      {/* 로그인 확인 */}
      <LoginStatusConfirm />
    </div>
  );
}
