"use client";

import { Bookmark, MapPinned } from "lucide-react";
import { useState, useEffect } from "react";
import ViewItem, { ViewItemProps } from "../feature/viewItem";
import { GetReviewDetailProps } from "@/types/review";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";
import useUserStore from "@/zustand/userStore";
import ViewItemSkeleton from "@/components/feature/viewItemSkeleton";
import PlaceCardSkeleton from "@/components/mypage/placeCardSkeleton";
import { getUser } from "@/data/functions/user";
import { BookmarkPlace } from "@/types/bookmark";
import PlaceItem from "./placeItem";

interface SelectBookmarkProps {
  sortType: "latest" | "oldest";
}

export default function SelectBookmark({ sortType }: SelectBookmarkProps) {
  const [tab, setTab] = useState(0);
  const [reviewBookmark, setReviewBookmark] = useState<GetReviewDetailProps[]>([]);
  const [filteredData, setFilteredData] = useState<GetReviewDetailProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [placeBookmark, setPlaceBookmark] = useState<BookmarkPlace[]>([]);

  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.userInfo);

  useEffect(() => {
    const myPlaceBookmark = async () => {
      if (!user?._id || !token) return;
      setLoading(true);

      const res = await getUser(user._id);
      const bookmarkPlaceItem = res.item.extra.bookmarkPlace;
      try {
        if (res.ok) {
          setPlaceBookmark(bookmarkPlaceItem);
        }
      } catch (error) {
        console.error("북마크된 장소 조회 실패:", error);
        setPlaceBookmark([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchBookmarkedReviews = async () => {
      if (!token) return;
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

    if (tab === 0) {
      myPlaceBookmark();
    }

    if (tab === 1) {
      fetchBookmarkedReviews();
    }
  }, [user?.extra?.bookmarkPlace, tab]);

  useEffect(() => {
    const sorted = [...reviewBookmark].sort((a, b) => {
      const getDate = (item: GetReviewDetailProps) => {
        const dateStr = item.extra?.startDate || item.extra?.visitDate || item.createdAt;
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? 0 : date.getTime();
      };

      const dateA = getDate(a);
      const dateB = getDate(b);

      return sortType === "latest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredData(sorted);
  }, [reviewBookmark, sortType]);

  // 후기 탭을 누를때 호출하는 함수
  useEffect(() => {}, [token, tab]);

  const tabData = [
    {
      id: 0,
      title: "장소 북마크",
      icon: <MapPinned className="w-[1.25rem] h-[1.25rem]" />,
      description: placeBookmark,
    },
    {
      id: 1,
      title: "후기 북마크",
      icon: <Bookmark className="w-[1.25rem] h-[1.25rem]" />,
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
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 p-4">
        {tab === 0 ? (
          loading ? (
            // 장소 북마크 로딩 중
            Array.from({ length: 3 }).map((_, idx) => <PlaceCardSkeleton key={idx} />)
          ) : (
            placeBookmark.map((item, idx) => <PlaceItem key={idx} {...item} />)
          )
        ) : loading ? (
          // 후기 북마크 로딩 중
          Array.from({ length: 3 }).map((_, idx) => <ViewItemSkeleton key={idx} />)
        ) : filteredData.length > 0 ? (
          filteredData.map((item, idx) => <ViewItem key={idx} {...item} />)
        ) : (
          <div className="text-center py-8 text-travel-gray400">북마크한 게시물이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
