import SelectReview from "@/components/feature/selectReview";
import SelectReviewTab from "@/components/feature/selectReviewTab";

// 마이페이지/리뷰
export default function MypageReviewPage() {
  return (
    <>
      <SelectReviewTab />
      <div className="bg-white rounded-2xl overflow-hidden">
        <SelectReview />
      </div>
    </>
  );
}
