import MypageReviewSelect from "@/components/feature/mypageReviewSelect";
import SelectReview from "@/components/feature/selectReview";

// 마이페이지/리뷰
export default function MypageReviewPage() {
  return (
    <>
      <MypageReviewSelect />
      <div className="bg-white rounded-2xl overflow-hidden">
        <SelectReview />
      </div>
    </>
  );
}
