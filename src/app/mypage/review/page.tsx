import SelectReview from "@/components/mypage/selectReview";
import SelectReviewTab from "@/components/mypage/selectReviewTab";

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
