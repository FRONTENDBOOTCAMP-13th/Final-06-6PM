"use client";

import TagItem from "@/components/feature/tagItem";
import { Star, Plus } from "lucide-react";
import Image from "next/image";

export interface PlacePlusItemProps {
  place?: string;
  desc?: string;
  reviewRating?: number;
  reviewCount?: number;
  imgUrl?: string;
}

export default function PlacePlusItem({
  place = "지역명",
  desc = "지역설명",
  reviewRating = 0,
  reviewCount = 0,
  imgUrl = "/images/user2.png",
}: PlacePlusItemProps) {
  const plusItem = () => {
    console.log("아이템 추가");
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.3)] py-4 px-3 grid grid-cols-[auto_1fr_auto] items-center gap-2">
      {/* 이미지 삽입 */}
      <div className="w-[70px] h-[70px] rounded-2xl bg-travel-gray200 overflow-hidden aspect-square">
        {imgUrl && (
          <Image
            width={100}
            height={100}
            src={imgUrl}
            alt={place}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <div className="max-w-[240px] text-travel-text100 overflow-hidden">
        <div className="flex items-center gap-1">
          <h2 className="font-bold">{place}</h2>
          <TagItem variant="primary" size="sm">
            관광지
          </TagItem>
        </div>

        <p className="my-1 truncate text-travel-gray600 text-14 whitespace-nowrap">
          {desc}
        </p>

        {/* 리뷰쪽 */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                fill="currentColor"
                stroke="currentColor"
                className={`size-4 ${
                  i < Math.floor(reviewRating)
                    ? "text-travel-warn100"
                    : "text-travel-gray400"
                }`}
              />
            ))}
          </div>
          <p className="text-14 text-travel-text100">
            <span>{reviewRating}</span>
            <span>({reviewCount})</span>
          </p>
        </div>
      </div>

      {/* 버튼 */}
      <button
        type="button"
        aria-label="아이템 추가"
        onClick={plusItem}
        className="cursor-pointer"
      >
        <Plus className="size-5 text-travel-gray700" />
      </button>
    </div>
  );
}
