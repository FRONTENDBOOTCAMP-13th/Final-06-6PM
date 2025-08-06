import SelectWriteReview from "@/components/review/selectWriteReview";

// 여행기록_세부사항선택하기
export default function ReviewDetailPage() {
  return (
    <>
      <h1 className="bg-white sr-only">리뷰작성 상세페이지</h1>
      <div className="mt-5 overflow-hidden bg-white shadow-xl rounded-2xl">
        <SelectWriteReview />
      </div>
    </>
  );
}
