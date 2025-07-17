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
    <div className="flex items-center justify-between w-full px-6 bg-white rounded-lg shadow py-7">
      <div className="flex items-center min-w-0 gap-2">
        {icon}
        <span className="font-medium text-16 text-travel-text100">{label}</span>
      </div>
      {count > 0 && (
        <span className="ml-2 font-bold text-travel-fail100 text-16">
          {count}
        </span>
      )}
    </div>
  );
}
