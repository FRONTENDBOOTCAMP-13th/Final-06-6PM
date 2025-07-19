"use client";

import { MapPinned } from "lucide-react";
import { useState } from "react";
import DayItem, { DayItemProps } from "../ui/dayItem";

export default function SelectMypage() {
  const [tab, setTab] = useState(0);

  const upcomingData: DayItemProps[] = [
    {
      imgUrl: "/images/user2.png",
      place: "제주도",
      period: "2025.08.01 ~ 2025.08.03",
      dday: 13,
    },
    {
      imgUrl: "/images/user1.png",
      place: "강릉",
      period: "2025.09.10 ~ 2025.09.12",
      dday: 53,
    },
  ];

  const completeData: DayItemProps[] = [
    {
      imgUrl: "/images/user2.png",
      place: "제주도",
      period: "2024.08.01 ~ 2024.08.03",
    },
    {
      imgUrl: "/images/user3.png",
      place: "대구",
      period: "2024.09.10 ~ 2024.09.12",
    },
    {
      imgUrl: "/images/user4.png",
      place: "서울",
      period: "2024.05.21 ~ 2024.05.21",
    },
  ];

  const tabData = [
    {
      id: 0,
      title: "다가오는 여행",
      description: upcomingData
    },
    {
      id: 1,
      title: "완료된 여행",
      description: completeData
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2">
        {tabData.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100  border-b border-b-travel-secondary200"
                : "text-travel-gray400 bg-white border-b border-b-travel-gray200"
            }`}
            onClick={() => setTab(item.id)}
          >
            <MapPinned className="w-[1.25rem] h-[1.25rem]" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 p-4">
        {tabData[tab].description.map((item, idx) => (
          <DayItem 
            key={idx} {...item}
          />
        ))}
      </div>
    </div>
  );
}
