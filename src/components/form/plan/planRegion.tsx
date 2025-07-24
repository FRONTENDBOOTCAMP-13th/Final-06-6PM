"use client";

import DestinationCard from "@/components/feature/destinationCard";
import SearchRegion from "@/components/feature/searchRegion";
import { destinationList } from "@/lib/data/destinationList";
import { useRouter } from "next/navigation";

export default function PlanRegion() {
  const router = useRouter();
  const regionClick = (region: string, areaCode: number) => {
    sessionStorage.setItem("selectedRegion", region);
    sessionStorage.setItem("selectedAreaCode", areaCode.toString());
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
