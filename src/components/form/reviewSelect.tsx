"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DayItem {
  days: string;
  place: string[] | string;
}

interface ReviewSelectProps {
  list: DayItem[];
  selected: DayItem;
  onChange: (item: DayItem) => void;
}

export default function ReviewSelect({
  list,
  selected,
  onChange,
}: ReviewSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative text-travel-gray700 text-12" ref={ref}>
      <div
        className="flex items-center justify-between px-4 py-2 bg-white border rounded-lg cursor-pointer text-travel-text100 border-travel-gray400"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>
          <p className="flex items-center gap-1 font-medium text-16">
            <CalendarDays />
            <span>{selected.days}</span>
          </p>
          <p>
            방문 장소:{" "}
            {Array.isArray(selected.place)
              ? selected.place.join(", ")
              : selected.place}
          </p>
        </div>
        <ChevronDown />
      </div>

      {open && (
        <ul className="absolute top-[59px] left-0 w-full border rounded-lg bg-white shadow-xl z-10 max-h-60 overflow-auto">
          {list.map((item) => (
            <li
              key={
                item.days +
                (Array.isArray(item.place) ? item.place.join(",") : item.place)
              }
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
              <p>
                방문 장소:{" "}
                {Array.isArray(item.place) ? item.place.join(", ") : item.place}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
