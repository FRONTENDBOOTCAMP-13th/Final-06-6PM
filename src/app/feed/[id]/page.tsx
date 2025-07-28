"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CommentItem from "@/components/ui/commentItem";
import ViewItem from "@/components/feature/viewItem";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";
import { GetReviewDetailProps } from "@/types/review";

//use client 컴포넌트 분리 예정
export default function FeedViewPage() {
  const params = useParams();
  const reviewId = params.id as string;

  const [reviewData, setReviewData] = useState<GetReviewDetailProps | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviewDetail = async (id: string) => {
    setLoading(true);
    try {
      const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all([
        getReviewAllList(),
        getReviewDailyList(),
        getReviewPlaceList(),
      ]);

      let allData: GetReviewDetailProps[] = [];
      if (reviewAllRes?.ok === 1) allData = [...allData, ...(reviewAllRes.item || [])];
      if (reviewDailyRes?.ok === 1) allData = [...allData, ...(reviewDailyRes.item || [])];
      if (reviewPlaceRes?.ok === 1) allData = [...allData, ...(reviewPlaceRes.item || [])];

      const targetReview = allData.find((item) => item._id.toString() === id);

      if (targetReview) {
        console.log("Found review data:", targetReview);
        setReviewData(targetReview);

        if (targetReview.replies && Array.isArray(targetReview.replies)) {
          setComments(targetReview.replies);
        } else {
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
    <>
      <div className="py-6 px-4 relative bg-white rounded-2xl">
        <div className="flex flex-col gap-8">
          <ViewItem {...reviewData} />
        </div>
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />

        {(!comments || comments.length === 0) && (
          <>
            <hr className="my-6 text-travel-gray200" />
            <div className="text-center py-8 text-travel-gray400">첫 번째 댓글을 작성해보세요!</div>
          </>
        )}
      </div>
    </>
  );
}
