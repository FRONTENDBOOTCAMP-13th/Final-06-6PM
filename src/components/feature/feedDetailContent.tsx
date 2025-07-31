"use client";
import { useState, useEffect, useCallback } from "react";
import CommentItem from "@/components/ui/commentItem";
import ViewItem from "@/components/feature/viewItem";
import { getReviewDetail } from "@/data/functions/review";
import { GetReviewDetailProps, ReviewReply } from "@/types/review";

interface FeedDetailContentProps {
  reviewId: string;
  newComment?: ReviewReply | null;
}

export default function FeedDetailContent({ reviewId, newComment }: FeedDetailContentProps) {
  const [reviewData, setReviewData] = useState<GetReviewDetailProps | null>(null);
  const [comments, setComments] = useState<ReviewReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviewDetail = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const detailRes = await getReviewDetail(id);

      if (detailRes?.ok === 1 && detailRes.item) {
        const updatedReviewData = {
          ...detailRes.item,
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
  }, []);

  console.log("test", comments);
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8">
          <div className="animate-spin w-6 h-6 border-2 border-travel-primary100 border-t-transparent rounded-full mx-auto mb-2"></div>
          로딩 중...
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
