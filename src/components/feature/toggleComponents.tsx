"use client";

import { useState, useEffect } from "react";
import { Star, Bookmark } from "lucide-react";
import useUserStore from "@/zustand/userStore";
import { addBookmark, deleteBookmark, getBookmarks } from "@/data/functions/bookmark";

interface ToggleIconProps {
  type: "star" | "book";
  reviewId: number;
  myBookmarkId?: number;
  onBookmarkChange?: (isBookmarked: boolean) => void; //북마크 상태 변경
}

export default function ToggleIcon({ type, reviewId, myBookmarkId, onBookmarkChange }: ToggleIconProps) {
  const token = useUserStore((state) => state.token);
  const [toggle, setIsToggle] = useState(!!myBookmarkId);
  const [loading, setLoading] = useState(false);

  // props로 마이북마크아이디 값이 들어오면 토글상태 업데이트
  // 북마크가 안되어있으면 언디파인드라 업데이트 안댐
  useEffect(() => {
    setIsToggle(!!myBookmarkId);
  }, [myBookmarkId]);

  const toggleClick = async () => {
    if (!token) return; // 토큰없으면 무시
    setLoading(true);

    try {
      const bookmarkList = await getBookmarks(token);

      let currentBookmark = null;
      if (bookmarkList?.ok === 1 && bookmarkList.item) {
        // post._id값과 비교
        currentBookmark = bookmarkList.item.find((bookmark: any) => bookmark.post?._id === reviewId);
      }
      if (currentBookmark) {
        //이미 되어있으면 삭제
        await deleteBookmark(currentBookmark._id, token);
        setIsToggle(false);
        onBookmarkChange?.(false);
      } else {
        //없으면 추가
        const addResult = await addBookmark(reviewId, token);
        console.log(myBookmarkId, "북마크");
        setIsToggle(true);
        onBookmarkChange?.(true);
      }
    } catch (error) {
      console.error("북마크 토글 실패:", error);
    } finally {
      setLoading(false);
    }
  };
  const Icon = type === "star" ? Star : Bookmark;

  return (
    <button onClick={toggleClick} disabled={loading}>
      <Icon
        className={`size-7 ${toggle ? "text-amber-300" : "text-travel-gray400"} ${loading ? "opacity-50" : ""}`}
        fill="currentColor"
      />
    </button>
  );
}
