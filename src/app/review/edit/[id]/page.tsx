import SelectEditReview from "@/components/review/selectEditReview";

// 여행기록_수정하기
export default function ReviewEditPage() {
  return (
    <>
      <h1 className="bg-white sr-only">여행후기 수정페이지</h1>
      <div className="mt-5 overflow-hidden bg-white shadow-xl rounded-2xl">
        <SelectEditReview />
      </div>
    </>
  );
}
