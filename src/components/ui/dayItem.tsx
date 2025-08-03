import { destinationList } from "@/lib/data/destinationList";
import Image from "next/image";
import React from "react";

export interface DayItemProps {
  place?: string;
  period?: string;
  dday?: number;
}

export default function DayItem({
  place = "등록된 여행이 없어요.",
  period = "일정을 만들어보세요!",
  dday,
}: DayItemProps) {
  const filterPlaceImg = (place: string): string => {
    return destinationList.find((destination) => destination.name === place)?.image || "/images/place-default.webp";
  };

  const placeImg = filterPlaceImg(place);

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-[0_0_6px_rgba(0,0,0,0.3)]">
      <div className="flex gap-3 items-center">
        <div className="w-[50px] h-[50px] rounded-full bg-travel-gray200 overflow-hidden aspect-square">
          {placeImg && (
            <Image width={100} height={100} src={placeImg} alt={place} className="object-cover w-full h-full" />
          )}
        </div>
        <div className="space-y-1 text-travel-text100">
          <p className="font-semibold">{place}</p>
          <p className="text-14">{period}</p>
        </div>
      </div>

      {dday !== undefined && (
        <div
          className={`px-4 py-1 text-center text-white text-14 rounded-3xl min-w-14 ${
            dday < 0 ? "bg-travel-gray500" : "bg-travel-primary100"
          }`}
        >
          {dday > 0 && `D-${dday}`}
          {dday === 0 && "D-day"}
          {dday < 0 && "완료된 여행"}
        </div>
      )}
    </div>
  );
}
