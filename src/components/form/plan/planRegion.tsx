"use client";

import DestinationCard from "@/components/feature/destinationCard";
import SearchRegion from "@/components/feature/searchRegion";
import { destinationList } from "@/lib/data/destinationList";
import { useRouter } from "next/navigation";
import usePlanStore from "@/zustand/planStore";

export default function PlanRegion() {
  const router = useRouter();
  const { setSelectedArea } = usePlanStore();

  const regionClick = (region: string, areaCode: number) => {
    // destinationList에서 선택된 지역 정보 찾기
    const selectedDestination = destinationList.find(dest => dest.areaCode === areaCode);
    
    if (selectedDestination) {
      // Zustand에 지역 정보 저장
      setSelectedArea(selectedDestination);
      
      console.log('선택된 지역:', selectedDestination);
      
    }
    
    router.push("/plan/dates");
  };

  return (
    <div className="pt-3">
      <SearchRegion regions={destinationList} onRegionClick={regionClick} />
      <div className="grid grid-cols-2 gap-5 py-5">
        {destinationList.map((destination) => (
          <DestinationCard
            key={destination.areaCode}
            destination={destination}
            onClick={() => regionClick(destination.name, destination.areaCode)}
          />
        ))}
      </div>
    </div>
  );
}