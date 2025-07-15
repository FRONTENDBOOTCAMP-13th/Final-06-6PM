import React from "react";
import { Bookmark } from "lucide-react";

interface BookmarkItemProps {
  count?: number;
}

export default function BookmarkItem({ count = 0 }: BookmarkItemProps) {
  return (
    <div className="flex items-center justify-between w-full rounded-lg bg-white shadow p-4">
      <div className="flex items-center gap-4 min-w-0">
        <Bookmark className="w-6 h-6 text-travel-text100 shrink-0" />
        <span className="text-16 text-travel-text100 font-medium truncate">
          나의 여행 북마크
        </span>
      </div>
      {count > 0 && (
        <span className="text-travel-fail100 font-bold text-14 ml-2">
          {count}
        </span>
      )}
    </div>
  );
}
