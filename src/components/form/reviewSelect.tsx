"use client";

import { ReviewLocation } from "@/types/review";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface ReviewDayItem {
  days: string;
  place: ReviewLocation | ReviewLocation[];
}

export interface ReviewSelectProps {
  reviewType?: "reviewDaily" | "reviewPlace";
  list: ReviewDayItem[];
  selected: ReviewDayItem;
  onChange: (item: ReviewDayItem) => void;
}

export default function ReviewSelect({ list, selected, onChange, reviewType }: ReviewSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // select박스 외부 클릭 시 박스 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // reviewType에 따라 다른 리스트 생성
  const getDisplayList = () => {
    if (reviewType === "reviewPlace") {
      const expandedList: ReviewDayItem[] = [];
      list.forEach((item) => {
        if (Array.isArray(item.place)) {
          item.place.forEach((location) => {
            expandedList.push({
              days: item.days,
              place: location, // 단일 location 객체로 설정
            });
          });
        } else {
          expandedList.push(item);
        }
      });
      return expandedList;
    }
    return list;
  };

  const displayList = getDisplayList();

  // 위치장소 관련
  const locationItem = (place: ReviewLocation | ReviewLocation[]) => {
    if (Array.isArray(place)) {
      return place.map((location) => (
        <span
          key={location.contentId}
          data-contentid={location.contentId}
          className="after:content-[','] mr-0.5 last:after:content-[''] last:mr-0"
        >
          {location.title}
        </span>
      ));
    } else {
      return <span data-contentid={place.contentId}>{place.title}</span>;
    }
  };

  return (
    <div className="relative text-travel-gray700 text-12" ref={ref}>
      <div
        className="flex items-center justify-between px-4 py-2 bg-white border rounded-lg cursor-pointer text-travel-text100 border-travel-gray400"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="space-y-1">
          <p className="flex items-center gap-1 font-medium text-16">
            <CalendarDays />
            <span>{selected.days}</span>
          </p>
          <p className="line-clamp-1 break-keep">
            <span>방문 장소: </span>
            {locationItem(selected.place)}
          </p>
        </div>
        <ChevronDown />
      </div>

      {open && (
        <ul className="absolute top-[64px] left-0 w-full border rounded-lg bg-white shadow-xl z-10 max-h-64 overflow-auto">
          {displayList.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="px-4 py-2 space-y-1 cursor-pointer hover:bg-travel-info100 hover:text-white"
            >
              <p className="flex items-center gap-1 font-medium text-16">
                <CalendarDays />
                <span>{item.days}</span>
              </p>
              <p className="line-clamp-2">
                <span>방문 장소: </span>
                {locationItem(item.place)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
