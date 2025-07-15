"use client"

import { ChevronDown } from "lucide-react";
import TagItem from "@/components/ui/tagItem";

interface DropdownItemProps {
  label: string;
}

export default function DropdownItem({ label }: DropdownItemProps) {
  const toggle = () => {
    console.log("드롭다운 창이 뜹니다.");
  };

  return (
    <>
      <div onClick={toggle} className="cursor-pointer">
        <TagItem>
          {label}
          <ChevronDown className="w-3 h-3" />
        </TagItem>
      </div>
    </>
  );
}