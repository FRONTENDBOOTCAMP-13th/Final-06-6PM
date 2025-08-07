"use client";

import { Bookmark, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import ViewItem from "../feature/viewItem";
import { GetReviewDetailProps } from "@/types/review";
import ViewItemSkeleton from "@/components/feature/viewItemSkeleton";
import PlaceCardSkeleton from "@/components/mypage/placeCardSkeleton";
import { BookmarkPlace } from "@/types/bookmark";
import PlaceItem from "./placeItem";

interface SelectBookmarkProps {
  sortType: "latest" | "oldest";
  tab: number;
  setTab: (tab: number) => void;
  loading: boolean;
  placeBookmark: BookmarkPlace[];
  reviewBookmark: GetReviewDetailProps[];
}

export default function SelectBookmark({
  sortType,
  tab,
  setTab,
  loading,
  placeBookmark,
  reviewBookmark,
}: SelectBookmarkProps) {
  const [filteredData, setFilteredData] = useState<GetReviewDetailProps[]>([]);

  // 정렬 로직
  useEffect(() => {
    const sorted = [...reviewBookmark].sort((a, b) => {
      const getDate = (item: GetReviewDetailProps) => {
        const dateStr = item.createdAt || item.extra?.startDate || item.extra?.visitDate || "";
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? 0 : date.getTime();
      };

      const dateA = getDate(a);
      const dateB = getDate(b);

      return sortType === "latest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredData(sorted);
  }, [reviewBookmark, sortType]);

  const tabData = [
    {
      id: 0,
      title: "장소 북마크",
      icon: <Bookmark className="w-[1.25rem] h-[1.25rem]" />,
      description: placeBookmark,
    },
    {
      id: 1,
      title: "여행후기 북마크",
      icon: <Heart className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewBookmark,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2">
        {tabData.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100 border-b border-b-travel-secondary200"
                : "text-travel-gray400 bg-white border-b border-b-travel-gray200"
            }`}
            onClick={() => setTab(item.id)}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {tab === 0 ? (
          loading ? (
            // 장소 북마크 로딩 중
            Array.from({ length: 3 }).map((_, idx) => <PlaceCardSkeleton key={idx} />)
          ) : placeBookmark.length > 0 ? (
            placeBookmark.map((item, idx) => <PlaceItem key={idx} {...item} />)
          ) : (
            <div className="py-8 text-center text-travel-gray400">북마크한 장소가 없습니다.</div>
          )
        ) : loading ? (
          // 후기 북마크 로딩 중
          Array.from({ length: 3 }).map((_, idx) => <ViewItemSkeleton key={idx} />)
        ) : filteredData.length > 0 ? (
          filteredData.map((item, idx) => <ViewItem key={idx} {...item} />)
        ) : (
          <div className="py-8 text-center text-travel-gray400">북마크한 게시물이 없습니다.</div>
        )}
      </div>
    </>
  );
}
