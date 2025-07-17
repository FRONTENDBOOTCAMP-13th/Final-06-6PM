import Button from "@/components/ui/btn";

export default function ReviewWrite() {
  return (
    <div className="w-full py-8 bg-white border rounded-2xl border-travel-gray200">
      <div className="flex flex-col items-center">
        {/* 일정을 등록해주세용 */}
        <h2 className="mb-4 text-16 text-travel-text200">
          작성된 리뷰가 없습니다.
        </h2>
        <h3 className="mb-4 text-8 text-travel-text200">
          여행의 추억을 리뷰로 남겨보세요!
        </h3>
        {/* 등록 버튼 */}
        <Button size="md" variant="fill" className="flex items-center gap-1">
          리뷰 작성하기
        </Button>
      </div>
    </div>
  );
}
