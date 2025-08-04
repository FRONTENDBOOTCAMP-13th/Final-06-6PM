"use client";
import { useState, useEffect } from "react";
import DropdownItem from "@/components/feature/dropdownItem";
import TagItem from "@/components/feature/tagItem";
import SelectBookmark from "@/components/mypage/selectBookmark";
import { getUser } from "@/data/functions/user";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";
import useUserStore from "@/zustand/userStore";
import { GetReviewDetailProps } from "@/types/review";
import { BookmarkPlace } from "@/types/bookmark";

type SortType = "latest" | "oldest";

export default function BookmarkContent() {
  const [sortType, setSortType] = useState<SortType>("latest");
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [placeBookmark, setPlaceBookmark] = useState<BookmarkPlace[]>([]);
  const [reviewBookmark, setReviewBookmark] = useState<GetReviewDetailProps[]>([]);

  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.userInfo);

  // 장소 북마크 조회
  const fetchPlaceBookmarks = async () => {
    if (!user?._id || !token) return;
    setLoading(true);

    try {
      const res = await getUser(user._id);
      if (res.ok) {
        const bookmarkPlaceItem = res.item.extra.bookmarkPlace || [];
        setPlaceBookmark(bookmarkPlaceItem);
      }
    } catch (error) {
      console.error("북마크된 장소 조회 실패:", error);
      setPlaceBookmark([]);
    } finally {
      setLoading(false);
    }
  };

  // 후기 북마크 조회
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

      // 북마크 되어 있는 게시물만 필터링
      const bookmarkedReviews = allData.filter((review: GetReviewDetailProps) => {
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

  // 탭 변경시 데이터 조회
  useEffect(() => {
    if (tab === 0) {
      fetchPlaceBookmarks();
    } else if (tab === 1) {
      fetchBookmarkedReviews();
    }
  }, [tab, user?._id, token]);

  const handleSortChange = (type: SortType) => {
    setSortType(type);
  };

  return (
    <>
      {/* 셀렉트창 및 필터 */}
      {tab === 0 ? (
        <div className="flex flex-wrap items-center gap-1.5 flex-start">
          <TagItem>전체</TagItem>
          <TagItem variant="outline">맛집</TagItem>
          <TagItem variant="outline">행사</TagItem>
          <TagItem variant="outline">축제</TagItem>
        </div>
      ) : (
        <DropdownItem currentSort={sortType} onSortChange={handleSortChange} />
      )}
      <div className="my-4 overflow-hidden bg-white rounded-2xl">
        <SelectBookmark
          sortType={sortType}
          tab={tab}
          setTab={setTab}
          loading={loading}
          placeBookmark={placeBookmark}
          reviewBookmark={reviewBookmark}
        />
      </div>
    </>
  );
}
