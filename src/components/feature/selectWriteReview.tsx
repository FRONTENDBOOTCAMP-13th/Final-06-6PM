"use client";

import ReviewDetailForm from "@/components/form/reviewDetailForm";
import ReviewFormAll from "@/components/form/reviewFormAll";
import { DayItem } from "@/components/form/reviewSelect";
import { CalendarDays, LayoutList, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const reviewDaily: DayItem[] = [
  {
    days: "2025.07.12",
    place: ["해운대해수욕장", "동백섬", "광안리해수욕장"],
  },
  {
    days: "2025.07.13",
    place: ["태종대", "자갈치시장", "감천문화마을"],
  },
  {
    days: "2025.07.14",
    place: ["송도해수욕장", "부산타워", "용두산공원", "자갈치시장", "개금밀면"],
  },
];

const reviewPlace: DayItem[] = [
  {
    days: "2025.07.12",
    place: "해운대 해수욕장",
  },
  {
    days: "2025.07.13",
    place: "태종대",
  },
  {
    days: "2025.07.14",
    place: "송도해수욕장",
  },
  {
    days: "2025.07.14",
    place: "송정해수욕장",
  },
  {
    days: "2025.07.14",
    place: "합천돼지국밥",
  },
];

export default function SelectWriteReview() {
  const [tab, setTab] = useState(0);

  const [selectItem, setSelectItem] = useState<DayItem | null>(null);

  useEffect(() => {
    const item = tab === 1 ? reviewDaily[0] : reviewPlace[0];
    setSelectItem(item);
  }, [tab]);

  const data = [
    {
      id: 0,
      title: "일정전체",
      icon: <LayoutList className="w-[1.25rem] h-[1.25rem]" />,
    },
    {
      id: 1,
      title: "일자별",
      icon: <CalendarDays className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewDaily,
    },
    {
      id: 2,
      title: "장소별",
      icon: <MapPin className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewPlace,
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

      {tab === 0 && <ReviewFormAll />}

      {tab === 1 && selectItem && (
        <ReviewDetailForm
          list={reviewDaily}
          selected={selectItem}
          onChange={setSelectItem}
        />
      )}

      {tab === 2 && selectItem && (
        <ReviewDetailForm
          list={reviewPlace}
          selected={selectItem}
          onChange={setSelectItem}
        />
      )}
    </div>
  );
}
