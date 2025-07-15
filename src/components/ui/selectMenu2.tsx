"use client";

import { MapPinned } from "lucide-react";
import { useState } from "react";

export default function SelectMenu2() {
  const [tab, setTab] = useState(0);

  const data = [
    {
      id: 0,
      title: "다가오는 여행",
      description: "예정된 여행 목록",
    },
    {
      id: 1,
      title: "완료된 여행",
      description: "다녀온 여행 목록",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2">
        {data.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100"
                : "text-travel-gray400 bg-white"
            }`}
            onClick={() => setTab(item.id)}
          >
            <MapPinned className="w-[1.25rem] h-[1.25rem]" />
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
