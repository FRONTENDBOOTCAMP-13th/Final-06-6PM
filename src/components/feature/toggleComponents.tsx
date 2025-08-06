"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import useUserStore from "@/zustand/userStore";
import { addBookmark, deleteBookmark, getBookmarks } from "@/data/functions/bookmark";
import { toast } from "react-toastify";

interface ToggleIconProps {
  reviewId: number;
  myBookmarkId?: number;
  onBookmarkChange?: (isBookmarked: boolean) => void; //북마크 상태 변경
}

export default function ToggleIcon({ reviewId, myBookmarkId, onBookmarkChange }: ToggleIconProps) {
  const token = useUserStore((state) => state.token);
  const [toggle, setIsToggle] = useState(!!myBookmarkId);
  const [loading, setLoading] = useState(false);

  // props로 마이북마크아이디 값이 들어오면 토글상태 업데이트
  // 북마크가 안되어있으면 언디파인드라 업데이트 안댐
  useEffect(() => {
    setIsToggle(!!myBookmarkId);
  }, [myBookmarkId]);

  const toggleClick = async () => {
    if (!token) {
      toast.warn("로그인 후 이용 가능합니다.");
    } else {
      setLoading(true);

      try {
        const bookmarkList = await getBookmarks(token);

        let currentBookmark = null;
        if (bookmarkList?.ok === 1 && bookmarkList.item) {
          // 조회되면 post._id값과 비교해서 북마크 목록에 있는지 없는지 찾기
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
          setIsToggle(true);
          onBookmarkChange?.(true);
        }
      } catch (error) {
        console.error("북마크 토글 실패:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button onClick={toggleClick} disabled={loading} aria-label="후기 북마크">
      <Heart
        className={`size-6 ${toggle ? "text-travel-fail100" : "text-travel-gray400"} ${loading ? "opacity-50" : ""}`}
        //함수가 돌아가면서 시간이 생각보다 꽤 걸려서 사용자가 당황할까봐 로딩중이라는 것을 알리기 위해 넣어둠
        fill="currentColor"
      />
    </button>
  );
}
