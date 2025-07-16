import React from "react";
import { Bookmark, BookOpen } from "lucide-react";

type itemType = "bookmark" | "review";
interface BookmarkItemProps {
  type: itemType;
  count?: number;
}

const itemInfo = (type: itemType) => {
  switch (type) {
    case "bookmark":
      return {
        icon: <Bookmark className="w-6 h-6 text-travel-text100 shrink-0" />,
        label: "나의 북마크",
      };
    case "review":
      return {
        icon: <BookOpen className="w-6 h-6 text-travel-text100 shrink-0" />,
        label: "나의 리뷰",
      };
  }
};

export default function BookmarkItem({ type, count = 0 }: BookmarkItemProps) {
  const { icon, label } = itemInfo(type);

  return (
    <div className="flex items-center justify-between w-full rounded-lg bg-white shadow py-7 px-6">
      <div className="flex items-center gap-2 min-w-0">
        {icon}
        <span className="text-14 text-travel-text100 font-medium truncate">
          {label}
        </span>
      </div>
      {count > 0 && (
        <span className="text-travel-fail100 font-bold text-16 ml-2">
          {count}
        </span>
      )}
    </div>
  );
}
