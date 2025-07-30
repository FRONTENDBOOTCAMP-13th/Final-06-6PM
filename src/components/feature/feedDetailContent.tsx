"use client";
import { useState, useEffect } from "react";
import CommentItem from "@/components/ui/commentItem";
import ViewItem from "@/components/feature/viewItem";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList, getReviewDetail } from "@/data/functions/review";
import { GetReviewDetailProps } from "@/types/review";
import { ReviewReply } from "@/types/review";

interface FeedDetailContentProps {
  reviewId: string;
  newComment?: ReviewReply | null;
}

export default function FeedDetailContent({ reviewId, newComment }: FeedDetailContentProps) {
  const [reviewData, setReviewData] = useState<GetReviewDetailProps | null>(null);
  const [comments, setComments] = useState<ReviewReply[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviewDetail = async (id: string) => {
    setLoading(true);
    try {
      const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all([
        getReviewAllList(),
        getReviewDailyList(),
        getReviewPlaceList(),
      ]);

      let allReviews: GetReviewDetailProps[] = [];
      if (reviewAllRes?.ok === 1) allReviews.push(...(reviewAllRes.item || []));
      if (reviewDailyRes?.ok === 1) allReviews.push(...(reviewDailyRes.item || []));
      if (reviewPlaceRes?.ok === 1) allReviews.push(...(reviewPlaceRes.item || []));

      const targetReview = allReviews.find((item) => item._id.toString() === id);

      if (targetReview) {
        const detailRes = await getReviewDetail(id);
        console.log("detailRes", detailRes);

        if (detailRes?.ok === 1 && detailRes.item) {
          const updatedReviewData = {
            ...detailRes.item,
            repliesCount: detailRes.item.repliesCount || detailRes.item.replies?.length || 0,
          };

          setReviewData(updatedReviewData);
          setComments(detailRes.item.replies || []);
        } else {
          setReviewData(targetReview);
          setComments([]);
        }
      } else {
        console.error("해당 ID의 리뷰를 찾을 수 없습니다:", id);
        setReviewData(null);
        setComments([]);
      }
    } catch (error) {
      console.error("상세 데이터 로딩 실패:", error);
      setReviewData(null);
      setComments([]);
    } finally {
      setLoading(false);
    }
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
  }, [reviewId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8">로딩 중...</div>
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
          comments.map((comment, index) => (
            <div key={comment._id || index}>
              <hr className="my-6 text-travel-gray200" />
              <CommentItem
                author={comment.user?.name || "익명"}
                date={comment.createdAt || "날짜 없음"}
                content={comment.content || "내용 없음"}
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
