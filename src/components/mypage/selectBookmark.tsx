"use client";

import { MapPinned } from "lucide-react";
import { useState, useEffect } from "react";
import PlacePlusItem, { PlacePlusItemProps } from "./placePlusItem";
import ViewItem, { ViewItemProps } from "../feature/viewItem";
import { GetReviewDetailProps } from "@/types/review";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";
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

  // 후기 탭을 누를때 호출하는 함수
  useEffect(() => {
    if (token && tab === 1) {
      fetchBookmarkedReviews();
    }
  }, [token, tab]);

  const fetchBookmarkedReviews = async () => {
    if (!token) return; //로그인안대면못함

    setLoading(true);
    try {
      // 리뷰 3개 전부 호출
      const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all([
        getReviewAllList(token),
        getReviewDailyList(token),
        getReviewPlaceList(token),
      ]);
      const reviewAllData = reviewAllRes?.ok === 1 ? reviewAllRes.item || [] : [];
      const reviewDailyData = reviewDailyRes?.ok === 1 ? reviewDailyRes.item || [] : [];
      const reviewPlaceData = reviewPlaceRes?.ok === 1 ? reviewPlaceRes.item || [] : [];

      const allData = [...reviewAllData, ...reviewDailyData, ...reviewPlaceData];

      //북마크 되어 있는 게시물만 필터링
      const bookmarkedReviews = allData.filter((review: GetReviewDetailProps) => {
        //북마크 아이디가 잘 있는지 확인
        return review.myBookmarkId !== undefined && review.myBookmarkId !== null;
      });
      setReviewBookmark(bookmarkedReviews);
    } catch (error) {
      console.error("북마크된 게시물 조회 실패:", error);
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
        ) : reviewBookmark.length > 0 ? (
          // 리뷰가 있을 때만 리뷰를 가져와서 띄워줌
          reviewBookmark.map((item, idx) => <ViewItem key={idx} {...item} />)
        ) : (
          // 리뷰가 없을 때
          <div className="text-center py-8 text-travel-gray400">북마크한 게시물이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
