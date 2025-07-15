"use client"

import { ChevronDown } from "lucide-react";
import TagItem from "@/components/ui/tagItem";

interface DropdownItemProps {
  label: string;
}

export default function DropdownItem({ label }: DropdownItemProps) {
  const openDropdown = () => {
    console.log("드롭다운 창이 뜹니다.");
  };

  return (
    <>
      <div className="cursor-pointer">
        <TagItem>
          {label}
          <ChevronDown onClick={openDropdown} className="w-3 h-3" />
        </TagItem>
      </div>
    </>
  );
}