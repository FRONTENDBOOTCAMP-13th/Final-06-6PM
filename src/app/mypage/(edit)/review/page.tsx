import SelectReview from "@/components/mypage/selectReview";
import SelectReviewTab from "@/components/mypage/selectReviewTab";

// 마이페이지/리뷰
export default function MypageReviewPage() {
  return (
    <>
      <h1 className="bg-white sr-only">나의 리뷰페이지</h1>
      <SelectReviewTab />
      <div className="bg-white rounded-2xl overflow-hidden">
        <SelectReview />
      </div>
    </>
  );
}
