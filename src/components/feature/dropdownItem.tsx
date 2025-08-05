"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import TagItem from "@/components/feature/tagItem";

interface DropdownItemProps {
  currentSort: "latest" | "oldest";
  onSortChange: (sort: "latest" | "oldest") => void;
}

export default function DropdownItem({ currentSort, onSortChange }: DropdownItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortSelect = (sort: "latest" | "oldest") => {
    onSortChange(sort);
    setIsOpen(false);
  };

  const currentLabel = currentSort === "latest" ? "작성일 최신순" : "작성일 오래된순";

  return (
    <div className="relative">
      <div className="cursor-pointer w-34" onClick={() => setIsOpen(!isOpen)}>
        <TagItem className="w-full grid-cols-[1fr_auto] items-center gap-1" size="md">
          {currentLabel}
          <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </TagItem>
      </div>

      {isOpen && (
        <>
          <div className="absolute left-0 z-10 mt-1 bg-white border rounded-md shadow-lg w-34 top-full border-travel-gray200">
            <div
              className={`px-3 py-2 text-14 cursor-pointer hover:bg-travel-gray100 ${
                currentSort === "latest" ? "text-travel-primary200 font-medium" : "text-travel-gray700"
              }`}
              onClick={() => handleSortSelect("latest")}
            >
              작성일 최신순
            </div>
            <div
              className={`px-3 py-2 text-14 cursor-pointer hover:bg-travel-gray100 ${
                currentSort === "oldest" ? "text-travel-primary200 font-medium" : "text-travel-gray700"
              }`}
              onClick={() => handleSortSelect("oldest")}
            >
              작성일 오래된순
            </div>
          </div>
          <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}
