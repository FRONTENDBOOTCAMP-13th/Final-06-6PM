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

  const currentLabel = currentSort === "latest" ? "최신순" : "오래된순";

  return (
    <div className="relative">
      <div className="cursor-pointer w-23" onClick={() => setIsOpen(!isOpen)}>
        <TagItem className="w-full grid-cols-[1fr_auto]">
          {currentLabel}
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </TagItem>
      </div>

      {isOpen && (
        <>
          <div className="absolute top-full left-0 mt-1 w-23 bg-white border border-travel-gray200 rounded-md shadow-lg z-10">
            <div
              className={`px-3 py-2 text-14 cursor-pointer hover:bg-travel-gray100 ${
                currentSort === "latest" ? "text-travel-primary200 font-medium" : "text-travel-gray700"
              }`}
              onClick={() => handleSortSelect("latest")}
            >
              최신순
            </div>
            <div
              className={`px-3 py-2 text-14 cursor-pointer hover:bg-travel-gray100 ${
                currentSort === "oldest" ? "text-travel-primary200 font-medium" : "text-travel-gray700"
              }`}
              onClick={() => handleSortSelect("oldest")}
            >
              오래된순
            </div>
          </div>
          <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}
