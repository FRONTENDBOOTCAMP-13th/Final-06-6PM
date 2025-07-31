"use client";

import { MapPinned } from "lucide-react";
import { useState, useEffect } from "react";
import PlacePlusItem, { PlacePlusItemProps } from "./placePlusItem";
import ViewItem from "./viewItem";
import { GetReviewDetailProps } from "@/types/review";
import { getBookmarks } from "@/data/functions/bookmark";
import useUserStore from "@/zustand/userStore";

export default function SelectBookmark() {
  const [tab, setTab] = useState(0);
  const [reviewBookmark, setReviewBookmark] = useState<GetReviewDetailProps[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useUserStore((state) => state.token);

  const placeBookmark: PlacePlusItemProps[] = [
    {
      place: "여수 오동도",
      desc: "빨간 등대와 동백꽃이 유명한 섬",
      reviewRating: 4.8,
      reviewCount: 126,
    },
    {
      place: "속초 해수욕장",
      desc: "맑은 바다와 가깝게 즐기는 맛집 투어",
      reviewRating: 4.5,
      reviewCount: 98,
    },
    {
      place: "속초 해수욕장",
      desc: "맑은 바다와 가깝게 즐기는 맛집 투어",
      reviewRating: 4.5,
      reviewCount: 98,
    },
  ];

  // API로 북마크 데이터 조회
  useEffect(() => {
    if (token && tab === 1) {
      fetchBookmarkData();
    }
  }, [token, tab]);

  const fetchBookmarkData = async () => {
    if (!token) return;

    setLoading(true);
    try {
      console.log("북마크 데이터 조회 시작...");
      const bookmarkData = await getBookmarks(token);
      console.log("받은 북마크 데이터:", bookmarkData);

     
        console.log("변환된 리뷰 데이터:", convertedReviews);
        setReviewBookmark(convertedReviews);
      } else {
        console.log("북마크 데이터 없음");
        setReviewBookmark([]);
      }
    } catch (error) {
      console.error("북마크 데이터 조회 실패:", error);
      setReviewBookmark([]);
    } finally {
      setLoading(false);
    }
  };

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
        {tab === 0 ? (
          placeBookmark.map((item, idx) => <PlacePlusItem key={idx} {...item} />)
        ) : loading ? (
          <div className="text-center py-8 text-travel-gray400">북마크를 불러오는 중...</div>
        ) : reviewBookmark.length > 0 ? (
          reviewBookmark.map((item, idx) => <ViewItem key={idx} {...item} />)
        ) : (
          <div className="text-center py-8 text-travel-gray400">북마크한 후기가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
