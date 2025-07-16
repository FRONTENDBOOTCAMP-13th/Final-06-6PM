"use client";

import { ChevronDown } from "lucide-react";
import TagItem from "@/components/ui/tagItem";

interface DropdownItemProps {
  label: string;
  openModal?: () => void;
}

export default function DropdownItem({ label, openModal }: DropdownItemProps) {
  return (
    <>
      <div className="cursor-pointer w-23" onClick={openModal}>
        <TagItem className="w-full grid-cols-[1fr_auto] ">
          {label}
          <ChevronDown className="w-3 h-3" />
        </TagItem>
      </div>
    </>
  );
}
