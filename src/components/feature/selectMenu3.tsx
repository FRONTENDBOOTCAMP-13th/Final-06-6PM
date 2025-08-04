"use client";

import { CalendarDays, LayoutList, MapPin } from "lucide-react";
import { useState } from "react";

export default function SelectMenu3() {
  const [tab, setTab] = useState(0);

  const data = [
    {
      id: 0,
      title: "여행별",
      icon: <LayoutList className="w-[1.25rem] h-[1.25rem]" />,
      description: "일정 전체 목록",
    },
    {
      id: 1,
      title: "일자별",
      icon: <CalendarDays className="w-[1.25rem] h-[1.25rem]" />,
      description: "일자별 목록",
    },
    {
      id: 2,
      title: "장소별",
      icon: <MapPin className="w-[1.25rem] h-[1.25rem]" />,
      description: "장소별 목록",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 divide-x divide-travel-gray100">
        {data.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100  border-b border-b-travel-secondary200"
                : "text-travel-gray400 bg-white border-b border-b-travel-gray200"
            }`}
            onClick={() => setTab(item.id)}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      {data
        .filter((item) => tab === item.id)
        .map((item) => (
          <div key={item.id}>{item.description}</div>
        ))}
    </div>
  );
}
