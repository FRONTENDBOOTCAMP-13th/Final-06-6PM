"use client";
import { useState, useEffect, useCallback } from "react";
import CommentItem from "@/components/ui/commentItem";
import ViewItem from "@/components/feature/viewItem";
import { GetReviewDetailProps, ReviewReply } from "@/types/review";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList, getReviewDetail } from "@/data/functions/review";
import useUserStore from "@/zustand/userStore";
import { getBookmarks } from "@/data/functions/bookmark";
import ViewItemSkeleton from "@/components/feature/viewItemSkeleton";
import CommentItemSkeleton from "@/components/ui/commentitemSkeleton";

interface FeedDetailContentProps {
  reviewId: string;
  newComment?: ReviewReply | null;
}

export default function FeedDetailContent({ reviewId, newComment }: FeedDetailContentProps) {
  const [reviewData, setReviewData] = useState<GetReviewDetailProps | null>(null);
  const [comments, setComments] = useState<ReviewReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트 레벨에서 token 가져오기
  const token = useUserStore((state) => state.token);

  const fetchReviewDetail = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        // 리뷰 상세정보랑 북마크 조회코드 가져오기
        const [detailRes, bookmarksRes] = await Promise.all([getReviewDetail(id), getBookmarks(token!)]);
        if (detailRes?.ok === 1 && detailRes.item) {
          // 현재 리뷰에 북마크가 있는지 없는지 조회하기
          let myBookmarkId = undefined;
          if (bookmarksRes?.ok === 1 && bookmarksRes.item) {
            const currentBookmark = bookmarksRes.item.find((bookmark: any) => bookmark.post?._id === parseInt(id));
            myBookmarkId = currentBookmark?._id;
          }

          // 북마크 아이디를 포함한 리뷰 데이터 재구성
          const updatedReviewData: GetReviewDetailProps = {
            ...detailRes.item,
            myBookmarkId, // 북마크아이디 추가
            repliesCount: detailRes.item.repliesCount || detailRes.item.replies?.length || 0,
          };

          setReviewData(updatedReviewData);
          setComments(detailRes.item.replies || []);
        } else {
          setError("리뷰를 찾을 수 없습니다.");
          setReviewData(null);
          setComments([]);
        }
      } catch (error) {
        console.error("상세 데이터 로딩 실패:", error);
        setError("데이터를 불러오는데 실패했습니다.");
        setReviewData(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const handleCommentDeleted = (replyId: number) => {
    setComments((prev) => prev.filter((comment) => comment._id !== replyId));
    setReviewData((prev) =>
      prev
        ? {
            ...prev,
            repliesCount: Math.max((prev.repliesCount || 0) - 1, 0),
          }
        : null,
    );
  };

  const handleCommentUpdated = (updatedReply: ReviewReply) => {
    setComments((prev) => prev.map((comment) => (comment._id === updatedReply._id ? updatedReply : comment)));
  };
  // 위에꺼랑 똑같은 갱신용 함수, 북마크가 없다면 언디파인드
  const handleBookmarkChange = (isBookmarked: boolean) => {
    setReviewData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        bookmarks: isBookmarked ? (prev.bookmarks || 0) + 1 : Math.max((prev.bookmarks || 0) - 1, 0),
        myBookmarkId: isBookmarked ? prev.myBookmarkId : undefined,
      };
    });
  };

  useEffect(() => {
    if (newComment) {
      setComments((prev) => [...prev, newComment]);
      setReviewData((prev) =>
        prev
          ? {
              ...prev,
              repliesCount: (prev.repliesCount || 0) + 1,
            }
          : null,
      );
    }
  }, [newComment]);

  useEffect(() => {
    if (reviewId) {
      fetchReviewDetail(reviewId);
    }
  }, [reviewId, fetchReviewDetail]);

  if (loading) {
    return (
      <div className="py-6 px-4 relative bg-white rounded-2xl">
        <div className="flex flex-col gap-8">
          <ViewItemSkeleton />
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="mt-6 ">
          <CommentItemSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8">
          <p className="text-travel-fail100 mb-4">{error}</p>
          <button
            onClick={() => fetchReviewDetail(reviewId)}
            className="px-4 py-2 bg-travel-primary100 text-white rounded-md hover:bg-travel-primary200 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8 text-travel-gray400">리뷰를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 relative bg-white rounded-2xl">
      <div className="flex flex-col gap-8">
        <ViewItem {...reviewData} />
      </div>

      <div className="mt-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id}>
              <hr className="my-6 text-travel-gray200" />
              <CommentItem
                imgUrl={comment.user?.image}
                author={comment.user?.name || "익명"}
                date={comment.createdAt || "날짜 없음"}
                content={comment.content || "내용 없음"}
                comment={comment}
                onCommentDeleted={handleCommentDeleted}
                onCommentUpdated={handleCommentUpdated}
              />
            </div>
          ))
        ) : (
          <>
            <hr className="my-6 text-travel-gray200" />
            <div className="text-center py-8 text-travel-gray400">첫 번째 댓글을 작성해보세요!</div>
          </>
        )}
      </div>
    </div>
  );
}
