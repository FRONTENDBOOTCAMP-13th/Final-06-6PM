"use client";

import { MapPinned } from "lucide-react";
import { useState } from "react";
import PlacePlusItem, { PlacePlusItemProps } from "./placePlusItem";
import ViewItem, { ViewItemProps } from "./viewItem";
import { GetReviewDetailProps } from "@/types/review";

export default function SelectBookmark() {
  const [tab, setTab] = useState(0);

  const placeBookmark: PlacePlusItemProps[] = [
    {
      place: "여수 오동도",
      desc: "빨간 등대와 동백꽃이 유명한 섬",
      reviewRating: 4.8,
      reviewCount: 126,
      // imgUrl: "/images/user3.png",
    },
    {
      place: "속초 해수욕장",
      desc: "맑은 바다와 가깝게 즐기는 맛집 투어",
      reviewRating: 4.5,
      reviewCount: 98,
      // imgUrl: "/images/user1.png",
    },
    {
      place: "속초 해수욕장",
      desc: "맑은 바다와 가깝게 즐기는 맛집 투어",
      reviewRating: 4.5,
      reviewCount: 98,
      // imgUrl: "/images/user1.png",
    },
  ];

  const reviewBookmark: GetReviewDetailProps[] = [
    {
      _id: 1,
      type: "reviewAll",
      title: "여름 바다 여행",
      content: "햇살 가득한 해운대에서 여유로운 시간을 보냈어요!",
      user: {
        type: "user",
        email: "test",
        _id: 101,
        name: "홍길동",
        // image: "/images/user2.png",
      },
      createdAt: "2025-07-11",
      updatedAt: "2025-07-11",
      extra: {
        plan_id: 501,
        startDate: "2025-07-10",
        endDate: "2025-07-12",
        // images: ["/images/user1.png", "/images/user2.png", "/images/user3.png"],
        starRate: 4.5,
        location: ["부산 해운대"],
        tags: ["여행", "바다", "여름"],
      },
      views: 123,
      bookmarks: 45,
      repliesCount: 8,
    },
  ];

  const tabData = [
    {
      id: 0,
      title: "장소 북마크",
      description: placeBookmark,
    },
    {
      id: 1,
      title: "후기 북마크",
      description: reviewBookmark,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2">
        {tabData.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100  border-b border-b-travel-secondary200"
                : "text-travel-gray400 bg-white border-b border-b-travel-gray200"
            }`}
            onClick={() => setTab(item.id)}
          >
            <MapPinned className="w-[1.25rem] h-[1.25rem]" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 p-4">
        {tab === 0
          ? placeBookmark.map((item, idx) => <PlacePlusItem key={idx} {...item} />)
          : reviewBookmark.map((item, idx) => <ViewItem key={idx} {...item} />)}
      </div>
    </div>
  );
}
