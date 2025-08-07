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
  disabled?: boolean;
}

export default function ReviewSelect({ list, selected, onChange, reviewType, disabled = false }: ReviewSelectProps) {
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

  useEffect(() => {
    // 선택된 아이템이 비어 있는지 확인
    const selectedEmpty = Array.isArray(selected.place) ? selected.place.length === 0 : false;

    // selected가 비어 있고, 선택 가능한 항목이 있다면 자동 선택
    if (selectedEmpty) {
      const firstValidItem = displayList.find((item) => {
        return Array.isArray(item.place) ? item.place.length > 0 : true;
      });

      if (firstValidItem) {
        onChange(firstValidItem);
      }
    }
  }, [selected, displayList, onChange]);

  // 위치장소 관련
  const locationItem = (place: ReviewLocation | ReviewLocation[]) => {
    if (Array.isArray(place)) {
      return place.map((location) => (
        <span
          key={location.contentId}
          data-contentid={location.contentId}
          data-contenttype={location.contentTypeId}
          className="after:content-[','] mr-0.5 last:after:content-[''] last:mr-0"
        >
          {location.title}
        </span>
      ));
    } else {
      return (
        <span data-contentid={place.contentId} data-contenttype={place.contentTypeId}>
          {place.title}
        </span>
      );
    }
  };

  return (
    <div className="relative text-travel-gray700 text-12" ref={ref}>
      <div
        className={`flex items-center justify-between px-4 py-2 border rounded-lg transition-colors duration-200
    ${
      disabled
        ? "bg-travel-gray100 border-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-white border-travel-gray400 text-travel-text100 cursor-pointer"
    }`}
        onClick={() => {
          if (!disabled) setOpen((prev) => !prev);
        }}
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
        <ChevronDown className={disabled ? "opacity-60" : ""} />
      </div>

      {open && (
        <ul className="absolute top-[64px] left-0 w-full border rounded-lg bg-white shadow-xl z-10 max-h-64 overflow-auto">
          {displayList.map((item, index) => {
            // 여행 세부 일자 배열 확인
            let isEmpty = false;
            if (Array.isArray(item.place)) {
              if (item.place.length === 0) {
                isEmpty = true;
              }
            }
            return (
              <li
                key={index}
                onClick={() => {
                  if (!isEmpty) {
                    onChange(item);
                    setOpen(false);
                  }
                }}
                className={`px-4 py-2 space-y-1 ${
                  isEmpty
                    ? "cursor-not-allowed text-travel-gray300"
                    : "cursor-pointer hover:bg-travel-info100 hover:text-white"
                }`}
              >
                <p className="flex items-center gap-1 font-medium text-16">
                  <CalendarDays />
                  <span>{item.days}</span>
                </p>
                <p className="line-clamp-2">
                  {isEmpty ? (
                    <span className="text-12">예정된 여행 일정이 없습니다</span>
                  ) : (
                    <>
                      <span>방문 장소: </span>
                      {locationItem(item.place)}
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
