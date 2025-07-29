"use client";
import { useState, useEffect } from "react";
import ButtonRounded from "@/components/ui/btnRound";
import DropdownItem from "@/components/feature/dropdownItem";
import TagItem from "@/components/feature/tagItem";
import ViewItem from "@/components/feature/viewItem";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";
import { GetReviewDetailProps } from "@/types/review";

type ReviewType = "all" | "reviewAll" | "reviewDaily" | "reviewPlace";

export default function FeedContent() {
  const [reviewData, setReviewData] = useState<GetReviewDetailProps[]>([]);
  const [currentType, setCurrentType] = useState<ReviewType>("all");
  const [loading, setLoading] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

  const fetchReviewData = async (type: ReviewType = "all") => {
    setLoading(true);
    try {
      let allData: GetReviewDetailProps[] = [];

      if (type === "all") {
        const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all([
          getReviewAllList(),
          getReviewDailyList(),
          getReviewPlaceList(),
        ]);

        const reviewAllData = reviewAllRes?.ok === 1 ? reviewAllRes.item || [] : [];
        const reviewDailyData = reviewDailyRes?.ok === 1 ? reviewDailyRes.item || [] : [];
        const reviewPlaceData = reviewPlaceRes?.ok === 1 ? reviewPlaceRes.item || [] : [];

        allData = [...reviewAllData, ...reviewDailyData, ...reviewPlaceData];
      } else {
        let response;
        switch (type) {
          case "reviewAll":
            response = await getReviewAllList();
            break;
          case "reviewDaily":
            response = await getReviewDailyList();
            break;
          case "reviewPlace":
            response = await getReviewPlaceList();
            break;
          default:
            response = { ok: 0, item: [] };
        }
        allData = response?.ok === 1 ? response.item || [] : [];
      }

      setReviewData(allData);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setReviewData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: ReviewType) => {
    setCurrentType(type);
  };

  // 삭제 성공 시 데이터 새로고침하는 콜백 함수
  const handleDelete = (reviewId: number) => {
    setDeleteReviewId(reviewId);

    // 로컬 상태에서 해당 리뷰 제거
    setReviewData((prev) => prev.filter((item) => item._id !== reviewId));
  };

  useEffect(() => {
    fetchReviewData(currentType);
  }, [currentType]);

  return (
    <>
      <div className="flex flex-col-reverse xs:flex-row items-end xs:items-center gap-y-3 my-3 px-0.5">
        <DropdownItem label="오래된순" />
        <div className="flex w-full xs:w-fit flex-start items-center gap-0.5 before:hidden xs:before:block before:content-['|'] before:mx-1 before:text-travel-gray400">
          <TagItem variant={currentType === "all" ? "primary" : "outline"}>
            <span onClick={() => handleTypeChange("all")}>전체</span>
          </TagItem>
          <ButtonRounded
            variant={currentType === "reviewAll" ? "primary" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("reviewAll")}
          >
            전체리뷰
          </ButtonRounded>
          <TagItem variant={currentType === "reviewDaily" ? "primary" : "outline"}>
            <span onClick={() => handleTypeChange("reviewDaily")}>일별리뷰</span>
          </TagItem>
          <TagItem variant={currentType === "reviewPlace" ? "primary" : "outline"}>
            <span onClick={() => handleTypeChange("reviewPlace")}>장소별리뷰</span>
          </TagItem>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : reviewData.length > 0 ? (
          reviewData.map((item) => <ViewItem key={`${item.type}-${item._id}`} {...item} onDelete={handleDelete} />)
        ) : (
          <div className="text-center py-8 text-travel-gray400">후기가 없습니다.</div>
        )}
      </div>
    </>
  );
}
